
import Patientwishlist from "../models/patientwishlist.js";




    //Create Clinic Patientwishlist
    export const createpatientwishlistinventoryproduct = async (req, res) => {
        try{
            const newpatientwishlistinventoryproduct = new Patientwishlist(req.body);
            const savedpatientwishlistinventoryproduct = await newpatientwishlistinventoryproduct.save();
            res.status(201).json(savedpatientwishlistinventoryproduct);

        }catch(error){
            res.status(400).json({message: error.message});
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

     









    //AICODE//AICODE//AICODE//AICODE//AICODE
    //Update Patientwishlist Details


    
    export const updatepatientwishlistinventoryproductbyid = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Update the patientwishlistinventoryproduct with new data
            const updatedpatientwishlistinventoryproduct = await Patientwishlist.findOneAndUpdate(
                { patientwishlistinventoryproductid: id },
                updateData,
                { new: true }
            );
        
            res.status(200).json(updatedpatientwishlistinventoryproduct);
        } catch (error) {
            console.error("Error updating Patient Wishlist Inventory Product:", error);
            res.status(500).json({ message: error.message });
        }
    };






    //Delete patientwishlistinventoryproductId Details
    export const deletepatientwishlistinventoryproductbyid = async (req, res) => {
        try {
            const deletepatientwishlistinventoryproduct = await Patientwishlist.findOneAndDelete({ 
                patientwishlistinventoryproductid: req.params.id 
            });
    
            if (!deletepatientwishlistinventoryproduct) return res.status(404).json({message: "Patient Wishlist Inventory Product not found"});
            res.json({message: "Patient Wishlist Inventory Product deleted successfully"});    
    
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };





