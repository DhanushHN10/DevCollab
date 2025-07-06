import express from 'express';
import { protect } from '../../middleware/protect';

import {
    createProject,
    getMyProjects,
    getMyCollaboratedProjects,
    searchProjects
} from '../../controllers/projectController';

const router = express.Router();


router.post('/create',protect, createProject);

router.get('/my-projects',protect, getMyProjects);

router.get('/my-collabs', protect, getMyCollaboratedProjects);

router.get('/search',protect, searchProjects);

export default router;

