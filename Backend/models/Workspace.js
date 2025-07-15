import mongoose, { mongo } from 'mongoose';


const workspaceSchema = new mongoose.Schema({
    project: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Project',
        required: true,
        unique: true
    },

    members: [{

        user:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        },

        role:{
            type: String,
            enum:['Owner','Member'],
            default: 'Member'
        },

        joinedAt: {
            type: Date,
            default: Date.now
        }

    }
],
    createdAt: {
        type: Date,
        default: Date.now
    },

    lastUpdated:{
        type: Date,
        default: Date.now
    },

    
},  
{timestamps: true}
);



const Workspace = mongoose.model('Workspace', workspaceSchema); 

export default Workspace