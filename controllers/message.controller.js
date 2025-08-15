import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Get all conversations for a user or clinic
export const getConversations = async (req, res) => {
  try {
    const { userId, role, clinic } = req.user;
    
    let conversations;
    if (role === 'patient') {
      conversations = await Conversation.find({
        'participants.userId': userId,
        'participants.role': role
      }).populate('lastMessage');
    } else {
      conversations = await Conversation.find({
        $or: [
          { 'participants.clinic': clinic },
          { clinic: clinic }
        ]
      }).populate('lastMessage');
    }

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get messages in a conversation
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId, role, clinic } = req.user;

    // Verify conversation access
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Check if user has access to the conversation
    const hasAccess = conversation.participants.some(p => 
      (p.userId === userId && p.role === role) || 
      (p.role === 'clinic' && p.clinic === clinic)
    );

    if (!hasAccess) {
      return res.status(403).json({ message: 'Unauthorized access to conversation' });
    }

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { 
        conversationId,
        'readBy.userId': { $ne: userId },
        senderId: { $ne: userId } // Don't mark own messages as read
      },
      {
        $push: {
          readBy: {
            userId: userId || null,
            role: role,
            clinic: role === 'clinic' ? clinic : null,
            readAt: new Date()
          }
        }
      }
    );

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    cb(null, isImage ? 'uploads/message-images/' : 'uploads/message-documents/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

// File filter for both images and documents
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'), false);
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export const createMessage = async (req, res) => {
  try {
    const { conversationId, text, patientId, targetClinic, senderName } = req.body;
    const { userId, role, clinic, name } = req.user;

    let imageUrl = null;
    let documentUrl = null;

    if (req.file) {
      const fileType = req.file.mimetype.startsWith('image/') ? 'message-images' : 'message-documents';
      const fileUrl = `/uploads/${fileType}/${req.file.filename}`;
      if (req.file.mimetype.startsWith('image/')) {
        imageUrl = fileUrl;
      } else {
        documentUrl = fileUrl;
      }
    }

    // Determine message type
    const isPatientMessagingClinic = role === 'patient' && !patientId && !targetClinic;
    const isStaffMessagingPatient = (role === 'staff' || role === 'owner') && patientId;
    const isClinicMessagingClinic = (role === 'staff' || role === 'owner') && targetClinic;

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
    } else {
      // Create new conversation
      const participants = [{
        userId: userId,
        role: role,
        clinic: role === 'staff' || role === 'owner' ? clinic : null
      }];

      if (isPatientMessagingClinic) {
        // Patient to clinic
        participants.push({
          role: 'clinic',
          clinic: req.body.clinic
        });
      } else if (isStaffMessagingPatient) {
        // Staff/owner to patient
        participants.push({
          userId: patientId,
          role: 'patient',
          clinic: null
        });
      } else if (isClinicMessagingClinic) {
        // Clinic to clinic
        participants[0] = { role: 'clinic', clinic: clinic }; // Sender is the clinic
        participants.push({ role: 'clinic', clinic: targetClinic }); // Recipient is the target clinic
      }

      conversation = new Conversation({
        participants,
        clinic: isClinicMessagingClinic ? clinic : req.body.clinic || targetClinic
      });

      await conversation.save();
    }


    const finalSenderName = senderName || (isClinicMessagingClinic ? clinic : name || 'Unknown');

    // Create the message
    const message = new Message({
      conversationId: conversation._id,
      senderId: userId,
      senderRole: isClinicMessagingClinic ? 'clinic' : role,
      senderName: finalSenderName,
      senderClinic: isClinicMessagingClinic ? clinic : (role === 'patient' ? null : clinic),
      sentToClinic: isPatientMessagingClinic ? req.body.clinic : (isClinicMessagingClinic ? targetClinic : null),
      text,
      imageUrl,
      documentUrl,
      documentName: req.file?.originalname
    });

    await message.save();

    // Update conversation's last message
    conversation.lastMessage = message._id;
    await conversation.save();

    // Emit the message via Socket.IO
    const io = req.app.get('io');
    io.to(conversation._id.toString()).emit('newMessage', message);

    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};