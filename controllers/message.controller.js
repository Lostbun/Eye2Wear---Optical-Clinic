import Message from "../models/message.js";
import Conversation from "../models/conversation.js";

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

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const { userId, role, name, clinic } = req.user;

    // Find or create conversation
    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
    } else {
      // This is for patient initiating conversation with clinic
      const clinicName = req.body.clinic;
      
      // Check if conversation already exists
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
            // Clinic participant - userId will be added when staff/owner joins
            userId: null,
            role: 'staff', // Initial role - will be updated when staff/owner joins
            clinic: clinicName
          }],
          clinic: clinicName
        });
        await conversation.save();
      }
    }

    // Create the message
    const message = new Message({
      conversationId: conversation._id.toString(), // Step 5: Convert ObjectId to string
      senderId: userId,
      senderRole: role,
      senderName: name,
      senderClinic: clinic || null,
      text
    });

    await message.save();

    // Update conversation's last message
    conversation.lastMessage = message._id;
    await conversation.save();

    // Emit the message via Socket.IO
    const io = req.app.get('io'); // Step 1: Access io from app
    io.to(conversation._id.toString()).emit('newMessage', message);

    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: error.message });
  }
};