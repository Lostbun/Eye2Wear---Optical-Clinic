import express from 'express';
import { forgotpassword, resetpassword } from '../controllers/forgotpass.controller.js';    

const forgotpassrouter = express.Router();


forgotpassrouter.post('/forgot-password', forgotpassword);
forgotpassrouter.post('/reset-password/:id/:token', resetpassword);


export default forgotpassrouter;