import Message from '../models/Chat_Feature/Messages.js';
import Conversation from '../models/Chat_Feature/Conversation.js';
import {LRUCache} from "lru-cache";

// In Memory cache to store [workspaceId, conversationId] for fast lookup of groupConversations.
const groupConversationIdCache = new LRUCache({
  max : 5000,
});

export const createGroupConversation = async(workspaceId, ownerId, session) => {
    try {
        const newGroupConversation = new Conversation({
            workspaceId: workspaceId,
            chatType: "group",
            participants: [ownerId]
        });

        await newGroupConversation.save({session});
        return newGroupConversation._id;
        
    } catch (error) {
        console.error('Could not create group chat', error);
        throw error;
    }
}

export const addUserToGroupConversation = async (workspaceId, userId) => {
    try {
        
        const conversationIdObj = await Conversation.findOne({
            workspaceId : workspaceId,
            chatType: "group"
        }).select('_id');

        const conversationId= conversationIdObj._id;

        await Conversation.findByIdAndUpdate(conversationId, {
            $addToSet: { participants: userId}
        });


    } catch (error) {
        socket.emit("workspace:error", { message: error.message });

    }
}


export const handleGroupMessage = async ({workspaceId, text, clientMessageId, senderId}) =>{

    if(!text || !workspaceId || !senderId)
    {
        throw new Error("Invalid Payload");
    }

    let conversationId = groupConversationidCache.get(workspaceId);

    if(!conversationId)
    {
        const conversation = await Conversation.findOne({
            workspaceId: workspaceId,
            chatType: "group"
        });

        if(!conversation)
        {
            throw new Error("group Conversation not found");
        }

        conversationId = conversation._id;
        groupConversationIdCache.set(workspaceId, conversationId);
    }

    const newGroupMessage = new Message({
        conversationId : conversationId,
        senderId : senderId,
        text: text,
        clientMessageId: clientMessageId,
        readBy: [senderId]

    });

    await newGroupMessage.save();

    return newGroupMessage.toObject();
}


export const getOrCreateConversation = async (workspaceId, userId1, userId2) =>{
    
        let conversation = await Conversation.findOne({
            workspaceId: workspaceId,
            chatType:"direct",
            participants: {$all : [userId1, userId2]}
        });

        if(!conversation)
        {
            conversation = new Conversation({
                workspaceId : workspaceId,
                chatType: "direct",
                participants: [userId1, userId2]
            });

            await conversation.save();
        }

        return conversation._id;
}

export const handleDirectMessage = async({workspaceId, text, clientMessageId, senderId, recipientId}) => {
    
    if(!text || !workspaceId || !senderId || !recipientId) throw new Error("Invalid Payload");

    const conversationId = await getOrCreateConversation(workspaceId, senderId, recipientId);

    const newDirectMessage = new Message({
        conversationId: conversationId,
        senderId : senderId,
        recipientId : recipientId,
        text: text,
        clientMessageId : clientMessageId,
    });

    await newDirectMessage.save();

    return newDirectMessage.toObject();
};


// with cursor based pagination currently limited to conversation id and using the cursor to provide the createdAt timestamp of the last message.
export const getMessages = async(req, res) => {

    try {
        
        const {conversationId} = req.params;
        const {before} = req.query;

        const limit = parseInt(req.query.limit) || 20;

        if(!conversationId)
        {
            return res.status(400).json({error: "ConversationId is required"});
        }

        const query = {conversationId: conversationId};

        if(before)
        {
            query.createdAt = {
                $lt : new Date(before)
            }
        }

        const messages = await Message.find(query).sort({createdAt:-1}).limit(limit);

        messages.reverse(); // for frontend - displaying in chronological order

        res.status(200).json({messages: messages,
            hasMore: messages.length === limit
        });
    } catch (error) {
        res.status(500).json({error: "Error fetching messages"});
        console.error("Error fetching messages:", error);
    }
};
