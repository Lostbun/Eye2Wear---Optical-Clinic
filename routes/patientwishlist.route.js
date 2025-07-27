import express from "express";

import {

    createpatientwishlistinventoryproduct,
    checkpatientwishlistitem,
    getallpatientwishlistinventoryproduct,
    updatepatientwishlistinventoryproductbyid,
    deletepatientwishlistinventoryproductbyid,


     } from "../controllers/patientwishlist.controller.js";
import Patientwishlist from "../models/patientwishlist.js";
      



const patientwishlistinventoryproductrouter = express.Router();



patientwishlistinventoryproductrouter.get("/", getallpatientwishlistinventoryproduct);
patientwishlistinventoryproductrouter.get("/check", checkpatientwishlistitem);
patientwishlistinventoryproductrouter.post("/", createpatientwishlistinventoryproduct);
patientwishlistinventoryproductrouter.put("/:id", updatepatientwishlistinventoryproductbyid);
patientwishlistinventoryproductrouter.delete("/:id", deletepatientwishlistinventoryproductbyid);




export default patientwishlistinventoryproductrouter;
