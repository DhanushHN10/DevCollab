import express from "express";
import {getMessages, getGroupMessages, getDirectConversationId} from "../../controllers/chatController.js";
import {checkConversationAccess} from "../../middleware/checkConversationAccess.js";
import {protect} from "../../middleware/protect.js";
import {checkWorkspaceMembership} from "../../middleware/checkWorkspaceMembership.js";

const router = express.Router();

// @ route /api/conversation/:conversationId/messages?before=<timestamp>&limit=<number>
// @ Cursor based pagination to retriev messages of a conversation from db
// @access Project Members

router.get("/:conversationId/messages", protect, checkConversationAccess, getMessages);

router.get("/workspace/:workspaceId/group/messages", protect, checkWorkspaceMembership, getGroupMessages);

router.get("/workspace/:workspaceId/dm/:recipientId/id", protect, getDirectConversationId);

export default router;