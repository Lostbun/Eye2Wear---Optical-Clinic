import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  senderRole: {
    type: String,
    required: true,
    enum: ['patient', 'staff', 'owner']
  },
  senderName: {
    type: String,
    required: true,
  },
  senderClinic: {
    type: String,
    enum: ['Ambher Optical', 'Bautista Eye Center', null],
    default: null
  },
  text: {
    type: String,
    required: true,
  },
  readBy: [{
    userId: String,
    role: String,
    readAt: Date
  }]
}, {
  timestamps: true
});

export default mongoose.model("Message", MessageSchema);