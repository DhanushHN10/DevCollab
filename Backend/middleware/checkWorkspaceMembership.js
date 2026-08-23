import Workspace from '../models/Workspace.js';

// Middleware to verify the requesting user is a member of the workspace
export const checkWorkspaceMembership = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const userId = req.user && req.user._id;

    if (!workspaceId) {
      return res.status(400).json({ error: 'workspaceId is required' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const workspace = await Workspace.findById(workspaceId).select('members').lean();

    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const isMember = workspace.members.some(m => m.user.toString() === userId.toString());

    if (!isMember) {
      return res.status(403).json({ error: 'Access denied: not a workspace member' });
    }

    return next();
  } catch (error) {
    console.error('Error checking workspace membership:', error);
    return res.status(500).json({ error: 'Server error while checking workspace membership' });
  }
};