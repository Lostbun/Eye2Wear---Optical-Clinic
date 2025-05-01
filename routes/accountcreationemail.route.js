import express from 'express';
import {patientaccountcreationemail,
        staffaccountcreationemail,
        owneraccountcreationemail,
        adminaccountcreationemail
 } from '../controllers/accountcreationemail.controller.js';    

const accountcreationemailrouter = express.Router();


accountcreationemailrouter.post('/patient', patientaccountcreationemail);
accountcreationemailrouter.post('/staff', staffaccountcreationemail);
accountcreationemailrouter.post('/owner', owneraccountcreationemail);
accountcreationemailrouter.post('/admin', adminaccountcreationemail);


export default accountcreationemailrouter;