/* eslint-disable no-undef */


import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Patientaccount from "../models/patientaccount.js";
import Adminaccount from "../models/adminaccount.js";
import Owneraccount from "../models/owneraccount.js";
import Staffaccount from "../models/staffacount.js";



dotenv.config();



//Account Creation Email
export const patientaccountcreationemail = async(req, res) => {

    try{

    const{email, password} =req.body;
    
      const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
      });

    
    
              const mailoptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Eye2Wear - Patient Account Creation",
                html: `<p>An account has been created!</p></br></br>
                        <p>Here is your login details:</p>
                        <p>Email: ${email}</p></br>
                        <p>Password: ${password}`
              };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };





          
 
//Staff Creation Email
export const staffaccountcreationemail = async(req, res) => {

    try{

    const{email, password} =req.body;
    
      const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
      });

    
    
              const mailoptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Eye2Wear - Staff Account Creation",
                html: `<p>An account has been created!</p></br></br>
                        <p>Here is your login details:</p>
                        <p>Email: ${email}</p></br>
                        <p>Password: ${password}`
              };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };






 //Owner Creation Email
export const owneraccountcreationemail = async(req, res) => {

    try{

    const{email, password} =req.body;
    
      const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
      });

    
    
              const mailoptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Eye2Wear - Owner Account Creation",
                html: `<p>An account has been created!</p></br></br>
                        <p>Here is your login details:</p>
                        <p>Email: ${email}</p></br>
                        <p>Password: ${password}`
              };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };     
          
 
          
   
          





 //Admin Creation Email
 export const adminaccountcreationemail = async(req, res) => {

    try{

    const{email, password} =req.body;
    
      const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
      });

    
    
              const mailoptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Eye2Wear - Admin Account Creation",
                html: `<p>An account has been created!</p></br></br>
                        <p>Here is your login details:</p>
                        <p>Email: ${email}</p></br>
                        <p>Password: ${password}`
              };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };                   
             
    