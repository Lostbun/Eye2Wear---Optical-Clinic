/* eslint-disable no-undef */
import Patientaccount from "../models/patientaccount.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from  'nodemailer';


dotenv.config();





//Retrieve (All Patient) Controller
export const getpatientaccounts = async (req, res) => {
  try {
    const patientacc = await Patientaccount.find({});
    res.status(200).json(patientacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Retrieve (Single ) Controller
export const getpatientaccountbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const patientacc = await Patientaccount.findById(id);
    res.status(200).json(patientacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Retrieve (Single by lastname ) Controller
export const getpatientaccountbylastname = async (req, res) => {
  try {
    const { patientlastname } = req.params;
    const patientacc = await Patientaccount.findOne({patientlastname: patientlastname});
    res.status(200).json(patientacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








export const getloggedinpatientacc = async (req, res) => {
  try{

    const patient = await Patientaccount.findById(req.patient.id)
    .select('-password')
    .lean();

    if(!patient){
      return res.status(404).json({message: "Patient does not exist"});
    }

    res.status(200).json({
      patientlastname: patient.patientlastname,
      patientfirstname: patient.patientfirstname,
      patientmiddlename: patient.patientmiddlename,
      patientprofilepicture: patient.patientprofilepicture
    });

  }catch (error){

    console.error("Failed to fetch patient account details: ", error);
    res.status(500).json({
      message: "Error retrieving patient data",
      error: error.message
    });

  }
};


export const verifyloggedinpatientacc = async (req, res, next) => {
  try{
    const patienttoken = req.header('Authorization')?.replace('Bearer ','');

    if(!patienttoken){
      return res.status(401).json({message: 'Authorization required'});
    }

    const tokendecoded = jwt.verify(patienttoken, process.env.JWT_KEY);
    req.patient = {id: tokendecoded.id};
    next();
  
  }catch(error){
    console.error("Token not verified:", error);
    res.status(401).json({
      message:"Invalid Token",
      error: error.message
    });
  }
}




















//Retrieve (Existing Email) Controller
export const existingemail = async (req, res) => {
  try{

    const patientemail = req.params.patientemail;

    const existingemail = await Patientaccount.findOne({patientemail});
    res.json({exists: !!existingemail});
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
};




//Create (Patient) Controller
export const createPatient = async (req, res) => {
  try {
    const patientacc = await Patientaccount.create(req.body);
    res.status(200).json(patientacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





//Update (Patient) Controller
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patientacc = await Patientaccount.findByIdAndUpdate(id, req.body);

    if (!patientacc) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updatedpatientacc = await Patientaccount.findById(id);
    res.status(200).json(updatedpatientacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//Delete (Patient) Controller
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    let patientacc = await Patientaccount.findOneAndDelete({patientId: id});
    
    if (!patientacc) {
      patientacc = await Patientaccount.findByIdAndDelete(id);
    }

    if (!patientacc) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};











//Login Patient Controller
export const patientlogin = async(req, res) => {
  try{
    const {patientemail,patientpassword} = req.body;

    const patient = await Patientaccount.findOne({patientemail});
    if(!patient) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }


    const loginmatch = await bcrypt.compare(patientpassword, patient.patientpassword);
    if(!loginmatch) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }

    const jsontoken = jwt.sign(
      {
        id: patient._id, email: patient.patientemail},
     
        process.env.JWT_KEY,
        {expiresIn: "1h"}

       );




       const patientlogin = patient.toObject();
       delete patientlogin.patientpassword;

       res.json({
        message:"Loggin Success",
        jsontoken,
        patient: patientlogin
       });


  } catch(error){
    console.error("Login Failed", error);
    res.status(500).json({message:"Server Failed"});
  }
};
















export const patientforgotpassword = async (req, res) => {
  try {
    const {email} = req.body;

    const patient = await Patientaccount.findOne({patientemail: email});

    if(!patient) {
        return res.status(200).json({
          success: true,
          message: 'You will receive an email if the email is already registered in our system'
        });
    }

    const token = crypto.randomBytes(20).toString('hex');
    patient.resetpasswordtoken = token;
    patient.resetpasswordexpires = Date.now() + 3600000;
    await patient.save();


    const passwordreseturl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const processtransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


    await processtransport.sendMail({
      to: patient.patientemail,
      subject: "Password Reset",
      html:`<p>You Have requested for password reset. Please Click the link provided.</p>
            <a href="${passwordreseturl}">Reset Password</a>
            <p>Link will expire in 1hr.</p>`
            
    });


    res.status(200).json({
      success: true,
      message: "Reset link sent if email is registered"
    });

  }catch(error){
    console.error("Password reset failed :", error);
    res.status(500).json({
      success:false,
      message:"Failed Requests"
    });
  }
}