import express from 'express';
import {
    createpatientappointment,
    getallpatientappointments,
    getpatientappointmentbyid,
    getappointmentsbyemail,
    updateappointmentbyid,
    deleteappointmentbyid,
    getambherappointmentsbydatetime,
    getbautistaappointmentsbydatetime,
} from '../controllers/patientappointment.controller.js';


const patientappointmentrouter = express.Router();

patientappointmentrouter.post('/appointments', createpatientappointment);
patientappointmentrouter.get('/appointments', getallpatientappointments);
patientappointmentrouter.get('/appointments/email/:email', getappointmentsbyemail);
patientappointmentrouter.get('/appointments/:id', getpatientappointmentbyid);
patientappointmentrouter.put('/appointments/:id', updateappointmentbyid);
patientappointmentrouter.get('/appointments/ambher/:date/:time', getambherappointmentsbydatetime);
patientappointmentrouter.get('/appointments/bautista/:date/:time', getbautistaappointmentsbydatetime);
patientappointmentrouter.delete('/appointments/:id', deleteappointmentbyid);


export default patientappointmentrouter;