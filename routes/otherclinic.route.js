      import express from "express";
      import {
            getotherclinicrecords,
            getotherclinicrecordbyemail,
            getpatientmedicalrecords,
            getmedicalrecordbyid,
            createotherclinicrecord,
            updateotherclinicrecord,
            deleteotherclinicrecord, } from "../controllers/otherclinic.controller.js";



      const otherclinicrouter = express.Router();

      // Debug middleware
      otherclinicrouter.use((req, res, next) => {
        console.log(`Other clinic route: ${req.method} ${req.originalUrl}`);
        next();
      });

      otherclinicrouter.get("/", getotherclinicrecords);
      otherclinicrouter.get("/patient/:patientotherclinicemail", getpatientmedicalrecords); // New optimized endpoint
      otherclinicrouter.get("/email/:patientotherclinicemail", getotherclinicrecordbyemail);
      otherclinicrouter.get("/:id", getmedicalrecordbyid); // Get single record by ID
      otherclinicrouter.post("/", createotherclinicrecord);
      otherclinicrouter.put("/:id", updateotherclinicrecord);
      otherclinicrouter.delete("/:id", deleteotherclinicrecord);




      export default otherclinicrouter;
      