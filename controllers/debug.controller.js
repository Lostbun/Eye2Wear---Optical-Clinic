// Debug utility for message system
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const debugConversations = async (req, res) => {
  try {
    const { userId, role, clinic } = req.user;
    
    console.log('🔍 DEBUG: User Info:', { userId, role, clinic, userIdType: typeof userId });
    
    // Get all conversations (no filtering)
    const allConversations = await Conversation.find({}).lean();
    
    console.log('📊 DEBUG: Total conversations in database:', allConversations.length);
    
    // Check which conversations have this user
    const userConversations = allConversations.filter(conv => 
      conv.participants.some(p => p.userId === userId && p.role === 'patient')
    );
    
    console.log('👤 DEBUG: Conversations for this user:', userConversations.length);
    
    // Log participant details for each conversation
    allConversations.forEach((conv, index) => {
      console.log(`Conversation ${index + 1}:`, {
        id: conv._id,
        participants: conv.participants.map(p => ({
          userId: p.userId,
          userIdType: typeof p.userId,
          role: p.role,
          clinic: p.clinic
        }))
      });
    });
    
    res.json({
      userInfo: { userId, role, clinic, userIdType: typeof userId },
      totalConversations: allConversations.length,
      userConversations: userConversations.length,
      conversations: userConversations
    });
    
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const debugMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId, role } = req.user;
    
    console.log('🔍 DEBUG Messages:', { conversationId, userId, role });
    
    const messages = await Message.find({ conversationId }).lean();
    
    console.log('📨 DEBUG: Messages found:', messages.length);
    
    messages.forEach((msg, index) => {
      console.log(`Message ${index + 1}:`, {
        content: msg.content.substring(0, 50) + '...',
        senderId: msg.senderId,
        senderIdType: typeof msg.senderId,
        senderName: msg.senderName,
        createdAt: msg.createdAt
      });
    });
    
    res.json({
      conversationId,
      userId,
      role,
      messageCount: messages.length,
      messages: messages
    });
    
  } catch (error) {
    console.error('Debug messages error:', error);
    res.status(500).json({ error: error.message });
  }
};
