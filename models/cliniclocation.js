import mongoose from 'mongoose';

const clinicLocationSchema = new mongoose.Schema({
  clinicId: {
    type: String,
    required: true,
    unique: true
  },
  clinicName: {
    type: String,
    required: true
  },
  clinicType: {
    type: String,
    enum: ['Ambher Optical', 'Bautista Eye Center'],
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'Philippines' },
    fullAddress: String
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  operatingHours: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: true } }
  },
  services: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true
});

// Create geospatial index for location queries
clinicLocationSchema.index({ coordinates: '2dsphere' });

export default mongoose.model('ClinicLocation', clinicLocationSchema);