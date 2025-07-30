    import PatientOrderBautista from "../models/patientorderbautista.js";








    //Create Patient Bautista Order
export const createpatientorderbautista = async (req, res) => {
    try{
        const requiredpatientorderfields = [
      'patientprofilepicture', 'patientlastname', 'patientfirstname',
      'patientemail', 'patientcontactnumber', 'patientorderbautistaproductid',
      'patientorderbautistaproductname', 'patientorderbautistaproductprice',
      'patientorderbautistaproductquantity', 'patientorderbautistaproductchosenpickupdate'
      ];

      const missingrequiredpatientorderfields = requiredpatientorderfields.filter(field => !req.body[field]);
      if(missingrequiredpatientorderfields.length > 0) {
        return res.status(400).json({
            succes: false,
            message: `Missing required fields: ${missingrequiredpatientorderfields.join(', ')}`
        });
 }

        const neworder = new PatientOrderBautista(req.body);
        const savedorder = await neworder.save();

        res.status(201).json({
            succes: true,
            data: savedorder
        });
     
    }catch(error){
        console.error('Order submission error: ', error);
    }
};



    //Get All Patient Bautista Orders
    export const getallpatientorderbautistas = async (req, res) => {
        try{
            const patientorderbautistas = await PatientOrderBautista.find().sort({patientorderbautistaid: -1});
            res.json(patientorderbautistas);
    
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };



    //Get Single Bautista Orders by Id
    export const getpatientorderbautistabyid = async (req, res) => {
        try{
            const patientorderbautista = await PatientOrderBautista.findOne({patientorderbautistaid: req.params.id});
            
            if(!patientorderbautista) return res.status(404).json({message: "Bautista Order not found"});
            res.json(patientorderbautista);
        
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };






    //Get Bautista Order By Email
    export const getorderbautistasbyemail = async (req, res) => {
        try{
            const patientorderbautistasbyemail = await PatientOrderBautista.find({
                patientorderbautistaemail: req.params.email
            }).sort({patientorderbautistaid: -1});


            if(!patientorderbautistasbyemail || patientorderbautistasbyemail === 0){
                return res.status(404).json({message: "No orderbautistas found in this email"});  
            }

            res.json(patientorderbautistasbyemail);
        

        }catch(error){
            res.status(500).json({message: error.message});
        }
    };








    //Update Bautista Order Details

    export const updateorderbautistabyid = async (req,res) => {
        try{
            const { id } = req.params;
            const updateData = req.body;

            const orderbautista = await PatientOrderBautista.findOne({patientorderbautistaid: id});
            if(!orderbautista) {
                return res.status(404).json({message: "Bautista Order not found"});
            }

            if(updateData.patientorderbautistastatus) {
                if(!orderbautista.patientorderbautistastatushistory) {
                    orderbautista.patientorderbautistastatushistory = [];
                }
                orderbautista.patientorderbautistastatushistory.push({
                    status: updateData.patientorderbautistastatus,
                    changedAt: new Date(),
                    changedBy: updateData.patientorderbautistastatushistory.changedBy
                });

            }


            const updatedbautistaorder = await PatientOrderBautista.findOneAndUpdate(
                { patientorderbautistaid: id},
                updateData,
                { new: true}
            );
            res.status(200).json(updatedbautistaorder);
        } catch(error){
            console.error("Error updating orderbautista: ", error);
            res.status(500).json({message: error.message});
        }
    }

  



    //Delete Bautista OrderId Details
    export const deleteorderbautistabyid = async (req,res) => {
        try{
            const deleteorderbautista = await PatientOrderBautista.findOneAndDelete({
                patientorderbautistaid: req.params.id
            });

            if(!deleteorderbautista) return res.status(404).json({message: "Bautista Order not found"});
            res.json({message: "Bautista Order deleted successfully"});

        }catch(error){
            res.status(500).json({message: error.message});
        }
    }


