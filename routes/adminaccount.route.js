      import express from "express";
      import {
            adminlogin,

            getadminaccounts,
            getadminaccountbyid,
            getloggedinadminacc,
            verifyloggedinadminacc,
            getadminaccountbylastname,
            existingemail, 
            createAdmin,
            updateAdmin, 
            deleteAdmin } from "../controllers/adminaccount.controller.js";



      const adminrouter = express.Router();

      //Retrieve Patient data
      adminrouter.get("/", getadminaccounts);
      adminrouter.get("/id/:id", getadminaccountbyid);
      adminrouter.get("/adminlastname/:adminlastname", getadminaccountbylastname);
      adminrouter.get("/me", verifyloggedinadminacc, getloggedinadminacc);



      //Retrieve Existing Email datas
      adminrouter.get("/check-email/:adminemail", existingemail);


      //Create Patient data
      adminrouter.post("/", createAdmin);

      //Update Patient data
      adminrouter.put("/:id", updateAdmin);

      //Delete Patient data
      adminrouter.delete("/:id", deleteAdmin);



      //Login Patient
      adminrouter.post("/login", adminlogin);



      export default adminrouter;
      