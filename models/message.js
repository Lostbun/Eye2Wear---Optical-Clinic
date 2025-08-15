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
    enum: ['patient', 'staff', 'owner', 'clinic'] // Add 'clinic' as a valid role
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
  sentToClinic: { 
    type: String,
    enum: ['Ambher Optical', 'Bautista Eye Center', null], // Allow null for clinic-to-clinic messages
    required: false // Make optional to support clinic-to-clinic
  },
  text: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false
  },
  documentUrl: {
    type: String,
    required: false
  },
  documentName: { 
    type: String,
    required: false
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