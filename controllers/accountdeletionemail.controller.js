/* eslint-disable no-undef */


import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Patientaccount from "../models/patientaccount.js";
import Adminaccount from "../models/adminaccount.js";
import Owneraccount from "../models/owneraccount.js";
import Staffaccount from "../models/staffacount.js";



dotenv.config();



//Account deletion Email
export const patientaccountdeletionemail = async(req, res) => {

    try{

    const{email} =req.body;
    
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
                subject: "Eye2Wear - Patient Account Deletion",
                html: `<p>We would like to notify you that your account has been deleted</p></br></br>
`
              };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };





          
 
//Staff deletion Email
export const staffaccountdeletionemail = async(req, res) => {

    try{

    const{email} =req.body;
    
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
                subject: "Eye2Wear - Staff Account Deletion",
                html: `<p>We would like to notify you that your account has been deleted</p></br></br>`
      };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };






 //Owner deletion Email
export const owneraccountdeletionemail = async(req, res) => {

    try{

    const{email} =req.body;
    
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
                subject: "Eye2Wear - Owner Account Deletion",
                html: `<p>We would like to notify you that your account has been deleted</p></br></br>`
              };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };     
          
 
          
   
          





 //Admin deletion Email
 export const adminaccountdeletionemail = async(req, res) => {

    try{

    const{email} =req.body;
    
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
                subject: "Eye2Wear - Admin Account Deletion",
                html: `<p>We would like to notify you that your account has been deleted</p></br></br>`
              };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };                   
             
    