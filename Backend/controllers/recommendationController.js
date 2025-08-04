import dotenv from "dotenv";
dotenv.config();
import axios from 'axios';
import Project from "../models/Project.js";
import User from "../models/User.js";


export const recommendProjects = async (req, res) => {
  try {
    const userId= req.user._id;
    const flaskUrl = process.env.RECOMMENDATION_URL || 'http://localhost:5001';
    const user = await User.findById(userId).select('_id skills interests');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const targetUser = {
      _id: user._id.toString(),
      skills: user.skills || [],
      interests: user.interests || [],
    };

    const projects = await Project.find({
      createdBy: { $ne: userId },
      isAcceptingDevs: true,
       collaborators: { $nin: [userId] },

    });

    const formattedProjects = projects.map(project => ({
      _id: project._id.toString(),
      techStack: project.techStack || [],
      tags: project.tags || [],
    }));


    const payload = {
      target_user: targetUser,
      projects: formattedProjects,
    };

       console.log("Sending this payload to Flask:", JSON.stringify(payload, null, 2));

     const response = await axios.post(`${flaskUrl}/recommend-projects`, payload);


     console.log("Received this data from Flask:", response.data);

    const recommendations = response.data;
    const recommendedIds = recommendations.map((rec) => rec._id);
   const detailedProjects = await Project.find({ _id: { $in: recommendedIds } })
  .select('title description tags techStack');
  const projectMap = new Map();
detailedProjects.forEach((proj) => projectMap.set(proj._id.toString(), proj));

const finalProjects = recommendations.map((rec) => {
  const proj = projectMap.get(rec._id);
  if (!proj) return null;
  
  return {
    ...proj.toObject(),
    similarity: parseFloat((rec.similarity * 100).toFixed(2)), 
  };
}).filter(Boolean);


return res.status(200).json({ recommendedProjects: finalProjects });




  } catch (error) {
    console.error('AI Project Recommendations Error: ', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get project recommendations' });
  }
};





export const recommendUsers = async (req, res) => {
  try {
    const projectId = req.params.projectId; 
    const flaskUrl = process.env.RECOMMENDATION_URL || 'http://localhost:5001';

    
    const project = await Project.findById(projectId).select('_id techStack tags collaborators pendingInvites joinRequests');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    
    const target_project = {
      _id: project._id.toString(),
      techStack: project.techStack || [],
      tags: project.tags || [],
    };


      const excludedUserIds = [
      ...project.collaborators,
      ...project.pendingInvites,
      ...project.joinRequests,
    ];
   
    const users = await User.find({
      _id: { $nin: excludedUserIds },
      profileCompleted: true,
    }).select('_id skills interests');

    const formattedUsers = users.map((user) => ({
      _id: user._id.toString(),
      skills: user.skills || [],
      interests: user.interests || [],
    }));

   
    const payload = {
      target_project: target_project,
      users: formattedUsers,
    };

    console.log("Sending this payload to Flask:", JSON.stringify(payload, null, 2));

  
    const response = await axios.post(`${flaskUrl}/recommend-users`, payload);

    console.log("Received this data from Flask:", response.data);

    const recommendations = response.data;
    const recommendedIds = recommendations.map((rec) => rec._id);

    const detailedUsers = await User.find({ _id: { $in: recommendedIds } })
      .select('_id name username email skills interests links');

    const userMap = new Map();
    detailedUsers.forEach((user) => userMap.set(user._id.toString(), user));

    const finalUsers = recommendations.map((rec) => {
      const user = userMap.get(rec._id);
      if (!user) return null;

      return {
        ...user.toObject(),
        similarity: parseFloat((rec.similarity * 100).toFixed(2)),
      };
    }).filter(Boolean);

    return res.status(200).json({ recommendedUsers: finalUsers });

  } catch (error) {
    console.error('AI User Recommendations Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get user recommendations' });
  }
};