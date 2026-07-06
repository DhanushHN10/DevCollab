import Conversation from "../models/Chat_Feature/Conversation.js";

export const checkConversationAccess = async (req,res,next) => {
    const {conversationId} = req.params;
    if(!conversationId)
    {
        return res.status(400).json({message: "Invalid Request"});   
    }
    
    const userId = req.user._id;

    if(!userId)
    {
        return res.status(401).json({messaage: "Unauthorized Access"});
    }

    const conversation = await Conversation.findById(conversationId);

    if(!conversation){
        return res.status(404).json({message: "Bad Request"});
    }

    const isParticipant = conversation.participants.some(
    participant => participant.equals(userId)
    );

    if (!isParticipant)
    {
    return res.status(403).json({ message: "Forbidden Access" });
    }

    next();
}