import Project from '../models/Project.js';
import Workspace from '../models/Workspace.js';


// GET /api/projects/:projectId/workspace/search-developers


export const searchDevelopers = async ( req, res) => {

    const {q, skills, availability} = req.query;

    const {projectId} = req.params;

    try {
        
        const project = await Project.findById(projectId);
        if(!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const excludedUserIds= [
            ...project.collaborators.map(id => id.toString()),
            project.createdBy.toString(),
            req.user._id.toString()
        ];

        const searchQuery = {
            _id: { $nin: excludedUserIds },
        };


        if(q){
            query.$or = [
                {name: new RegExp(q,'i')},
                {username: new RegExp(q,'i')},
                {
                    preferredRoles: { $in:[q.toLowerCase()]}
                }
            ];
        }

        // Filter based on skills

        if(skills){
            query.skills = { $in:  skills.split(',').map(s => s.toLowerCase())};
        }


        // Availability filter
        if(availability){
            query.availability = availability;
        }   


    
// Search from the database based on the query

        const userSearchResults = await User.find(query).select(
      'name username avatar skills preferredRoles availability links'
    );


    res.json(userSearchResults);






    } catch (error) {
        res.status(500).json({
            message: "Server error while searching developers",
            error: error.message
        });
    }

};