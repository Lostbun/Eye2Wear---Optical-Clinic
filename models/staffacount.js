import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AutoIncrement from "mongoose-sequence";




const StaffaccountSchema = mongoose.Schema(
  {

    //Here are the model details required for staff registration



    //StaffID properties Auto Increment
    staffId: {
      type: Number,
      unique:true
    },


    role:{
      type: String
    },


    //Email properties
    staffemail:{
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
    staffpassword:{
      type: String,
      required: [true, "Please provide your password"],
      minlength: 6,
      maxlength: 30,
    },


    //Lastname properties
    stafflastname:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },


    //Firstname properties
    stafffirstname:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
     },


    //Middlename properties
    staffmiddlename:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },





    //Profile picture properties
    staffprofilepicture: {
      type: String,
      required: true,
      default:"default-profile-url"
    },

    staffclinic:{
      type: String,
      required: [true, "Please provide your clinic"],
      trim: true,
    },



    staffiseyespecialist:{
      type: String,
      required: [true, "Please tell if eye specialist"],
      enum: ['Optometrist','Ophthalmologist', 'No'],
      trim: true,
     },



    isVerified: {type: Boolean, default: false},
    verificationtoken: {type: String},
    verificationtokenexpires: {type: Date},
 
    resetpasswordtoken: {type: String},
    resetpasswordexpires: {type: Date}


},
  {
    timestamps: true,
  }
);


StaffaccountSchema.plugin(AutoIncrement(mongoose),{
  inc_field: "staffId",
  id: "staffId_seq",
  start_seq: true,
  disable_hooks: false
});


StaffaccountSchema.post('save', function(error, doc, next){
  if(error?.name === 'MongoDB Atlas Server Failed' && error?.code === 11000) {
    this.constructor.counterReset('staffId', (err) => {
      if (err){
        console.error('Staff Id Sequence reset failed:', err);
        return next(err);
      } 
      console.log("Staff SequenceId reset because of duplicate key error");
      next(error);
    });
  } else{
    next(error);
  }

});

// Add indexes for better query performance (avoid duplicates with unique fields)
StaffaccountSchema.index({ staffclinic: 1 }); // Index for clinic filtering
StaffaccountSchema.index({ stafflastname: 1, stafffirstname: 1 }); // Index for name searches
StaffaccountSchema.index({ isVerified: 1 }); // Index for verification status
StaffaccountSchema.index({ createdAt: -1 }); // Index for date sorting
StaffaccountSchema.index({ stafflastname: 'text', stafffirstname: 'text', staffemail: 'text' }); // Text index for search

//Hashes the password details before saving to the mongoDB Atlas
StaffaccountSchema.pre('save', async function(next){
  if (this.isModified('staffpassword')) {
    const salt = await bcrypt.genSalt(10);
    this.staffpassword = await bcrypt.hash(this.staffpassword, salt);
  }
  next();



});


export default mongoose.model("Staffaccount", StaffaccountSchema);
