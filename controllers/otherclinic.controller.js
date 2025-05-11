/* eslint-disable no-undef */

import OtherClinicRecord from "../models/otherclinicrecord.js";
import dotenv from "dotenv";


dotenv.config();









//Retrieve (All Other Clinic Record) Controller
export const getotherclinicrecords = async (req, res) => {
  try {
    const otherclinicrec = await OtherClinicRecord.find({});
    res.status(200).json(otherclinicrec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Retrieve (Single ) Controller
export const getotherclinicrecordbyemail = async (req, res) => {
  try {
    const { patientotherclinicemail } = req.params;
    const otherclinicrec = await OtherClinicRecord.findById({patientotherclinicemail: patientotherclinicemail});
    res.status(200).json(otherclinicrec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//Create (Other Clinic Record) Controller
export const createotherclinicrecord = async (req, res) => {
  try {
    const otherclinicrec = await OtherClinicRecord.create(req.body);
    res.status(200).json(otherclinicrec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





//Update (Other Clinic Record) Controller
export const updateotherclinicrecord = async (req, res) => {
  try {
    const { id } = req.params;
    const otherclinicrec = await OtherClinicRecord.findByIdAndUpdate(id, req.body);

    if (!otherclinicrec) {
      return res.status(404).json({ message: "otherclinic not found" });
    }

    const updatedotherclinicrec = await OtherClinicRecord.findById(id);
    res.status(200).json(updatedotherclinicrec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//Delete (Other Clinic Record) Controller
export const deleteotherclinicrecord = async (req, res) => {
  try{
    const {id} = req.params;
    const numericid = parseInt(id);

    const otherclinicrec = await OtherClinicRecord.findOneAndDelete({patientotherclinicrecordid: numericid});

    if(!otherclinicrec){
      return res.status(404).json({message: "Other clinic record does not exist"});
    }

    res.status(200).json({message: "Other clinic record deleted successfully"});
  
  }catch(error){
    console.error("Failed to delete: ", error);
    res.status(500).json({message: "Server error", error: error.message});
  }
}
