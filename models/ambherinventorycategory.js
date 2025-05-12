

import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";





const AmbherInventoryCategorySchema = new mongoose.Schema({




ambherinventorycategoryid:{type: Number,unique: true},
ambherinventorycategoryname:{type: String, required: true, unique: true},


ambherinventorycategoryaddedbyprofilepicture: String,
ambherinventorycategoryaddedbylastname:{type: String, required: true},
ambherinventorycategoryaddedbyfirstname:{type: String, required: true},
ambherinventorycategoryaddedbymiddlename: String,
ambherinventorycategoryaddedbytype: String,
ambherinventorycategoryaddedbyemail: {type: String, required: true},






//TIMESTAMPS
createdAt: {type: Date, default: Date.now},
updatedAt: {type: Date, default: Date.now}





});



//AUTO INCEREMENT AmbherInventoryCategory
AmbherInventoryCategorySchema.plugin(AutoIncrement(mongoose),{
    inc_field: "ambherinventorycategoryid",
    id: "ambher_inventory_category_seq",
    start_seq: true,
    disable_hooks: false
});




export default mongoose.model("AmbherInventoryCategory", AmbherInventoryCategorySchema);