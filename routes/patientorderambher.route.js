import express from 'express';
import {
     createpatientorderambher,
     getallpatientorderambhers,
     getpatientorderambherbyid,
     getorderambhersbyemail,
     updateorderambherbyid,
     deleteorderambherbyid,
     getambherproductsoldcountbyid,
} from '../controllers/patientorderambher.controller.js';


const patientorderambherrouter = express.Router();

patientorderambherrouter.post('/', createpatientorderambher);
patientorderambherrouter.get('/', getallpatientorderambhers);
patientorderambherrouter.get('/email/:email', getorderambhersbyemail);
patientorderambherrouter.get('/:id', getpatientorderambherbyid);
patientorderambherrouter.get("/ambherproductsoldcount/:productid", getambherproductsoldcountbyid);
patientorderambherrouter.put('/:id', updateorderambherbyid);
patientorderambherrouter.delete('/:id', deleteorderambherbyid);


export default patientorderambherrouter;