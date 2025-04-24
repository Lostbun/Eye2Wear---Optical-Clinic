import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AutoIncrement from "mongoose-sequence";



const OwneraccountSchema = mongoose.Schema(
  {

    //Here are the model details required for owner registration



    //ownerID properties Auto Increment
    ownerId: {
      type: Number,
      unique:true
    },


    role:{
      type: String
    },


    //Email properties
    owneremail:{
      type: String,
      required: [true, "Please provide your email address"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 50,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Not a valid email"],

    },


    //Password properties
    ownerpassword:{
      type: String,
      required: [true, "Please provide your password"],
      minlength: 6,
      maxlength: 30,
    },


    //Lastname properties
    ownerlastname:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },


    //Firstname properties
    ownerfirstname:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
     },


    //Middlename properties
    ownermiddlename:{
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },





    //Profile picture properties
    ownerprofilepicture: {
      type: String,
      required: true,
      default:"default-profile-url"
    },


    //Clinic name properties
    ownerclinic:{
       type: String,
       required: [true, "Please provide your clinic"],
       trim: true,
     },
     

    isVerified: {type: Boolean, default: false},
    verificationtoken: {type: String},
    verificationtokenexpires: {type: Date},

},
  {
    timestamps: true,
  }
);


OwneraccountSchema.plugin(AutoIncrement(mongoose),{
  inc_field: "ownerId",
  id: "ownerId_seq",
  start_seq: 0
});

//Hashes the password details before saving to the mongoDB Atlas
OwneraccountSchema.pre('save', async function(next){
  if (this.isModified('ownerpassword')) {
    const salt = await bcrypt.genSalt(10);
    this.ownerpassword = await bcrypt.hash(this.ownerpassword, salt);
  }
  next();



});


export default mongoose.model("Owneraccount", OwneraccountSchema);
