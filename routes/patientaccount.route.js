import express from "express";
import {
      patientlogin,

      getpatientaccounts,
      getpatientaccountbyid,
      getloggedinpatientacc,
      verifyloggedinpatientacc,
      getpatientaccountbylastname,
      existingemail, 
      createPatient,
      updatePatient, 
      deletePatient,
      patientforgotpassword } from "../controllers/patientaccount.controller.js";
      


import {verifyloggedinadminacc} from "../controllers/adminaccount.controller.js";


const patientrouter = express.Router();

//Retrieve Patient data
patientrouter.get("/", getpatientaccounts);
patientrouter.get("/id/:id", getpatientaccountbyid);
patientrouter.get("/patientlastname/:patientlastname", getpatientaccountbylastname);
patientrouter.get("/me", verifyloggedinpatientacc, getloggedinpatientacc);



//Retrieve Existing Email datas
patientrouter.get("/check-email/:patientemail", existingemail);


//Create Patient data
patientrouter.post("/", createPatient);
patientrouter.post("/forgot-password", patientforgotpassword);

//Update Patient data
patientrouter.put("/:id", updatePatient);

//Delete Patient data
patientrouter.delete("/:id", verifyloggedinadminacc, deletePatient);



//Login Patient
patientrouter.post("/login", patientlogin);



export default patientrouter;
