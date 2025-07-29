import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";



const PatientOrderAmbherSchema = new mongoose.Schema({

    //GENERAL ORDERING INFORMATION
    patientorderambherid: {type: Number, unique: true},
    patientorderambherstatus: {type: String, enum: ['Cancelled', 'Pending', 'Processing', 'Ready for Pickup', 'Completed', 'Returned'], default: 'Pending'},
    patientorderambherhistory: [{ 
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
    patientorderambherproductid: {type: Number, required: true},
    patientorderambherproductname: {type: String, required: true},
    patientorderambherproductbrand: {type: String, required: true},
    patientorderambherproductmodelnumber: {type: String, required: true},
    patientorderambherproductprice: {type: Number, required: true},
    patientorderambherproductquantity: {type: Number, required: true, min: 1},
    patientorderambherproductsubtotal: {type: Number, required: true},

    //PAYMENT INFORMATION
    patientorderambherproducttotal: {type: Number, default: 0},
    patientorderambherproductpaymentmethod: {type: String, enum: ['Cash on Pickup', 'Online Payment', 'Bank Transfer'], required: true},
    patientorderambherproductpaymentreceiptimage: String,
    //patientorderambherproductpaymentstatus: {type: String, enum: ['Unpaid', 'Paid', 'Partially Paid', 'Refunded'], default: 'Unpaid'},
    patientorderambherproductpaymenttransactionid: String,

    //PICKUP INFORMATION
    patientorderambherproductchosenpickupdate: Date,
    patientorderambherproductchosenpickuptime: String,

    //AUTHORIZED PERSON
    patientorderambherproducauthorizedname: String,
    patientorderambherproducauthorizedtype: String,

    //TIMESTAMPS
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
     
});


PatientOrderAmbherSchema.plugin(AutoIncrement(mongoose),{
    inc_field: "patientorderambherid",
    id: "patient_order_ambher_seq",
    start_seq: true,
    disable_hooks: false
});

PatientOrderAmbherSchema.post('save', function(error, doc, next){
    if(error?.name === 'MongoServerError' && error?.code === 11000) {
        this.constructor.counterReset('patientorderambherid', (err) => {
            if(err) {
                console.error('Failed to reset id sequence: ', err);
                return next(err);
            }
            console.log('Reset patientorderambherid sequence due to id duplication');
            next(error);
        });

    }else{
        next(error);
    }
});




export default mongoose.model("PatientOrderAmbher", PatientOrderAmbherSchema);