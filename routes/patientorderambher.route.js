import express from 'express';
import {
     createpatientorderambher,
     getallpatientorderambhers,
     getpatientorderambherbyid,
     getorderambhersbyemail,
     updateorderambherbyid,
     deleteorderambherbyid,
} from '../controllers/patientorderambher.controller.js';


const patientorderambherrouter = express.Router();

patientorderambherrouter.post('/', createpatientorderambher);
patientorderambherrouter.get('/', getallpatientorderambhers);
patientorderambherrouter.get('/email/:email', getorderambhersbyemail);
patientorderambherrouter.get('/:id', getpatientorderambherbyid);
patientorderambherrouter.put('/:id', updateorderambherbyid);
patientorderambherrouter.delete('/:id', deleteorderambherbyid);

export default patientorderambherrouter;