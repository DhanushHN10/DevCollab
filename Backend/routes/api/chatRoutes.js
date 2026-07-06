import express from "express";
import {getMessages} from "../../controllers/chatController.js";
import {checkConversationAccess} from "../../middleware/checkConversationAccess.js";
import {protect} from "../../middleware/protect.js";

const router = express.Router();

// @ route /api/conversation/:conversationId/messages?before=<timestamp>&limit=<number>
// @ Cursor based pagination to retriev messages of a conversation from db
// @access Project Members

router.get("/:conversationId/messages", protect, checkConversationAccess, getMessages);

export default router;