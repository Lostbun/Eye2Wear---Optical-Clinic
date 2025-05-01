/* eslint-disable no-undef */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Patientaccount from "../models/patientaccount.js";
import Adminaccount from "../models/adminaccount.js";
import Owneraccount from "../models/owneraccount.js";
import Staffaccount from "../models/staffacount.js";



dotenv.config();



//FORGOT PASSWORD USED IN USERLOGIN.JSX

export const forgotpassword = async(req, res) => {

    try{
      const {email} = req.body;

      const useraccounttypes = [
        {model: Patientaccount, emailfield: 'patientemail', type: 'patient'},
        {model: Staffaccount, emailfield: 'staffemail', type: 'staff'},
        {model: Owneraccount, emailfield: 'owneremail', type: 'owner'},
        {model: Adminaccount, emailfield: 'adminemail', type: 'admin'},
      ];

    
      let foundaccount = null;
      let useraccounttype = null;

      for (const useracctype of useraccounttypes) {
        const query = {};
        query[useracctype.emailfield] = email;
        const account = await useracctype.model.findOne(query);


      
      if(account) {
        foundaccount = account;
        useraccounttype = useracctype.type;
        break;
        }
      }



      if(!foundaccount) {
        return res.status(404).json({Status: "Error", message: "Account does not exist"});
      }



    
      const forgottoken = jwt.sign({id: foundaccount._id, type: useraccounttype}, process.env.JWT_KEY, {expiresIn: "1d"});
         
      const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
      });

      const forgotlink = `http://localhost:5173/reset-password/${foundaccount._id}/${forgottoken}`;
    
    
              const mailoptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Eye2Wear - Password Reset",
                html: `<p>Click the provided link to reset your password: 
                <a href="${forgotlink}">
                Reset Password</a></p>`
              };
    
              
              await transporter.sendMail(mailoptions);
              res.status(200).json({Status: "Success"});
              
    
            }catch(error){
              console.error(error);
              res.status(500).json({Status: "Error", message: "Server error"});
            }
    
          };
    







          
    
    
    
    
    
      //RESET PASSWORD
    
      export const resetpassword = async (req,res) => {
        const {id, token} = req.params;
        const {newpassword} = req.body;
    
        try{
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          console.log('Extracted token: ', decoded);
    
          if(decoded.id !== id){
            console.error("ID not matched: ", decoded.id, 'and', id);
            return res.status(401).json({Status: "Error", message:"Invalid user token"});
          }
    
          if(!newpassword || newpassword.length < 6) {
            return res.status(400).json({Status: "Error", message:"Password must be at least 6 characters"});
          }





          let model;
          let resetpasswordfield;

          switch(decoded.type) {
            case 'patient' :
                model = Patientaccount;
                resetpasswordfield = 'patientpassword';
                break;

            case 'staff' :
                model = Staffaccount;
                resetpasswordfield = 'staffpassword';
                break;
                
            case 'owner' :
                model = Owneraccount;
                resetpasswordfield = 'ownerpassword';
                break;

            case 'admin' :
                model = Adminaccount;
                resetpasswordfield = 'adminpassword';
                break;
            
            default:
                return res.status(400).json({Status: "Error", message:"Invalid account type"});

          }


    
          const account = await model.findById(id);
          if(!account){
            console.error("Patient does not exist: ", id);
            return res.status(400).json({Status: "Error", message:"Account not found"});
          }



    

          account[resetpasswordfield] = newpassword;
          await account.save();
          console.log("Password has been successfully reset! ", id);
          return res.status(200).json({Status: "Success", message:"Account password successfully updated!"});
    
    
    
        }catch(error){
          
          console.error("Password Reset Failed: ", error);
          if(error.name ==="JsonWebTokenError"){
            return res.status(401).json({Status: "Error", message:"Invalid password reset link"});
          }
    
          if(error.name ==="TokenExpiredError"){
            return res.status(401).json({Status: "Error", message:"Password reset link is already expired"});
          }
    
          return res.status(500).json({Status: "Error", message:"Internal Server Error!"});
        }
    
      };
    