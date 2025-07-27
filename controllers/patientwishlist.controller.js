/* eslint-disable no-undef */   
import Patientwishlist from "../models/patientwishlist.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";




dotenv.config();
    
  




//Create Clinic Patientwishlist
export const createpatientwishlistinventoryproduct = async (req, res) => {
    try{
        if(!req.body.patientaccount || !req.body.clinicproduct || !req.body.clinicproductmodel) {
            return res.status(400).json({
                message: "Missing required fields: patientaccount, clinicproduct, clinicproductmodel"
            });
        }

        const newpatientwishlistinventoryproduct = new Patientwishlist(req.body);
        const savedpatientwishlistinventoryproduct = await newpatientwishlistinventoryproduct.save();
        res.status(201).json(savedpatientwishlistinventoryproduct);
    
    }catch(error){
        if(error.code === 11000) {
            res.status(400).json({
                message: "This product is already added to wishlist",
                error: error.message
            });
        }else{
            res.status(400).json({message: error.message});
        }
    }
}



//Checks the wishlist of patient
export const checkpatientwishlistitem = async (req, res) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patientEmail = decoded.email;

        const{ productId, clinicType } = req.query;
        const existingItem = await Patientwishlist.findOne({
            patientwishlistemail: patientEmail,
            patientwishlistinventoryproductid: productId,
            clinicType: clinicType
        });

        res.json({exists: !!existingItem});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};






//Get All Clinic Patientwishlist
export const getallpatientwishlistinventoryproduct = async (req, res) => {
    try{
      const patientwishlistinventoryproducts = await Patientwishlist.find().sort({patientwishlistinventoryproductid: -1});
        res.json(patientwishlistinventoryproducts);
    
    }catch(error){
       res.status(500).json({message: error.message});
    }
    };

     



 //Update Patientwishlist Details
export const updatepatientwishlistinventoryproductbyid = async (req, res) => {
        try{
            const { id } = req.params;
            const updateData = req.body;

            const updatedpatientwishlistinventoryproduct = await Patientwishlist.findOneAndUpdate(
                { patientwishlistinventoryproductid: id }, updateData, { new: true }
            );

            res.status(200).json(updatedpatientwishlistinventoryproduct);
        
        }catch(error){
            console.error("Error updating patient wishlist inventory product: ", error);
            res.status(500).json({message: error.message});
        }
    };

 









//Delete patientwishlistinventoryproductId Details
export const deletepatientwishlistinventoryproductbyid = async (req, res) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patientEmail = decoded.email;

        const deletepatientwishlistinventoryproduct = await Patientwishlist.findOneAndDelete({
            patientwishlistinventoryproductid: req.params.id,
            patientwishlistemail: patientEmail
        });

        if(!deletepatientwishlistinventoryproduct){
            return res.status(404).json({message: "Patient Wishlist Inventory Product not found"});
        }

        res.json({message: "Patient Wishlist Inventory Product deleted successfully"});
    }catch(error){
        console.error("Delete wishlist product failed: ",error);
        res.status(500).json({message: error.message});
    }
};


