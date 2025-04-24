      import express from "express";
      import {
            stafflogin,

            getstaffaccounts,
            getstaffaccountbyid,
            getloggedinstaffacc,
            verifyloggedinstaffacc,
            getstaffaccountbylastname,
            existingemail, 
            createStaff,
            updateStaff, 
            deleteStaff } from "../controllers/staffaccount.controller.js";



      const staffrouter = express.Router();

      //Retrieve staff data
      staffrouter.get("/", getstaffaccounts);
      staffrouter.get("/id/:id", getstaffaccountbyid);
      staffrouter.get("/stafflastname/:stafflastname", getstaffaccountbylastname);
      staffrouter.get("/me", verifyloggedinstaffacc, getloggedinstaffacc);



      //Retrieve Existing Email datas
      staffrouter.get("/check-email/:staffemail", existingemail);


      //Create staff data
      staffrouter.post("/", createStaff);

      //Update staff data
      staffrouter.put("/:id", updateStaff);

      //Delete staff data
      staffrouter.delete("/:id", deleteStaff);



      //Login staff
      staffrouter.post("/login", stafflogin);



      export default staffrouter;
      