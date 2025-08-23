

import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";





const BautistaInventoryProductSchema = new mongoose.Schema({




bautistainventoryproductid:{type: Number,unique: true},       
bautistainventoryproductcategory:{type: String, required: true},
bautistainventoryproductname:{type: String, required: true},
bautistainventoryproductbrand: {type: String, required: true},
bautistainventoryproductmodelnumber: {type: String, required: true},
bautistainventoryproductdescription: {type: String, required: true},
bautistainventoryproductprice: {type: Number, required: true},
bautistainventoryproductquantity: {type: Number, required: true},
bautistainventoryproductimagepreviewimages: {type: [String], required: true},



bautistainventoryproductaddedbyprofilepicture: String,
bautistainventoryproductaddedbylastname:{type: String, required: true},
bautistainventoryproductaddedbyfirstname:{type: String, required: true},
bautistainventoryproductaddedbymiddlename: String,
bautistainventoryproductaddedbytype: String,
bautistainventoryproductaddedbyemail: {type: String, required: true},


bautistainventoryproductwishlistcount: {type: Number, default: 0},



//TIMESTAMPS
createdAt: {type: Date, default: Date.now},
updatedAt: {type: Date, default: Date.now}





});



//AUTO INCEREMENT BautistaInventoryProduct
BautistaInventoryProductSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "bautistainventoryproductid",
    id: "bautista_inventory_product_seq",
    start_seq: true,
    disable_hooks: false
});





BautistaInventoryProductSchema.pre('save', async function(next) {
  if (this.isModified('bautistainventoryproductquantity')) {
    
    try {
      await mongoose.model("Patientwishlist").updateMany(
        { 
          patientwishlistinventoryproductid: this.bautistainventoryproductid,
          clinicType: 'bautista'},
          { 
          $set: { 
            patientwishlistinventoryproductquantity: this.bautistainventoryproductquantity 
          } 
        });

    } catch (err) {
      console.error('Failed updating user bautista wishlist product quantities:', err);
    }

  } next();
});



BautistaInventoryProductSchema.post('findOneAndUpdate', async function(doc) {
  if (doc && doc.bautistainventoryproductquantity !== undefined) {
    try {
      await mongoose.model("Patientwishlist").updateMany(
        { 
          patientwishlistinventoryproductid: doc.bautistainventoryproductid,
          clinicType: 'bautista' },
        { 
          $set: { 
            patientwishlistinventoryproductquantity: doc.bautistainventoryproductquantity 
          }});

    } catch (err) {
      console.error('Failed updating user bautista wishlist product quantities:', err);
    }
  }
});

// Add indexes for better query performance
BautistaInventoryProductSchema.index({ bautistainventoryproductid: -1 }); // Primary sorting index
BautistaInventoryProductSchema.index({ bautistainventoryproductcategory: 1 }); // Category filtering
BautistaInventoryProductSchema.index({ bautistainventoryproductname: 1 }); // Name searches
BautistaInventoryProductSchema.index({ bautistainventoryproductbrand: 1 }); // Brand filtering
BautistaInventoryProductSchema.index({ bautistainventoryproductprice: 1 }); // Price sorting
BautistaInventoryProductSchema.index({ bautistainventoryproductquantity: 1 }); // Stock filtering
BautistaInventoryProductSchema.index({ createdAt: -1 }); // Date sorting
BautistaInventoryProductSchema.index({ bautistainventoryproductname: 'text', bautistainventoryproductdescription: 'text', bautistainventoryproductbrand: 'text' }); // Text search

export default mongoose.model("BautistaInventoryProduct", BautistaInventoryProductSchema);