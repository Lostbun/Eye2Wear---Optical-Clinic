/* eslint-disable no-undef */
import Owneraccount from "../models/owneraccount.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


//Retrieve (All Owner) Controller
export const getowneraccounts = async (req, res) => {
  try {
    const owneracc = await Owneraccount.find({});
    res.status(200).json(owneracc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Retrieve (Single ) Controller
export const getowneraccountbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const owneracc = await Owneraccount.findById(id);
    res.status(200).json(owneracc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Retrieve (Single by lastname ) Controller
export const getowneraccountbylastname = async (req, res) => {
  try {
    const { ownerlastname } = req.params;
    const owneracc = await Owneraccount.findOne({ownerlastname: ownerlastname});
    res.status(200).json(owneracc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








export const getloggedinowneracc = async (req, res) => {
  try{

    const owner = await Owneraccount.findById(req.owner.id)
    .select('-password')
    .lean();

    if(!owner){
      return res.status(404).json({message: "owner does not exist"});
    }

    res.status(200).json({
        ownerlastname: owner.ownerlastname,
        ownerfirstname: owner.ownerfirstname,
        ownermiddlename: owner.ownermiddlename,
        ownerprofilepicture: owner.ownerprofilepicture
    });

  }catch (error){

    console.error("Failed to fetch owner account details: ", error);
    res.status(500).json({
      message: "Error retrieving owner data",
      error: error.message
    });

  }
};


export const verifyloggedinowneracc = async (req, res, next) => {
  try{
    const ownertoken = req.header('Authorization')?.replace('Bearer ','');

    if(!ownertoken){
      return res.status(401).json({message: 'Authorization required'});
    }

    const tokendecoded = jwt.verify(ownertoken, process.env.JWT_KEY);
    req.owner = {id: tokendecoded.id};
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

    const owneremail = req.params.owneremail;

    const existingemail = await Owneraccount.findOne({owneremail});
    res.json({exists: !!existingemail});
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
};




//Create (owner) Controller
export const createOwner = async (req, res) => {
  try {
    const owneracc = await Owneraccount.create(req.body);
    res.status(200).json(owneracc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





//Update (Owner) Controller
export const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owneracc = await Owneraccount.findByIdAndUpdate(id, req.body);

    if (!owneracc) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const updatedowneracc = await Owneraccount.findById(id);
    res.status(200).json(updatedowneracc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//Delete (owner) Controller
export const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owneracc = await Owneraccount.findByIdAndDelete(id, req.body);

    if (!owneracc) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};











//Login owner Controller
export const ownerlogin = async(req, res) => {
  try{
    const {owneremail,ownerpassword} = req.body;

    const owner = await Owneraccount.findOne({owneremail});
    if(!owner) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }


    const loginmatch = await bcrypt.compare(ownerpassword, owner.ownerpassword);
    if(!loginmatch) {
      return res.status(401).json({message:"Login Error, Invalid Credentials"});
    }

    const jsontoken = jwt.sign(
      {
        id: owner._id, email: owner.owneremail},
     
        process.env.JWT_KEY,
        {expiresIn: "1h"}

       );




       const ownerlogin = owner.toObject();
       delete ownerlogin.ownerpassword;

       res.json({
        message:"Loggin Success",
        jsontoken,
        owner: ownerlogin
       });


  } catch(error){
    console.error("Login Failed", error);
    res.status(500).json({message:"Server Failed"});
  }
};