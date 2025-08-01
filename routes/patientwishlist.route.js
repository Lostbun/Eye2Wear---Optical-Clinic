import express from "express";

import {

    createpatientwishlistinventoryproduct,
    checkpatientwishlistitem,
    getallpatientwishlistinventoryproduct,
    updatepatientwishlistinventoryproductbyid,
    deletepatientwishlistinventoryproductbyid,
    getallpatientwishlistinventoryproductbyemail,
    getwishlistcount,

     } from "../controllers/patientwishlist.controller.js";
import Patientwishlist from "../models/patientwishlist.js";
      



const patientwishlistinventoryproductrouter = express.Router();



patientwishlistinventoryproductrouter.get("/", getallpatientwishlistinventoryproduct);
patientwishlistinventoryproductrouter.get("/check", checkpatientwishlistitem);
patientwishlistinventoryproductrouter.get('/wishlist-count/:productIds/:clinicType', getwishlistcount);
patientwishlistinventoryproductrouter.post("/", createpatientwishlistinventoryproduct);
patientwishlistinventoryproductrouter.put("/:id", updatepatientwishlistinventoryproductbyid);
patientwishlistinventoryproductrouter.get("/email", getallpatientwishlistinventoryproductbyemail);
patientwishlistinventoryproductrouter.delete("/:id", deletepatientwishlistinventoryproductbyid);




export default patientwishlistinventoryproductrouter;
