

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



export default mongoose.model("AmbherInventoryProduct", AmbherInventoryProductSchema);