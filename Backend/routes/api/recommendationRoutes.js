import express from 'express';
import { recommendProjects, recommendUsers } from '../../controllers/recommendationController.js';
import { protect } from '../../middleware/protect.js';


const router = express.Router();


router.get('/projects', protect, recommendProjects);

router.get('/users/:projectId',protect,recommendUsers);


export default router;