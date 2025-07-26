import express from "express";

import {

    createpatientwishlistinventoryproduct,
    getallpatientwishlistinventoryproduct,
    updatepatientwishlistinventoryproductbyid,
    deletepatientwishlistinventoryproductbyid,


     } from "../controllers/patientwishlist.controller.js";
import Patientwishlist from "../models/patientwishlist.js";
      



const patientwishlistinventoryproductrouter = express.Router();



patientwishlistinventoryproductrouter.get("/", getallpatientwishlistinventoryproduct);

patientwishlistinventoryproductrouter.post("/", createpatientwishlistinventoryproduct);
patientwishlistinventoryproductrouter.put("/:id", updatepatientwishlistinventoryproductbyid);
patientwishlistinventoryproductrouter.delete("/:id", deletepatientwishlistinventoryproductbyid);




export default patientwishlistinventoryproductrouter;
