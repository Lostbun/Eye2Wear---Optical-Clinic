
import BautistaInventoryCategory from "../models/bautistainventorycategory.js";









    //Create Clinic BautistaInventoryCategory
    export const createbautistainventorycategory = async (req, res) => {
        try{
            const newbautistainventorycategory = new BautistaInventoryCategory(req.body);
            const savedbautistainventorycategory = await newbautistainventorycategory.save();
            res.status(201).json(savedbautistainventorycategory);

        }catch(error){
            res.status(400).json({message: error.message});
        }
    };





    //Get All Clinic BautistaInventoryCategory
    export const getallbautistainventorycategory = async (req, res) => {
        try{
            const bautistainventorycategorys = await BautistaInventoryCategory.find().sort({bautistainventorycategoryid: -1});
            res.json(bautistainventorycategorys);
    
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };

     


//Get  Clinic BautistaInventoryCategory by Name
   export const getbautistainventorycategorybyname = async (req, res) => {

     try{
        const { bautistainventorycategoryname } = req.params;

        const category = await BautistaInventoryCategory.findOne({bautistainventorycategoryname:{$regex: new RegExp(`^${bautistainventorycategoryname}$`, "i")}});
    
        if(!category){
            return res.status(404).json({exists: false, message: "Bautista Inventory Category Not Foundd"});
        }

        res.status(200).json({exists:true, message: "Bautista Inventory Category Exists", data: category});
    
     }catch(error){
        res.status(500).json({error:true, message: error.message});
     }
    };








    //AICODE//AICODE//AICODE//AICODE//AICODE
    //Update BautistaInventoryCategory Details


    
    export const updatebautistainventorycategorybyid = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Update the bautistainventorycategory with new data
            const updatedbautistainventorycategory = await BautistaInventoryCategory.findOneAndUpdate(
                { bautistainventorycategoryid: id },
                updateData,
                { new: true }
            );
        
            res.status(200).json(updatedbautistainventorycategory);
        } catch (error) {
            console.error("Error updating Bautista Inventory Category:", error);
            res.status(500).json({ message: error.message });
        }
    };






    //Delete bautistainventorycategoryId Details
    export const deletebautistainventorycategorybyid = async (req, res) => {
        try {
            const deletebautistainventorycategory = await BautistaInventoryCategory.findOneAndDelete({ 
                bautistainventorycategoryid: req.params.id 
            });
    
            if (!deletebautistainventorycategory) return res.status(404).json({message: "Bautista Inventory Category not found"});
            res.json({message: "Bautista Inventory Category deleted successfully"});    
    
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };





