import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },

    content: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // For Idempocy if the FE sends the same message multiple times due to network issues, we can use this field to identify and ignore multiple sends.
    clientMessageId:{
        type: String,
    } 
  },
  { timestamps: true },

);

messageSchema.index({
  conversationId: 1,
  createdAt: -1, // So that the most recent messages come first when querying by conversationId
});


const Message = mongoose.model("Message", messageSchema);
export default Message;
