import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';



// Get all conversations for a user
export const getConversations = async (req, res) => {
  try {
    const { userId, role } = req.user;
    console.log('Fetching conversations for user:', userId, role); // Debug log

    let conversations;
    if (role === 'patient') {
      conversations = await Conversation.find({
        'participants.userId': userId,
        'participants.role': role
      }).populate('lastMessage');
    } else {
      conversations = await Conversation.find({
        'participants.clinic': req.user.clinic,
        clinic: req.user.clinic
      }).populate('lastMessage');
    }

    console.log('Conversations found:', conversations); // Debug log
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
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 });

    // Mark messages as read by the current user
    await Message.updateMany(
      { 
        conversationId,
        'readBy.userId': { $ne: req.user.userId }
      },
      {
        $push: {
          readBy: {
            userId: req.user.userId,
            role: req.user.role,
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
    // Log incoming request for debugging
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { conversationId, text } = req.body;
    const { userId, role, name, clinic } = req.user;
    
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

    // Find or create conversation
    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
    } else {
      const clinicName = req.body.clinic;
      conversation = await Conversation.findOne({
        'participants.userId': userId,
        'participants.role': 'patient',
        clinic: clinicName
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [{
            userId,
            role,
            clinic: null
          }, {
            userId: null,
            role: 'staff',
            clinic: clinicName
          }],
          clinic: clinicName
        });
        await conversation.save();
      }
    }

    // Create the message
    const message = new Message({
      conversationId: conversation._id.toString(),
      senderId: userId,
      senderRole: role,
      senderName: name,
      senderClinic: clinic || null,
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
      // eslint-disable-next-line no-undef
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};