import Message from "../models/message.js";
import mongoose from "mongoose";
import Owneraccount from "../models/owneraccount.js";
import Staffaccount from "../models/staffacount.js";
import Adminaccount from "../models/adminaccount.js";
import Patientaccount from "../models/patientaccount.js";


/*
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // Validate conversationId
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid conversation ID"
      });
    }

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .lean();

    // Manually populate senders with error handling
    const populatedMessages = await Promise.all(
      messages.map(async (msg) => {
        try {
          const model = mongoose.model(msg.senderModel);
          const sender = await model.findById(msg.sender)
            .select('patientfirstname patientlastname patientprofilepicture role')
            .lean();

          if (!sender) {
            console.warn(`Sender ${msg.sender} not found in ${msg.senderModel}`);
            return null;
          }

          return {
            ...msg,
            sender: {
              _id: sender._id,
              name: `${sender.patientfirstname || ''} ${sender.patientlastname || ''}`.trim(),
              avatar: sender.patientprofilepicture || '/default-avatar.png',
              role: sender.role
            }
          };
        } catch (err) {
          console.error(`Population error for message ${msg._id}:`, err);
          return null;
        }
      })
    );

    // Filter out null messages (failed populations)
    const validMessages = populatedMessages.filter(msg => msg !== null);

    res.json({
      success: true,
      count: validMessages.length,
      messages: validMessages.reverse() // Return oldest first
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching messages"
    });
  }
};*/

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, content, senderId, senderModel } = req.body;
    console.log('Received message request:', { conversationId, content, senderId, senderModel });

    // 1. Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      console.error('Invalid senderId format:', senderId);
      return res.status(400).json({
        success: false,
        error: "Invalid sender ID format",
        receivedId: senderId
      });
    }

    // 2. Normalize model name
    const normalizedModel = senderModel.endsWith('account') 
      ? senderModel 
      : `${senderModel}account`;
    console.log('Normalized model name:', normalizedModel);

    // 3. Verify model exists
    if (!mongoose.modelNames().includes(normalizedModel)) {
      console.error('Model not registered:', normalizedModel);
      return res.status(400).json({
        success: false,
        error: "Invalid sender type",
        availableModels: mongoose.modelNames(),
        receivedModel: senderModel,
        normalizedModel
      });
    }

    // 4. Get the model and verify sender exists
    const Model = mongoose.model(normalizedModel);
    console.log(`Querying ${normalizedModel} collection for _id:`, senderId);
    
    const sender = await Model.findById(senderId)
      .select('patientfirstname patientlastname patientprofilepicture role')
      .lean();

    if (!sender) {
      console.error('Sender not found. Full query details:', {
        collection: Model.collection.name,
        query: { _id: senderId },
        model: normalizedModel
      });
      return res.status(404).json({
        success: false,
        error: "Sender account not found",
        details: {
          collection: Model.collection.name,
          _id: senderId
        }
      });
    }

    // 5. Create and save message
    const newMessage = await Message.create({
      conversationId,
      content,
      sender: senderId,
      senderModel: normalizedModel
    });

    console.log('Message created successfully:', newMessage._id);

    // 6. Format response
    res.status(201).json({
      success: true,
      message: {
        ...newMessage.toObject(),
        sender: {
          _id: sender._id,
          name: `${sender.patientfirstname} ${sender.patientlastname}`,
          avatar: sender.patientprofilepicture || '/default-avatar.png',
          role: sender.role
        }
      }
    });

  } catch (error) {
    console.error('Full error details:', {
      error: error.message,
      stack: error.stack,
      requestBody: req.body
    });
    res.status(500).json({
      success: false,
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId, userModel } = req.body;

    // Normalize model name
    const normalizedModel = userModel.endsWith('account') 
      ? userModel 
      : `${userModel}account`;

    // Verify user exists
    const model = mongoose.model(normalizedModel);
    const userExists = await model.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        error: "User account not found"
      });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      {
        $addToSet: {
          readBy: {
            userId,
            userModel: normalizedModel
          }
        }
      },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        error: "Message not found"
      });
    }

    res.json({
      success: true,
      message: updatedMessage
    });

  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      error: "Server error while updating read status"
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    
    // Soft delete (set deleted flag)
    const deletedMessage = await Message.findByIdAndUpdate(
      messageId,
      { deleted: true },
      { new: true }
    );

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        error: "Message not found"
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully"
    });

  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: "Server error while deleting message"
    });
  }
};



export const getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId }).lean();

    const updatedMessages = await Promise.all(
      messages.map(async (msg) => {
        let senderData = null;

        switch (msg.senderModel) {
          case "Owneraccount":
            senderData = await Owneraccount.findById(msg.senderId).lean();
            break;
          case "Staffaccount":
            senderData = await Staffaccount.findById(msg.senderId).lean();
            break;
          case "Adminaccount":
            senderData = await Adminaccount.findById(msg.senderId).lean();
            break;
          case "Patientaccount":
            senderData = await Patientaccount.findById(msg.senderId).lean();
            break;
        }

        // Shorten avatar URL to just path
        let avatarPath = "/default-avatar.png";
        if (senderData?.avatar) {
          try {
            const parsedUrl = new URL(senderData.avatar);
            avatarPath = parsedUrl.pathname;
          } catch {
            avatarPath = senderData.avatar; // If it's already a relative path
          }
        }

        msg.sender = {
          _id: senderData?._id || null,
          name: `${senderData?.firstname || ""} ${senderData?.lastname || ""}`.trim(),
          avatar: avatarPath,
          role: msg.senderModel.replace("account", ""),
        };

        return msg;
      })
    );

    res.status(200).json({ success: true, messages: updatedMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};