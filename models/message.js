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

// Add indexes for better query performance
MessageSchema.index({ conversationId: 1, createdAt: -1 }); // Conversation messages sorted by date
MessageSchema.index({ senderId: 1 }); // Sender filtering
MessageSchema.index({ senderRole: 1 }); // Role filtering
MessageSchema.index({ senderClinic: 1 }); // Clinic filtering
MessageSchema.index({ sentToClinic: 1 }); // Target clinic filtering
MessageSchema.index({ createdAt: -1 }); // Date sorting
MessageSchema.index({ text: 'text', senderName: 'text' }); // Text search

export default mongoose.model("Message", MessageSchema);