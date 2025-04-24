
import React from "react";
import {useState } from 'react';
import { useNavigate } from "react-router-dom";
import landingbg2 from "../src/assets/images/landingbg2.png";
import landinglogodark from  "../src/assets/images/landinglogodark.png";
import {Link} from "react-router-dom";









function UserLogin(){





          const [logindetails, setlogindetails] = useState({
            loginemail:'',
            loginpassword:''
         });


         //VARIABLES
         const [islogin, setislogin] = useState(false);
         const [loginnotice, setloginnotice] = useState({text:'', type:''});
         const navigate = useNavigate();


          //HANDLES THE CHANGES
           const handleloginchange = (e) => {
            const {name, value} = e. target;
            setlogindetails(prev => ({
                ...prev,
                [name]:value
            }));
         };






          //HANDLE THE SUBMISSION
          const handleloginsubmit = async (e) => {
            e.preventDefault();
            setislogin(true);
            setloginnotice({text:'', type:''});



            //SEND REQUEST TO THE BACKEND SERVER API 
            try{


              const  patientemailcheck = await fetch(`http://localhost:3000/api/patientaccounts/check-email/${logindetails.loginemail}`);
              const  patientemailexist = await  patientemailcheck.json();

              const adminemailcheck = await fetch(`http://localhost:3000/api/adminaccounts/check-email/${logindetails.loginemail}`);
              const adminemailexist = await adminemailcheck.json();

              if(!patientemailexist.exists && !adminemailexist.exists){
                throw new Error("Email does not exist");
              }


              const userisPatient =  patientemailexist.exists;
              const loginUrl = userisPatient ? "/api/patientaccounts/login" : "/api/adminaccounts/login";

              const body = userisPatient ? 
                {patientemail: logindetails.loginemail,
                 patientpassword: logindetails.loginpassword
                }:{
                 adminemail: logindetails.loginemail,
                 adminpassword: logindetails.loginpassword};

              

              const response = await fetch(loginUrl,{
                  method:"POST",
                  headers:{
                      "Content-Type":"application/json",
                  },
                  body: JSON.stringify(body)
              });


              //NOT SUCESSFUL LOGIN
              if(!response.ok){
                  const errordetails = await response.json();
                  throw new Error(errordetails.message || "Password not match");
              }

              //SUCCESSFUL LOGIN
              const data = await response.json();
              

              //If the user is patient it will assign token
              if(userisPatient){
                localStorage.setItem("patienttoken", data.jsontoken);
                localStorage.setItem("patientdetails", JSON.stringify(data.patient));

                
                setloginnotice({
                    text:"Patient Login Successful!",
                    type:"sucess"
                });
  

                setTimeout(() => {
                    navigate("/patientlandingpage");
                }, 2000);
              }


              //If the user is admin it will assign token
              else{
                localStorage.setItem("admintoken", data.jsontoken);
                localStorage.setItem("admindetails", JSON.stringify(data.admin));

                setloginnotice({
                    text:"Admin Login Successful!",
                    type:"sucess"
                });
  
  
       
                setTimeout(() => {
                    navigate("/admindashboard");
                }, 2000);
              }

              

          }
          //USES ERROR TO DISPLAY ERROR DATA
          catch (error){
              console.error("Error Login:", error);
              setloginnotice({
                  text:  error.message || "Login Failed:",
                  type: "error"
              });
          }
          finally{
              setislogin(false);
          }
        };

    




      
{/* 

        const[showforgotpasswordform, setshowforgotpasswordform] = useState(false);
        const[forgotpasswordmessage, setforgotpasswordmessage] = useState({text: '', type:''});
        const[forgotpasswordemail, setforgotpasswordemail] = useState('');
        const[issendingresetlink, setissendingresetlink] = useState(false);
    
        const forgotpassword = async (e) => {
     
         e.preventDefault();
         setissendingresetlink(true);
         setforgotpasswordmessage({text:'', type:''});
     
         try{
           const response = await fetch('http://localhost:3000/api/patientaccounts/forgot-password',{
             method: 'POST',
             headers: {'Content-Type' : 'application/json'},
             body: JSON.stringify({email: forgotpasswordemail})
           });
     
     
           const data = await response.json();
     
           if(!response.ok) throw new Error(data.message || "Failed to resend forgot-password link");
     
           setforgotpasswordmessage({
             text: "Reset link will be sent to the email",
             type: "success"
           });
     
           setforgotpasswordemail('');
     
         }catch(error){
           setforgotpasswordmessage({
             text: error.message || "Failed forgot-password request",
             type: "error"
           });
         }finally{
             setissendingresetlink(false);
         }
        };
 
  */}











 return (
            <>
        


      <section className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: `url(${landingbg2})` }}>



      <div>
        <img src={landinglogodark} className="w-130  mb-10  ml-16"/>
      </div>




      <div className="login-container  bg-gradient-to-tl flex x rounded-4xl h-140 w-120 shadow-lg">

          <form className="flex flex-col  ml-15 mt-15  w-full mr-15" onSubmit={handleloginsubmit}>

          <h1 className=" font-league text-[#3da9d1] text-[30px] mt-5 ">Sign In</h1>
             {loginnotice.text && (
              <div className={`message ${loginnotice.type} text-${loginnotice.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
             {loginnotice.text}
          </div>
         )}
              <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Hi there nice to see you again.</h1>


          <div className="form-group  mt-10">
            <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor= "loginemail">Email :</label>
            <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-11 h-10" placeholder="Enter your email..." type="text" name= "loginemail" id="loginemail" value={logindetails.loginemail} onChange={handleloginchange} required/></div>

          <div className="form-group mt-5">
            <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="loginpassword">Password : </label>
            <input className="bg-gray-200 text-[20px] text-gray-600 pl-3 rounded-2xl h-10" placeholder="Enter your password..."  type="password" name="loginpassword" id="loginpassword" value={logindetails.loginpassword} onChange={handleloginchange} required min="6"/></div>
          
          <div className=" h-[30px] mt-2 flex justify-end items-center pr-2"><p  onClick={() => setshowforgotpasswordform(true)}  className="text-[14px] hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out font-albertsans font-medium text-[#1b5770]">Forgot Password?</p></div>




            <button type="submit" disabled={islogin} className="submit-btn mt-12"   style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}> 

              {islogin ? "Loggin In..." : "Log In"}
            </button>



            <div className=" flex items-center justify-center mt-5">
              <h1 className="text-[16px] font-semibold text-[#4b4b53]">Don't have an account?</h1>
              <Link to="/patientregistration"> <div className=" flex justify-center items-center p-3  rounded-2xl hover:cursor-pointer hover:scale-105 transition-all text-[#]"><p className="font-bold text-[18px] text-[#177084]">Sign Up</p></div></Link>
            </div>

           </form>



      {/*    {showforgotpasswordform && (
                         <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

                           <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
                           <form className="flex flex-col  w-full h-fit "  onSubmit={forgotpassword}>

                              <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#125c99]"><i className="ml-3 bx bx-shield-quarter text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#e4e4e4]">Forgot Password</h1></div>
                              <div className="b flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                  <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Please enter your registered email below...</p>
                                  <div className="form-group  mt-5">
                                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor= "forgotemail">Email :</label>
                                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-11 h-10" placeholder="Enter your email..." type="email" name= "forgotemail" id="forgotemail" value={forgotpasswordemail} onChange={(e) => setforgotpasswordemail(e.target.value)} required/></div>
                                  </div>        
                                  <div className=" pr-5 flex justify-end  items-center  h-[80px] w-full">
                                      <div onClick={() => setshowforgotpasswordform(false)}  className="hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out bg-[#363638] rounded-2xl px-6 py-3 mr-1"><span className="font-albertsans text-white font-medium">Cancel</span></div>
                    

                                      <button type="submit" disabled={issendingresetlink} className="hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out bg-[#1b5f83] rounded-2xl px-9 py-3 mr-1" style={{ backgroundColor: "#1b5f83",paddingBottom:"10px", paddingTop:"10px", paddingLeft: "30px" , paddingRight: "30px", borderRadius: "12px"}}> 
                                       <span className="font-albertsans text-white font-medium">{issendingresetlink ? "Sending..." : "Send"}</span>
                                       </button>

                                  </div>
                              </div>

                           </form>
                           </div>
                         </div>
                     )} 


*/}

    </div>


    </section>






             
            </>
          )
        }
        
        export default UserLogin