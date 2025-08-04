import express from 'express';
import { protect } from '../../middleware/protect.js';
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
    cancelJoinRequest,
    getProjectDetails,
    searchDevs

} from '../../controllers/projectController.js'

import { checkProjectMembership } from '../../middleware/checkPrijectMember.js';

const router = express.Router();


router.post('/create',protect, createProject);

router.get('/my-projects',protect, getMyProjects);

router.get('/my-collaborations', protect, getMyCollaboratedProjects);

router.get('/search-projects',protect, searchProjects);
router.get('/:projectId/workspace',protect,getWorkspace);

router.post('/:projectId/invite/:userIdToInvite',protect, checkProjectMembership,inviteToProject);

router.get('/:projectId/collab-status', protect,checkProjectMembership, getCollabStatus);

router.delete('/:projectId/invite/:unsendInvitedUserId',protect,checkProjectMembership, unsendInvite);

router.put('/:projectId/request/accept/:acceptRequestedUserId',protect,checkProjectMembership, acceptJoinRequest);

router.delete('/:projectId/request/reject/:rejectRequestedUserId', protect,checkProjectMembership, rejectJoinRequest);


router.get('/my/invites',protect, getInvitesReceived);
router.get('/my/requests',protect, getJoinRequestsSent);

router.post('/:projectId/request',protect,requestToJoin);



router.put('/my/invites/:projectId',protect, acceptProjectInvite);

router.delete('/my/invites/:projectId',protect, rejectProjectInvite);

router.delete('/my/requests/:projectId',protect, cancelJoinRequest);

router.get('/:projectId/overview',protect, checkProjectMembership, getProjectDetails);

router.get('/:projectId/search-devs',protect, checkProjectMembership,searchDevs );







export default router;

