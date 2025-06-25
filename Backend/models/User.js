import mongoose from 'mongoose';
require('mongoose-type-url');


const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true  
    },
    username: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

        
    },
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },

    url:
    {
        linkedin: mongoose.SchemaTypes.Url,
        github: mongoose.SchemaTypes.Url,

    }

    // Add personal information fields as needed


});

const User = mongoose.model('User', UserSchema);
export default User;