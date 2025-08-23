/* eslint-disable no-undef */
import Adminaccount from "../models/adminaccount.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


//Retrieve (All Admin) Controller
export const getadminaccounts = async (req, res) => {
  try {
    // Optimized query with field selection, lean(), and proper sorting
    const adminacc = await Adminaccount.find({})
      .select('adminId adminemail adminlastname adminfirstname adminmiddlename adminprofilepicture isVerified createdAt')
      .sort({ adminId: -1 }) // Sort by ID descending for newest first
      .lean(); // Returns plain JavaScript objects for better performance
    
    res.status(200).json(adminacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//Retrieve (Single ) Controller
export const getadminaccountbyid = async (req, res) => {
  try {
    const { id } = req.params;
    // Use lean() for better performance when not modifying the document
    const adminacc = await Adminaccount.findById(id).lean();
    
    if (!adminacc) {
      return res.status(404).json({ message: "Admin not found" });
    }
    
    res.status(200).json(adminacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Retrieve (Single by lastname ) Controller
export const getadminaccountbylastname = async (req, res) => {
  try {
    const { adminlastname } = req.params;
    const adminacc = await Adminaccount.findOne({adminlastname: adminlastname});
    res.status(200).json(adminacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








export const getloggedinadminacc = async (req, res) => {
  try{

    const admin = await Adminaccount.findById(req.admin.id)
    .select('-password')
    .lean();

    if(!admin){
      return res.status(404).json({message: "Admin does not exist"});
    }

    res.status(200).json({
        adminlastname: admin.adminlastname,
        adminfirstname: admin.adminfirstname,
        adminmiddlename: admin.adminmiddlename,
        adminprofilepicture: admin.adminprofilepicture
    });

  }catch (error){

    console.error("Failed to fetch admin account details: ", error);
    res.status(500).json({
      message: "Error retrieving admin data",
      error: error.message
    });

  }
};


export const verifyloggedinadminacc = async (req, res, next) => {
  try{
    const admintoken = req.header('Authorization')?.replace('Bearer ','');

    if(!admintoken){
      return res.status(401).json({message: 'Authorization required'});
    }

    const tokendecoded = jwt.verify(admintoken, process.env.JWT_KEY);
    req.admin = {id: tokendecoded.id};
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

    const adminemail = req.params.adminemail;

    const existingemail = await Adminaccount.findOne({adminemail});
    res.json({exists: !!existingemail});
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
};




//Create (admin) Controller
export const createAdmin = async (req, res) => {
  try {
    const adminacc = await Adminaccount.create(req.body);
    res.status(200).json(adminacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





//Update (admin) Controller
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const adminacc = await Adminaccount.findByIdAndUpdate(id, req.body);

    if (!adminacc) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const updatedadminacc = await Adminaccount.findById(id);
    res.status(200).json(updatedadminacc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//Delete (Admin) Controller
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    let adminacc = await Adminaccount.findOneAndDelete({adminId: id});
    
    if (!adminacc) {
      adminacc = await Adminaccount.findByIdAndDelete(id);
    }

    if (!adminacc) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










//Login admin Controller
export const adminlogin = async(req, res) => {
  try{
    const {adminemail,adminpassword} = req.body;

    const admin = await Adminaccount.findOne({adminemail});
    if(!admin) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }


    const loginmatch = await bcrypt.compare(adminpassword, admin.adminpassword);
    if(!loginmatch) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }

    const jsontoken = jwt.sign(
      {
        id: admin._id, email: admin.adminemail},
     
        process.env.JWT_KEY,
        {expiresIn: "1h"}

       );




       const adminlogin = admin.toObject();
       delete adminlogin.adminpassword;

       res.json({
        message:"Loggin Success",
        jsontoken,
        admin: adminlogin
       });


  } catch(error){
    console.error("Login Failed", error);
    res.status(500).json({message:"Server Failed"});
  }
};