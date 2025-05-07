import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import navlogo from  "../src/assets/images/navlogo.png";
import landingbg2 from "../src/assets/images/landingbg2.png";
import defaultprofilepic from '../src/assets/images/defaulticon.png';
import ambherlogo from '../src/assets/images/ambherlogo.png';
import bautistalogo from '../src/assets/images/bautistalogo.png';
import darklogo from "../src/assets/images/darklogo.png";

import { useAuth } from "./hooks/patientuseAuth";



function PatientDashboard(){



  
    const [sidebarexpanded, setsidebarexpanded] = useState(false);
    const togglepatientsidebar = () => {
      setsidebarexpanded(!sidebarexpanded);
    }

  const [activedashboard, setactivedashboard] = useState('appointment');
  const showdashboard = (dashboardid) => {
     setactivedashboard(dashboardid);
  };

  const [activeappointmenttable, setactiveappointmenttable] = useState('bookappointment');
  const showappointmenttable = (appointmenttableid) => {
        setactiveappointmenttable(appointmenttableid);
  };










  
  const [patientfirstname, setpatientfirstname] = useState('');
  const [patientprofilepicture, setpatientprofilepicture] = useState('');
  const [showlogoutbtn, setshowlogoutbtn] = useState(false);
  const showlogout = () => {
    setshowlogoutbtn(!showlogoutbtn);
  }



 const {handlelogout, fetchpatientdetails, fetchpatientdemographicbyemail} = useAuth();

  //Retrieveing Data from useAuth Hook
  useEffect(() => {
    const loadpatient = async () => {

      try{

      const data = await fetchpatientdetails();
      if(data){
        setpatientfirstname(data.patientfirstname || '');
        setpatientprofilepicture(data.patientprofilepicture || '');
        localStorage.setItem("patientemail", data.patientemail);
      }
    }catch(error){

        console.error("Error fetching patient details", error);

    }
   }; loadpatient();
  }, [fetchpatientdetails]);





  const [patientdemographics, setpatientdemographics] = useState(null);

  useEffect(() => {
    const loadingpatientdemographics = async (email) => {
      try{
        const demgoraphicdata = await fetchpatientdemographicbyemail(email);
        setpatientdemographics(demgoraphicdata || {});

      }catch(error){
        console.error("Failed fetching patientdemo", error);
      }
    };

    if(patientfirstname && !patientdemographics) {
      const email = localStorage.getItem("patientemail");

      if(email) {
        loadingpatientdemographics(email);
      }
    }
  }, [patientfirstname, patientdemographics, fetchpatientdemographicbyemail]);





    const [issubmitting, setissubmitting] = useState(false);

  const [additionaldetails, setadditionaldetails] = useState("");


  const textarearef = useRef(null);
  const adjusttextareaheight = () => {
    if(textarearef.current){
      textarearef.current.style.height = 'auto';
      textarearef.current.style.height = `${textarearef.current.scrollHeight}px`;
    }
  }




  useEffect(() => {
    adjusttextareaheight();
  });















 //INSERTING PATIENT APPOINTMENT FORM TO DATABASE //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  
 //INSERTING PATIENT APPOINTMENT FORM TO DATABASE //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  
 //INSERTING PATIENT APPOINTMENT FORM TO DATABASE //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  
 //INSERTING PATIENT APPOINTMENT FORM TO DATABASE //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  
 //INSERTING PATIENT APPOINTMENT FORM TO DATABASE //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  //INSERTING PATIENT APPOINTMENT FORM TO DATABASE  
const patientsubmitappointment = async (formData) => {
  setissubmitting(true);

  try{


    const patientappointmentdata = {

      patientappointmentstatus: "Pending",

      patientappointmentprofilepicture: patientdemographics?.patientprofilepicture || '',
      patientappointmentlastname: patientdemographics?.patientlastname || '',
      patientappointmentfirstname: patientdemographics?.patientfirstname || '',
      patientappointmentmiddlename: patientdemographics?.patientmiddlename || '',
      patientappointmentemail: patientdemographics?.patientemail || '',


      patientappointmentstaffname:"Staff Name",
      


      // Ambher Optical Clinic Data
      patientambherappointmenteyespecialist: "Optometrist Name",
      patientambherappointmentstaffname: "Ambher Staff Name",
      patientambherappointmentdate: formData.get('patientambherappointmentdate'),
      patientambherappointmenttime: formData.get('patientambherappointmenttime'),
      patientambherappointmentcataractscreening: formData.has('patientambherappointmentcataractscreening'),
      patientambherappointmentpediatricassessment: formData.has('patientambherappointmentpediatricassessment'),
      patientambherappointmentcolorvisiontesting: formData.has('patientambherappointmentcolorvisiontesting'),
      patientambherappointmentlowvisionaid: formData.has('patientambherappointmentlowvisionaid'),
      patientambherappointmentrefraction: formData.has('patientambherappointmentrefraction'),
      patientambherappointmentcontactlensefitting: formData.has('patientambherappointmentcontactlensefitting'),
      patientambherappointmentstatus: "Pending",
      patientambherappointmentpaymentotal: 1000,


      



      // Bautista Eye Clinic Data
      patientbautistaappointmenteyespecialist: "Ophthalmologist Name",
      patientbautistaappointmentstaffname: "Bautista Staff Name",
      patientbautistaappointmentdate: formData.get('patientbautistaappointmentdate'),
      patientbautistaappointmenttime: formData.get('patientbautistaappointmenttime'),
      patientbautistaappointmentcomprehensiveeyeexam: formData.has('patientbautistaappointmentcomprehensiveeyeexam'),
      patientbautistaappointmentdiabeticretinopathy: formData.has('patientbautistaappointmentdiabeticretinopathy'),
      patientbautistaappointmentglaucoma: formData.has('patientbautistaappointmentglaucoma'),
      patientbautistaappointmenthypertensiveretinopathy: formData.has('patientbautistaappointmenthypertensiveretinopathy'),
      patientbautistaappointmentretinolproblem: formData.has('patientbautistaappointmentretinolproblem'),
      patientbautistaappointmentcataractsurgery: formData.has('patientbautistaappointmentcataractsurgery'),
      patientbautistaappointmentpterygiumsurgery: formData.has('patientbautistaappointmentpterygiumsurgery'),
      patientbautistaappointmentstatus: "Pending",
      patientbautistaappointmentpaymentotal: 1000,



      patientadditionalappointmentnotes: additionaldetails,
      patientappointmentpaymentotal: 1000,

    }


    const response = await fetch('http://localhost:3000/api/patientappointments/appointments',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('patienttoken')}`
      },
      body: JSON.stringify(patientappointmentdata)
    });


    if(!response.ok){
      throw new Error(`HTTP error! Error: ${response.status}`);
    }


    const result = await response.json();
    console.log('Patient Appointment Successfull Submitted for Review', result);

    setadditionaldetails('');
    setactiveappointmenttable('appointmentlist');

  }catch(error) {
    console.error('Error Submitting Patient Appointment: ', error);
  }finally{
    setissubmitting(false);
  }
};



 //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES
 //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES
 //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES
 //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES
 //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES //CHECKS IF THERE ARE EMPTY FIELDS IN APPOINTMENTFORM TO AVOID NULL VALUES
let ambherservicesselected;
let bautistaservicesselected;

const[patientappointmentformerror, setpatientappointmentformerror] = useState(null);
const handlesubmitpatientappointment = (e) => {
  e.preventDefault();
  const appointmentformdata = new FormData(e.target);

  const patientambherappointmentdate = appointmentformdata.get('patientambherappointmentdate');
  const patientambherappointmenttime = appointmentformdata.get('patientambherappointmenttime');
  const patientbautistaappointmentdate = appointmentformdata.get('patientbautistaappointmentdate');
  const patientbautistaappointmenttime = appointmentformdata.get('patientbautistaappointmenttime');


  //Checks if any of the Ambher services are selected
  ambherservicesselected = [
    'patientambherappointmentcataractscreening',
    'patientambherappointmentpediatricassessment',
    'patientambherappointmentcolorvisiontesting',
    'patientambherappointmentlowvisionaid',
    'patientambherappointmentrefraction',
    'patientambherappointmentcontactlensefitting'
  ].some(service => appointmentformdata.has(service));

  //Checks if any of the Bautista services are selected
  bautistaservicesselected = [
    'patientbautistaappointmentcomprehensiveeyeexam',
    'patientbautistaappointmentdiabeticretinopathy',
    'patientbautistaappointmentglaucoma',
    'patientbautistaappointmenthypertensiveretinopathy',
    'patientbautistaappointmentretinolproblem',
    'patientbautistaappointmentcataractsurgery',
    'patientbautistaappointmentpterygiumsurgery'
  ].some(service => appointmentformdata.has(service));


  let errormessage = null;

  if(!patientambherappointmentdate && !patientbautistaappointmentdate) {
    errormessage = "Please select at least one clinic appointment date";
  }
  else if((patientambherappointmentdate && !patientambherappointmenttime) || (patientbautistaappointmentdate && !patientbautistaappointmenttime)){
    errormessage = "Please select time for your appointment";
  }
  else if((patientambherappointmentdate || patientambherappointmenttime) && !ambherservicesselected) {
    errormessage = "Please at least one service from Ambher Optical";
  }
  else if((patientbautistaappointmentdate || patientbautistaappointmenttime) && !bautistaservicesselected){
    errormessage = "Please select at lease one service from Bautista Eye Center";
  }


  if(errormessage){
    setpatientappointmentformerror(errormessage);
    return;
  }


  setpatientappointmentformerror(null);
  patientsubmitappointment(appointmentformdata);
}




const handleviewappointment = (appointment) => {
  setselectedpatientappointment(appointment);

};










 //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT
 //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT
 //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT
 //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT
 //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT //LOADING THE APPOINTMENTS LIST BY GRABBING THE EMAIL OF THE PATIENT
 const [patientappointments, setpatientappointments] = useState([]);
 const [loadingappointmens, setloadingappointments] = useState(false);
 const [errorloadingappointments, seterrorloadingappointments] = useState(null);
 const [selectedpatientappointment, setselectedpatientappointment] = useState(null);
 const [viewpatientappointment, setviewpatientappointment] = useState(false);
 const [deletepatientappointment, setdeletepatientappointment] = useState(false);

 
 useEffect(() => {
   const fetchingpatientappointmentsbyemail = async () => {
     setloadingappointments(true);
 
     try{
       const email = localStorage.getItem("patientemail");
       const response = await fetch(
         `http://localhost:3000/api/patientappointments/appointments/email/${email}`,
         {
           headers: {
               Authorization: `Bearer ${localStorage.getItem('patienttoken')}`
           }
         }
       );
 
       if(!response.ok) throw new Error("Failed to fetch patient appointments");
 
       const data = await response.json();
       setpatientappointments(data);
 
 
     }catch(error){
       seterrorloadingappointments(error.message);
     }finally{
       setloadingappointments(false);
     }
   };
 
   if(activeappointmenttable === 'appointmentlist') {
     fetchingpatientappointmentsbyemail();
   }
 }, [activeappointmenttable]);
 

 

//CONVERTS THE APPOINTMENT DATE INTO (ex. Sep 26, 2025)
 const formatappointmatedates = (datestring) => {
  if(!datestring) return '';
  const date = new Date(datestring);

  return date.toLocaleDateString('en-US',{
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
 };



//CONVERTS THE APPOINTMENT TIME INTO (ex. 10:00 P.M.)
const formatappointmenttime = (timestring) => {
  if(!timestring) return '';
  const [hours, minutes] =timestring.split(':');
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString('en-US',{
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};





const handledeleteappointment = async (appointmentId) => {
  try{
    const response = await fetch(`http://localhost:3000/api/patientappointments/appointments/${appointmentId}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
      }
    });

      if(!response.ok) throw new Error('Failed to Delete Appointment');
 
    setpatientappointments(prev =>
      prev.filter(appt => appt._id !== appointmentId)
    );

    }catch(error){
      console.error("Appointment deletion failed: ", error);
      seterrorloadingappointments(error.message);
    }
}








































  return (
    <>
     {/* NavBar */}
    <div className=" bg-white">
      <header id="header" className="flex justify-between items-center text-black py-4 px-8 md:px-32 bg-white rounded-4xl drop-shadow-md">
        <a id:logocontain href="#">
          <img src={navlogo} alt="" className="w-52 hover:scale-105 transition-all"></img>
        </a>

        <ul id:listcontain  className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <Link to="/patientlandingpage" className="text-[#000000] hover:text-white no-underline"><li className="p-3 hover:bg-sky-400 text-black hover:text-white rounded-md transition-all cursor-pointer">Home</li></Link>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Products</li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Explore</li>


          {localStorage.getItem("patienttoken") && (
             <Link to="/patientinformation"><li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">ProfileInfo</li></Link>
          )}

        </ul>

      {/* Search 
      
              <div className="relative hidden md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"></input>
        </div>
        
      */}



 
    {localStorage.getItem ("patienttoken")? (

      
    <div id="profilecard" className="relative">
    <div id="profile" onClick={showlogout}  className="ml-3  flex justify-center items-center bg-[#fbfbfb00] border-2 border-gray-200  shadow-lg  rounded-full hover:cursor-pointer hover:scale-105 transition-all">
     <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-13 w-13 rounded-full"></img>
    </div>

    {showlogoutbtn && (
         <div id="logoutdiv" className=" absolute left-1/2 transform -translate-x-1/2 ml-3 mt-3 w-full flex justify-center items-center p-3 bg-[#ad4e43] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" onClick={handlelogout}>
         <i className="bx bx-exit mt-1 pr-2 font-semibold text-white text-[17px]"/>
         <p className="font-semibold text-white text-[17px]">Logout</p>
       </div>    
       
      )}
    </div>

    
       
    ):(
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
    <section className="bg-cover bg-center h-full w-[99.1vw] flex justify-center align-center" style={{ backgroundImage: `url(${landingbg2})` }}>
    <div className="bg-cover bg-center h-full w-[99.1vw] flex items-center justify-center " >

      <div className="w-full h-full flex justify-start items-start pt-3 ">




<div className={`transition-all duration-300 ease-in-out flex flex-col justify-between items-start pl-3 bg-[#272828]  rounded-2xl   mt-4 ml-3 mb-3 pt-3 pb-3 ${sidebarexpanded ? 'w-[365px]' : 'w-[85px]'}`} id="patientsidebar">

<div className="group relative " id="expandbtn" onClick={togglepatientsidebar} ><div className="hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl  transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden">{sidebarexpanded &&(<i className='bx bx-collapse-horizontal  p-2 hover:text-white text-white text-[40px] ' ></i>)}   {!sidebarexpanded &&(<i className='bx bx-expand-horizontal  p-2 hover:text-white text-white text-[40px] ' ></i>)}<span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>{sidebarexpanded ? 'Collapse Sidebar' : ''}</span></div></div>

<div className="group relative mt-5" onClick={() => showdashboard('appointment')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl mr-2 transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden ${activedashboard ==='appointment' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-calendar   p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='appointment' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>   <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Appointment</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute  p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Appointment</span>)}  </div></div>
<div className="group relative" onClick={() => showdashboard('accountmanagement')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden ${activedashboard ==='accountmanagement' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-user-account  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='accountmanagement' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Account Management</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Account Management</span>)}  </div></div>
<div className="group relative" onClick={() => showdashboard('profileinformation')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='profileinformation' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-user-detail  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='profileinformation' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Profile Information</span>  {!sidebarexpanded && (<span className=" pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Profile Information</span>)}  </div></div>


</div>                            
          
          

       <div  className=" rounded-2xl   ml-3  h-auto  w-[100%] flex flex-col items-center justify-center mr-3 mb-3" >
                
                <div className="flex flex-col items-start w-full h-[12%] rounded-2xl mb-3" id="greet">
      
                  <h1 className="ml-5 mt-1 font-albertsans font-bold text-[40px] text-[#212134]">Good Day, {patientfirstname}</h1>
                  <p className="ml-5 font-geistsemibold text-[15px] text-[#23232a]">Stay on top of your tasks, monitor progress, and track status.</p>
    
                </div>

      
           { activedashboard === 'appointment' && ( <div id="appointment" className="border-1 bg-white border-gray-200 shadow-lg w-[100%] h-[100%] p-4 rounded-2xl" >  
          
                <div className="flex items-center"><i className="bx bxs-calendar text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Appointments</h1></div>
                <div className="flex justify-between  items-center mt-8 h-[60px]">
                <Link to="/patientinformation"><div id="patientcard"  className=" flex justify-center items-start border-1 hover:scale-105 hover:cursor-pointer bg-white transition-all duration-300 ease-in-out  rounded-2xl shadow-md w-[290px] h-[80px]">
                        <div className="w-[125px] h-full  rounded-2xl flex justify-center items-center">
                        <img  src={patientdemographics?.patientprofilepicture || defaultprofilepic}  alt="Profile" className="h-18 w-18 rounded-full object-cover"></img>
                        </div>
                        <div className="bg-white min-w-0 flex flex-col justify-center items-start pl-2 pr-2 w-full h-full  rounded-3xl">
                          <h1 className="font-albertsans font-bold text-[17px] truncate w-full text-[#2d3744]"> {patientdemographics?.patientfirstname || ''} {patientdemographics?.patientlastname || ''}</h1>
                          <p className="text-[13px] truncate w-full text-[#535354]">            {patientdemographics?.patientemail || ''}</p>
                        </div>
                    </div>
                    </Link> 
                   <div className="flex justify-center items-center">
                  <div onClick={() => showappointmenttable('bookappointment')}  className={`hover:cursor-pointer hover:rounded-2xl mr-5 transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmenttable==='bookappointment' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmenttable ==='bookappointment' ? 'text-white' : ''}`}>Book Appointment</h1></div>
                  <div onClick={() => showappointmenttable('appointmentlist')}  className={`hover:cursor-pointer hover:rounded-2xl ml-5 transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmenttable ==='appointmentlist' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmenttable ==='appointmentlist' ? 'text-white' : ''}`}>Appointment List</h1></div>
                 </div> 
                 </div> 
                 
                                 
                
                <div className="flex justify-center items-start" id="overview">


  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
                 { activeappointmenttable === 'bookappointment' && ( <div id="bookappointment" className="animate-fadeInUp flex flex-col items-center  border-t-2  border-[#909090] w-max h-[83%] rounded-2xl mt-6" >
                  <form onSubmit={handlesubmitpatientappointment}>      

                  {patientappointmentformerror && (
                    <div className="w-full h-[40px] rounded-tl-2xl rounded-tr-2xl flex justify-center items-center text-red-500 bg-red-200 font-semibold font-albertsans">
                     {patientappointmentformerror}
                    </div>
                  )}


                  <div className="mt-3 flex justify-center items-center  w-full rounded-3xl ">

                    <div className="flex flex-col mr-3 bg-[#fdfdfd] h-[450px] w-full rounded-3xl">
                      <div className="flex p-3">
                      <img src={ambherlogo} className="w-15"/>  
                      <h1 className="font-albertsans font-bold text-[20px] text-[#237234] mt-1 ml-3">Ambher Optical</h1>
                      </div>

                     <div className="flex justify-center items-center">           
                      <div className="mr-10 flex flex-col h-fit form-group ml-3 mt-4 ">
                             <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientambherappointmentdate">Preferred Appointment Date: </label>     
                             <input className="h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"   type="date" name="patientambherappointmentdate" id="patientambherappointmentdate" placeholder="" required={!!ambherservicesselected}/> </div>
                     
                      <div className="ml-10 flex flex-col h-fit form-group mt-4 ">
                             <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientambherappointmenttime">Preferred Appointment Time: </label>     
                             <input className="h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"    type="time" name="patientambherappointmenttime" id="patientambherappointmenttime" placeholder="" required={!!ambherservicesselected}/> </div>
                     </div>

                     <div className="p-4">
                     <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientambherappointmentcataractscreening" id="patientambherappointmentcataractscreening" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentcataractscreening">Visual/Cataract Screening</label>   
                        </div>

                     <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientambherappointmentpediatricassessment" id="patientambherappointmentpediatricassessment" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentpediatricassessment">Pediatric Assessment</label>   
                        </div>   

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientambherappointmentpediatricoptometrist" id="patientambherappointmentpediatricoptometrist" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentpediatricoptometrist">Pediatric Optometrist</label>   
                        </div>    

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientambherappointmentcolorvisiontesting" id="patientambherappointmentcolorvisiontesting" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentcolorvisiontesting">Color Vision Testing</label>   
                        </div>    

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientambherappointmentlowvisionaid" id="patientambherappointmentlowvisionaid" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentlowvisionaid">Low Vision Aid</label>   
                        </div>    

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientambherappointmentrefraction" id="patientambherappointmentrefraction" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentrefraction">Refraction</label>   
                        </div>      

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientambherappointmentcontactlensefitting" id="patientambherappointmentcontactlensefitting" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentcontactlensefitting">Contact Lense Fitting</label>   
                        </div>  

              


           


                     </div>

                    </div>

                    <div className="ml-3 bg-[#fdfdfd]  h-[450px] w-full rounded-3xl">
                    <div className="flex p-3">
                      <img src={bautistalogo} className="w-15"/>  
                      <h1 className="font-albertsans font-bold text-[20px] text-[#2387c5] mt-1 ml-3">Bautista Eye Center</h1>
                      </div>


                      
                    <div className="flex flex-col mr-3 bg-[#fdfdfd] h-[450px] w-full rounded-3xl">


                     <div className="flex justify-center items-center">           
                      <div className="mr-10 flex flex-col h-fit form-group ml-3 mt-4 ">
                             <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientbautistaappointmentdate">Preferred Appointment Date: </label>     
                             <input className="h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"   type="date" name="patientbautistaappointmentdate" id="patientbautistaappointmentdate" placeholder="" required={!!bautistaservicesselected}/> </div>
                     
                      <div className="ml-10 flex flex-col h-fit form-group mt-4 ">
                             <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientbautistaappointmenttime">Preferred Appointment Time: </label>     
                             <input className="h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"    type="time" name="patientbautistaappointmenttime" id="patientbautistaappointmenttime" placeholder="" required={!!bautistaservicesselected}/> </div>
                     </div>

                     <div className="p-4">
                     <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientbautistaappointmentcomprehensiveeyeexam" id="patientbautistaappointmentcomprehensiveeyeexam" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentcomprehensiveeyeexam">Comprehensive Eye Exam</label>   
                        </div>

                     <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientbautistaappointmentdiabeticretinopathy" id="patientbautistaappointmentdiabeticretinopathy" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentdiabeticretinopathy">Diabetic Retinopathy</label>   
                        </div>   

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientbautistaappointmentglaucoma" id="patientbautistaappointmentglaucoma" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentglaucoma">Glaucoma</label>   
                        </div>    

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientbautistaappointmenthypertensiveretinopathy" id="patientbautistaappointmenthypertensiveretinopathy" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmenthypertensiveretinopathy">Hypertensive Retinopathy</label>   
                        </div>    

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientbautistaappointmentretinolproblem" id="patientbautistaappointmentretinolproblem" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentretinolproblem">Retinol Problem</label>   
                        </div>    

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientbautistaappointmentcataractsurgery" id="patientbautistaappointmentcataractsurgery" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentcataractsurgery">Cataract Surgery</label>   
                        </div>      

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientbautistaappointmentpterygiumsurgery" id="patientbautistaappointmentpterygiumsurgery" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentpterygiumsurgery">Pterygium Surgery</label>   
                        </div>  

              


           


                     </div>

                    </div>
                    </div>

                  </div>

                <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              

                </div>

                                  
                <div className="mt-3 ml-7 w-max flex flex-col">
                          <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientadditionalappointmentnotes">Additional Appointment Notes</label>  

                              <textarea className="w-[1280px] text-[20px] rounded-md p-2 border-2 border-[#2d2d44]   text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={additionaldetails} onChange={(e) => {setadditionaldetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify additional appointment notes..."/>
                          </div>

                <div className="w-full flex justify-end  pl-7  mb-5">

              <button type="submit" disabled={issubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#5e9e3b", fontSize: "20px", padding: "16px 20px", color: "white", borderRadius: "20px",   }}>
                         {issubmitting ? "Submitting Appointment..." : "Submit Appointment"}
                        </button>
                </div>
                </form>
               </div>   
                )}

  {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/}
  {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/}
  {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/}
  {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/}
  {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/} {/*Patient Appointment List*/}
               { activeappointmenttable === 'appointmentlist' && ( <div id="appointmentlist" className="animate-fadeInUp flex flex-col items-start border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-6" >
                
                <div className=" flex justify-center items-center h-[500px] w-full rounded-3xl ">

      {loadingappointmens ? (
      <div className="flex justiy-center p-8 items-center">
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-blue-500 h-12 w-12"></div>
    </div>
  ) : errorloadingappointments ? (
    <div className="rounded-lg p-4 bg-red-50 text-red-600">
    Error: {errorloadingappointments}
  </div>
  ) : patientappointments.length === 0 ? (
    <div className="text-yellow-600 bg-yellow-50 rounded-2xl px-4 py-6">No patient appointments found.</div>

  ) : (
    <div className="overflow-x-auto rounded-2xl shadow-lg  w-full h-full mt-">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-">
          <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Appointment ID</th> 
            <th className="pb-3 pt-3 pl-2 pr-2  text-center">Ambher Appoinment</th>
            <th className="pb-3 pt-3 pl-2 pr-2  text-center"></th>
            <th className="pb-3 pt-3 pl-2 pr-2  text-center">Bautista Appoinment</th>
            <th className="pb-3 pt-3 pl-2 pr-2  text-center">Actions</th>
          </tr>
        </thead>


        <tbody className="divide-y divide-gray-200 bg-white">
          {patientappointments.map((appointment) => (
            <tr 
              key={appointment._id}
              className="hover:bg-gray-50 transition-all ease-in-out duration-300 border-b-2"
            >
              <td className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">
                #{appointment.patientappointmentid}
              </td>
              <td className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">
                {appointment.patientambherappointmentdate && (
                  <div className="text-sm font-albertsans text-gray-900 flex  justify-center items-center">
                    <span className="font-semibold items-start">{formatappointmatedates(appointment.patientambherappointmentdate)} </span> 
                    <span className="ml-1 font-semibold items-start">({formatappointmenttime(appointment.patientambherappointmenttime)})</span> 
                    <span className={`ml-3 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex
  ${appointment.patientambherappointmentstatus === 'Cancelled' ? 'bg-[#9f6e61] text-[#421a10]':
    appointment.patientambherappointmentstatus === 'Pending' ? 'bg-yellow-100 text-yellow-800':
    appointment.patientambherappointmentstatus === 'Accepted' ? 'bg-[#9edc7a] text-[#2b5910]':
    appointment.patientambherappointmentstatus === 'Completed' ? 'bg-[#74c4ce] text-[#1a5566]':
    'bg-red-100 text-red-800'}`}>{appointment.patientambherappointmentstatus}</span>
                  </div>
                )}
              </td>

              <td className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">

              </td>
              <td className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">
                {appointment.patientbautistaappointmentdate && (
                  <div className="text-sm font-albertsans text-gray-900 flex justify-center items-center">
                    <span className="font-semibold">{formatappointmatedates(appointment.patientbautistaappointmentdate)}</span> 
                    <span className="ml-1 font-semibold">({formatappointmenttime(appointment.patientbautistaappointmenttime)})</span> 
                    
<span className={`ml-3 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex
  ${appointment.patientbautistaappointmentstatus === 'Cancelled' ? 'bg-[#9f6e61] text-[#421a10]':
    appointment.patientbautistaappointmentstatus === 'Pending' ? 'bg-yellow-100 text-yellow-800':
    appointment.patientbautistaappointmentstatus === 'Accepted' ? 'bg-[#9edc7a] text-[#2b5910]':
    appointment.patientbautistaappointmentstatus === 'Completed' ? 'bg-[#74c4ce] text-[#103d4a]':
    'bg-red-100 text-red-800'}`}>{appointment.patientbautistaappointmentstatus}</span>
                  </div>
                )}
              </td>



              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center items-center">
               
              <div onClick={() => {handleviewappointment(appointment); setviewpatientappointment(true);}}
                  className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><h1 className="text-white">View</h1></div>

              <div onClick={() =>  {setdeletepatientappointment(true);
                                setselectedpatientappointment(appointment);
              }}
                className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div>

                      {deletepatientappointment && (
                         <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#0000004a] bg-opacity-50">

                           <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
                 

                              <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Appointment</h1></div>
                              <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                  <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this appointment?</p>
                                  {selectedpatientappointment && ( <>
                                            <p className="text-[18px] mt-3">Appointment Id: {selectedpatientappointment.patientappointmentid}</p> </>)}  
                                  </div>        
                                  <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                    <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setdeletepatientappointment(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                    <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {handledeleteappointment(selectedpatientappointment._id);setdeletepatientappointment(false); }}><p className=" text-[#ffffff]">Delete</p></div>
                                  </div>
                              </div>

                           </div>
                         </div>
                      )}


                      

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
                </div>

             </div> )}
                </div>
           
                 </div>

                )}
  


 {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
 {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
                         {viewpatientappointment && selectedpatientappointment && (
                         <div id="viewpatientappointment" className="overflow-y-auto h-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] mt-10  animate-fadeInUp ">
                                 <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                   <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">View Appointment</h1></div>
                                   <div onClick={() => setviewpatientappointment(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                 </div>

                                 
                  <div className="mt-3 flex justify-start items-start  w-full rounded-3xl ">

{selectedpatientappointment.patientambherappointmentdate && (


<div className="flex flex-col mr-3 bg-[#fdfdfd]    h-auto w-full rounded-3xl">
  <div className="flex p-3">
  <img src={ambherlogo} className="w-15"/>  
  <h1 className="font-albertsans font-bold text-[20px] text-[#237234] mt-1 ml-3">Ambher Optical</h1>
  <span className={`ml-5 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex
  ${selectedpatientappointment.patientambherappointmentstatus === 'Cancelled' ? 'bg-[#9f6e61] text-[#421a10]':
    selectedpatientappointment.patientambherappointmentstatus === 'Pending' ? 'bg-yellow-100 text-yellow-800':
    selectedpatientappointment.patientambherappointmentstatus === 'Accepted' ? 'bg-[#9edc7a] text-[#2b5910]':
    selectedpatientappointment.patientambherappointmentstatus === 'Completed' ? 'bg-[#74c4ce] text-[#1a5566]':
    'bg-red-100 text-red-800'}`}>{selectedpatientappointment.patientambherappointmentstatus}</span>
  </div>

 <div className="flex ">     
        
 <div className="flex flex-col w-full pr-3">           
<div className=" flex flex-col h-fit form-group ml-3  mt-4 w-full ">
       <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientambherappointmentdate">Appointment Details : </label>     
    {/*<input className="h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"   type="date" name="patientambherappointmentdate" id="patientambherappointmentdate" placeholder="" required={!!ambherservicesselected}/>*/}
    <div className="h-max w-full  flex flex-col items-start p-3 mt-2 justify-start border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold">
      {(selectedpatientappointment.patientambherappointmentstatus === "Accepted" ||
      selectedpatientappointment.patientambherappointmentstatus === "Completed") && (

        <h1>{selectedpatientappointment.patientambherappointmenteyespecialist}</h1>

    )}
     <h1>{formatappointmatedates(selectedpatientappointment.patientambherappointmentdate)} <span className="ml-2">({formatappointmenttime(selectedpatientappointment.patientambherappointmenttime)})</span></h1>


     {selectedpatientappointment.patientambherappointmentstatus === "Completed" && (
  <div id="patientambherappointmentpaymentotal" className="mt-5" >
    <h3 className="font-bold text-[15px] text-[#1a690e]">Payment Total:</h3>
    <p className="text-[#2d2d44] text-[18px]">
      ₱{selectedpatientappointment.patientambherappointmentpaymentotal}
    </p>
  </div>
)}
    </div>
    
     </div>






</div>

 </div>

 <div className="p-4">
 <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientambherappointmentcataractscreening} type="checkbox" name="patientambherappointmentcataractscreening" id="patientambherappointmentcataractscreening" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentcataractscreening">Visual/Cataract Screening</label>   
    </div>

 <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientambherappointmentpediatricassessment} type="checkbox" name="patientambherappointmentpediatricassessment" id="patientambherappointmentpediatricassessment" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentpediatricassessment">Pediatric Assessment</label>   
    </div>   

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientambherappointmentpediatricoptometrist} type="checkbox" name="patientambherappointmentpediatricoptometrist" id="patientambherappointmentpediatricoptometrist" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentpediatricoptometrist">Pediatric Optometrist</label>   
    </div>    

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientambherappointmentcolorvisiontesting} type="checkbox" name="patientambherappointmentcolorvisiontesting" id="patientambherappointmentcolorvisiontesting" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentcolorvisiontesting">Color Vision Testing</label>   
    </div>    

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientambherappointmentlowvisionaid} type="checkbox" name="patientambherappointmentlowvisionaid" id="patientambherappointmentlowvisionaid" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentlowvisionaid">Low Vision Aid</label>   
    </div>    

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientambherappointmentrefraction} type="checkbox" name="patientambherappointmentrefraction" id="patientambherappointmentrefraction" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentrefraction">Refraction</label>   
    </div>      

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientambherappointmentcontactlensefitting} type="checkbox" name="patientambherappointmentcontactlensefitting" id="patientambherappointmentcontactlensefitting" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentcontactlensefitting">Contact Lense Fitting</label>   
    </div>  







 </div>

</div>
)}


{selectedpatientappointment.patientbautistaappointmentdate && (
<div className="flex flex-col bg-[#fdfdfd]  h-auto w-full rounded-3xl">
<div className="flex p-3 ">
  <img src={bautistalogo} className="w-15"/>  
  <h1 className="font-albertsans font-bold text-[20px] text-[#2387c5] mt-1 ml-3">Bautista Eye Center</h1>
  <span className={`ml-5 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex
    ${selectedpatientappointment.patientbautistaappointmentstatus === 'Cancelled' ? 'bg-[#9f6e61] text-[#421a10]':
      selectedpatientappointment.patientbautistaappointmentstatus === 'Pending' ? 'bg-yellow-100 text-yellow-800':
      selectedpatientappointment.patientbautistaappointmentstatus === 'Accepted' ? 'bg-[#9edc7a] text-[#2b5910]':
      selectedpatientappointment.patientbautistaappointmentstatus === 'Completed' ? 'bg-[#74c4ce] text-[#1a5566]':
      'bg-red-100 text-red-800'}`}>{selectedpatientappointment.patientbautistaappointmentstatus}</span>
  </div>


  
<div className="flex flex-col mr-3 pr-8 bg-[#fdfdfd] h-auto  w-full rounded-3xl">


 <div className="flex flex-col  w-full">           
 <div className="mr-10 flex flex-col h-fit form-group ml-3 mt-4 w-full ">
       <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientbautistaappointmentdate">Appointment Details : </label>     
    {/*<input className="h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"   type="date" name="patientbautistaappointmentdate" id="patientbautistaappointmentdate" placeholder="" required={!!bautistaservicesselected}/>*/}
    <div className="h-max w-full flex flex-col items-start p-3 mt-2 justify-start border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold">
      {(selectedpatientappointment.patientbautistaappointmentstatus === "Accepted" ||
      selectedpatientappointment.patientbautistaappointmentstatus === "Completed") && (

        <h1>{selectedpatientappointment.patientbautistaappointmenteyespecialist}</h1>

    )}
     <h1>{formatappointmatedates(selectedpatientappointment.patientbautistaappointmentdate)} <span className="ml-2">({formatappointmenttime(selectedpatientappointment.patientbautistaappointmenttime)})</span></h1>


     {selectedpatientappointment.patientbautistaappointmentstatus === "Completed" && (
  <div id="patientbautistaappointmentpaymentotal" className="mt-5.5" >
    <h3 className="font-bold text-[15px] text-[#1a690e]">Payment Total:</h3>
    <p className="text-[#2d2d44] text-[18px]">
      ₱{selectedpatientappointment.patientbautistaappointmentpaymentotal}
    </p>
  </div>
)}
    </div>
    
     </div>





 </div>



 <div className="p-4">
 <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={selectedpatientappointment.patientbautistaappointmentcomprehensiveeyeexam} type="checkbox" name="patientbautistaappointmentcomprehensiveeyeexam" id="patientbautistaappointmentcomprehensiveeyeexam" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentcomprehensiveeyeexam">Comprehensive Eye Exam</label>   
    </div>

 <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientbautistaappointmentdiabeticretinopathy} type="checkbox" name="patientbautistaappointmentdiabeticretinopathy" id="patientbautistaappointmentdiabeticretinopathy" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentdiabeticretinopathy">Diabetic Retinopathy</label>   
    </div>   

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientbautistaappointmentglaucoma} type="checkbox" name="patientbautistaappointmentglaucoma" id="patientbautistaappointmentglaucoma" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentglaucoma">Glaucoma</label>   
    </div>    

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientbautistaappointmenthypertensiveretinopathy} type="checkbox" name="patientbautistaappointmenthypertensiveretinopathy" id="patientbautistaappointmenthypertensiveretinopathy" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmenthypertensiveretinopathy">Hypertensive Retinopathy</label>   
    </div>    

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientbautistaappointmentretinolproblem} type="checkbox" name="patientbautistaappointmentretinolproblem" id="patientbautistaappointmentretinolproblem" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentretinolproblem">Retinol Problem</label>   
    </div>    

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientbautistaappointmentcataractsurgery} type="checkbox" name="patientbautistaappointmentcataractsurgery" id="patientbautistaappointmentcataractsurgery" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentcataractsurgery">Cataract Surgery</label>   
    </div>      

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all" checked={selectedpatientappointment.patientbautistaappointmentpterygiumsurgery} type="checkbox" name="patientbautistaappointmentpterygiumsurgery" id="patientbautistaappointmentpterygiumsurgery" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentpterygiumsurgery">Pterygium Surgery</label>   
    </div>  







 </div>

</div>
</div>
)}
</div>

{(selectedpatientappointment.patientambherappointmentstatus === "Completed" &&
  selectedpatientappointment.patientbautistaappointmentstatus === "Completed") && (
    <div className="bg-[#dbfac8] w-full p-3 mt-20 rounded-2xl">
      <div className="  items-center  flex justify-between">
          <h1 className=" text-[#237234] font-bold font-albertsans text-[20px] ">Combined Total Payment : </h1>
          <p className="text-[#2b5910] text-[24px] font-albertsans font-semibold">
             ₱{(selectedpatientappointment.patientambherappointmentpaymentotal + selectedpatientappointment.patientbautistaappointmentpaymentotal).toLocaleString()}
          </p>
      </div>
    </div>

)}






<div className="w-full mt-5 p-3 flex flex-col mb-7 bg-[#ededed] rounded-2xl  ">
                          <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientadditionalappointmentnotes">Appointment Notes :</label>  

                           <div>{selectedpatientappointment.patientadditionalappointmentnotes ||"No additional notes"}</div>
                          </div>
                           </div>

                         </div>
                      )}













                    { activedashboard === 'medicalrecords' && ( <div id="medicalrecords" className="border-2 border-yellow-500 w-[100%] h-[100%] rounded-2xl" >   </div> )}
                    { activedashboard === 'inventorymanagement' && ( <div id="inventorymanagement" className="border-2 border-orange-500 w-[100%] h-[100%] rounded-2xl" > sadasd8 </div> )}
                    { activedashboard === 'billingsandorders' && ( <div id="billingsandorders" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" > asdas7  </div> )}
                    { activedashboard === 'communicationcenter' && ( <div id="communicationcenter" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" > sadasd6  </div> )}
                    { activedashboard === 'reportingandanalytics' && ( <div id="reportingandanalytics" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" >  asdasd5 </div> )}
                    { activedashboard === 'clinicmanagement' && ( <div id="clinicmanagement" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" > asdsad4  </div> )}
                    { activedashboard === 'sytemadministration' && ( <div id="sytemadministration" className=" w-[100%] h-[100%] rounded-2xl p" ></div> )}
                    { activedashboard === 'wishlistandproductfeatures' && ( <div id="wishlistandproductfeatures" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" >  sadasd2  </div> )}
                    { activedashboard === 'mappingintegration' && ( <div id="mappingintegration" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" >  sadsad1  </div> )}
      
                 </div>
                 </div>
      

      </div>

















      
        </section>



    </>
   )
  }
        
export default PatientDashboard