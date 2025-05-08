

import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";






const CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})
const Counter = mongoose.model('Counter', CounterSchema);



const PatientAppointmentSchema = new mongoose.Schema({




patientappointmentid:{
    type: Number,
    unique: true
},


patientappointmentstatus:{type:String, enum:['Cancelled', 'Pending', 'Declined', 'Accepted','Completed'], default: 'Pending'},
patientappointmentstatushistory: [{
    status:{
        type:String,
        enum:['Cancelled', 'Pending', 'Declined', 'Accepted', 'Completed']
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
//AMBHER OPTICAL CLINIC
//AMBHER OPTICAL CLINIC
//AMBHER OPTICAL CLINIC
//AMBHER OPTICAL CLINIC
//AMBHER OPTICAL CLINIC
patientambherappointmentid:{type: Number, unique: true},
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
patientambherappointmentstatus:{type:String, enum:['Cancelled', 'Pending', 'Declined', 'Accepted','Completed'], default: 'Pending'},
patientambherappointmentstatushistory: [{
    status:{
        type:String,
        enum:['Cancelled', 'Pending', 'Declined', 'Accepted', 'Completed']
    },
    changedAt:{
        type: Date,
        default: Date.now
    },
    changedBy: String,

}],
patientambherappointmentpaymentotal: Number,
patientambherappointmentremarksnote: String,
patientambherappointmentrating:{
    type: Number,
    min: 0,
    max: 5,
    default: null,
},
patientambherappointmentfeedback: String,












//BAUTISTA EYE CLINIC
//BAUTISTA EYE CLINIC
//BAUTISTA EYE CLINIC
//BAUTISTA EYE CLINIC
//BAUTISTA EYE CLINIC
//BAUTISTA EYE CLINIC
patientbautistaappointmentid:{type: Number, unique: true},
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
patientbautistaappointmentstatus:{type:String, enum:['Cancelled', 'Pending', 'Declined', 'Accepted','Completed'], default: 'Pending'},
patientbautistaappointmentstatushistory: [{
    status:{
        type:String,
        enum:['Cancelled', 'Pending', 'Declined', 'Accepted', 'Completed']
    },
    changedAt:{
        type: Date,
        default: Date.now
    },
    changedBy: String,

}],
patientbautistaappointmentpaymentotal: Number,
patientbautistaappointmentremarksnote: String,
patientbautistaappointmentrating:{
    type: Number,
    min: 0,
    max: 5,
    default: null,
},
patientbautistaappointmentfeedback: String,











patientadditionalappointmentnotes: String,
patientadditionalappointmentnotesimage: {
        type: String,
        required: true,
        default:"default-profile-url"
      },
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



//AUTO INCREMENT AMBHER APPOINTMENT ID
PatientAppointmentSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "patientambherappointmentid",
    id: "amber_appointment_seq",
    start_seq: true,
    disable_hooks: false
});



//AUTO INCREMENT BAUTISTA APPOINTMENT ID
PatientAppointmentSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "patientbautistaappointmentid",
    id: "bautista_appointment_seq",
    start_seq: true,
    disable_hooks: false
});




/*PatientAppointmentSchema.post('save', function(error, doc, next){
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
});*/




//DUPLICATE KEY ERROR HANDLING
PatientAppointmentSchema.post('save', function(error, doc, next){
    if(error?.name === 'MongoServerError' && error?.code === 11000) {
        
        const duplicatematch = error.message.match(/index: (\w+)_1/);
        const duplicatefield = duplicatematch ? duplicatematch[1] : null;

  

    if(duplicatefield && ['patientappointmentid', 'patientappointmentid', 'patientbautistaappointmentid']
        .includes(duplicatefield)){
            this.constructor.counterReset(duplicatefield, (err) =>{
                if(err){
                    console.error(`${duplicatefield} Failed to reset id sequence : `, err);
                    return next(err);
                }

                console.log(`Reset ${duplicatefield} sequence due to id duplication`);
                next(error);
            });
        }else{
            next(error);
        } }else{
            next(error);
        }
});

export default mongoose.model("PatientAppointment", PatientAppointmentSchema);