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
            // Optimized query with ALL necessary fields, lean(), and proper sorting
            const patientorderbautistas = await PatientOrderBautista.find({})
                .select('patientorderbautistaid patientorderbautistastatus patientorderbautistahistory patientprofilepicture patientlastname patientfirstname patientmiddlename patientemail patientcontactnumber patientorderbautistaproductid patientorderbautistaproductname patientorderbautistaproductbrand patientorderbautistaproductmodelnumber patientorderbautistaproductcategory patientorderbautistaproductimage patientorderbautistaproductprice patientorderbautistaproductquantity patientorderbautistaproductsubtotal patientorderbautistaproductdescription patientorderbautistaproductnotes patientorderbautistacustomfee patientorderbautistaamountpaid patientorderbautistaremainingbalance patientorderbautistaamountpaidchange patientorderbautistaproducttotal patientorderbautistaproductpaymentmethod patientorderbautistaproductpaymentreceiptimage patientorderbautistaproductpaymentstatus patientorderbautistaproductpaymenttransactionid patientorderbautistaproductpickupstatus patientorderbautistaproductchosenpickupdate patientorderbautistaproductchosenpickuptime patientorderbautistaproducauthorizedname patientorderbautistaproducauthorizedtype createdAt updatedAt')
                .sort({patientorderbautistaid: -1})
                .lean(); // Returns plain JavaScript objects for better performance
            
            res.json(patientorderbautistas);
    
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };



    //Get Single Bautista Orders by Id
    export const getpatientorderbautistabyid = async (req, res) => {
        try{
            // Optimized query with ALL necessary fields and lean()
            const patientorderbautista = await PatientOrderBautista.findOne({
                patientorderbautistaid: req.params.id
            })
            .select('patientorderbautistaid patientorderbautistastatus patientorderbautistahistory patientprofilepicture patientlastname patientfirstname patientmiddlename patientemail patientcontactnumber patientorderbautistaproductid patientorderbautistaproductname patientorderbautistaproductbrand patientorderbautistaproductmodelnumber patientorderbautistaproductcategory patientorderbautistaproductimage patientorderbautistaproductprice patientorderbautistaproductquantity patientorderbautistaproductsubtotal patientorderbautistaproductdescription patientorderbautistaproductnotes patientorderbautistacustomfee patientorderbautistaamountpaid patientorderbautistaremainingbalance patientorderbautistaamountpaidchange patientorderbautistaproducttotal patientorderbautistaproductpaymentmethod patientorderbautistaproductpaymentreceiptimage patientorderbautistaproductpaymentstatus patientorderbautistaproductpaymenttransactionid patientorderbautistaproductpickupstatus patientorderbautistaproductchosenpickupdate patientorderbautistaproductchosenpickuptime patientorderbautistaproducauthorizedname patientorderbautistaproducauthorizedtype createdAt updatedAt')
            .lean(); // Returns plain JavaScript objects for better performance
            
            if(!patientorderbautista) return res.status(404).json({message: "Bautista Order not found"});
            res.json(patientorderbautista);
        
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };






    //Get Bautista Order By Email
    export const getorderbautistasbyemail = async (req, res) => {
        try{
            // Optimized query with ALL necessary fields, lean(), and indexed email lookup
            const patientorderbautistasbyemail = await PatientOrderBautista.find({
                patientemail: req.params.email
            })
            .select('patientorderbautistaid patientorderbautistastatus patientorderbautistahistory patientprofilepicture patientlastname patientfirstname patientmiddlename patientemail patientcontactnumber patientorderbautistaproductid patientorderbautistaproductname patientorderbautistaproductbrand patientorderbautistaproductmodelnumber patientorderbautistaproductcategory patientorderbautistaproductimage patientorderbautistaproductprice patientorderbautistaproductquantity patientorderbautistaproductsubtotal patientorderbautistaproductdescription patientorderbautistaproductnotes patientorderbautistacustomfee patientorderbautistaamountpaid patientorderbautistaremainingbalance patientorderbautistaamountpaidchange patientorderbautistaproducttotal patientorderbautistaproductpaymentmethod patientorderbautistaproductpaymentreceiptimage patientorderbautistaproductpaymentstatus patientorderbautistaproductpaymenttransactionid patientorderbautistaproductpickupstatus patientorderbautistaproductchosenpickupdate patientorderbautistaproductchosenpickuptime patientorderbautistaproducauthorizedname patientorderbautistaproducauthorizedtype createdAt updatedAt')
            .sort({patientorderbautistaid: -1})
            .lean(); // Returns plain JavaScript objects for better performance

            if(!patientorderbautistasbyemail || patientorderbautistasbyemail.length === 0){
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






    //Get every bautistaproduct sold count by id
export const getbautistaproductsoldcountbyid = async (req, res) => {
  const productId = parseInt(req.params.productid);
  try {
    const soldOrders = await PatientOrderBautista.aggregate([
      {
        $match: {
          patientorderbautistaproductid: productId,
          patientorderbautistastatus: "Completed"
        }
      },
      {
        $group: {
          _id: "$patientorderbautistaproductid",
          totalSold: { $sum: "$patientorderbautistaproductquantity" }
        }
      }
    ]);

    const totalSold = soldOrders[0]?.totalSold || 0;

    res.json({ productid: productId, sold: totalSold });
  } catch (error) {
    console.error("Error fetching sold count: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
