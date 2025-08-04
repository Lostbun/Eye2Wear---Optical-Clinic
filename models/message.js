import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel'
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Patientaccount', 'Adminaccount', 'Staffaccount', 'Owneraccount'],
    set: function(value) {
      // Ensure consistent model naming
      if (!value.endsWith('account')) {
        return `${value}account`;
      }
      return value;
    }
  },
  readBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'readBy.userModel',
      required: true
    },
    userModel: {
      type: String,
      required: true,
      enum: ['Patientaccount', 'Adminaccount', 'Staffaccount', 'Owneraccount']
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  attachments: [{
    url: String,
    type: {
      type: String,
      enum: ['image', 'video', 'document']
    }
  }]
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Add text index for search functionality
messageSchema.index({ content: 'text' });

// Static method for safe population
messageSchema.statics.populateSender = async function(message) {
  try {
    const model = mongoose.model(message.senderModel);
    const sender = await model.findById(message.sender)
      .select('patientfirstname patientlastname patientprofilepicture role')
      .lean();

    return {
      ...message.toObject(),
      sender: sender ? {
        _id: sender._id,
        name: `${sender.patientfirstname} ${sender.patientlastname}`,
        avatar: sender.patientprofilepicture || '/default-avatar.png',
        role: sender.role
      } : null
    };
  } catch (err) {
    console.error(`Population failed for ${message.senderModel}:`, err);
    return {
      ...message.toObject(),
      sender: null
    };
  }
};

// Pre-save validation
messageSchema.pre('save', async function(next) {
  if (!this.isModified('sender')) return next();
  
  try {
    const Model = mongoose.model(this.senderModel);
    const exists = await Model.exists({ _id: this.sender });
    if (!exists) {
      throw new Error(`Sender ${this.sender} not found in ${this.senderModel}`);
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;