import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";




const PatientprofileSchema = mongoose.Schema(
  {

    //Here are the model details required for patient profile



    //PatientID properties Auto Increment
    patientId: {
      type: Number,
      unique:true
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
      required: [true, "Please provide your first name"],
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
      required: [true, "Please provide your first name"],
      trim: true,
    },



    //Age properties
    patientage: {
      type: Number,
      required: [true, "Please provide your age"],
      trim: true,
    },


    //Birthdate properties
    patientbirthdate: {
      type: String,
      required: [true, "Please provide your birthdate"],
      trim: true,
    },


    //Gender properties
    patientgender: {
      type: String,
      required: [true, "Please provide your gender"],
      trim: true,
    },

    //Contactnumber properties
    patientcontactnumber: {
      type: String,
      required: [true, "Please provide your contact number"],
      trim: true,
    },


    //Homeaddress properties
    patienthomeaddress: {
      type: String,
      required: [true, "Please provide your home address"],
      trim: true,
    },


    //Emergencycontactname properties
    patientemergencycontactname: {
      type: String,
      required: [true, "Please provide your emergency contact name"],
      trim: true,
    },   
    
    
    //Emergencycontactnumber properties
    patientemergencycontactnumber: {
      type: String,
      required: [true, "Please provide your emergency contact number"],
      trim: true,
    },    
    




    //Profile picture properties
    patientprofilepicture: {
      type: String,
      required: true,
      default:"default-profile-url"
    },






},
  {
    timestamps: true,
  }
);







export default mongoose.model("Patientprofile", PatientprofileSchema);
