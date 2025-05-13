import express from "express";

import {

    createambherinventoryproduct,
    getallambherinventoryproduct,
    updateambherinventoryproductbyid,
    deleteambherinventoryproductbyid,


     } from "../controllers/ambherinventoryproduct.controller.js";
      



const ambherinventoryproductrouter = express.Router();



ambherinventoryproductrouter.get("/", getallambherinventoryproduct);

ambherinventoryproductrouter.post("/", createambherinventoryproduct);
ambherinventoryproductrouter.put("/:id", updateambherinventoryproductbyid);
ambherinventoryproductrouter.delete("/:id", deleteambherinventoryproductbyid);



export default ambherinventoryproductrouter;
