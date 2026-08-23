import Workspace from "../models/Workspace.js";
import { addUserToGroupConversation, invalidateWorkspaceCache } from "./chatController.js";

export const addUserToWorkSpace  = async(projectId, userId, role='Member') =>{

    try {
        const workspace= await Workspace.findOne({project:projectId});

    if(!workspace)return;


    const alreadyMember= workspace.members.some(
        m => m.user.toString() === userId.toString()
    );


    if(alreadyMember)
    {
        return;
    }

     workspace.members.push({
    user: userId,
    role,
    joinedAt: new Date()
  });


  await workspace.save();

  // add user to group conversation

  await addUserToGroupConversation(workspace._id, userId);

  // Invalidate cache so notification building uses fresh workspace data
  try {
    invalidateWorkspaceCache(workspace._id.toString());
  } catch (err) {
    console.error('Failed to invalidate workspace cache:', err);
  }

    } catch (error) {
        console.error(error.message);
        throw error;
    }
};