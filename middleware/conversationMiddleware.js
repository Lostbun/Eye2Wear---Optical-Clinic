import Conversation from "../models/conversation.js";

export const updateConversationParticipants = async (req, res, next) => {
  try {
    if (!req.user) return next();
    
    const { userId, role, clinic } = req.user;
    
    if (role === 'staff' || role === 'owner') {
      // Update conversations where userId is null for this clinic
      const conversations = await Conversation.find({
        $or: [
          { 'participants.clinic': clinic, 'participants.userId': null },
          {
            'participants': {
              $elemMatch: { role: 'clinic', clinic }
            }
          }
        ]
      });
      
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