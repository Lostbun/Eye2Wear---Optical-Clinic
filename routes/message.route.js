import express from "express";
import { 
  getConversations, 
  getMessages, 
  createMessage,
  upload 
} from "../controllers/message.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/conversations", protect, getConversations);
router.get("/:conversationId", protect, getMessages);
router.post("/", protect, upload.single('image'), createMessage);

export default router;