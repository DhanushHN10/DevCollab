import mongoose from "mongoose";
// require('mongoose-type-url');

await import("mongoose-type-url");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.isOAuthUser;
        
      } 
    },
    // date: {
    //   type: Date,
    //   default: Date.now,
    // },

    

    links: {
      linkedin: { type: mongoose.Schema.Types.Url },
      github: { type: mongoose.Schema.Types.Url },
      portfolio: { type: mongoose.Schema.Types.Url }
    },

    avatar: {
      type: String,
      // default:""
    },

    skills:{
      type: [String],
      default: []
    },

    interests: {
      type: [String],
      default: []
    },
    availability:{
        type: String,
        default:"Not specified",
        enum:["Available", "Not available", "Short-Term", "Long-Term"]
    },

    Role:
    {
      type: [String],
      default:[]
      
    },

    Bio:{
      type: String,
      // default: ""
      },

    location: {
      type: String,
    },
    profileCompleted:
    {
      type: Boolean,
      default: false, 
    },

    googleId:{
      type:String,
      unique:true,
      sparse: true // Allows for unique constraint to be applied only when the field is present
    

    },

    isOAuthUser:{
      type:Boolean,
      default: false
    }

    // Add personal information fields as needed
  },
  
  // Add timestamps to automatically manage createdAt and updatedAt fields,
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
