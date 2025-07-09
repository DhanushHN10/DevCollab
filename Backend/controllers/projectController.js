import Project from "../models/Project";
import Workspace from "../models/Workspace";

export const createProject = async(req,res) =>{
    try {
        const { title, description, teckStack, tags} =req.body;

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
        res.send(500).json({
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
}




