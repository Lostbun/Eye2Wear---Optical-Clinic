

import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";





const BautistaInventoryCategorySchema = new mongoose.Schema({




bautistainventorycategoryid:{type: Number,unique: true},
bautistainventorycategoryname:{type: String, required: true, unique: true},


bautistainventorycategoryaddedbyprofilepicture: String,
bautistainventorycategoryaddedbylastname:{type: String, required: true},
bautistainventorycategoryaddedbyfirstname:{type: String, required: true},
bautistainventorycategoryaddedbymiddlename: String,
bautistainventorycategoryaddedbytype: String,
bautistainventorycategoryaddedbyemail: {type: String, required: true},






//TIMESTAMPS
createdAt: {type: Date, default: Date.now},
updatedAt: {type: Date, default: Date.now}





});



//AUTO INCEREMENT BautistaInventoryCategory
BautistaInventoryCategorySchema.plugin(AutoIncrement(mongoose),{
    inc_field: "bautistainventorycategoryid",
    id: "bautista_inventory_category_seq",
    start_seq: true,
    disable_hooks: false
});




export default mongoose.model("BautistaInventoryCategory", BautistaInventoryCategorySchema);