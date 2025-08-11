import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  participants: [{
    userId: {
      type: String,
      required: function() {
        // Only require userId for patients
        return this.role === 'patient';
      }
    },
    role: {
      type: String,
      required: true,
      enum: ['patient', 'staff', 'owner']
    },
    clinic: {
      type: String,
      enum: ['Ambher Optical', 'Bautista Eye Center', null],
      default: null
    }
  }],
  clinic: {
    type: String,
    enum: ['Ambher Optical', 'Bautista Eye Center'],
    required: true
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true
});

export default mongoose.model("Conversation", ConversationSchema);