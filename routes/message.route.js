import express from "express";
import { 
  getConversations, 
  getMessages, 
  createMessage,
  upload 
} from "../controllers/message.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const messagerouter = express.Router();

messagerouter.get("/conversations", protect, getConversations);
messagerouter.get("/:conversationId", protect, getMessages);
messagerouter.post("/", protect, upload.single('file'), createMessage);
export default messagerouter;