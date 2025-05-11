      import express from "express";
      import {
            getotherclinicrecords,
            getotherclinicrecordbyemail,
            createotherclinicrecord,
            updateotherclinicrecord,
            deleteotherclinicrecord, } from "../controllers/otherclinic.controller.js";



      const otherclinicrouter = express.Router();


      otherclinicrouter.get("/", getotherclinicrecords);
      otherclinicrouter.get("/otherclinicrecord/email/:email", getotherclinicrecordbyemail);
      otherclinicrouter.post("/", createotherclinicrecord);
      otherclinicrouter.put("/:id", updateotherclinicrecord);
      otherclinicrouter.delete("/:id", deleteotherclinicrecord);




      export default otherclinicrouter;
      