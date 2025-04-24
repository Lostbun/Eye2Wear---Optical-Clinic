      import express from "express";
      import {
            ownerlogin,

            getowneraccounts,
            getowneraccountbyid,
            getloggedinowneracc,
            verifyloggedinowneracc,
            getowneraccountbylastname,
            existingemail, 
            createOwner,
            updateOwner, 
            deleteOwner } from "../controllers/owneraccount.controller.js";



      const ownerrouter = express.Router();

      //Retrieve owner data
      ownerrouter.get("/", getowneraccounts);
      ownerrouter.get("/id/:id", getowneraccountbyid);
      ownerrouter.get("/ownerlastname/:ownerlastname", getowneraccountbylastname);
      ownerrouter.get("/me", verifyloggedinowneracc, getloggedinowneracc);



      //Retrieve Existing Email datas
      ownerrouter.get("/check-email/:owneremail", existingemail);


      //Create owner data
      ownerrouter.post("/", createOwner);

      //Update owner data
      ownerrouter.put("/:id", updateOwner);

      //Delete owner data
      ownerrouter.delete("/:id", deleteOwner);



      //Login owner
      ownerrouter.post("/login", ownerlogin);



      export default ownerrouter;
      