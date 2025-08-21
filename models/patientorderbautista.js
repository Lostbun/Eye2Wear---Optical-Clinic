import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";


const PatientOrderBautistaSchema = new mongoose.Schema({

     //GENERAL ORDERING INFORMATION
    patientorderbautistaid: {type: Number, unique: true},
    patientorderbautistastatus: {type: String, enum: ['Cancelled', 'Pending', 'Ready for Pickup', 'Completed'], default: 'Pending'},
    patientorderbautistahistory: [{ 
    status: {type: String, enum: ['Cancelled', 'Pending', 'Ready for Pickup', 'Completed']},
    changedAt: {type: Date , default: Date.now},
    changedBy: String,
}],


    //PATIENT INFORMATION
    patientprofilepicture: String,
    patientlastname: {type: String, required: true},
    patientfirstname: {type: String, required: true},
    patientmiddlename: String,
    patientemail: {type: String, required: true},
    patientcontactnumber: {type: String, required: true},

    //PATIENT ORDERED PRODUCT INFORMATION
    patientorderbautistaproductid: {type: Number, required: true},
    patientorderbautistaproductname: {type: String, required: true},
    patientorderbautistaproductbrand: {type: String, required: true},
    patientorderbautistaproductmodelnumber: {type: String, required: true},
    patientorderbautistaproductcategory:{type: String, required: true},
    patientorderbautistaproductimage: {type: [String], required: true},
    patientorderbautistaproductprice: {type: Number, required: true},
    patientorderbautistaproductquantity: {type: Number, required: true, min: 1},
    patientorderbautistaproductsubtotal: {type: Number, required: true},
    patientorderbautistaproductdescription: {type: String, required: true},
    patientorderbautistaproductnotes: {type: String},

    //PAYMENT INFORMATION
    patientorderbautistacustomfee: { type: Number, default: 0 }, // Clinic customization fee
    patientorderbautistaamountpaid: { type: Number, default: 0 }, // Customer total paid amount
    patientorderbautistaremainingbalance: { type: Number, default: 0 },
    patientorderbautistaamountpaidchange: { type: Number, default: 0 }, // Computed from deducting overall total to total paid amount
    patientorderbautistaproducttotal: { type: Number, default: 0 },  // Subtotal + CustomizationFee
    patientorderbautistaproductpaymentmethod: {type: String, enum: ['Cash', 'Bank Transfer'], default: 'Cash'},
    patientorderbautistaproductpaymentreceiptimage: String,
    patientorderbautistaproductpaymentstatus: { 
        type: String, 
        enum: ['Fully Paid', 'Partially Paid'], 
        default: 'Partially Paid' 
    },  
    patientorderbautistaproductpaymenttransactionid: String,




    //PICKUP INFORMATION
    patientorderbautistaproductpickupstatus: { 
        type: String, 
        default: 'Later' 
    },
    patientorderbautistaproductchosenpickupdate: String,
    patientorderbautistaproductchosenpickuptime: String,

    //AUTHORIZED PERSON
    patientorderbautistaproducauthorizedname: String,
    patientorderbautistaproducauthorizedtype: String,

    //TIMESTAMPS
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
     
});


PatientOrderBautistaSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "patientorderbautistaid",
    id: "patient_order_bautista_seq",
    start_seq: true,
    disable_hooks: false
});

PatientOrderBautistaSchema.post('save', function(error, doc, next){
    if(error?.name === 'MongoServerError' && error?.code === 11000) {
        this.constructor.counterReset('patientorderbautistaid', (err) => {
            if(err) {
                console.error('Failed to reset id sequence: ', err);
                return next(err);
            }
            console.log('Reset patientorderbautistaid sequence due to id duplication');
            next(error);
        });

    }else{
        next(error);
    }
});




export default mongoose.model("PatientOrderBautista", PatientOrderBautistaSchema);