import mongoose from 'mongoose'

const ConversationSchema = new mongoose.Schema({
    workspaceId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Workspace',
        required : true
    },

    chatType:{
        type: String,
        enum: ["direct", "group"],
        required : true
    },

    participants :  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],

    // createdAt:{
    //     type: Date,
    //     default: Date.now
    // },
}, {timestamps: true});

ConversationSchema.index({workspaceId:1, chatType:1});

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;