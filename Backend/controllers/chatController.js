import { LRUCache } from "lru-cache";
import Conversation from "../models/Chat_Feature/Conversation.js";
import Message from "../models/Chat_Feature/Messages.js";
import Workspace from "../models/Workspace.js"
import Notification from "../models/Notifications.js";

// In Memory cache to store [workspaceId, conversationId] for fast lookup of groupConversations.
const groupConversationIdCache = new LRUCache({
  max: 5000,
});

export const createGroupConversation = async (
  workspaceId,
  ownerId,
  session,
) => {
  try {
    const newGroupConversation = new Conversation({
      workspaceId: workspaceId,
      chatType: "group",
      participants: [ownerId],
    });

    await newGroupConversation.save({ session });
    return newGroupConversation._id;
  } catch (error) {
    console.error("Could not create group chat", error);
    throw error;
  }
};

export const addUserToGroupConversation = async (workspaceId, userId) => {
  try {
    const conversation = await Conversation.findOne({
      workspaceId: workspaceId,
      chatType: "group",
    });

    if (!conversation) {
      return; 
    }

    await Conversation.findByIdAndUpdate(conversation._id, {
      $addToSet: { participants: userId },
    });
  } catch (error) {
    throw error;
  }
};

export const handleGroupMessage = async ({
  workspaceId,
  text,
  clientMessageId,
  senderId,
}) => {
  if (!text || !workspaceId || !senderId) {
    throw new Error("Invalid Payload");
  }

  let conversationId = groupConversationIdCache.get(workspaceId);

  if (!conversationId) {
    let conversation = await Conversation.findOne({
      workspaceId: workspaceId,
      chatType: "group",
    });

    if (!conversation) {
      // throw new Error("group Conversation not found");


      // Changing from throwing an error to creating a group chat so that previously created project workspaces can have group chat and not crash. 
      
      const workspace = await Workspace.findById(workspaceId).select('members.user').lean();

        const existingWorkspaceCollaborators = workspace.members.map(member => member.user);


        conversation = await Conversation.create({
          workspaceId: workspaceId,
          chatType: "group",
          participants: existingWorkspaceCollaborators
        });
    }

    conversationId = conversation._id;
    groupConversationIdCache.set(workspaceId, conversationId);
  }

  const newGroupMessage = new Message({
    conversationId: conversationId,
    senderId: senderId,
    text: text,
    clientMessageId: clientMessageId,
    readBy: [senderId],
  });

  await newGroupMessage.save();

  try {
    const workspace = await Workspace.findById(workspaceId).select('members project').populate('project', 'title').lean();
    
    if (workspace) {
      const notifications = workspace.members
        .filter(member => member.user.toString() !== senderId.toString())
        .map(member => ({
          recipient: member.user,
          sender: senderId,
          type: "group_chat_message",
          title: `New message in ${workspace.project?.title || 'Workspace'}`,
          message: text.length > 40 ? text.substring(0, 40) + '...' : text
        }));

      if (notifications.length > 0) {
        await Notification.insertMany(notifications); // Bulk insert is much faster
      }
    }
  } catch (notifError) {
    console.error("Failed to create group notifications:", notifError);
  }



  return newGroupMessage.toObject();
};

export const getOrCreateConversation = async (
  workspaceId,
  userId1,
  userId2,
) => {
  let conversation = await Conversation.findOne({
    workspaceId: workspaceId,
    chatType: "direct",
    participants: { $all: [userId1, userId2] },
  });

  if (!conversation) {
    conversation = new Conversation({
      workspaceId: workspaceId,
      chatType: "direct",
      participants: [userId1, userId2],
    });

    await conversation.save();
  }

  return conversation._id;
};

export const handleDirectMessage = async ({
  workspaceId,
  text,
  clientMessageId,
  senderId,
  recipientId,
}) => {
  if (!text || !workspaceId || !senderId || !recipientId)
    throw new Error("Invalid Payload");

  const conversationId = await getOrCreateConversation(
    workspaceId,
    senderId,
    recipientId,
  );

  const newDirectMessage = new Message({
    conversationId: conversationId,
    senderId: senderId,
    recipientId: recipientId,
    text: text,
    clientMessageId: clientMessageId,
  });

  await newDirectMessage.save();

  try {
    const chatNotification = new Notification({
      recipient: recipientId,
      sender: senderId,
      type: "chat_message",
      title: "New Direct Message",
      message: text.length > 40 ? text.substring(0, 40) + '...' : text
    });
    
    await chatNotification.save();
    try {
    const chatNotification = new Notification({
      recipient: recipientId,
      sender: senderId,
      type: "chat_message",
      title: "New Direct Message",
      message: text.length > 40 ? text.substring(0, 40) + '...' : text
    });
    
    await chatNotification.save();
  } catch (notifError) {
    console.error("Failed to create notification, but message was sent:", notifError);
  }
  } catch (notifError) {
    console.error("Failed to create notification, but message was sent:", notifError);
  }

  return newDirectMessage.toObject();
};

// with cursor based pagination currently limited to conversation id and using the cursor to provide the createdAt timestamp of the last message.
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { before } = req.query;

    const limit = parseInt(req.query.limit) || 20;

    if (!conversationId) {
      return res.status(400).json({ error: "ConversationId is required" });
    }

    const query = { conversationId: conversationId };

    if (before) {
      query.createdAt = {
        $lt: new Date(before),
      };
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    messages.reverse(); // for frontend - displaying in chronological order

    return res
      .status(200)
      .json({ messages: messages, hasMore: messages.length === limit });
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
    console.error("Error fetching messages:", error);
  }
};

export const getGroupMessages = async(req,res) =>{
  try {
    const {workspaceId} = req.params;
    const {before} = req.query;

    const limit = parseInt(req.query.limit) || 20;
    if(!workspaceId)
    {
      return res.status(400).json({message: "Invalid/Insufficient details"});
    }
    let conversationId = groupConversationIdCache.get(workspaceId);

    if(!conversationId) {
      let conversation = await Conversation.findOne({
        workspaceId : workspaceId,
        chatType: "group"
      });

      if(!conversation)
      {
        return res.status(200).json({ messages: [], hasMore: false })
      }

      conversationId = conversation._id;
      groupConversationIdCache.set(workspaceId, conversationId);
    }


const query = { conversationId: conversation._id };

    if (before) {
      query.createdAt = {
        $lt: new Date(before),
      };

      const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    messages.reverse(); // for frontend - displaying in chronological order

    return res
      .status(200)
      .json({ messages: messages, hasMore: messages.length === limit });


    }
  } catch (error) {
    return res.status(500).json({message:"Error fetching group messages"});
  }
}


// new api for the frontend to get conversationId before calling the getMessage api.

export const getDirectConversationId = async (req,res) => {
  try {
    const {workspaceId, recipientId} = req.params;
    const senderId = req.user._id;

    if(!workspaceId || !recipientId || !senderId)
    {
      return res.status(400).json({message:"Insufficient/invalid information provided"});
    }

    const conversation = await Conversation.findOne({
      workspaceId: workspaceId,
      chatType: "direct",
      participants: {$all : [senderId, recipientId]}
    })

    res.status(200).json({conversationId : conversation ? conversation._id : null});
  } catch (error) {
    console.error("Error fetching DM");
    res.status(500).json({message:"Error fetching DM"});
  }
}

