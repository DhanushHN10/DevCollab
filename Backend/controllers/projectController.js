import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";
import { addUserToWorkSpace } from "./workspaceController.js";

export const createProject = async(req,res) =>{
    try {
        const { title, description, techStack, tags} =req.body;

        const newProject= new Project({
            title,
            description,
            techStack,
            tags,
            createdBy:req.user._id,
            collaborators:[req.user._id]
        });
        await newProject.save();

        const workspace = new Workspace({
            project: newProject._id,
            members:[
                {
                    user: req.user._id,
                    role:'Owner',
                    joinedAt: new Date()
                },

                

            ],

            createdAt : new Date(),
        })

        await workspace.save();

        res.status(201).json({
            message:"Project and it's Workspace Created",
            project: newProject,
            workspace: workspace
        });
    } catch (error) {
        res.status(500).json({
            message:"Server Error",
            error:error.message
        });
        
    }

};

export const getMyProjects= async(req ,res) =>{
    try {
        const projects= await Project.find({createdBy:req.user._id}).sort({createdAt: -1});
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message:"Server Error",
            error:error.message
        });
    }
};

export const getMyCollaboratedProjects = async (req, res) =>{
try {
    const projects= await Project.find({
        collaborators: req.user._id,
        createdBy:{ $ne: req.user._id}
    }).sort({createdAt: -1});

    res.json(projects);
} catch (error) {
    res.status(500).json({
        message:"Server Error",
        error:error.message
    });
    
}
};


// export const searchProjects =  async (req,res) => {
//     try {
       
//        const {q, tags} = req.query;
//         const query= {
//              isAcceptingDevs:true,
//                 createdBy: {$ne: req.user._id},
//          $or:[
//             {title: {$regex: q, $options: 'i'}},
//             {tags: {$in: tags?.split(',') || []}},
//             { description: new RegExp(q, 'i') },
//         ]
//     };

//         const projects = await Project.find(query).limit(50);

//         res.json(projects);
// } catch (error) {
//         res.status(500).json({
//             message:"Server Error",
//             error:error.message
//         });
//     }
// };

export const searchProjects = async (req, res) => {
  try {
    const { q, tags } = req.query;

    const query = {
      isAcceptingDevs: true,
      createdBy: { $ne: req.user._id },
    };

    const orCondtn = [];

    if (q && q.trim()) {
      orCondtn.push(
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      );
    }

    if (tags) {
      const tagarr = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      if (tagarr.length > 0) {
        orCondtn.push({ tags: { $in: tagarr } });
      }
    }

    if (orCondtn.length > 0) {
      query.$or = orCondtn;
    }

    const projects = await Project.find(query).limit(50);
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



export const getWorkspace = async (req, res) => {

    try {
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId).select('title');

        if(!project)
        {
            return res.status(404).json({
                message: "Project not found",
            
            });
        }

        const workspace = await Workspace.findOne({project: projectId}).populate('members.user','name username email avatar');

        if(!workspace)
        {
            return res.status(404).json({
                message:"Workspace not found"
            });
        }


        const isMember = workspace.members.some(m => m.user._id.equals(req.user._id));
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this workspace" });
        }


            res.json({

                project:{
                    id: project._id,
                    title: project.title,
                    description: project.description,

                },

                members: workspace.members.map((m)=>({
                    id: m.user._id,
                    name: m.user.name,
                    username: m.user.username,
                    email: m.user.email,
                    avatar: m.user.avatar,
                    role: m.role,
                    joinedAt: m.joinedAt
                })),


            });
        
    } catch (err) {
         res.status(500).json({ message: 'Server error', error: err.message });
        
    }
};



export const inviteToProject = async (req,res) => {
    const projectId = req.params.projectId;
    const userId= req.body.userId;

    const project = await Project.findById(projectId);
    if(!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    if(project.createdBy.toString() !== req.user._id)
    {
        return res.status(403).json({
            message: "You aren't authorised to send invites. Only the owner can send invites."

        });
    }

    if(project.collaborators.includes(userId))
    {
        return res.status(400).json({
            message: "User is already a collaborator"
        });
    }


    if(project.pendingInvites.includes(userId))
    {
        return res.status(400).json({
            message: "User has already been invited to this project"
        });
    }


    if(project.joinRequests.includes(userId))
    {
        return res.status(400).json({
            message: "User has already requested to join this project"
        });
    }


    project.pendingInvites.push(userId);
    await project.save();

    res.status(200).json({
        message: "Invite sent successfully",
        projectId: project._id,
        userId: userId
    });

};


export const requestToJoin = async(req,res) =>{
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if(!project)
    {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    const userId= req.user._id;

    if(project.joinRequests.includes(userId)
    
    || project.collaborators.includes(userId) || project.pendingInvites.includes(userId))
    {
        return res.status(400).json({
            message:"You have already requested to join this project or are already a collaborator or have been invited"
        });
    }

    project.joinRequests.push(userId);

    await project.save();

    res.status(200).json({
        message:"Request successfully sent"
    })

};

export const getCollabStatus = async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user._id;

    const project = await Project.findById(projectId)
    .populate('pendingInvites', 'name username email avatar')
    .populate('joinRequests', 'name username email avatar')
    .select(' pendingInvites joinRequests');

    if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (project.createdBy.toString() !== userId.toString()) {
    return res.status(403).json({ message: 'Only the project owner can view this info' });
  }

  res.json({
    invitesSent: project.pendingInvites,
    joinRequestsReceived: project.joinRequests,
  });
};


export const unsendInvite = async (req,res) => {
    const {projectId, unsendUserId} = req.params;

    const project = await Project.findById(projectId);

    if(!project)

        {
            return res.status(404).json({
                message: "Project not found"
            });
        }

     if(project.createdBy.toString() !== req.user._id.toString())
        {
            return res.status(403).json({
                message: "Only the Project Owner can unsend invites"
            });
        }   
        const wasInvited = project.pendingInvites.some(id => id.toString() === unsendUserId.toString());
if (!wasInvited) {
  return res.status(400).json({
    message: "User was not in pending invites",
  });
}



       project.pendingInvites = project.pendingInvites.filter( id => id.toString() !== unsendUserId.toString()); 


       await project.save();

       res.status(200).json({
        message:"Invite removed"
       });
};



export const cancelJoinRequest = async(req,res) =>{

    const {projectId} = req.params;
    const project = await Project.findById(projectId);

    if(!project) return res.status(404).json({message:"Project not found"});

    project.joinRequests = project.joinRequests.filter(id => id.toString() !== req.user._id.toString());

    await project.save();

    res.status(200).json({ message:"Join request cancelled"});

};



export const acceptJoinRequest = async(req,res)=> {
    const{ projectId, acceptUserId} = req.params;
    
    const project = await Project.findById(projectId);

    if(!project)
    {
        return res.status(404).json({message:"Project not found"});
    }

     if (project.createdBy.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Only owner can accept requests' });

     if (!project.joinRequests.includes(acceptUserId))
    return res.status(400).json({ message: 'No such request found' });
    
      project.joinRequests = project.joinRequests.filter(
    id => id.toString() !== acceptUserId
  );

  project.collaborators.push(acceptUserId);
  await project.save();
  await addUserToWorkSpace(projectId,acceptUserId);

  res.json({ message: 'User added as collaborator and updated the workspace' });

};


export const rejectJoinRequest = async (req, res) => {
  const { projectId, userId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (project.createdBy.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Only owner can reject requests' });

  project.joinRequests = project.joinRequests.filter(
    id => id.toString() !== userId
  );

  await project.save();
  res.json({ message: 'Join request rejected' });
};


export const acceptProjectInvite = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  if (!project.pendingInvites.includes(userId))
    return res.status(400).json({ message: 'No invite found' });

  project.pendingInvites = project.pendingInvites.filter(
    id => id.toString() !== userId.toString()
  );

  project.collaborators.push(userId);
  await project.save();

  await addUserToWorkSpace(projectId,userId);
  res.json({ message: 'Invite accepted, added to project' });
};



export const rejectProjectInvite = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  project.pendingInvites = project.pendingInvites.filter(
    id => id.toString() !== userId.toString()
  );

  await project.save();
  res.json({ message: 'Invite rejected' });
};





export const getInvitesReceived = async (req, res) => {
  try {
    const projects = await Project.find({ pendingInvites: req.user._id })
      .populate('createdBy', 'name username email')
      .select('title createdBy tags techStack');

    res.json({ invites: projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invites received', details: err.message });
  }
};


export const getJoinRequestsSent = async (req, res) => {
  try {
    const requests = await Project.find({ joinRequests: req.user._id })
      .select('title createdBy tags techStack')
      .populate('createdBy', 'name username email');

    res.json({ requests });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your requests', details: err.message });
  }
};



export const getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId= req.user._id;

    const project = await Project.findById(projectId)
      .populate('createdBy', 'name username')
      .populate('collaborators', 'name username avatar')    .populate('pendingInvites', 'name username avatar email')
    .populate('joinRequests', 'name username avatar email') 
      .lean(); 

      // have added .lean() to return just plain js objects instead of mongoose documents as we are not going to modify the requested details from this api..

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isOwner = project.createdBy._id.toString() === req.user._id.toString();
    const isMember= project.collaborators.some(
      collaborators => collaborators._id.toString() === userId.toString());
    

    if(isMember){

      if(isOwner){
    res.json({
      project: {
        _id: project._id,
        title: project.title,
        description: project.description,
        tags: project.tags,
        techStack: project.techStack,
        createdBy: project.createdBy,
        collaborators: project.collaborators,
        pendingInvites: project.pendingInvites,
        joinRequests: project.joinRequests,
        createdAt: project.createdAt,
      },
      isOwner,
    }); }
    else
    {
      res.json({
      project: {
        _id: project._id,
        title: project.title,
        description: project.description,
        tags: project.tags,
        techStack: project.techStack,
        createdBy: project.createdBy,
        collaborators: project.collaborators,
        // pendingInvites: project.pendingInvites,
        // joinRequests: project.joinRequests,
        createdAt: project.createdAt,
      },
      isOwner,
    });
    }
  }
    else
    {
      res.json({
      project: {
        // _id: project._id,
        title: project.title,
        description: project.description,
        tags: project.tags,
        techStack: project.techStack,
        createdBy: project.createdBy,
        // collaborators: project.collaborators,
        // pendingInvites: project.pendingInvites,
        // joinRequests: project.joinRequests,
        createdAt: project.createdAt,
      },
      isOwner,
    });
    }
  } catch (err) {
    console.error("Error fetching project details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};






