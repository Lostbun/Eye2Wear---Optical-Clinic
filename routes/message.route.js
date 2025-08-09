import express from "express";
import { 
  sendMessage,
  markAsRead,
  getMessagesByConversation
} from "../controllers/message.controller.js";

const messagerouter = express.Router();

messagerouter.get("/:conversationId", getMessagesByConversation);
messagerouter.post("/", sendMessage);
messagerouter.patch("/:messageId/read", markAsRead);



export default messagerouter;