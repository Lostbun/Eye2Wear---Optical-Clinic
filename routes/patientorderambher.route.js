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

patientorderambherrouter.post('/patientorderambher', createpatientorderambher);
patientorderambherrouter.get('/patientorderambher', getallpatientorderambhers);
patientorderambherrouter.get('/patientorderambher/email/:email', getorderambhersbyemail);
patientorderambherrouter.get('/patientorderambher/:id', getpatientorderambherbyid);
patientorderambherrouter.put('/patientorderambher/:id', updateorderambherbyid);
patientorderambherrouter.delete('/patientorderambher/:id', deleteorderambherbyid);


export default patientorderambherrouter;