
import mongoose from "mongoose";
import Patientaccount from "./patientaccount.js";
import AmbherInventoryProduct from "./ambherinventoryproduct.js";
import BautistaInventoryProduct from "./bautistainventoryproduct.js";
import AutoIncrement from "mongoose-sequence";


const PatientWishlistSchema = new mongoose.Schema({


  wishlistid: { type: Number, unique: true },
  patientaccount: { type: String, required: true },
  clinicproduct: { type: String, required: true },
  clinicproductmodel: { type: String, required: true },

  // Patient Information
  patientwishlistprofilepicture: String,
  patientwishlistlastname: { type: String, required: true },
  patientwishlistfirstname: { type: String, required: true },
  patientwishlistmiddlename: String,
  patientwishlistemail: { type: String, required: true },

  // Product Information
  patientwishlistinventoryproductid: { type: Number, required: true },
  patientwishlistinventoryproductcategory: { type: String, required: true },
  patientwishlistinventoryproductname: { type: String, required: true },
  patientwishlistinventoryproductbrand: { type: String, required: true },
  patientwishlistinventoryproductmodelnumber: { type: String, required: true },
  patientwishlistinventoryproductdescription: { type: String, required: true },
  patientwishlistinventoryproductprice: { type: Number, required: true },
  patientwishlistinventoryproductquantity: { type: Number, required: true },
  patientwishlistinventoryproductimagepreviewimages: { type: [String], required: true },
  
  // Clinic type (ambher or bautista)
  clinicType: { type: String, required: true, enum: ['ambher', 'bautista'], default: "empty", },

  patientwishlistinventoryproductaddedat: {
    type: Date,
    default: Date.now
  }
});




//AUTO INCEREMENT AmbherInventoryProduct
PatientWishlistSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "wishlistid",
    id: "wishlistid_seq",
    start_seq: true,
    disable_hooks: false
});

PatientWishlistSchema.index(
  { patientaccount: 1, clinicproduct: 1, clinicproductmodel: 1 },
  { unique: true, sparse: true }
);

export default mongoose.model("Patientwishlist", PatientWishlistSchema);