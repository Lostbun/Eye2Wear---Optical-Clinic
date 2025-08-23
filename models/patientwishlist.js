import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";








const PatientWishlistSchema = new mongoose.Schema({

  
  // Auto-increment ID
  wishlistid: { type: Number, unique: true },
  
  // Patient Reference
  patientaccount: { type: String, required: true },
  patientwishlistemail: { 
    type: String, 
    required: true,
    index: true 
  },


  clinicproduct: { type: String, required: true },
  clinicproductmodel: { type: String, required: true },
  patientwishlistinventoryproductid: { 
    type: Number, 
    required: true,
    index: true 
  },

  // Clinic Type
  clinicType: { 
    type: String, 
    required: true, 
    enum: ['ambher', 'bautista'],
    index: true 
    
  },

  // Product Details
  patientwishlistinventoryproductcategory: { type: String, required: true },
  patientwishlistinventoryproductname: { type: String, required: true },
  patientwishlistinventoryproductbrand: { type: String, required: true },
  patientwishlistinventoryproductmodelnumber: { type: String, required: true },
  patientwishlistinventoryproductdescription: { type: String, required: true },
  patientwishlistinventoryproductprice: { type: Number, required: true },
  patientwishlistinventoryproductquantity: { type: Number, required: true },
  patientwishlistinventoryproductimagepreviewimages: { type: [String], required: true },

  // Patient Details
  patientwishlistprofilepicture: String,
  patientwishlistlastname: { type: String, required: true },
  patientwishlistfirstname: { type: String, required: true },
  patientwishlistmiddlename: String,

  // Timestamps
  patientwishlistinventoryproductaddedat: {
    type: Date,
    default: Date.now
  }
});

// Apply auto-increment plugin
PatientWishlistSchema.plugin(AutoIncrement(mongoose), {
  inc_field: "wishlistid",
  id: "wishlistid_seq",
  start_seq: true,
  disable_hooks: false
});

// Ensures one product per patient per clinic
PatientWishlistSchema.index(
  { patientwishlistemail: 1, patientwishlistinventoryproductid: 1, clinicType: 1 },
  { unique: true }
);

// Additional indexes for better query performance
PatientWishlistSchema.index({ wishlistid: -1 }); // Primary sorting
PatientWishlistSchema.index({ patientwishlistinventoryproductcategory: 1 }); // Category filtering
PatientWishlistSchema.index({ patientwishlistinventoryproductbrand: 1 }); // Brand filtering
PatientWishlistSchema.index({ patientwishlistinventoryproductprice: 1 }); // Price sorting
PatientWishlistSchema.index({ createdAt: -1 }); // Date sorting
PatientWishlistSchema.index({ patientwishlistinventoryproductname: 'text', patientwishlistinventoryproductdescription: 'text' }); // Text search



export default mongoose.model("Patientwishlist", PatientWishlistSchema);