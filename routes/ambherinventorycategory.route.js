import express from "express";

import {

    createambherinventorycategory,
    getallambherinventorycategory,
    updateambherinventorycategorybyid,
    deleteambherinventorycategorybyid,
    getambherinventorycategorybyname,

     } from "../controllers/ambherinventorycategory.controller.js";
      



const ambherinventorycategoryrouter = express.Router();



ambherinventorycategoryrouter.get("/", getallambherinventorycategory);
ambherinventorycategoryrouter.get("/ambherinventorycategoryname/:ambherinventorycategoryname", getambherinventorycategorybyname);

ambherinventorycategoryrouter.post("/", createambherinventorycategory);
ambherinventorycategoryrouter.put("/:id", updateambherinventorycategorybyid);
ambherinventorycategoryrouter.delete("/:id", deleteambherinventorycategorybyid);



export default ambherinventorycategoryrouter;
