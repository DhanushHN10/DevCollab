import Message from '../models/Chat_Feature/Messages.js'
import Conversation from '../models/Chat_Feature/Conversation.js'


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

export const addUserTogroupConversation = async (workspaceId, userId) => {
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
        console.error('Could not add user to the group chat', error);
        throw error;
    }
}



export const sendMessage = async (req,res) => {

    try {
        const {senderId, recipientId, content} = req.body 
        const workspaceId = req.body.workspaceId;

        // Query to find if a conversation exists between the two users. If not, lazily create a new conversation when needed.

        let conversationId = await Conversation.findOne({
            workspaceId: workspaceId,
            participants: { $all: [senderId, recipientId]}
            
        })

    } catch (error) {
        
    }

}