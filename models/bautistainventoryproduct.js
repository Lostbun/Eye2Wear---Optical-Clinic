

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




export default mongoose.model("BautistaInventoryProduct", BautistaInventoryProductSchema);