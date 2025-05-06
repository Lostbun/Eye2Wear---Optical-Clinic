

import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";








const PatientAppointmentSchema = new mongoose.Schema({




patientappointmentid:{
    type: Number,
    unique: true
},


patientappointmentstatus:{type:String, enum:['Cancelled', 'Pending', 'Accepted','Completed'], default: 'Pending'},
patientappointmentstatushistory: [{
    status:{
        type:String,
        enum:['Cancelled', 'Pending', 'Accepted', 'Completed']
    },
    changedAt:{
        type: Date,
        default: Date.now
    },
    changedBy: String,

}],




//PATIENT INFORMATION
patientappointmentprofilepicture: String,
patientappointmentlastname:{type: String, required: true},
patientappointmentfirstname:{type: String, required: true},
patientappointmentmiddlename: String,
patientappointmentemail: {type: String, required: true},



patientappointmentstaffname: String,


//AMBHER OPTICAL CLINIC
patientambherappointmenteyespecialist: String,
patientambherappointmentstaffname: String,
patientambherappointmentdate: String,
patientambherappointmenttime: String,
patientambherappointmentcataractscreening: {type: Boolean, default: false},
patientambherappointmentpediatricassessment: {type: Boolean, default: false},
patientambherappointmentpediatricoptometrist: {type: Boolean, default: false},
patientambherappointmentcolorvisiontesting: {type: Boolean, default: false},
patientambherappointmentlowvisionaid: {type: Boolean, default: false},
patientambherappointmentrefraction: {type: Boolean, default: false},
patientambherappointmentcontactlensefitting: {type: Boolean, default: false},



//BAUTISTA EYE CLINIC
patientbautistaappointmenteyespecialist: String,
patientbautistaappointmentstaffname: String,
patientbautistaappointmentdate: String,
patientbautistaappointmenttime: String,
patientbautistaappointmentcomprehensiveeyeexam: {type: Boolean, default: false},
patientbautistaappointmentdiabeticretinopathy: {type: Boolean, default: false},
patientbautistaappointmentglaucoma: {type: Boolean, default: false},
patientbautistaappointmenthypertensiveretinopathy: {type: Boolean, default: false},
patientbautistaappointmentretinolproblem: {type: Boolean, default: false},
patientbautistaappointmentcataractsurgery: {type: Boolean, default: false},
patientbautistaappointmentpterygiumsurgery: {type: Boolean, default: false},


patientadditionalappointmentnotes: String,
patientappointmentpaymentotal: Number,

//TIMESTAMPS
createdAt: {type: Date, default: Date.now},
updatedAt: {type: Date, default: Date.now}







});



//AUTO INCEREMENT APPOINTMENT ID
PatientAppointmentSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "patientappointmentid",
    id: "patient_appointment_seq",
    start_seq: true,
    disable_hooks: false
});




//DUPLICATE KEY ERROR HANDLING
PatientAppointmentSchema.post('save', function(error, doc, next){
    if(error?.name === 'MongoServerError' && error?.code === 11000) {
       this.constructor.counterReset('patientappointmentid', (err) =>{
        if(err){
            console.error('Appointment ID Sequence Failed to Reset:', err);
            return next(err);
        }
        console.log("Appoinment SequenceID due to id-key duplication");
        next(error);
       });
    }else{
        next(error);
    }
});



export default mongoose.model("PatientAppointment", PatientAppointmentSchema);