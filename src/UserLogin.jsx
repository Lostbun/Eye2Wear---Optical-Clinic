
import React from "react";
import {useState } from 'react';
import { useNavigate } from "react-router-dom";
import landingbg2 from "../src/assets/images/landingbg2.png";
import landinglogodark from  "../src/assets/images/landinglogodark.png";
import {Link} from "react-router-dom";
import axios from "axios";








function UserLogin(){
  const apiUrl = import.meta.env.VITE_API_URL;

  // Clear localStorage when component mounts
  React.useEffect(() => {
    localStorage.clear();
    console.log('LocalStorage cleared on login page');
  }, []);

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
  setloginnotice({ text: '', type: '' });

  try {
    // Use relative URLs
    const patientemailcheck = await fetch(`/api/patientaccounts/check-email/${logindetails.loginemail}`);
    const patientemailexist = await patientemailcheck.json();

    const staffemailcheck = await fetch(`/api/staffaccounts/check-email/${logindetails.loginemail}`);
    const staffemailexist = await staffemailcheck.json();

    const owneremailcheck = await fetch(`/api/owneraccounts/check-email/${logindetails.loginemail}`);
    const owneremailexist = await owneremailcheck.json();

    const adminemailcheck = await fetch(`/api/adminaccounts/check-email/${logindetails.loginemail}`);
    const adminemailexist = await adminemailcheck.json();

    if (!patientemailexist.exists && !adminemailexist.exists && !staffemailexist.exists && !owneremailexist.exists) {
      throw new Error("Email does not exist");
    }

    let user = '';
    let loginUrl = '';
    let body = {};

    if (patientemailexist.exists) {
      user = 'Patient';
      loginUrl = '/api/patientaccounts/login';
      body = {
        patientemail: logindetails.loginemail,
        patientpassword: logindetails.loginpassword,
      };
    } else if (staffemailexist.exists) {
      user = 'Staff';
      loginUrl = '/api/staffaccounts/login';
      body = {
        staffemail: logindetails.loginemail,
        staffpassword: logindetails.loginpassword,
      };
    } else if (owneremailexist.exists) {
      user = 'Owner';
      loginUrl = '/api/owneraccounts/login';
      body = {
        owneremail: logindetails.loginemail,
        ownerpassword: logindetails.loginpassword,
      };
    } else if (adminemailexist.exists) {
      user = 'Admin';
      loginUrl = '/api/adminaccounts/login';
      body = {
        adminemail: logindetails.loginemail,
        adminpassword: logindetails.loginpassword,
      };
    }

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errordetails = await response.json();
      throw new Error(errordetails.message || 'Password does not match');
    }

    const data = await response.json();
              

              //If the user is patient it will assign token
if(user === 'Patient'){
  localStorage.setItem("patienttoken", data.jsontoken);
  localStorage.setItem("patientdetails", JSON.stringify(data.patient));
  localStorage.setItem("patientid", data.patient._id);
  localStorage.setItem("patientemail", data.patient.patientemail);
  localStorage.setItem("patientfirstname", data.patient.patientfirstname);
  localStorage.setItem("patientlastname", data.patient.patientlastname);
  localStorage.setItem("patientname", data.patient.patientfirstname + " " + data.patient.patientlastname);
  localStorage.setItem('role', 'patient');
  localStorage.setItem('token', data.jsontoken);
  localStorage.setItem('needsSocketInit', 'true');
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.jsontoken}`;
  
  setloginnotice({
    text:"Patient Login Successful!",
    type:"success"
  });

  setTimeout(() => {
    navigate("/patientlandingpage");
  }, 2000);
}

else if(user === 'Staff'){
  localStorage.setItem("stafftoken", data.jsontoken);
  localStorage.setItem("staffdetails", JSON.stringify(data.staff));
  localStorage.setItem("staffid", data.staff._id); // ADD THIS LINE
  localStorage.setItem("staffemail", data.staff.staffemail);
  localStorage.setItem("staffname", data.staff.stafffirstname + " " + data.staff.stafflastname);
  localStorage.setItem("staffclinic", data.staff.staffclinic);
  localStorage.setItem('role', 'staff');
  localStorage.setItem('token', data.jsontoken);
  localStorage.setItem('needsSocketInit', 'true');


  localStorage.setItem("currentuser", JSON.stringify({
    type: 'Staff',
    firstname: data.staff.stafffirstname,
    middlename: data.staff.staffmiddlename,
    lastname: data.staff.stafflastname,
    email: data.staff.staffemail,
    profilepicture: data.staff.staffprofilepicture
  }));

  setloginnotice({
    text:"Staff Login Successful!",
    type:"success"
  });

  setTimeout(() => {
    navigate("/admindashboard");
  }, 2000);
}

else if(user === 'Owner'){
  localStorage.setItem("ownertoken", data.jsontoken);
  localStorage.setItem("ownerdetails", JSON.stringify(data.owner));
  localStorage.setItem("ownerid", data.owner._id); // ADD THIS LINE
  localStorage.setItem("owneremail", data.owner.owneremail);
  localStorage.setItem("ownerclinic", data.owner.ownerclinic);
  localStorage.setItem("ownername", data.owner.ownerfirstname + " " + data.owner.ownerlastname);
  localStorage.setItem('role', 'owner');
  localStorage.setItem('token', data.jsontoken);
  localStorage.setItem('needsSocketInit', 'true');
  
  localStorage.setItem("currentuser", JSON.stringify({
    type: 'Staff',
    firstname: data.owner.ownerfirstname,
    middlename: data.owner.ownermiddlename,
    lastname: data.owner.ownerlastname,
    email: data.owner.owneremail,
    profilepicture: data.owner.ownerprofilepicture
  }));
  
  setloginnotice({
    text:"Owner Login Successful!",
    type:"success"
  });

  setTimeout(() => {
    navigate("/admindashboard");
  }, 2000);
}


              else if(user  === 'Admin'){
                localStorage.setItem("admintoken", data.jsontoken);
                localStorage.setItem("currentuser", JSON.stringify({
                  type: 'Admin',
                  firstname: data.admin.adminfirstname,
                  middlename: data.admin.adminmiddlename,
                  lastname: data.admin.adminlastname,
                  email: data.admin.adminemail,
                  profilepicture: data.admin.adminprofilepicture
                }));
                
                setloginnotice({
                    text:"Admin Login Successful!",
                    type:"success"
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

    




      
 

        const[showforgotpasswordform, setshowforgotpasswordform] = useState(false);
        const[forgotpasswordmessage, setforgotpasswordmessage] = useState({text: '', type:''});
        const[forgotpasswordemail, setforgotpasswordemail] = useState('');
        const[issendingresetlink, setissendingresetlink] = useState(false);

        axios.defaults.withCredentials = true;
        



        const forgotpassword = async (e) => {
     
         e.preventDefault();
         setissendingresetlink(true);
         setforgotpasswordmessage({text: '', type:''});

         try{

          const res = await axios.post(`${apiUrl}/api/auth/forgot-password`, {email: forgotpasswordemail});
           
 
  
            if(res.data.Status === "Success") {
              setissendingresetlink(true);
              setforgotpasswordmessage({
                text: `Reset password link is sent to your email ${forgotpasswordemail}`,
                type: "success"
              });

             setTimeout(() => {
              setshowforgotpasswordform(false);
              setforgotpasswordemail('');
              setforgotpasswordmessage({text:'', type: ''});
             }, 2000); 
           
            }


         }catch(err){

            setforgotpasswordmessage({
              text: err.response?.data?.message || "Failed to send reset password link",
              type: "error"
            });

         }finally{
              setissendingresetlink(false);
         }
         


        };
 
  



  
         







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
          
          <div className=" h-[30px] mt-2 flex justify-end items-center pr-2"><p  onClick={() => setshowforgotpasswordform(true)} className="text-[14px] hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out font-albertsans font-medium text-[#1b5770]">Forgot Password?</p></div>




            <button type="submit" disabled={islogin} className="submit-btn mt-12"   style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}> 

              {islogin ? "Loggin In..." : "Log In"}
            </button>



            <div className=" flex items-center justify-center mt-5">
              <h1 className="text-[16px] font-semibold text-[#4b4b53]">Don't have an account?</h1>
              <Link to="/patientregistration"> <div className=" flex justify-center items-center p-3  rounded-2xl hover:cursor-pointer hover:scale-105 transition-all text-[#]"><p className="font-bold text-[18px] text-[#177084]">Sign Up</p></div></Link>
            </div>

           </form>



        {showforgotpasswordform && (
                         <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

                           <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
                           <form className="flex flex-col  w-full h-fit "  onSubmit={forgotpassword}>

                              <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#125c99]"><i className="ml-3 bx bx-shield-quarter text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#e4e4e4]">Forgot Password</h1></div>
                              <div className="b flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                  <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Please enter your registered email below...</p>
      
                                  {forgotpasswordmessage.text && (
                                    <div className={`text-sm ${
                                      forgotpasswordmessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {forgotpasswordmessage.text}</div>
                                  )}

                                  <div className="form-group  mt-5">
                                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor= "forgotemail">Email :</label>
                                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-11 h-10" placeholder="Enter your email..." type="email" name= "forgotemail" id="forgotemail" value={forgotpasswordemail} onChange={(e) => setforgotpasswordemail(e.target.value)} required/></div>
                                  </div>        
                                  <div className=" pr-5 flex justify-end  items-center  h-[80px] w-full">
                                      <div onClick={() => {setshowforgotpasswordform(false); setforgotpasswordemail(''); setforgotpasswordmessage({text:'', type: ''});}}  className="hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out bg-[#363638] rounded-2xl px-6 py-3 mr-1"><span className="font-albertsans text-white font-medium">Cancel</span></div>
                    

                                      <button type="submit" disabled={issendingresetlink} className="hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out bg-[#1b5f83] rounded-2xl px-9 py-3 mr-1 flex items-center justify-center gap-2" style={{ backgroundColor: "#1b5f83",paddingBottom:"10px", paddingTop:"10px", paddingLeft: "30px" , paddingRight: "30px", borderRadius: "12px"}}> 
                                       {issendingresetlink ? (
                                        <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  className="text-white animate-spin h-5 w-5 ">
                                        <circle cx="12" cy="12" stroke="currentColor" className="opacity-25" r="10" strokeWidth="4" ></circle>
                                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="font-albertsans text-white font-medium">Sending..</span>
                                        </>
                                       ):(
                                        <span className="font-albertsans text-white font-medium">Send</span>
                                       )}
                                       </button>

                                  </div>
                              </div>

                           </form>
                           </div>
                         </div>
                     )} 





                  
      



    </div>


    </section>






             
            </>
          )
        }
        
        export default UserLogin