/* eslint-disable no-undef */   
import Patientdemographic from "../models/patientdemographic.js";
import Patientaccount from "../models/patientaccount.js";
import dotenv from "dotenv";
import { Trophy } from "lucide-react";


dotenv.config();





//Retrieve (All Patient Demographic) Controller
export const getpatientdemographics = async (req, res) => {
  try {
    const patientdemo = await Patientdemographic.find({});
    res.status(200).json(patientdemo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Retrieve (Single Demographic) Controller
export const getpatientdemographicbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const patientdemo = await Patientdemographic.findById(id);
    res.status(200).json(patientdemo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Retrieve (Single Demographic by lastname ) Controller
export const getpatientdemographicbylastname = async (req, res) => {
  try {
    const { patientlastname } = req.params;
    const patientdemo = await Patientdemographic.findOne({patientlastname: patientlastname});
    res.status(200).json(patientdemo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

















//Verify Patient
export const verifypatient = async(req,res,next) => {
  try{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: "Unauthorized"});

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.patient = decoded;
    next();

  }catch(error){
    res.status(401).json({message: "Invalid Token", error});
  }
}


export const getcurrentpatientdemographic = async (req, res) => {
  try{
    const demographic = await Patientdemographic.findOne({
      patientemail: req.patient.email
    });

    if(!demographic) return res.status(404).json({message: "No patient demographic data found"});
    res.status(200).json(demographic);

  }catch(error){
    return res.status(500).json({message:error.message});
  }
}
























//GET PATIENT DEMOGRAPHIC BY EMAIL
export const getpatientdemographicbyemail = async (req, res) => {
  try{
    const {patientemail} = req.params;
    const patientdemo = await Patientdemographic.findOne({patientemail: patientemail});


    if(!patientdemo){
      return res.status(400).json({
        message:"Patient don't have an existing demographic profile"
      });
    }

    res.status(200).json(patientdemo);

  }catch(error){
    res.status(500).json({
      message: error.message
    });
  }
}








//CREATE PATIENT DEMOGRAPHIC
export const  createpatientdemographic = async (req,res) => {
  
  try{

    const existingpatientdemographic = await Patientdemographic.findOne({
      patientemail: req.body.patientemail
    });

    if(existingpatientdemographic) {
      return res.status(400).json({
        message:"Patient already have an existing demographic profile. Use Update function."
      });
    }


    const newpatientdemographic = await Patientdemographic.create(req.body);
    res.status(201).json(newpatientdemographic);
    
  }catch (error){
      res.status(500).json({
        message: error.message.includes("validation")
        ? "Invalid Format"
        : "Server error",
        details: error.message
      });
  }
}








//UPDATE PATIENT DEMOGRAPHIC
export const updatepatientdemographic = async (req, res) => {
  try{
    const { id } = req.params;
    const updateddata = req.body;

    const existingdemo = await Patientdemographic.findById(id);
    if(!existingdemo){
      return res.status(404).json({message: "Patient Demographc data not found"});
    }

    const updateddemographic = await Patientdemographic.findByIdAndUpdate(
      id,
      updateddata,
      {new: true, runValidators: true}
    );


    if(!updateddemographic){
      return res.status(404).json({message: "Patient Demographc data not found"});
    }

    res.status(200).json(updateddemographic);
  }catch(error){
    res.status(500).json({
      message: error.message.includes("validation")
      ? "Invalid format"
      : "Server Error",
      details: error.message
    });
  }
};









