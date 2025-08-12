import Conversation from "../models/conversation.js";

export const updateConversationParticipants = async (req, res, next) => {
  try {
    // Skip if this isn't an authenticated request
    if (!req.user) return next();
    
    const { userId, role, clinic } = req.user;
    
    if (role === 'staff' || role === 'owner') {
      // Find all conversations for this clinic where the userId is null
      const conversations = await Conversation.find({
        'participants.clinic': clinic,
        'participants.userId': null
      });
      
      // Update these conversations to include the current user
      for (const conversation of conversations) {
        const participantIndex = conversation.participants.findIndex(
          p => p.clinic === clinic && p.userId === null
        );
        
        if (participantIndex !== -1) {
          conversation.participants[participantIndex].userId = userId;
          conversation.participants[participantIndex].role = role;
          await conversation.save();
        }
      }
    }
    
    next();
  } catch (error) {
    console.error('Error updating conversation participants:', error);
    next();
  }
};