
import BautistaInventoryProduct from "../models/bautistainventoryproduct.js";









    //Create Clinic BautistaInventoryProduct
    export const createbautistainventoryproduct = async (req, res) => {
        try{
            const newbautistainventoryproduct = new BautistaInventoryProduct(req.body);
            const savedbautistainventoryproduct = await newbautistainventoryproduct.save();
            res.status(201).json(savedbautistainventoryproduct);

        }catch(error){
            res.status(400).json({message: error.message});
        }
    };





    //Get All Clinic BautistaInventoryProduct
    export const getallbautistainventoryproduct = async (req, res) => {
        try{
            // Optimized query with field selection, lean(), and proper sorting
            const bautistainventoryproducts = await BautistaInventoryProduct.find({})
                .select('bautistainventoryproductid bautistainventoryproductcategory bautistainventoryproductname bautistainventoryproductbrand bautistainventoryproductmodelnumber bautistainventoryproductdescription bautistainventoryproductprice bautistainventoryproductquantity bautistainventoryproductimagepreviewimages bautistainventoryproductwishlistcount createdAt')
                .sort({bautistainventoryproductid: -1})
                .lean(); // Returns plain JavaScript objects for better performance
            
            res.json(bautistainventoryproducts);
    
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };

     









    //AICODE//AICODE//AICODE//AICODE//AICODE
    //Update BautistaInventoryProduct Details


    
    export const updatebautistainventoryproductbyid = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Update the bautistainventoryproduct with new data
            const updatedbautistainventoryproduct = await BautistaInventoryProduct.findOneAndUpdate(
                { bautistainventoryproductid: id },
                updateData,
                { new: true }
            );
        
            res.status(200).json(updatedbautistainventoryproduct);
        } catch (error) {
            console.error("Error updating Bautista Inventory Product:", error);
            res.status(500).json({ message: error.message });
        }
    };






    //Delete bautistainventoryproductId Details
    export const deletebautistainventoryproductbyid = async (req, res) => {
        try {
            const deletebautistainventoryproduct = await BautistaInventoryProduct.findOneAndDelete({ 
                bautistainventoryproductid: req.params.id 
            });
    
            if (!deletebautistainventoryproduct) return res.status(404).json({message: "Bautista Inventory Product not found"});
            res.json({message: "Bautista Inventory Product deleted successfully"});    
    
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };





