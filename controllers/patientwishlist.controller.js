/* eslint-disable no-undef */   
import Patientwishlist from "../models/patientwishlist.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";




dotenv.config();
    
  




//Create Clinic Patientwishlist

  export const createpatientwishlistinventoryproduct = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decodedpatientaccount = jwt.verify(token, process.env.JWT_SECRET);
        const patientEmail = decodedpatientaccount.email;


        if (!req.body.patientaccount || !req.body.clinicproduct || !req.body.clinicproductmodel) {
            return res.status(400).json({
                message: "Missing required fields: patientaccount, clinicproduct, clinicproductmodel"
            });
        }


      
        const existingproductwishlist = await Patientwishlist.findOne({
            patientwishlistemail: patientEmail,
            patientwishlistinventoryproductid: req.body.patientwishlistinventoryproductid,
            clinicType: req.body.clinicType
        });


        if ( existingproductwishlist) {
            return res.status(400).json({
                message: "Wishlist product already existing",
                error: "Duplicate wishlist item"
            });
        }


        const newpatientwishlistinventoryproduct = new Patientwishlist({
            ...req.body,
            patientwishlistemail: patientEmail
        });


        const savedpatientwishlistinventoryproduct = await newpatientwishlistinventoryproduct.save();
        res.status(201).json(savedpatientwishlistinventoryproduct);

    } catch(error) {
        if(error.code === 11000) {
            res.status(400).json({
                message: "Wishlist product already existing",
                error: error.message
            });
        } else {
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
        // Optimized query with field selection, lean(), and proper sorting
        const patientwishlistinventoryproducts = await Patientwishlist.find({})
            .select('wishlistid patientwishlistemail clinicType patientwishlistinventoryproductid patientwishlistinventoryproductname patientwishlistinventoryproductbrand patientwishlistinventoryproductprice patientwishlistinventoryproductimagepreviewimages createdAt')
            .sort({patientwishlistinventoryproductid: -1})
            .lean(); // Returns plain JavaScript objects for better performance
        
        res.json(patientwishlistinventoryproducts);
    
    }catch(error){
       res.status(500).json({message: error.message});
    }
};




//Get Patient Wishlist Single
export const getallpatientwishlistinventoryproductbyemail = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patientEmail = decoded.email;

        // Optimized query with field selection, lean(), and indexed email lookup
        const patientwishlistinventoryproducts = await Patientwishlist.find({
            patientwishlistemail: patientEmail
        })
        .select('wishlistid patientwishlistemail clinicType patientwishlistinventoryproductid patientwishlistinventoryproductname patientwishlistinventoryproductbrand patientwishlistinventoryproductprice patientwishlistinventoryproductimagepreviewimages createdAt')
        .sort({ patientwishlistinventoryproductid: -1 })
        .lean(); // Returns plain JavaScript objects for better performance
        
        res.json(patientwishlistinventoryproducts);
    
    } catch(error) {
        console.error("Error fetching patient wishlist:", error);
        res.status(500).json({ message: error.message });
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

 








//AI CODE
//Delete patientwishlistinventoryproductId Details
export const deletepatientwishlistinventoryproductbyid = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.status(401).json({message: "No token provided"});
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patientEmail = decoded.email;

        // First find the item to ensure it exists and belongs to the patient
        const wishlistItem = await Patientwishlist.findOne({
            _id: req.params.id,  // Using _id instead of patientwishlistinventoryproductid
            patientwishlistemail: patientEmail
        });

        if(!wishlistItem) {
            return res.status(404).json({ 
                message: "Wishlist item not found or doesn't belong to this patient" 
            });
        }

        // Delete the item
        await Patientwishlist.findByIdAndDelete(req.params.id);

        res.json({ 
            success: true,
            message: "Wishlist item deleted successfully" 
        });

    } catch(error) {
        console.error("Delete wishlist product failed: ", error);
        
        // Handle specific errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid wishlist item ID" });
        }
        
        res.status(500).json({ 
            success: false,
            message: error.message || "Internal server error" 
        });
    }
};







//Get wishlist count per product
export const getwishlistcount = async (req, res) => {
    try {
        const { productIds, clinicType } = req.params;
        const idsArray = productIds.split(',');
        
        // Count for multiple products with optimized queries
        if (idsArray.length > 1) {
            const counts = {};
            
            // Use a single aggregation query for better performance when handling multiple IDs
            const pipeline = [
                {
                    $match: {
                        patientwishlistinventoryproductid: { $in: idsArray.map(Number) },
                        clinicType: clinicType
                    }
                },
                {
                    $group: {
                        _id: "$patientwishlistinventoryproductid",
                        count: { $sum: 1 }
                    }
                }
            ];
            
            const results = await Patientwishlist.aggregate(pipeline);
            
            // Initialize all counts to 0
            idsArray.forEach(id => counts[id] = 0);
            
            // Fill in actual counts
            results.forEach(result => {
                counts[result._id] = result.count;
            });
            
            return res.json(counts);
        }
        
        // Single product count with optimized query
        const count = await Patientwishlist.countDocuments({
            patientwishlistinventoryproductid: Number(productIds),
            clinicType: clinicType
        });
        
        res.json({ count });
        
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

















export const deletewishlistitembyAdmin = async (req, res) => {
  try {
    const { email, productId, clinicType } = req.body;

    if (!email || !productId || !clinicType) {
      return res.status(400).json({ message: "MIssing requirements email, inventoryid, clinictype" });
    }

    const wishlistItem = await Patientwishlist.findOneAndDelete({
      patientwishlistemail: email,
      patientwishlistinventoryproductid: productId,
      clinicType: clinicType
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlisted product does not exist" });
    }
    
    res.json({ message: "Wishlisted product automatically deleted after ordering the same product: ", deleted: wishlistItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};