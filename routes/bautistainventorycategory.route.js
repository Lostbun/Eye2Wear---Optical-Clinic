import express from "express";

import {

    createbautistainventorycategory,
    getallbautistainventorycategory,
    updatebautistainventorycategorybyid,
    deletebautistainventorycategorybyid,
    getbautistainventorycategorybyname,

     } from "../controllers/bautistainventorycategory.controller.js";
      



const bautistainventorycategoryrouter = express.Router();



bautistainventorycategoryrouter.get("/", getallbautistainventorycategory);
bautistainventorycategoryrouter.get("/bautistainventorycategoryname/:bautistainventorycategoryname", getbautistainventorycategorybyname);

bautistainventorycategoryrouter.post("/", createbautistainventorycategory);
bautistainventorycategoryrouter.put("/:id", updatebautistainventorycategorybyid);
bautistainventorycategoryrouter.delete("/:id", deletebautistainventorycategorybyid);



export default bautistainventorycategoryrouter;
