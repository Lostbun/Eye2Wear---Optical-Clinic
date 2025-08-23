import express from "express";
import { 
  getConversations, 
  getMessages, 
  createMessage,
  createConversation,
  upload,
  checkOrphanedImages,
  cleanupOrphanedImageReferences 
} from "../controllers/message.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const messagerouter = express.Router();

messagerouter.get("/conversations", protect, getConversations);
messagerouter.post("/conversations", protect, createConversation);
messagerouter.get("/:conversationId", protect, getMessages);
messagerouter.post("/", protect, upload.single('file'), createMessage);

// Image cleanup routes (for debugging/maintenance)
messagerouter.get("/admin/check-orphaned-images", protect, checkOrphanedImages);
messagerouter.post("/admin/cleanup-orphaned-images", protect, cleanupOrphanedImageReferences);

export default messagerouter;