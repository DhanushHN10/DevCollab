// middleware/checkProjectMembership.js

import Project from '../models/Project.js';

export const checkProjectMembership = async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.user._id;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isOwner = project.createdBy.toString() === userId.toString();
    const isCollaborator = project.collaborators.includes(userId);

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({ message: 'Access denied: Not a member of this project' });
    }

 
    req.project = project;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
