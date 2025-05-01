    import express from "express";

    import {
        getpatientdemographics,
        getpatientdemographicbyid,
        getpatientdemographicbylastname,
        createpatientdemographic,
        updatepatientdemographic,
        getpatientdemographicbyemail
        } from "../controllers/patientdemographic.controller.js";




    import {verifyloggedinadminacc} from "../controllers/adminaccount.controller.js";

    const patientdemographicrouter = express.Router();



        
 





    //Retrieve Patient Demographic Data Route
    patientdemographicrouter.get("/", getpatientdemographics);
    patientdemographicrouter.get("/id/:id", getpatientdemographicbyid);
    patientdemographicrouter.get("/patientlastname/:patientlastname", getpatientdemographicbylastname);
    patientdemographicrouter.get("/patientemail/:patientemail", getpatientdemographicbyemail)




    //Create Patient Demographic Data Route
    patientdemographicrouter.post("/", createpatientdemographic);

    //Update Patient Demographic Data Route
    patientdemographicrouter.put("/:id", updatepatientdemographic);

    //Delete Patient Demographic Data Route
    patientdemographicrouter.delete("/:id", verifyloggedinadminacc);




    export default patientdemographicrouter;
