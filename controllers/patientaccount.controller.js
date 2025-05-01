/* eslint-disable no-undef */
import Patientaccount from "../models/patientaccount.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();







const generateAuthToken = (patient) => {
  return jwt.sign({
    id: patient._id,
    email: patient.patientemail,
    role: 'patient'
  },
process.env.JWT_SECRET, {expiresIn: "1h"});
}





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
      patientemail: patient.patientemail,
      patientId: patient.patientId,
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





export const verifyloggedinpatientacc = async(req,res,next) => {
  try{
    const patienttoken = req.header('Authorization')?.replace('Bearer ', '');

    if(!patienttoken){
      console.error("No token provided");
      return res.status(401).json({message: "Authorization Required" });
    }


    const tokendecoded = jwt.verify(patienttoken, process.env.JWT_SECRET);
    console.log("Decoded token: ", tokendecoded);

    req.patient = {id: tokendecoded.id, email: tokendecoded.email};
    next();

  }catch(error){
    console.error("Token verification failed: ", error.message);
    res.status(401).json({message: "Invalid token", error});
  }
};




















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

    const patient = await Patientaccount.findOne({patientemail}).select('+patientpassword');
    if(!patient) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }


    const loginmatch = await bcrypt.compare(patientpassword, patient.patientpassword);
    if(!loginmatch) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }

    const jsontoken = generateAuthToken(patient);




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


