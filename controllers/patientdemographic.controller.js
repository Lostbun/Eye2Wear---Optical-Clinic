  /* eslint-disable no-undef */   
  import Patientdemographic from "../models/patientdemographic.js";
  import Patientaccount from "../models/patientaccount.js";
  import jwt from "jsonwebtoken";
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
      
      // Verify that the logged-in patient is requesting their own demographic data
      if (req.patient.email !== patientemail) {
        return res.status(403).json({
          message: "Access denied. You can only access your own demographic data."
        });
      }
      
      const patientdemo = await Patientdemographic.findOne({patientemail: patientemail});

      if(!patientdemo){
        return res.status(404).json({
          message:"Patient doesn't have an existing demographic profile"
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
//AICODE

 export const createpatientdemographic = async (req, res) => {
  try{

    const requiredfields = [
      'patientemail',
      'patientlastname',
      'patientfirstname',
      'patientmiddlename',
      'patientage',
      'patientbirthdate',
      'patientgender',
      'patientcontactnumber',
      'patienthomeaddress',
      'patientemergencycontactname',
      'patientemergencycontactnumber',
    ];

    for (const field of requiredfields) {
      if(!req.body[field]) {
        return res.status(400).json({message: `${field} is required`});
      }
    }

    const existing = await Patientdemographic.findOne({
      patientemail: req.body.patientemail
    });

    if(existing) {
      return res.status(400).json({
        message: "Patient demographic profile is existing in this email"
      });
    }

    const newdemographic = await Patientdemographic.create(req.body);
    res.status(201).json(newdemographic);


  }catch(error){
     res.status(500).json({
      message: error.message.includes("validation")
      ? "Invalid format"
      :"Server error",
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









  //Delete (Patient Profile) Controller
  export const deletepatientdemographic = async (req, res) => {
    try {
      const { id } = req.params;
      let patientdemo = await Patientdemographic.findOneAndDelete({patientId: id});
      
      if (!patientdemo) {
        patientdemo = await Patientdemographic.findByIdAndDelete(id);
      }
  
      if (!patientdemo) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      res.status(200).json({ message: "Patient Profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  









