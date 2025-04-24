import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AutoIncrement from "mongoose-sequence";



const AdminaccountSchema = mongoose.Schema(
  {

    //Here are the model details required for admin registration



    //AdminID properties Auto Increment
    adminId: {
      type: Number,
      unique:true
    },


    role:{
      type: String
    },


    //Email properties
    adminemail:{
      type: String,
      required: [true, "Please provide your email address"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 50,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Not a valid email"],

    },


    //Password properties
    adminpassword:{
      type: String,
      required: [true, "Please provide your password"],
      minlength: 6,
      maxlength: 30,
    },


    //Lastname properties
    adminlastname:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },


    //Firstname properties
    adminfirstname:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
     },


    //Middlename properties
    adminmiddlename:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },





    //Profile picture properties
    adminprofilepicture: {
      type: String,
      required: true,
      default:"default-profile-url"
    },

    isVerified: {type: Boolean, default: false},
    verificationtoken: {type: String},
    verificationtokenexpires: {type: Date},

},
  {
    timestamps: true,
  }
);


AdminaccountSchema.plugin(AutoIncrement(mongoose),{
  inc_field: "adminId",
  id: "adminId_seq",
  start_seq: 0
});

//Hashes the password details before saving to the mongoDB Atlas
AdminaccountSchema.pre('save', async function(next){
  if (this.isModified('adminpassword')) {
    const salt = await bcrypt.genSalt(10);
    this.adminpassword = await bcrypt.hash(this.adminpassword, salt);
  }
  next();



});


export default mongoose.model("Adminaccount", AdminaccountSchema);
