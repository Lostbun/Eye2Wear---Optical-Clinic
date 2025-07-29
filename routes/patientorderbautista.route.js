import express from 'express';
import {
     createpatientorderbautista,
     getallpatientorderbautistas,
     getpatientorderbautistabyid,
     getorderbautistasbyemail,
     updateorderbautistabyid,
     deleteorderbautistabyid,
} from '../controllers/patientorderbautista.controller.js';


const patientorderbautistarouter = express.Router();

patientorderbautistarouter.post('/patientorderbautista', createpatientorderbautista);
patientorderbautistarouter.get('/patientorderbautista', getallpatientorderbautistas);
patientorderbautistarouter.get('/patientorderbautista/email/:email', getorderbautistasbyemail);
patientorderbautistarouter.get('/patientorderbautista/:id', getpatientorderbautistabyid);
patientorderbautistarouter.put('/patientorderbautista/:id', updateorderbautistabyid);
patientorderbautistarouter.delete('/patientorderbautista/:id', deleteorderbautistabyid);


export default patientorderbautistarouter;