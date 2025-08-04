export const addUserToWorkSpace  = async(projectId, userId, role='Member') =>{
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



};