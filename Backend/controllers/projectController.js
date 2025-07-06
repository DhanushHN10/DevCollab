import Project from "../models/Project";

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

        res.status(201).json({
            message:"Project Created",
            project: newProject
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
        const projects= await Project.find({createdBy:req.user._id});
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
    });

    res.json(projects);
} catch (error) {
    res.status(500).json({
        message:"Server Error",
        error:error.message
    });
    
}
};


export const searchProjects =  async (req,res) => {
    try {
       
       const {q, tags} = req.query;
        const query= {
             isAcceptingDevs:true,
                createdBy: {$ne: req.user._id},
         $or:[
            {title: {$regex: q, $options: 'i'}},
            {tags: {$in: tags?.split(',') || []}}
        ]
    };

        const projects = await Project.find(query).limit(50);

        res.json(projects);
} catch (error) {
        res.status(500).json({
            message:"Server Error",
            error:error.message
        });
    }
};




