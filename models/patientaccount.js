/* eslint-disable no-undef */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AutoIncrement from "mongoose-sequence";
import { Sankey } from "recharts";
import dotenv from "dotenv";


dotenv.config();




const PatientaccountSchema = mongoose.Schema(
  {

    //Here are the model details required for patient registration



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


    //Password properties
    patientpassword:{
      type: String,
      required: [true, "Please provide your password"],
      minlength: 6,
  
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
      required: [true, "Please provide you first name"],
      trim: true,
     },


    //Middlename properties
    patientmiddlename:{
      type: String,
      required: [true, "Please provide your middle name"],
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


PatientaccountSchema.plugin(AutoIncrement(mongoose),{
  inc_field: "patientId",
  //id: "patientId_seq",
  id: "patient_account_seq",
  start_seq: true,
  disable_hooks: false
});


PatientaccountSchema.post('save', function(error, doc, next){
  if(error?.name === 'MongoDB Atlas Server Failed' && error?.code === 11000) {
    this.constructor.counterReset('patientId', (err) => {
      if (err){
        console.error('Patient Id Sequence reset failed:', err);
        return next(err);
      } 
      console.log("Patient SequenceId reset because of duplicate key error");
      next(error);
    });
  } else{
    next(error);
  }

});



PatientaccountSchema.pre('save', async function(next){

  if(this.isModified('patientpassword')){
    if(!this.patientpassword.startsWith('$2b$')){
      const salt = await bcrypt.genSalt(12);
      this.patientpassword = await bcrypt.hash(this.patientpassword,salt);
    }
  }
  next();

});

/*
PatientaccountSchema.methods.generateAuthToken = function(){
  return jwt.sign(
    {id: this._id},
    process.env.JWT_KEY,
    {expiresIn: '1h'}
  );
};
*/




export default mongoose.model("Patientaccount", PatientaccountSchema);
