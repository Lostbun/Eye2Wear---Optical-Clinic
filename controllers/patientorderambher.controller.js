import PatientOrderAmbher from "../models/patientorderambher.js";








//Create Patient Order Ambher
export const createpatientorderambher = async (req, res) => {
    try{
        const requiredpatientorderfields = [
      'patientprofilepicture', 'patientlastname', 'patientfirstname',
      'patientemail', 'patientcontactnumber', 'patientorderambherproductid',
      'patientorderambherproductname', 'patientorderambherproductprice',
      'patientorderambherproductquantity', 'patientorderambherproductchosenpickupdate'
      ];

      const missingrequiredpatientorderfields = requiredpatientorderfields.filter(field => !req.body[field]);
      if(missingrequiredpatientorderfields.length > 0) {
        return res.status(400).json({
            succes: false,
            message: `Missing required fields: ${missingrequiredpatientorderfields.join(', ')}`
        });
 }

        const neworder = new PatientOrderAmbher(req.body);
        const savedorder = await neworder.save();

        res.status(201).json({
            succes: true,
            data: savedorder
        });
     
    }catch(error){
        console.error('Order submission error: ', error);
    }
};





    //Get All Patient Order Ambhers
    export const getallpatientorderambhers = async (req, res) => {
        try{
            const patientorderambhers = await PatientOrderAmbher.find().sort({patientorderambherid: -1});
            res.json(patientorderambhers);
    
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };



    //Get Single Order Ambhers by Id
    export const getpatientorderambherbyid = async (req, res) => {
        try{
            const patientorderambher = await PatientOrderAmbher.findOne({patientorderambherid: req.params.id});
            
            if(!patientorderambher) return res.status(404).json({message: "Order Ambher not found"});
            res.json(patientorderambher);
        
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };






    //Get Order Ambher By Email
    export const getorderambhersbyemail = async (req, res) => {
        try{
            const patientorderambhersbyemail = await PatientOrderAmbher.find({
                patientorderambheremail: req.params.email
            }).sort({patientorderambherid: -1});


            if(!patientorderambhersbyemail || patientorderambhersbyemail === 0){
                return res.status(404).json({message: "No orderambhers found in this email"});  
            }

            res.json(patientorderambhersbyemail);
        

        }catch(error){
            res.status(500).json({message: error.message});
        }
    };








    //Update Order Ambher Details

    export const updateorderambherbyid = async (req,res) => {
        try{
            const { id } = req.params;
            const updateData = req.body;

            const orderambher = await PatientOrderAmbher.findOne({patientorderambherid: id});
            if(!orderambher) {
                return res.status(404).json({message: "Order Ambher not found"});
            }

            if(updateData.patientorderambherstatus) {
                if(!orderambher.patientorderambherstatushistory) {
                    orderambher.patientorderambherstatushistory = [];
                }
                orderambher.patientorderambherstatushistory.push({
                    status: updateData.patientorderambherstatus,
                    changedAt: new Date(),
                    changedBy: updateData.patientorderambherstatushistory.changedBy
                });

            }


            const updatedorderambher = await PatientOrderAmbher.findOneAndUpdate(
                { patientorderambherid: id},
                updateData,
                { new: true}
            );
            res.status(200).json(updatedorderambher);
        } catch(error){
            console.error("Error updating orderambher: ", error);
            res.status(500).json({message: error.message});
        }
    }

  



    //Delete Order AmbherId Details
    export const deleteorderambherbyid = async (req,res) => {
        try{
            const deleteorderambher = await PatientOrderAmbher.findOneAndDelete({
                patientorderambherid: req.params.id
            });

            if(!deleteorderambher) return res.status(404).json({message: "Order Ambher not found"});
            res.json({message: "Order Ambher deleted successfully"});

        }catch(error){
            res.status(500).json({message: error.message});
        }
    }


