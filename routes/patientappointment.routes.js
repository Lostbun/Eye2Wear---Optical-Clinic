import express from 'express';
import {
    createpatientappointment,
    getallpatientappointments,
    getpatientappointmentbyid,
    getappointmentsbyemail,
    updateappointmentbyid,
    deleteappointmentbyid,
} from '../controllers/patientappointment.controller.js';


const patientappointmentrouter = express.Router();

patientappointmentrouter.post('/appointments', createpatientappointment);
patientappointmentrouter.get('/appointments', getallpatientappointments);
patientappointmentrouter.get('/appointments/email/:email', getappointmentsbyemail);
patientappointmentrouter.get('/appointments/:id', getpatientappointmentbyid);
patientappointmentrouter.put('/appointments/:id', updateappointmentbyid);
patientappointmentrouter.delete('/appointments/:id', deleteappointmentbyid);


export default patientappointmentrouter;