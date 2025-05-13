import express from "express";

import {

    createbautistainventoryproduct,
    getallbautistainventoryproduct,
    updatebautistainventoryproductbyid,
    deletebautistainventoryproductbyid,


     } from "../controllers/bautistainventoryproduct.controller.js";
      



const bautistainventoryproductrouter = express.Router();



bautistainventoryproductrouter.get("/", getallbautistainventoryproduct);

bautistainventoryproductrouter.post("/", createbautistainventoryproduct);
bautistainventoryproductrouter.put("/:id", updatebautistainventoryproductbyid);
bautistainventoryproductrouter.delete("/:id", deletebautistainventoryproductbyid);



export default bautistainventoryproductrouter;
