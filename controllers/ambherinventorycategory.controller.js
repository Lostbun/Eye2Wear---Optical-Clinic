
import AmbherInventoryCategory from "../models/ambherinventorycategory.js";









    //Create Clinic AmbherInventoryCategory
    export const createambherinventorycategory = async (req, res) => {
        try{
            const newambherinventorycategory = new AmbherInventoryCategory(req.body);
            const savedambherinventorycategory = await newambherinventorycategory.save();
            res.status(201).json(savedambherinventorycategory);

        }catch(error){
            res.status(400).json({message: error.message});
        }
    };





    //Get All Clinic AmbherInventoryCategory
    export const getallambherinventorycategory = async (req, res) => {
        try{
            const ambherinventorycategorys = await AmbherInventoryCategory.find().sort({ambherinventorycategoryid: -1});
            res.json(ambherinventorycategorys);
    
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };





   export const getambherinventorycategorybyname = async (req, res) => {

     try{
        const { ambherinventorycategoryname } = req.params;

        const category = await AmbherInventoryCategory.findOne({ambherinventorycategoryname:{$regex: new RegExp(`^${ambherinventorycategoryname}$`, "i")}});
    
        if(!category){
            return res.status(404).json({exists: false, message: "Ambher Inventory Category Not Foundd"});
        }

        res.status(200).json({exists:true, message: "Ambher Inventory Category Exists", data: category});
    
     }catch(error){
        res.status(500).json({error:true, message: error.message});
     }
    };








    //AICODE//AICODE//AICODE//AICODE//AICODE
    //Update AmbherInventoryCategory Details
    // ... existing code ...

    export const updateambherinventorycategorybyid = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Update the ambherinventorycategory with new data
            const updatedambherinventorycategory = await AmbherInventoryCategory.findOneAndUpdate(
                { ambherinventorycategoryid: id },
                updateData,
                { new: true }
            );
        
            res.status(200).json(updatedambherinventorycategory);
        } catch (error) {
            console.error("Error updating Ambher Inventory Category:", error);
            res.status(500).json({ message: error.message });
        }
    };

    // ... existing code ...





    //AI CODE
    //Delete ambherinventorycategoryId Details
    export const deleteambherinventorycategorybyid = async (req, res) => {
        try {
            const deleteambherinventorycategory = await AmbherInventoryCategory.findOneAndDelete({ 
                ambherinventorycategoryid: req.params.id 
            });
    
            if (!deleteambherinventorycategory) return res.status(404).json({message: "Ambher Inventory Category not found"});
            res.json({message: "Ambher Inventory Category deleted successfully"});    
    
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };





