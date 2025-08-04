import express from "express";
import { 
  getMessages, 
  sendMessage,
  markAsRead 
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:conversationId", getMessages);
router.post("/", sendMessage);
router.patch("/:messageId/read", markAsRead);

export default router;