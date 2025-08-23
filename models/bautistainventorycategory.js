

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

// Add indexes for better query performance
BautistaInventoryCategorySchema.index({ bautistainventorycategoryid: -1 }); // Primary sorting index (ID descending)
BautistaInventoryCategorySchema.index({ createdAt: -1 }); // Date sorting
BautistaInventoryCategorySchema.index({ bautistainventorycategoryname: 'text' }); // Text search
BautistaInventoryCategorySchema.index({ bautistainventorycategoryaddedbyemail: 1 }); // Added by email lookup
BautistaInventoryCategorySchema.index({ bautistainventorycategoryaddedbytype: 1 }); // Added by type filtering



export default mongoose.model("BautistaInventoryCategory", BautistaInventoryCategorySchema);