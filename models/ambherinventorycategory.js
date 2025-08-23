

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

// Add indexes for better query performance
AmbherInventoryCategorySchema.index({ ambherinventorycategoryid: -1 }); // Primary sorting index (ID descending)
AmbherInventoryCategorySchema.index({ createdAt: -1 }); // Date sorting
AmbherInventoryCategorySchema.index({ ambherinventorycategoryname: 'text' }); // Text search
AmbherInventoryCategorySchema.index({ ambherinventorycategoryaddedbyemail: 1 }); // Added by email lookup
AmbherInventoryCategorySchema.index({ ambherinventorycategoryaddedbytype: 1 }); // Added by type filtering



export default mongoose.model("AmbherInventoryCategory", AmbherInventoryCategorySchema);