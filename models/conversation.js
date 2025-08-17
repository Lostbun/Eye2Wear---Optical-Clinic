import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  participants: [{
    userId: {
      type: String,
      required: function() { return this.role !== 'clinic'; }
    },
    role: {
      type: String,
      required: true,
      enum: ['patient', 'staff', 'owner', 'clinic']
    },
    clinic: {
      type: String,
      required: function() { return this.role === 'clinic'; },
      enum: ['Ambher Optical', 'Bautista Eye Center']
    }
  }],
  clinic: {
    type: String,
    enum: ['Ambher Optical', 'Bautista Eye Center'],
    required: false
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true
});
// Add validation middleware
ConversationSchema.pre('save', function(next) {
  // Validate that non-clinic participants have userId
  for (let participant of this.participants) {
    if (participant.role !== 'clinic' && !participant.userId) {
      return next(new Error(`userId is required for ${participant.role} participants`));
    }
    // Remove userId from clinic participants
    if (participant.role === 'clinic' && participant.userId !== undefined) {
      participant.userId = undefined;
    }
  }
  next();
});

export default mongoose.model("Conversation", ConversationSchema);