import React, {useState, useEffect } from "react";
import {Link} from "react-router-dom";
import landingbg2 from "../src/assets/images/landingbg2.png";
import landingbg3 from "../src/assets/images/landingbg3.png";
import bentoglass from "../src/assets/images/bentoglass.png";
import bentomachines from "../src/assets/images/bentomachine.png";
import bentofeedback from "../src/assets/images/bentofeedback.png";
import bentosurgery from "../src/assets/images/bentosurgery.png";
import bentoexam from "../src/assets/images/bentoexam.png";
import bentoconsult from "../src/assets/images/bentoconsult.png";
import landinglogodark from  "../src/assets/images/landinglogodark.png";
import lonelogo from  "../src/assets/images/lonelogo.png";
import navlogo from  "../src/assets/images/navlogo.png";
import Typewriter from "typewriter-effect";
import eyemodel2 from "../src/assets/images/eyemodel2.png";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import profileuser from "../src/assets/images/profile-user.png";
import logout from "../src/assets/images/logout.png";
import usersicon from "../src/assets/images/multiuserss.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "./hooks/patientuseAuth";



function PatientLandingpage(){


 

  
  const [patientfirstname, setpatientfirstname] = useState('');
  const [patientprofilepicture, setpatientprofilepicture] = useState('');
  const [showlogoutbtn, setshowlogoutbtn] = useState(false);
  const showlogout = () => {
    setshowlogoutbtn(!showlogoutbtn);
  }
 const {handlelogout, fetchpatientdetails} = useAuth();


  //Retrieveing Data from useAuth Hook
  useEffect(() => {
    const loadpatient = async () => {
      const data = await fetchpatientdetails();

      if(data){
        setpatientfirstname(data.patientfirstname || '');
        setpatientprofilepicture(data.patientprofilepicture || '');
      }
    };

    loadpatient();
  }, [fetchpatientdetails]);





















  return (
    <>

     {/* NavBar */}
<div className="bg-white w-full relative z-10 mb-10">
  <header id="header" className="top-0 absolute flex justify-between items-center text-black md:px-32 bg-white w-full drop-shadow-md z-50">
        <a id:logocontain href="#">
          <img src={navlogo} alt="" className="w-33  hover:scale-105 transition-all"></img>
        </a>

        <ul id:listcontain  className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <Link to="/patientlandingpage" className="text-[#000000] hover:text-white no-underline"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white text-black  rounded-md transition-all cursor-pointer">Home</li></Link>
        <Link to="/patientdashboard"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Appointments</li></Link>
        <Link to="/patientproducts"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Store</li></Link>
         <Link to="/patientwishlist"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Wishlist</li></Link>
        <Link to="/patientorders"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Orders</li></Link>





        </ul>

      {/* Search 
      
              <div className="relative hidden md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"></input>
        </div>
        
      */}



 
    {localStorage.getItem("patienttoken") ? (
      <div id="profilecard" className="relative items-center justify-center flex">
        <div id="profile" onClick={showlogout} className="ml-3 flex justify-center items-center bg-[#fbfbfb00] border-2 border-gray-200 shadow-lg rounded-full hover:cursor-pointer hover:scale-105 transition-all">
          <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-13 w-13 rounded-full"/>
        </div>

        {showlogoutbtn && (
          <div className="w-75 flex-col p-5 motion-preset-fade absolute top-full mt-2 z-[9999] flex justify-center items-start bg-[#ffffff] rounded-2xl hover:cursor-pointer transition-all shadow-lg">
            <div className="hover:bg-[#f7f7f7] transition-all duration-300 ease-in-out py-2 px-1 rounded-2xl gap-3 flex items-center h-auto w-full">
              <img src={patientprofilepicture} className="w-12 rounded-full"/>
              <h1 className="font-albertsans font-semibold text-[19px]">{patientfirstname}</h1>
            </div>
            <div className="border-b-2 rounded-full border-[#747474] h-1 w-full my-1"></div>

            {localStorage.getItem("patienttoken") && (
              <Link to="/patientinformation" className="w-full">
                <div className="gap-2 flex items-center py-2 px-1 hover:bg-[#f7f7f7] duration-300 ease-in-out hover:text-[#000000] rounded-2xl transition-all cursor-pointer">
                  <img src={profileuser} className="w-9 h-9"/>
                  <h1 className="text-[16px] text-[#202020]">Demographic Profile</h1>
                </div>
              </Link>
            )}

            <div id="logoutdiv" className="mt-2 px-1 py-2 hover:bg-[#f7f7f7] flex items-center gap-2 w-full rounded-2xl hover:cursor-pointer transition-all" onClick={handlelogout}>
              <img src={logout} className="w-9 h-9"/>
              <p className="font-semibold text-[#E04F5F] text-[16px]">Logout</p>
            </div>
          </div>
        )}
      </div>
    ) : (

      <Link to="/userlogin">
         <div className="ml-3  flex justify-center items-center p-3 bg-[#027bbf] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" onClick={handlelogout}>
         <i className="bx bx-user-circle mt-1 pr-2 font-semibold text-white text-[17px]"/>
         <p className="font-semibold text-white text-[17px]">Login</p>
       </div>
      </Link>
    )
  
  }
     

     {/* Dropdown menu 
             <div className="bx bx-menu block  sm:opacity-100 text-5xl cursor-pointer" onClick={() => setismenuopen(!ismenuopen)}></div>
        <div className={`absolute xl:hidden top-24 left-0 w-full text-white bg-sky-700 rounded-3xl mt-5 mr-5 ml-5 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform
          ${ismenuopen ? "opacity-100" : "opacity-0"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>


          <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-p">Home</li>
          <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">Product</li>
          <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">Explore</li>
          <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">Contact</li>
          </div>
 */}


      </header>
    </div>












    {/* First Section */} {/* First Section */} {/* First Section */} {/* First Section */}
    <section className=" h-full w-full flex justify-center align-center" >
    <div className="bg-cover bg-center h-screen flex items-center justify-center " style={{ backgroundImage: `url(${landingbg2})` }}>

      {/* Left Side */}
            <div className="  w-[95%] h-[100%] items-center justify-center pt-[90px] pl-14">
            <div className=" ml-17 mr-28 mb-10 flex flex-row">
              <p className="bg-gradient-to-r from-blue-500 to-blue-800  text-white pl-4 pr-4 pt-0.5 pb-0.5 rounded-2xl text-[20px] mr-3 font-semibold italic">New</p>
              <p className="bg-[#027bbf]  text-white pl-4 pr-4 pt-0.5 pb-0.5 rounded-2xl text-[20px] mr-3 font-semibold italic  "> Development in progress...</p>
            </div>
              <img src={landinglogodark} className="w-130  mt-5  ml-16"/>
              <h1 className="text-[40px]  pl-17 mt-8 font-albertsans font-bold italic text-[#2d2d44] ">
              <Typewriter options={{
                strings: ['Greet the world with a better view!', 'In collaboration with:', 'Ambher Optical,', 'Bautista Eye Center,', 'and DevOps Team!'], 
                autoStart:true, loop:true, cursor: '|'}}/></h1>
             
              <div className="border-b-2 ml-17 mr-28 border-blue-950  pb-5">
             
              <p className=" text-[20px]  mt-8 font-semibold italic text-[#2d2d44] ">"Redefining eyewear with style, innovation, and clarity. Experience the future of vision at Eye2Wear—where every eyesight tells a story."</p>
              
              <div className="flex mt-10">
              <div className="mt-5 flex justify-center align-middle p-3  bg-gray-800 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all"><i className="bx bx-expand-alt mt-1 pr-2 font-bold text-white"/><p className="font-semibold text-white">Explore</p></div>
              {localStorage.getItem("patienttoken") && (
              <Link to="/patientdashboard"><div  className="ml-3 mt-5 flex justify-center align-middle p-3 bg-[#027bbf] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-bookmark mt-1 pr-2 text-white"/><p className="font-semibold text-white">Book Appointment</p></div></Link>
          )}
            
              </div>
              </div>

              <div className=" ml-17 mt-6 mr-28 flex justify-start">
              <img src={usersicon} className="w-30 h-11  mr-5"/>
                <div>
                <div className="flex justify-start">
                <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={4.5} precision={4} readOnly />
                </Stack>
                <p className="ml-2  font-semibold  text-[#2d2d44]">4.0/5</p>
                </div>
                <div className="font-regular  text-[#2d2d44]">Trusted by 1000+ patients nationwide</div>
                </div>
              </div>
         
            </div>



      {/* Right Side */}
            <div className=" translate-z-9 w-[95%] h-[100%] items-center justify-center ">
            <img src={eyemodel2} className="w-140 h-140  ml-20 mt-[35px] pr-6 rotate-[-0.3deg]"/>
          
            </div>

          </div>
        </section>




     {/* Second Section */} {/* Second Section */} {/* Second Section */} {/* Second Section */} {/* Second Section */}
     <section className="bg-white h-[160vh] w-[99.5%]" >


      <div className="bg-cover bg-center w-full h-screen  flex flex-col items-center " style={{ backgroundImage: `url(${landingbg3})` }}>

        
          <img src={lonelogo} className="w-30  mt-30"   style={{ animation: 'spin 8s linear infinite' }}/>
          <h1 className="font-albertsans font-bold italic text-[#25255b] text-[25px] mt-5">A shared foundation to <span className="text-sky-600 font-matimo"> serve the best </span> optical clinic</h1>
          <h2 className="text-[18px] font-medium italic text-[#2d2d44]">Redefining the patient experience</h2>


          <div className=" w-screen h-max flex justify-center align-center">
                <div className=" mt-15 w-full max-w-[1400px] h-[800px] flex justify-between align-center">
                  <div className=" h-full w-[70%] ">
                    <div className=" h-[50%] pt-5 pr-2 pl-5 flex justify-center align-start">
                        <div className="bg-cover bg-center w-[60%] hover:scale-105 transition-all bg-white border-1 border-gray-200 shadow-md mr-5 rounded-4xl flex flex-col justify-end pl-10 pb-10" style={{ backgroundImage: `url(${bentoglass})` }}>
                          <h1 className="font-albertsans font-semibold italic text-white text-[25px] ">Browse our products</h1>
                          <p className="text-[15px] font-medium italic text-white">Try different frames, eyeglasses, and contact lenses.</p>
                          </div>
                        <div className="bg-cover bg-center bg-white border-1 border-gray-200   hover:scale-105 transition-all shadow-md w-[40%] rounded-4xl flex flex-col justify-end pl-10 pb-10" style={{ backgroundImage: `url(${bentofeedback})` }}>
                        <h1 className="font-albertsans font-semibold italic text-white text-[25px] ">Positive Feedbacks</h1>
                        <p className="text-[15px] font-medium italic text-white">Best effort in every service</p>
                        </div>
                    </div>
                    <div className=" h-[50%] pr-2 pt-5 pl-5 flex justify-center align-center">
                        <div className="bg-cover bg-center bg-white border-1 border-gray-200 hover:scale-105 transition-all  shadow-md mr-5 w-[40%] rounded-4xl flex flex-col justify-end pl-10 pb-10" style={{ backgroundImage: `url(${bentosurgery})` }}>
                        <h1 className="font-albertsans font-semibold italic text-white text-[25px] ">Eye Surgeries</h1>
                        <p className="text-[15px] font-medium italic text-white">Careful treatment of eye diseases</p>
                        </div>
                       <div className="bg-cover bg-center bg-white border-1 border-gray-200  hover:scale-105 transition-all shadow-md w-[60%] rounded-4xl flex flex-col justify-end pl-10 pb-10"style={{ backgroundImage: `url(${bentoexam})` }}>
                       <h1 className="font-albertsans font-semibold italic text-white text-[25px] ">Comprehensive Eye Exam</h1>
                       <p className="text-[15px] font-medium italic text-white">Evaluation of eye health and vision</p>
                       </div>
                    </div>
                  </div>
                  <div className=" h-full w-[30%] pl-2 pt-5 pb-5 pr-5">
                    <div className="bg-cover bg-center bg-white border-1 border-gray-200 hover:scale-105 transition-all  shadow-md h-[60%] rounded-4xl mb-5 flex flex-col justify-end pl-10 pb-10" style={{ backgroundImage: `url(${bentomachines})` }}>
                    <h1 className="font-albertsans font-semibold italic text-white text-[25px] ">Quality Machines</h1>
                    <p className="text-[15px] font-medium italic text-white">Updated eye-exam technologies</p>
                    </div>
                    <div className="bg-cover bg-center bg-white border-1 border-gray-200 hover:scale-105 transition-all  shadow-md h-[40%] rounded-4xl flex flex-col justify-end pl-10 pb-10" style={{ backgroundImage: `url(${bentoconsult})` }}>
                    <h1 className="font-albertsans font-semibold italic text-white text-[25px] ">Virtual Eye Consultation</h1>
                    <p className="text-[15px] font-medium italic text-white">Effecient consultation with eye-specialists</p>
                    </div>
                  </div>
                </div>
          </div>
      </div>


      </section>



      {/*
     {/* Third Section */} {/* Third Section */} {/* Third Section */} {/* Third Section */} {/* Third Section 
     <section className="bg-white h-[270vh] w-[98vw]  " >


     <div className="bg-cover bg-center h-[270vh] flex flex-col items-center " >
          <h1 className="font-albertsans font-bold italic text-[#25255b] text-[60px] mt-20">Optometrist & Ophthalmologist</h1>
          <h2 className="text-[25px] font-medium italic text-[#2d2d44]">What makes them different?</h2>

      </div>


     </section>*/}


{/* 
     {/* Fourth Section */} {/* Fourth Section */} {/* Fourth Section */} {/* Fourth Section */} {/* Fourth Section 
      <section className="bg-white h-screen w-[98vw]" >


      <div className="bg-cover bg-center h-screen  flex items-center justify-center " >
    
      </div>


    </section> */}
 {/*

    {/* Fifth Section */} {/* Fifth Section */} {/* Fifth Section */} {/* Fifth Section */} {/* Fifth Section    
    <section className="bg-white h-screen w-[98vw]" >


    <div className="bg-cover bg-center h-screen  flex items-center justify-center" >

      </div>


    </section>
*/}



        






    </>
   )
  }
        
export default PatientLandingpage