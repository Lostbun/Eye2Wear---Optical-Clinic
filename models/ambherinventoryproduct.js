

import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";





const AmbherInventoryProductSchema = new mongoose.Schema({




ambherinventoryproductid:{type: Number,unique: true},       
ambherinventoryproductcategory:{type: String, required: true},
ambherinventoryproductname:{type: String, required: true},
ambherinventoryproductbrand: {type: String, required: true},
ambherinventoryproductmodelnumber: {type: String, required: true},
ambherinventoryproductdescription: {type: String, required: true},
ambherinventoryproductprice: {type: Number, required: true},
ambherinventoryproductquantity: {type: Number, required: true},
ambherinventoryproductimagepreviewimages: {type: [String], required: true},



ambherinventoryproductaddedbyprofilepicture: String,
ambherinventoryproductaddedbylastname:{type: String, required: true},
ambherinventoryproductaddedbyfirstname:{type: String, required: true},
ambherinventoryproductaddedbymiddlename: String,
ambherinventoryproductaddedbytype: String,
ambherinventoryproductaddedbyemail: {type: String, required: true},



ambherinventoryproductwishlistcount: {type: Number, default: 0},






//TIMESTAMPS
createdAt: {type: Date, default: Date.now},
updatedAt: {type: Date, default: Date.now}





});



//AUTO INCEREMENT AmbherInventoryProduct
AmbherInventoryProductSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "ambherinventoryproductid",
    id: "ambher_inventory_product_seq",
    start_seq: true,
    disable_hooks: false
});



AmbherInventoryProductSchema.pre('save', async function(next) {
  if (this.isModified('ambherinventoryproductquantity')) {

    try {
      await mongoose.model("Patientwishlist").updateMany(
        { 
          patientwishlistinventoryproductid: this.ambherinventoryproductid,
          clinicType: 'ambher'},
        { 
          $set: { 
            patientwishlistinventoryproductquantity: this.ambherinventoryproductquantity 
          } 
        });

    } catch (err) {
      console.error('Failed updating user wishlist product quantities:', err);
    }

  }next();
});




AmbherInventoryProductSchema.post('findOneAndUpdate', async function(doc) {
  if (doc && doc.ambherinventoryproductquantity !== undefined) {
    try {
      await mongoose.model("Patientwishlist").updateMany(
        { 
          patientwishlistinventoryproductid: doc.ambherinventoryproductid,
          clinicType: 'ambher'},
        { 
          $set: { 
            patientwishlistinventoryproductquantity: doc.ambherinventoryproductquantity 
        }});


    } catch (err) {
      console.error('Failed updating user wishlist product quantities:', err);
    }
  }
});

// Add indexes for better query performance
AmbherInventoryProductSchema.index({ ambherinventoryproductid: -1 }); // Primary sorting index
AmbherInventoryProductSchema.index({ ambherinventoryproductcategory: 1 }); // Category filtering
AmbherInventoryProductSchema.index({ ambherinventoryproductname: 1 }); // Name searches
AmbherInventoryProductSchema.index({ ambherinventoryproductbrand: 1 }); // Brand filtering
AmbherInventoryProductSchema.index({ ambherinventoryproductprice: 1 }); // Price sorting
AmbherInventoryProductSchema.index({ ambherinventoryproductquantity: 1 }); // Stock filtering
AmbherInventoryProductSchema.index({ createdAt: -1 }); // Date sorting
AmbherInventoryProductSchema.index({ ambherinventoryproductname: 'text', ambherinventoryproductdescription: 'text', ambherinventoryproductbrand: 'text' }); // Text search

export default mongoose.model("AmbherInventoryProduct", AmbherInventoryProductSchema);