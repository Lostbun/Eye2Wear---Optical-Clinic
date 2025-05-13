
import AmbherInventoryProduct from "../models/ambherinventoryproduct.js";









    //Create Clinic AmbherInventoryProduct
    export const createambherinventoryproduct = async (req, res) => {
        try{
            const newambherinventoryproduct = new AmbherInventoryProduct(req.body);
            const savedambherinventoryproduct = await newambherinventoryproduct.save();
            res.status(201).json(savedambherinventoryproduct);

        }catch(error){
            res.status(400).json({message: error.message});
        }
    };





    //Get All Clinic AmbherInventoryProduct
    export const getallambherinventoryproduct = async (req, res) => {
        try{
            const ambherinventoryproducts = await AmbherInventoryProduct.find().sort({ambherinventoryproductid: -1});
            res.json(ambherinventoryproducts);
    
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };

     









    //AICODE//AICODE//AICODE//AICODE//AICODE
    //Update AmbherInventoryProduct Details


    
    export const updateambherinventoryproductbyid = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Update the ambherinventoryproduct with new data
            const updatedambherinventoryproduct = await AmbherInventoryProduct.findOneAndUpdate(
                { ambherinventoryproductid: id },
                updateData,
                { new: true }
            );
        
            res.status(200).json(updatedambherinventoryproduct);
        } catch (error) {
            console.error("Error updating Ambher Inventory Product:", error);
            res.status(500).json({ message: error.message });
        }
    };






    //Delete ambherinventoryproductId Details
    export const deleteambherinventoryproductbyid = async (req, res) => {
        try {
            const deleteambherinventoryproduct = await AmbherInventoryProduct.findOneAndDelete({ 
                ambherinventoryproductid: req.params.id 
            });
    
            if (!deleteambherinventoryproduct) return res.status(404).json({message: "Ambher Inventory Product not found"});
            res.json({message: "Ambher Inventory Product deleted successfully"});    
    
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };





