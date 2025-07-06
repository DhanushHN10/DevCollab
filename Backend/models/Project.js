import mongoose from "mongoose";
await import("mongoose-type-url");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  techStack: [String],
  tags: [String],

  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  collaborators: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  requests: [
    {
      user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
      message: String,
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      requestedAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],

  createdAt:{
    type: Date,
    default: Date.now
  },

  isAcceptingDevs:{
    type:boolean,
    default:true
  }

});

const Project = mongoose.model("Project", projectSchema);
export default Project;
