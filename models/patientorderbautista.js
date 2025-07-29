import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";


const PatientOrderBautistaSchema = new mongoose.Schema({

    //GENERAL ORDERING INFORMATION
    patientorderbautistaid: {type: Number, unique: true},
    patientorderbautistastatus: {type: String, enum: ['Cancelled', 'Pending', 'Processing', 'Ready for Pickup', 'Completed', 'Returned'], default: 'Pending'},
    patientorderbautistahistory: [{ 
    status: {type: String, enum: ['Cancelled', 'Pending', 'Processing', 'Ready for Pickup', 'Completed', 'Returned']},
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
    patientorderbautistaproductprice: {type: Number, required: true},
    patientorderbautistaproductquantity: {type: Number, required: true, min: 1},
    patientorderbautistaproductsubtotal: {type: Number, required: true},

    //PAYMENT INFORMATION
    patientorderbautistaproducttotal: {type: Number, default: 0},
    patientorderbautistaproductpaymentmethod: {type: String, enum: ['Cash on Pickup', 'Online Payment', 'Bank Transfer'], required: true},
    patientorderbautistaproductpaymentreceiptimage: String,
    //patientorderbautistaproductpaymentstatus: {type: String, enum: ['Unpaid', 'Paid', 'Partially Paid', 'Refunded'], default: 'Unpaid'},
    patientorderbautistaproductpaymenttransactionid: String,

    //PICKUP INFORMATION
    patientorderbautistaproductpickupdate: Date,
    patientorderbautistaproductpickuptime: String,

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