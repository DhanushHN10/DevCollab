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

  await addUserTogroupConversation(workspace._id, userId);

    } catch (error) {
        console.error(error.message);
        throw error;
    }
};