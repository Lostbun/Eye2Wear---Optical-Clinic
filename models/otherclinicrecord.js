

import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";





const OtherClinicRecordSchema = new mongoose.Schema({



patientotherclinicrecordid:{
    type: Number,
    unique: true
},


//PATIENT INFORMATION
patientotherclinicprofilepicture: String,
patientothercliniclastname:{type: String, required: true},
patientotherclinicfirstname:{type: String, required: true},
patientotherclinicmiddlename: String,
patientotherclinicemail: {type: String, required: true},


patientotherclinicname: String,
patientothercliniceyespecialist: String,
patientotherclinicconsultationdate: String,
patientotherclinicsubmittedbyfirstname: String,
patientotherclinicsubmittedbymiddlename: String,
patientotherclinicsubmittedbylastname: String,
patientotherclinicsubmittedbytype: String,

patientotherclinicrecordimage: {
        type: String,
        required: true,
        default:"default-profile-url"
      },





//TIMESTAMPS
createdAt: {type: Date, default: Date.now},
updatedAt: {type: Date, default: Date.now}




});



//AUTO INCREMENT OtherClinicRecordSchema
OtherClinicRecordSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "patientotherclinicrecordid",
    id: "other_clinic_record_seq",
    start_seq: true,
    disable_hooks: false
});






export default mongoose.model("OtherClinicRecord", OtherClinicRecordSchema);