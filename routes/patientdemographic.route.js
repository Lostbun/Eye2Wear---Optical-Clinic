    import express from "express";

    import {
        getpatientdemographics,
        getpatientdemographicbyid,
        getpatientdemographicbylastname,
        createpatientdemographic,
        updatepatientdemographic,
        getpatientdemographicbyemail,
        deletepatientdemographic
        } from "../controllers/patientdemographic.controller.js";

    import {verifyloggedinpatientacc} from "../controllers/patientaccount.controller.js";
    import {verifyloggedinstaffacc} from "../controllers/staffaccount.controller.js";
    import {verifyloggedinowneracc} from "../controllers/owneraccount.controller.js";
    
    // Middleware to verify Staff, Owner, or Patient access for demographics
    const verifyStaffOwnerOrPatientAccess = async (req, res, next) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
          return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Try to verify as Staff first
        try {
          req.header = () => `Bearer ${token}`;
          await verifyloggedinstaffacc(req, res, () => {
            req.userType = 'Staff';
            next();
          });
          return;
        } catch (staffError) {
          // Continue to try Owner
        }

        // Try to verify as Owner
        try {
          req.header = () => `Bearer ${token}`;
          await verifyloggedinowneracc(req, res, () => {
            req.userType = 'Owner';
            next();
          });
          return;
        } catch (ownerError) {
          // Continue to try Patient
        }

        // Try to verify as Patient
        try {
          req.header = () => `Bearer ${token}`;
          await verifyloggedinpatientacc(req, res, () => {
            req.userType = 'Patient';
            next();
          });
          return;
        } catch (patientError) {
          return res.status(403).json({ message: "Access denied. Invalid token." });
        }

      } catch (error) {
        return res.status(500).json({ message: "Server error during authentication." });
      }
    };




   //import {verifyloggedinadminacc} from "../controllers/adminaccount.controller.js";

    const patientdemographicrouter = express.Router();



        
 





    //Retrieve Patient Demographic Data Route
    patientdemographicrouter.get("/", getpatientdemographics);
    patientdemographicrouter.get("/id/:id", getpatientdemographicbyid);
    patientdemographicrouter.get("/patientlastname/:patientlastname", getpatientdemographicbylastname);
    patientdemographicrouter.get("/patientemail/:patientemail", verifyStaffOwnerOrPatientAccess, getpatientdemographicbyemail)




    //Create Patient Demographic Data Route
    patientdemographicrouter.post("/", createpatientdemographic);

    //Update Patient Demographic Data Route
    patientdemographicrouter.put("/:id", updatepatientdemographic);

    //Delete Patient Demographic Data Route
    patientdemographicrouter.delete("/:id", deletepatientdemographic);




    export default patientdemographicrouter;
