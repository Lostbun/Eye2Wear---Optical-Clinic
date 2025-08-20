import mongoose from "mongoose";
import Patientaccount from "../models/patientaccount.js";
import AutoIncrement from "mongoose-sequence";






const PatientdemographicSchema = mongoose.Schema(
  {

    //Here are the model details required for patient demographic



    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patientaccount'
    },






    //PatientID properties Auto Increment
    patientdemographicId: {
      type: Number,
      unique:true,
      index: true
    },


    role:{
      type: String
    },


    //Email properties
    patientemail:{
      type: String,
      required: [true, "Please provide your email address"],
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
      maxlength: 50,
      validate: {
        validator: function(v) {
          return v !== null && undefined && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Not a valid email"
      }


    },


    //Lastname properties
    patientlastname:{
      type: String,
      required: [true, "Please provide your last name"],
      trim: true,
    },


    //Firstname properties
    patientfirstname:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
     },


    //Middlename properties
    patientmiddlename:{
      type: String,
      required: [true, "Please provide your middle name"],
      trim: true,
    },



    
    //Age properties
    patientage:{
      type: String,
      required: [true, "Please provide your age"],
      trim: true,
    },

    //Birthdate properties
    patientbirthdate:{
      type: String,
      required: [true, "Please provide your birthdate"],
      trim: true,
    },

    //Gender properties
    patientgender:{
      type: String,
      required: [true, "Please provide your gender"],
      enum: ['Male', 'Female', 'Other']
    },


    //Contactnumber properties
    patientcontactnumber:{
      type: String,
      required: [true, "Please provide your contact number"],
      trim: true,
    },
    
    
    //Homeaddress properties
    patienthomeaddress:{
      type: String,
      required: [true, "Please provide your home address"],
      trim: true,
    },    

    //Emergencycontactname properties
    patientemergencycontactname:{
      type: String,
      required: [true, "Please provide contact name"],
      trim: true,
    }, 

    //Emergencycontactnumber properties
    patientemergencycontactnumber:{
      type: String,
      required: [true, "Please provide your contact number"],
      trim: true,
    }, 


    //Profile picture properties
    patientprofilepicture: {
      type: String,
      required: true,
      default:"default-profile-url"
    },



    isVerified: {type: Boolean, default: false},
    verificationtoken: {type: String},
    verificationtokenexpires: {type: Date},
 
    //resetpasswordtoken: {type: String},
 //   resetpasswordexpires: {type: Date}


},
  {
    timestamps: true,
  }
);



//AICODE

PatientdemographicSchema.post('remove', async function(){
  const doc = await this.constructor.findOne().sort('-patientdemographicId');
  const newSeq = doc ? doc.patientdemographicId: 0;

  await mongoose.connection.db.collection('counters').updateOne(
    {_id: "patient_demographic_Id"},
    {$set: {seq: newSeq}}
  );
});

PatientdemographicSchema.plugin(AutoIncrement(mongoose),{
  inc_field:'patientdemographicId',
  id: 'patient_demographic_Id',
  start_seq: 1,
  disable_hooks: false 
});

// Create indexes for better query performance
// Note: patientemail already has an index due to unique: true
PatientdemographicSchema.index({ patientdemographicId: -1 });
PatientdemographicSchema.index({ patientemail: 1, patientdemographicId: -1 });

export default mongoose.model("Patientdemographic", PatientdemographicSchema);
