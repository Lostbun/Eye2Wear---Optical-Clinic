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

patientorderbautistarouter.post('/', createpatientorderbautista);
patientorderbautistarouter.get('/', getallpatientorderbautistas);
patientorderbautistarouter.get('/email/:email', getorderbautistasbyemail);
patientorderbautistarouter.get('/:id', getpatientorderbautistabyid);
patientorderbautistarouter.put('/:id', updateorderbautistabyid);
patientorderbautistarouter.delete('/:id', deleteorderbautistabyid);


export default patientorderbautistarouter;