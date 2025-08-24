import OtherClinicRecord from "../models/otherclinicrecord.js";
import dotenv from "dotenv";


dotenv.config();









//Retrieve (All Other Clinic Record) Controller - Optimized for Medical Records
export const getotherclinicrecords = async (req, res) => {
  try {
    console.log('Fetching all other clinic records...'); // Debug log
    
    // Get query parameters for filtering and pagination
    const { email, limit = 50, skip = 0, includeImages = 'false' } = req.query;
    
    // Build the query
    let query = {};
    if (email) {
      query.patientotherclinicemail = email;
    }
    
    // First, try to get a count with timeout
    const countPromise = OtherClinicRecord.countDocuments(query).maxTimeMS(3000);
    let count = 0;
    
    try {
      count = await countPromise;
      console.log('Total records matching query:', count); // Debug log
    } catch (countError) {
      console.warn('Count query timed out, proceeding with fetch...'); // Debug log
    }
    
    if (count === 0 && !email) {
      console.log('No records found, returning empty array'); // Debug log
      return res.status(200).json([]);
    }
    
    // Optimize projection - exclude large image data by default for list views
    let projection = {};
    if (includeImages === 'false') {
      projection = { patientotherclinicrecordimage: 0 }; // Exclude image data for faster queries
    }
    
    console.log('Attempting to fetch records with optimized query...'); // Debug log
    
    let otherclinicrec = [];
    
    try {
      // Optimized query with projection and pagination
      otherclinicrec = await OtherClinicRecord.find(query, projection)
        .sort({ patientotherclinicconsultationdate: -1, createdAt: -1 }) // Sort by consultation date first
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .lean()
        .maxTimeMS(8000); // Increased timeout for complex queries
      
      console.log('Successfully fetched records:', otherclinicrec?.length || 0); // Debug log
      
    } catch (queryError) {
      console.log('Optimized query failed, trying fallback...'); // Debug log
      
      // Fallback: Simple query without sorting
      try {
        otherclinicrec = await OtherClinicRecord.find(query, projection)
          .limit(10) // Reduced limit for fallback
          .lean()
          .maxTimeMS(5000);
        
        console.log('Fallback query succeeded:', otherclinicrec?.length || 0); // Debug log
      } catch (fallbackError) {
        console.log('All queries failed, returning empty array'); // Debug log
        return res.status(200).json([]);
      }
    }
    
    console.log('Final result count:', otherclinicrec?.length || 0); // Debug log
    
    // Add metadata for frontend optimization
    const response = {
      data: otherclinicrec || [],
      count: otherclinicrec?.length || 0,
      totalCount: count,
      hasImages: includeImages === 'true',
      pagination: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: otherclinicrec?.length === parseInt(limit)
      }
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error in getotherclinicrecords:', error); // Debug log
    
    // Handle specific MongoDB timeout errors
    if (error.name === 'MongoNetworkTimeoutError' || error.message.includes('timeout')) {
      return res.status(503).json({ 
        message: 'Database connection timeout. Please try again.',
        error: 'SERVICE_UNAVAILABLE',
        retry: true
      });
    }
    
    res.status(500).json({ message: error.message, error: error.toString() });
  }
};

//Retrieve (Single ) Controller
export const getotherclinicrecordbyemail = async (req, res) => {
  try {
    const { patientotherclinicemail } = req.params;
    const { includeImages = 'true' } = req.query; // Include images by default for single record
    
    console.log('Searching for email:', patientotherclinicemail); // Debug log
    
    // Optimized projection for single record queries
    let projection = {};
    if (includeImages === 'false') {
      projection = { patientotherclinicrecordimage: 0 };
    }
    
    // Add timeout wrapper for the database query with increased timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database query timeout')), 15000); // Reduced from 30s
    });
    
    const queryPromise = OtherClinicRecord.findOne(
      { patientotherclinicemail: patientotherclinicemail }, 
      projection
    ).lean().maxTimeMS(12000);
    
    const otherclinicrec = await Promise.race([queryPromise, timeoutPromise]);
    
    console.log('Found record:', otherclinicrec ? 'Yes' : 'No'); // Debug log
    res.status(200).json(otherclinicrec);
  } catch (error) {
    console.error('Error in getotherclinicrecordbyemail:', error); // Debug log
    
    // Handle specific MongoDB timeout errors
    if (error.name === 'MongoNetworkTimeoutError' || error.message.includes('timeout')) {
      return res.status(503).json({ 
        message: 'Database connection timeout. Please try again.',
        error: 'SERVICE_UNAVAILABLE',
        retry: true
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};

// NEW: Optimized endpoint for patient medical records (multiple records by email)
export const getpatientmedicalrecords = async (req, res) => {
  try {
    const { patientotherclinicemail } = req.params;
    const { includeImages = 'false', limit = 20 } = req.query;
    
    console.log('Fetching medical records for patient:', patientotherclinicemail); // Debug log
    
    if (!patientotherclinicemail) {
      return res.status(400).json({ message: 'Patient email is required' });
    }
    
    // Optimized projection - exclude images by default for faster loading
    let projection = {};
    if (includeImages === 'false') {
      projection = { patientotherclinicrecordimage: 0 };
    }
    
    // Optimized query specifically for patient medical records
    const records = await OtherClinicRecord.find(
      { patientotherclinicemail: patientotherclinicemail },
      projection
    )
    .sort({ patientotherclinicconsultationdate: -1, createdAt: -1 }) // Most recent first
    .limit(parseInt(limit))
    .lean()
    .maxTimeMS(8000);
    
    console.log('Found medical records:', records?.length || 0); // Debug log
    
    // Return optimized response
    res.status(200).json({
      data: records || [],
      count: records?.length || 0,
      patientEmail: patientotherclinicemail,
      hasImages: includeImages === 'true'
    });
    
  } catch (error) {
    console.error('Error in getpatientmedicalrecords:', error); // Debug log
    
    if (error.name === 'MongoNetworkTimeoutError' || error.message.includes('timeout')) {
      return res.status(503).json({ 
        message: 'Database connection timeout. Please try again.',
        error: 'SERVICE_UNAVAILABLE',
        retry: true
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};

// Get single medical record by ID (with option to include images)
export const getmedicalrecordbyid = async (req, res) => {
  try {
    const recordId = parseInt(req.params.id); // Convert to number since patientotherclinicrecordid is numeric
    const includeImages = req.query.includeImages === 'true';
    
    console.log('Fetching medical record ID:', recordId, 'includeImages:', includeImages); // Debug log
    
    // Validate the ID
    if (isNaN(recordId)) {
      return res.status(400).json({ error: 'Invalid record ID format' });
    }
    
    // Build projection object
    let projection = { __v: 0 }; // Exclude version field
    if (!includeImages) {
      projection.patientotherclinicrecordimage = 0; // Exclude images
    }

    // Use findOne with the custom numeric ID field
    const record = await OtherClinicRecord.findOne(
      { patientotherclinicrecordid: recordId }, 
      projection
    ).lean().maxTimeMS(3000);

    if (!record) {
      console.log('Medical record not found for ID:', recordId); // Debug log
      return res.status(404).json({ error: 'Medical record not found' });
    }

    console.log('Successfully found medical record:', recordId); // Debug log
    res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching medical record:', error);
    res.status(500).json({ 
      error: 'Failed to fetch medical record',
      details: error.message 
    });
  }
};


//Create (Other Clinic Record) Controller
export const createotherclinicrecord = async (req, res) => {
  try {
    const otherclinicrec = await OtherClinicRecord.create(req.body);
    res.status(200).json(otherclinicrec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





//Update (Other Clinic Record) Controller
export const updateotherclinicrecord = async (req, res) => {
  try {
    const { id } = req.params;
    const otherclinicrec = await OtherClinicRecord.findByIdAndUpdate(id, req.body);

    if (!otherclinicrec) {
      return res.status(404).json({ message: "otherclinic not found" });
    }

    const updatedotherclinicrec = await OtherClinicRecord.findById(id);
    res.status(200).json(updatedotherclinicrec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//Delete (Other Clinic Record) Controller
export const deleteotherclinicrecord = async (req, res) => {
  try{
    const {id} = req.params;
    const numericid = parseInt(id);

    const otherclinicrec = await OtherClinicRecord.findOneAndDelete({patientotherclinicrecordid: numericid});

    if(!otherclinicrec){
      return res.status(404).json({message: "Other clinic record does not exist"});
    }

    res.status(200).json({message: "Other clinic record deleted successfully"});
  
  }catch(error){
    console.error("Failed to delete: ", error);
    res.status(500).json({message: "Server error", error: error.message});
  }
}
