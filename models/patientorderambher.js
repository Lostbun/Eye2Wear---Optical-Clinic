import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";



const PatientOrderAmbherSchema = new mongoose.Schema({

    //GENERAL ORDERING INFORMATION
    patientorderambherid: {type: Number, unique: true},
    patientorderambherstatus: {type: String, enum: ['Cancelled', 'Pending', 'Ready for Pickup', 'Completed'], default: 'Pending'},
    patientorderambherhistory: [{ 
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
    patientorderambherproductid: {type: Number, required: true},
    patientorderambherproductname: {type: String, required: true},
    patientorderambherproductbrand: {type: String, required: true},
    patientorderambherproductmodelnumber: {type: String, required: true},
    patientorderambherproductcategory:{type: String, required: true},
    patientorderambherproductimage: {type: [String], required: true},
    patientorderambherproductprice: {type: Number, required: true},
    patientorderambherproductquantity: {type: Number, required: true, min: 1},
    patientorderambherproductsubtotal: {type: Number, required: true},
    patientorderambherproductdescription: {type: String, required: true},
    patientorderambherproductnotes: {type: String},

    //PAYMENT INFORMATION
    patientorderambhercustomfee: { type: Number, default: 0 }, // Clinic customization fee
    patientorderambheramountpaid: { type: Number, default: 0 }, // Customer total paid amount
    patientorderambherremainingbalance: { type: Number, default: 0 },
    patientorderambheramountpaidchange: { type: Number, default: 0 },  // Computed from deducting overall total to total paid amount
    patientorderambherproducttotal: { type: Number, default: 0 },  // Subtotal + CustomizationFee
    patientorderambherproductpaymentmethod: {type: String, enum: ['Cash', 'Bank Transfer'], default: 'Cash'},
    patientorderambherproductpaymentreceiptimage: String,
    patientorderambherproductpaymentstatus: { 
        type: String, 
        enum: ['Fully Paid', 'Partially Paid'], 
        default: 'Partially Paid' 
    },  
    patientorderambherproductpaymenttransactionid: String,




    //PICKUP INFORMATION
    patientorderambherproductpickupstatus: { 
        type: String, 
        default: 'Later' 
    },
    patientorderambherproductchosenpickupdate: String,
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

// Add indexes for better query performance
PatientOrderAmbherSchema.index({ patientorderambherid: -1 }); // Primary sorting
PatientOrderAmbherSchema.index({ patientemail: 1 }); // Email filtering
PatientOrderAmbherSchema.index({ patientorderambherstatus: 1 }); // Status filtering
PatientOrderAmbherSchema.index({ patientorderambherproductcategory: 1 }); // Category filtering
PatientOrderAmbherSchema.index({ patientorderambherproductpaymentstatus: 1 }); // Payment status filtering
PatientOrderAmbherSchema.index({ createdAt: -1 }); // Date sorting
PatientOrderAmbherSchema.index({ patientlastname: 1, patientfirstname: 1 }); // Name searches
PatientOrderAmbherSchema.index({ patientlastname: 'text', patientfirstname: 'text', patientemail: 'text', patientorderambherproductname: 'text' }); // Text search



export default mongoose.model("PatientOrderAmbher", PatientOrderAmbherSchema);