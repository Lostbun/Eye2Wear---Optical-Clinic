import express from 'express';
import {patientaccountdeletionemail,
        staffaccountdeletionemail,
        owneraccountdeletionemail,
        adminaccountdeletionemail
 } from '../controllers/accountdeletionemail.controller.js';    

const accountdeletionemailrouter = express.Router();


accountdeletionemailrouter.post('/patient', patientaccountdeletionemail);
accountdeletionemailrouter.post('/staff', staffaccountdeletionemail);
accountdeletionemailrouter.post('/owner', owneraccountdeletionemail);
accountdeletionemailrouter.post('/admin', adminaccountdeletionemail);


export default accountdeletionemailrouter;