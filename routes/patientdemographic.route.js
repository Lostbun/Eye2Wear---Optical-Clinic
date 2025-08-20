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




   //import {verifyloggedinadminacc} from "../controllers/adminaccount.controller.js";

    const patientdemographicrouter = express.Router();



        
 





    //Retrieve Patient Demographic Data Route
    patientdemographicrouter.get("/", getpatientdemographics);
    patientdemographicrouter.get("/id/:id", getpatientdemographicbyid);
    patientdemographicrouter.get("/patientlastname/:patientlastname", getpatientdemographicbylastname);
    patientdemographicrouter.get("/patientemail/:patientemail", verifyloggedinpatientacc, getpatientdemographicbyemail)




    //Create Patient Demographic Data Route
    patientdemographicrouter.post("/", createpatientdemographic);

    //Update Patient Demographic Data Route
    patientdemographicrouter.put("/:id", updatepatientdemographic);

    //Delete Patient Demographic Data Route
    patientdemographicrouter.delete("/:id", deletepatientdemographic);




    export default patientdemographicrouter;
