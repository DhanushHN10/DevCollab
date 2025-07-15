import express from 'express';
import { protect } from '../../middleware/protect.js';
import { searchDevelopers } from '../../controllers/workspaceController.js';
import {
    createProject,
    getMyProjects,
    getMyCollaboratedProjects,
    searchProjects,
    getWorkspace,
    inviteToProject,
    unsendInvite,
    getCollabStatus,
    acceptJoinRequest,
    rejectJoinRequest,
    getInvitesReceived,
    getJoinRequestsSent,
    requestToJoin,
    acceptProjectInvite,
    rejectProjectInvite,
    cancelJoinRequest

} from '../../controllers/projectController.js'

import { checkProjectMembership } from '../../middleware/checkPrijectMember.js';

const router = express.Router();


router.post('/create',protect, createProject);

router.get('/my-projects',protect, getMyProjects);

router.get('/my-collabs', protect, getMyCollaboratedProjects);

router.get('/search',protect, searchProjects);
router.get('/:projectId/workspace',protect,getWorkspace);


router.get('/:projectId/workspace/search-developers',protect,checkProjectMembership, searchDevelopers);

router.post('/:projectId/invite/:userId',protect, checkProjectMembership,inviteToProject);

router.get('/:projectId/collab-status', protect,checkProjectMembership, getCollabStatus);

router.delete('/:projectId/invite/:unsendUserId',protect,checkProjectMembership, unsendInvite);

router.put('/:projectId/request/accept/:acceptUserId',protect,checkProjectMembership, acceptJoinRequest);

router.delete('/:projectId/request/reject/:userId', protect,checkProjectMembership, rejectJoinRequest);


router.get('/my/invites',protect, getInvitesReceived);
router.get('/my/requests',protect, getJoinRequestsSent);

router.post('/:projectId/request',protect,requestToJoin);



router.put('/my/invites/:projectId',protect, acceptProjectInvite);

router.delete('/my/invites/:projectId',protect, rejectProjectInvite);

router.delete('/my/requests/:projectId',protect, cancelJoinRequest);








export default router;

