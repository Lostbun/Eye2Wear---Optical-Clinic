
import React from "react";
import {useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import landingbg2 from "../src/assets/images/landingbg2.png";
import {Link} from "react-router-dom";
import axios from "axios";








function ResetPassword(){

    axios.defaults.withCredentials = true;

  

        const {id, token} = useParams();
        const navigate = useNavigate();
        const[resetpasswordmessage, setresetpasswordmessage] = useState({text: '', type:''});
        const[resetpasswordnew, setresetpasswordnew] = useState('');
        const[issavingnewpassword, setissavingnewpassword] = useState(false);


        
       const resetpassword = async (e) => {
        e.preventDefault();
        setissavingnewpassword(true);


        try{
          const response = await axios.post(`http://localhost:3000/api/auth/reset-password/${id}/${token}`,
            {newpassword: resetpasswordnew},
            {timeout: 10000}
          );


          if(response.data.Status === "Success"){
            setresetpasswordmessage({
              text: "Successfully updated! Redirecting to Login Page...",
              type: "success"
            });
          }

          setTimeout(() => navigate('/userlogin'), 2000);



        }catch(error){

          const serverresponse = error.response?.data?.message;
          const statusresponse = error.response?.status;
          let displayresult = "Password Reset Failed";

          if(statusresponse === 401) displayresult ="Invalid Reset Password Link";
          if(statusresponse === 404) displayresult ="Account does not exist";
          if(serverresponse) displayresult = serverresponse;

          setresetpasswordmessage({text: displayresult, type: "error"});
          
       } 
           finally {
            setissavingnewpassword(false);
          }
        };












 return (
            <>
        


      <section className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: `url(${landingbg2})` }}>




                         <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

                           <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
                           <form className="flex flex-col  w-full h-fit "  onSubmit={resetpassword}>

                              <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#125c99]"><i className="ml-3 bx bx-shield-quarter text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#e4e4e4]">Reset Password</h1></div>
                              <div className="b flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                  <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Please enter your new password below...</p>
      
                                  {resetpasswordmessage.text && (
                                    <div className={`text-sm ${
                                      resetpasswordmessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {resetpasswordmessage.text}</div>
                                  )}

                                  <div className="form-group  mt-5">
                                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor= "newpassword">New Password :</label>
                                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-11 h-10" placeholder="Enter your new password..." type="password" name= "newpassword" id="newpassword" value={resetpasswordnew} onChange={(e) => setresetpasswordnew(e.target.value)} required/></div>
                                  </div>        
                                  <div className=" pr-5 flex justify-end  items-center  h-[80px] w-full">
                    

                                      <button type="submit" disabled={issavingnewpassword} className="hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out bg-[#1b5f83] rounded-2xl px-9 py-3 mr-1 flex items-center justify-center gap-2" style={{ backgroundColor: "#1b5f83",paddingBottom:"10px", paddingTop:"10px", paddingLeft: "30px" , paddingRight: "30px", borderRadius: "12px"}}> 
                                       {issavingnewpassword ? (
                                        <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  className="text-white animate-spin h-5 w-5 ">
                                        <circle cx="12" cy="12" stroke="currentColor" className="opacity-25" r="10" strokeWidth="4" ></circle>
                                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="font-albertsans text-white font-medium">Saving..</span>
                                        </>
                                       ):(
                                        <span className="font-albertsans text-white font-medium">Save</span>
                                       )}
                                       </button>

                                  </div>
                              </div>

                           </form>
                           </div>
                         </div>
                  
      




    </section>






             
            </>
          )
        }
        
        export default ResetPassword