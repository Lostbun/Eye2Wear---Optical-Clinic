/* eslint-disable no-undef */
import Staffaccount from "../models/staffacount.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();





//Retrieve (All staff) Controller
export const getstaffaccounts = async (req, res) => {
  try {
    const staffacc = await Staffaccount.find({});
    res.status(200).json(staffacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Retrieve (Single ) Controller
export const getstaffaccountbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const staffacc = await Staffaccount.findById(id);
    res.status(200).json(staffacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Retrieve (Single by lastname ) Controller
export const getstaffaccountbylastname = async (req, res) => {
  try {
    const { stafflastname } = req.params;
    const staffacc = await Staffaccount.findOne({stafflastname: stafflastname});
    res.status(200).json(staffacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








export const getloggedinstaffacc = async (req, res) => {
  try{

    const staff = await Staffaccount.findById(req.staff.id)
    .select('-password')
    .lean();

    if(!staff){
      return res.status(404).json({message: "Staff does not exist"});
    }

    res.status(200).json({
        stafflastname: staff.stafflastname,
        stafffirstname: staff.stafffirstname,
        staffmiddlename: staff.staffmiddlename,
        staffprofilepicture: staff.staffprofilepicture
    });

  }catch (error){

    console.error("Failed to fetch staff account details: ", error);
    res.status(500).json({
      message: "Error retrieving staff data",
      error: error.message
    });

  }
};


export const verifyloggedinstaffacc = async (req, res, next) => {
  try{
    const stafftoken = req.header('Authorization')?.replace('Bearer ','');

    if(!stafftoken){
      return res.status(401).json({message: 'Authorization required'});
    }

    const tokendecoded = jwt.verify(stafftoken, process.env.JWT_SECRET);
    req.staff = {
      id: tokendecoded.id,
      email: tokendecoded.email,
      role: tokendecoded.role,
      clinic: tokendecoded.clinic
    };
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

    const staffemail = req.params.staffemail;

    const existingemail = await Staffaccount.findOne({staffemail});
    res.json({exists: !!existingemail});
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
};




//Create (Staff) Controller
export const createStaff = async (req, res) => {
  try {
    const staffacc = await Staffaccount.create(req.body);
    res.status(200).json(staffacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





//Update (Staff) Controller
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staffacc = await Staffaccount.findByIdAndUpdate(id, req.body);

    if (!staffacc) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const updatedstaffacc = await Staffaccount.findById(id);
    res.status(200).json(updatedstaffacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





//Delete (Staff) Controller
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    let staffacc = await Staffaccount.findOneAndDelete({staffId: id});
    
    if (!staffacc) {
      staffacc = await Staffaccount.findByIdAndDelete(id);
    }

    if (!staffacc) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










//Login Staff Controller
export const stafflogin = async(req, res) => {
  try{
    const {staffemail,staffpassword} = req.body;

    const staff = await Staffaccount.findOne({staffemail}).select('+staffpassword');
    if(!staff) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }

    const loginmatch = await bcrypt.compare(staffpassword, staff.staffpassword);
    if(!loginmatch) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }

    const jsontoken = jwt.sign(
      {
        id: staff._id,
        email: staff.staffemail,
        role: 'staff',
        clinic: staff.staffclinic,
        name: `${staff.stafffirstname} ${staff.stafflastname}`
      },
      process.env.JWT_SECRET,
      {expiresIn: "30d"}
    );

    const stafflogin = staff.toObject();
    delete stafflogin.staffpassword;

    res.json({
      message:"Login Success",
      jsontoken,
      staff: stafflogin
    });

  } catch(error){
    console.error("Login Failed", error);
    res.status(500).json({message:"Server Failed"});
  }
};