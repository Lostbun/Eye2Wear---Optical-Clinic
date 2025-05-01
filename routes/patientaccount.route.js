import express from "express";

import {
      patientlogin,
      //resetpassword,
      getpatientaccounts,
      getpatientaccountbyid,
      getloggedinpatientacc,
      verifyloggedinpatientacc,
      getpatientaccountbylastname,
      existingemail, 
      createPatient,
      updatePatient,
      //forgotpassword,
      deletePatient,
     } from "../controllers/patientaccount.controller.js";
      


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

//Update Patient data
patientrouter.put("/:id", updatePatient);

//Delete Patient data
patientrouter.delete("/:id", verifyloggedinadminacc, deletePatient);



//Login Patient
patientrouter.post("/login", patientlogin);
//patientrouter.post('/forgot-password', forgotpassword );
//patientrouter.post('/reset-password/:id/:token', resetpassword );



export default patientrouter;
