import express from 'express';
import { protect } from '../../middleware/protect';
import { searchDevelopers } from '../../controllers/workspaceController';

import {
    createProject,
    getMyProjects,
    getMyCollaboratedProjects,
    searchProjects,
    getWorkspace
} from '../../controllers/projectController';

const router = express.Router();


router.post('/create',protect, createProject);

router.get('/my-projects',protect, getMyProjects);

router.get('/my-collabs', protect, getMyCollaboratedProjects);

router.get('/search',protect, searchProjects);
router.get('/:projectId/workspace',protect,getWorkspace);


router.get('/:projectId/workspace/search-developers',protect, searchDevelopers);

export default router;

