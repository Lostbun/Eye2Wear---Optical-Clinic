/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState} from "react";
import {Link, Navigate} from "react-router-dom";

import landingbg2 from "../src/assets/images/landingbg2.png";
import navlogo from  "../src/assets/images/navlogo.png";
import Typewriter from "typewriter-effect";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faClock} from "@fortawesome/free-regular-svg-icons";
import defaultprofilepic from '../src/assets/images/defaulticon.png'
import { GenderBox } from "./components/GenderBox";
import { useAuth } from "./hooks/patientuseAuth";
import storeimage from "../src/assets/images/store.png";
import profileuser from "../src/assets/images/profile-user.png";
import logout from "../src/assets/images/logout.png";





function PatientInformation(){

  
  //For switching title forms

  const [activeForm, setactiveForm] = useState ('patientdemographic');
  
 

  const formtitles = {
    patientdemographic: 'Patient Demographic',
    medicalhistory: 'Medical History',
    ocularhistory: 'Ocular History',
    lifestylevisual: 'Lifestyle & Visual'
  };










  //PATIENT DEMOGRAPHIC DATAS
  const [selectedprofile, setselectedprofile] = useState(null);
  const [previewimage, setpreviewimage] = useState (null);

  const [patientfirstname, setpatientfirstname] = useState('');






  //PATIENT MEDICAL HISTORY
  const [showeyedisease, setshoweyedisease] = useState(false);
  const [eyediseasedetails, seteyediseasedetails] = useState("");


  const [showautoimmune, setshowautoimmune] = useState(false);
  const [autoimmunedetails, setautoimmunedetails] = useState("");

  const [showneuro, setshowneuro] = useState(false);
  const [neurodetails, setneurodetails] = useState("");

  const [showallergies, setshowallergies] = useState(false);
  const [allergiesdetails, setallergiesdetails] = useState("");

  const [showmedications, setshowmedications] = useState(false);
  const [medicationdetails, setmedicationdetails] = useState("");

  const [showpasteyesurgeries, setshowpasteyesurgeries] = useState(false);
  const [eyesurgeriesdetails, seteyesurgeriesdetails] = useState("");

  const [showblooddisorders, setshowblooddisorders] = useState(false);
  const [blooddisordersdetails, setblooddisordersdetails] = useState("");


  const [showadditionalnotes, setshowadditionalnotes] = useState(false);
  const [additionaldetails, setadditionaldetails] = useState("");





  const [showotherpasteyecondition, setshowotherpasteyecondition] = useState(false);
  const [otherpasteyeconditiondetails, setotherpasteyeconditiondetails] = useState("");










  const imageinputref = useRef(null);




  //Handles the click event of upload button
  const handleuploadclick = () => {
    imageinputref.current.click();
  };


  const handleremoveprofile = () => {
    setselectedprofile(null);
    setpreviewimage(null);
    setdemographicformdata(prev => ({
      ...prev,
      patientprofilepicture: 'default-profile-url'
    }))
    if(imageinputref.current){
      imageinputref.current.value = "";
    }
  }
  




  const handleprofilechange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () =>{
        setdemographicformdata(prev => ({
          ...prev,
          patientprofilepicture: reader.result
        }));

        setpreviewimage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }




  const textarearef = useRef(null);
  const adjusttextareaheight = () => {
    if(textarearef.current){
      textarearef.current.style.height = 'auto';
      textarearef.current.style.height = `${textarearef.current.scrollHeight}px`;
    }
  }


  useEffect(() => {
    adjusttextareaheight();
  }, [showneuro, showallergies, showautoimmune, showeyedisease, showmedications, showpasteyesurgeries, showeyedisease, showblooddisorders, showadditionalnotes, showotherpasteyecondition]);









  const [patientemail, setpatientemail] = useState('');
  const [patientlastname, setpatientlastname] = useState('');
  const [patientid, setpatientid] = useState('');
  const [patientprofilepicture, setpatientprofilepicture] = useState('');

  const [showlogoutbtn, setshowlogoutbtn] = useState(false);
  const showlogout = () => {
    setshowlogoutbtn(!showlogoutbtn);
  }

  const {handlelogout, fetchpatientdetails, fetchpatientdemographicbyemail} = useAuth();
  






  const [demographicformdata, setdemographicformdata] = useState({

    role:'Patient',
    patientdemographicId:'',
    patientlastname: '',
    patientfirstname:'',
    patientmiddlename:'',
    patientprofilepicture:'',
    patientage:'',
    patientbirthdate:'',
    patientgender:'',
    patientcontactnumber:'',
    patienthomeaddress:'',
    patientemergencycontactname:'',
    patientemergencycontactnumber:''
  });




  const [isexistingdemographic, setisexistingdemographic] = useState(false);
  const [demographicid, setdemographicid] = useState(null);



  
//LOADING PATIENT DEMOGRAPHIC DATA OR IF NOT IT WILL BE A CREATION OF DEMOGRAPHIC DATA
  useEffect(() => {
    const loadpatientaccount = async () => {
      const patientdata = await fetchpatientdetails();

      if(patientdata){
        setpatientfirstname(patientdata.patientfirstname || '');
        setpatientprofilepicture(patientdata.patientprofilepicture || '');
        setpatientemail(patientdata.patientemail || '');

        const demographicdata = await fetchpatientdemographicbyemail(patientdata.patientemail);
        if(demographicdata){
          setdemographicid(demographicdata._id);
          setisexistingdemographic(true);
          setdemographicformdata(prev => ({
            ...prev,
            ...demographicdata,
            patientemail: patientdata.patientemail,
          }));


          if(demographicdata.patientprofilepicture) {
            setpreviewimage(demographicdata.patientprofilepicture);
          }
          
        }else{
          setisexistingdemographic(false);
          setdemographicformdata(prev => ({
            ...prev,
            patientemail: patientdata.patientemail,
            patientfirstname: patientdata.patientfirstname || '',
            patientlastname: patientdata.patientlastname || '',
            patientmiddlename: patientdata.patientmiddlname || '',
            patientprofilepicture: patientdata.patientprofilepicture || ''
          }));
        }
      }
    };
      loadpatientaccount();
  }, [fetchpatientdetails, fetchpatientdemographicbyemail]);



















    const [message, setmessage] = useState('');
    const [issubmitting, setissubmitting] = useState(false);
   


        



const handleinputchange = (e) => {
  const {name, value} = e.target;
  
  // If the changed field is birthdate, calculate age
  if (name === 'patientbirthdate') {
    const age = calculateAge(value);
    setdemographicformdata(prev => ({
      ...prev,
      [name]: value,
      patientage: age
    }));
  } else {
    setdemographicformdata(prev => ({
      ...prev,
      [name]: value  
    }));
  }
};






const submitpatientdemographic = async (e) => {
  e.preventDefault();
  setissubmitting(true);
  setmessage(null);

  try {
    console.log("Submitting: ", demographicformdata);
    
    // Remove the default profile picture if it's the placeholder
    const patientdemographictosend = {
      ...demographicformdata,
      patientprofilepicture: demographicformdata.patientprofilepicture === defaultprofilepic 
        ? null 
        : demographicformdata.patientprofilepicture
    };

    let endpoint = "http://localhost:3000/api/patientdemographics";
    let method = "POST";
    
    if(isexistingdemographic) {
      endpoint = `http://localhost:3000/api/patientdemographics/${demographicid}`;
      method = "PUT";
    }

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("patienttoken")}`
      },
      body: JSON.stringify(patientdemographictosend)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save demographic data");
    }

    const responsedata = await response.json();
    console.log("Success: ", responsedata);
    
    setmessage({
      text: isexistingdemographic 
        ? "Updated Patient Demographic Successfully" 
        : "Created Patient Demographic Successfully",
      type: "success"
    });

    if(!isexistingdemographic && responsedata._id) {
      setisexistingdemographic(true);
      setdemographicid(responsedata._id);
    }

  } catch(error) {
    console.error("Error: ", error);
    setmessage({
      text: error.message || "Failed, Please try again",
      type: "error"
    });
  } finally {
    setissubmitting(false);
  }
}

















const calculateAge = (birthdate) => {
  if (!birthdate) return '';
  
  const birthDate = new Date(birthdate);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // If birthday hasn't occurred yet this year, subtract 1 from age
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age.toString();
};


















































  return (
    <>

     {/* NavBar */}
    <div className=" bg-white w-[100vw]">
      <header id="header" className="flex justify-between items-center text-black  md:px-32 bg-white w-full drop-shadow-md">
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



 
    {localStorage.getItem ("patienttoken")? (

      
    <div id="profilecard" className="relative items-center justify-center flex">
    <div id="profile" onClick={showlogout}  className="ml-3  flex justify-center items-center bg-[#fbfbfb00] border-2 border-gray-200  shadow-lg  rounded-full hover:cursor-pointer hover:scale-105 transition-all">
     <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-13 w-13 rounded-full"></img>
    </div>

{showlogoutbtn && (
    <div className="w-75 flex-col  p-5  motion-preset-fade absolute top-full mt-2  flex justify-center items-start bg-[#ffffff] rounded-2xl hover:cursor-pointer  transition-all" >


      <div className="hover:bg-[#f7f7f7] transition-all duration-300 ease-in-out py-2 px-1 rounded-2xl  gap-3 flex items-center h-auto w-full ">
        <img src={patientprofilepicture}  className="w-12 rounded-full"/>
        <h1 className="font-albertsans font-semibold text-[19px]">{patientfirstname}</h1>
      </div>
      <div className="border-b-2 rounded-full border-[#747474] h-1 w-full my-1">

      </div>

     {localStorage.getItem("patienttoken") && (
      <Link to="/patientinformation" className="w-full"><div className="gap-2 flex items-center py-2 px-1 hover:bg-[#f7f7f7]  duration-300 ease-in-out  hover:text-[#000000] rounded-2xl transition-all cursor-pointer"> <img src={profileuser} className="w-9 h-9"/><h1 className="text-[16px] text-[#202020]">Demographic Profile</h1></div></Link>
     )}


     <div 
       id="logoutdiv" 
       className="mt-2 px-1 py-2 hover:bg-[#f7f7f7]   flex items-center gap-2 w-full  rounded-2xl hover:cursor-pointer transition-all" 
       onClick={handlelogout}
     >
    <img src={logout} className="w-9 h-9"/>
    <p className="font-semibold text-[#E04F5F] text-[16px]">Logout</p>
  </div> 
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
    <section className="bg-cover bg-fixed bg-center min-h-screen w-screen flex justify-center items-start" style={{ backgroundImage: `url(${landingbg2})` }}>
          <div className=" h-full w-full flex flex-col items-center  " >
            

            <div className=" w-screen h-full flex justify-center items-center" >
                <div className=" w-[1400px] min-h-[1000px] mt-10 flex justify-center">
                <div className=" w-[300px] flex flex-col">
                    <Link to="/patientlandingpage" className="group relative h-15 \ flex justify-center items-center p-3  shadow-lg bg-gray-800 rounded-3xl hover:cursor-pointer hover:scale-105 transition-all duration-300 "><i className="bx bx-arrow-back  pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Back</span></Link>
          
                    <div className="flex flex-col p-5 h-max mt-10 rounded-4xl bg-[#2d2d44] shadow-lg">
                          <p className=" font-semibold text-white text-[16px]">Your Profile :</p>
                          <div className={`pl-5 w-full h-12 mt-5 flex items-center  hover:cursor-pointer hover:scale-105 transition-all  ${activeForm === `patientdemographic` ? `bg-sky-700 rounded-4xl` : ``}`}  onClick={() => setactiveForm(`patientdemographic`)} ><i className="bx bxs-user  pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Patient Demographic</span></div>
                          <p className="mt-8 font-semibold text-white text-[16px]">*On Development*</p>
                          <div className={`pl-5 w-full h-12 mt-5 flex items-center hover:cursor-pointer hover:scale-105 transition-all ${activeForm === `medicalhistory` ? `bg-sky-700 rounded-4xl` : ``}`}  onClick={() => setactiveForm(`medicalhistory`)}><FontAwesomeIcon icon={faClock}  className="pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Medical History</span></div>
                          <div className={`pl-5 w-full h-12 mt-5 flex items-center xhover:cursor-pointer hover:scale-105 transition-all ${activeForm === `ocularhistory` ? `bg-sky-700 rounded-4xl` : ``}`}  onClick={() => setactiveForm(`ocularhistory`)}><FontAwesomeIcon icon={faEye}  className="pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Ocular History</span></div>
                          <div className={`pl-5 w-full h-12 mt-5 flex items-center hover:cursor-pointer hover:scale-105 transition-all ${activeForm === `lifestylevisual` ? `bg-sky-700 rounded-4xl` : ``}`}  onClick={() => setactiveForm(`lifestylevisual`)}><i className="bx bx-run  pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Lifestyle & Visual</span></div>
                         {/* <div className="mt-5 flex justify-center align-middle p-3 bg-[#1cad11] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><p className="font-semibold text-[20px] text-white">Save</p></div> */}
                       


                    </div>
                </div>
                <div className="bg-white border-3 h-max pb-10 border-gray-100 shadow-lg w-[1000px] rounded-4xl flex flex-col  ml-10">
                    <div className="bg-[#2d2d44] h-[100px] flex items-center justify-center rounded-tl-4xl rounded-tr-4xl ">
                    <i className="bx bx-clipboard 0 text-[50px] font-albertsans font-extrabold italic text-white"/>
                    <h1 className="text-[40px]  pl-5 font-bold  text-white ">Patient Information Form</h1>
          
                    </div>
                     <div className="flex items-center justify-center mt-10"> <h1 className="text-[25px]  pl-5 font-league  text-[#2d2d44] ">{formtitles[activeForm]}</h1></div>









{/* Patient Demographic Form */} {/* Patient Demographic Form */}  {/* Patient Demographic Form */}  {/* Patient Demographic Form */}  {/* Patient Demographic Form */} 

                    <div id="patientdemographicform" className=" h-[760px] mt-5 overflow-y-auto max-h-[750px]" style={{display: activeForm === "patientdemographic" ? "block" : "none"}}>
                    <form onSubmit={submitpatientdemographic}>
                    
                      <div className=" mt-5 flex ">


                      <div className=" w-60 h-60 ml-10">
                        <img className=" object-cover h-60 w-full rounded-full" src={previewimage || defaultprofilepic}/>

                        <input  className="hidden" type="file" onChange={handleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={imageinputref} />
                        <div onClick={handleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                        
                        {selectedprofile && (<div onClick={handleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                      </div>

                      <div className=" ml-15">
                       <div className=" h-fit form-group  ">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientlastname">Last Name :</label>     
                        <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patientlastname} onChange={handleinputchange} type="text" name="patientlastname" id="patientlastname" placeholder="Patient Last Name..."/></div>

                        <div className=" h-fit form-group  mt-5">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientfirstname">First Name :</label>     
                        <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patientfirstname} onChange={handleinputchange}  type="text" name="patientfirstname" id="patientfirstname" placeholder="Patient First Name..."/></div>

                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientmiddlename">Middle Name :</label>     
                        <input className="w-112 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patientmiddlename} onChange={handleinputchange}  type="text" name="patientmiddlename" id="patientmiddlename" placeholder="Patient Middle Name.."/></div>



                        <div className=" mt-5 flex items-center">

                            <div className="">
                              
                            <div className=" h-fit form-group ">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientbirthdate">Birthdate :</label>     
                           <input className="w-38 justify-center border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patientbirthdate} onChange={handleinputchange}  type="date" name="patientbirthdate" id="patientbirthdate" placeholder=""/> </div>

                            </div>

                            
                        <div className="ml-15">

                        <div className=" h-fit form-group">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientage">Age :</label>     
                        <input className="bg-[#eeeeee]  pl-2 rounded-md w-32 border-b-2  ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patientage}  readOnly onChange={handleinputchange}  type="number" name="patientage" id="patientage" placeholder="Age..."/></div>

                            </div>




                        </div>




                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientgender">Gender :</label>     
                        <div className="ml-3"><GenderBox value={demographicformdata.patientgender} onChange={handleinputchange} /></div>  </div>


                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientcontactnumber">Contact Number :</label>     
                        <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patientcontactnumber} onChange={handleinputchange}  type="text" name="patientcontactnumber" id="patientcontactnumber" placeholder="Ex: 09xxxxxxxxx"/> </div>

                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patienthomeaddress">Home Address :</label>     
                        <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patienthomeaddress} onChange={handleinputchange}  type="text" name="patienthomeaddress" id="patienthomeaddress" placeholder="Ex: #001 Sison St., Townsite, Limay, Bataan"/> </div>


                        <div className=" h-fit form-group  mt-20 flex">
                        <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactname">Emergency Contact Name :</label>     
                        <input className="w-90 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patientemergencycontactname} onChange={handleinputchange}  type="text" name="patientemergencycontactname" id="patientemergencycontactname" placeholder="Ex: Juan Dela Cruz"/> </div>

                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactnumber">Emergency Contact Number :</label>     
                        <input className="w-84 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demographicformdata.patientemergencycontactnumber} onChange={handleinputchange}  type="text" name="patientemergencycontactnumber" id="patientemergencyconctactnumber" placeholder="Ex: 09xxxxxxxxx"/> </div>


       
                      <div className=" mt-15">
                     {/*       <button type="submit" disabled={issubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                         {issubmitting ? "Saving..." : "Save"}
                        </button>
                */}

                      <button type="submit" disabled={issubmitting} className={`submit-btn mt-12 w-full flex justify-center items-center ${issubmitting? "opacity-75 cursor-not-allowed" : "" }`} style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                        {issubmitting ? (                                        <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  className="text-white animate-spin h-5 w-5 ">
                                        <circle cx="12" cy="12" stroke="currentColor" className="opacity-25" r="10" strokeWidth="4" ></circle>
                                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="font-albertsans text-white font-medium">{isexistingdemographic ? "Updating..." : "Saving..."}</span>
                                        </>):(isexistingdemographic? "Update" : "Save")}
                      </button>

                        </div>


                  

                     </div>
                        

                      </div>
                    
  
                     </form>
                    </div>














{/* Medical History Form */} {/* Medical History Form */}  {/* Medical History Form */}  {/* Medical History Form */}  {/* Medical History Form */}  {/* Medical History Form */} 

                    <div id="medicalhistoryform"  className=" h-max mt-5 pl-10 " style={{display: activeForm === "medicalhistory" ? "block" : "none"}}>

                      <h1 className="text-[23px]  font-bold  text-[#2d2d44] ">Systemic Conditions:</h1>
                        <div className=" h-fit form-group  ">


                      <div className="">

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientdiabetes" id="patientdiabetes"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientdiabetes">Diabetes (Type 1 / Type 2)</label>     
                        </div>


                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patienthypertension" id="patienthypertension"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patienthypertension">Hypertension</label>     
                        </div>


                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientheartdisease" id="patientheartdisease"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientheartdisease">Heart Disease</label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patienthyroiddisorders" id="patienthyroiddisorders"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patienthyroiddisorders">Thyroid Disorders</label>     
                        </div>



                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientautoimmunediseases" id="patientautoimmunediseases" checked={showautoimmune} onChange={(e) => setshowautoimmune(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientautoimmunediseases">Autoimmune Diseases (if checked please define)</label>  
                        </div>
                        
                        {showautoimmune && (
                          <div className="mt-3 ml-5">
                              <textarea ref={textarearef} rows={1} style={{minHeight:'44px'}}  className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  "  type="text" value={autoimmunedetails} onChange={(e) =>{ setautoimmunedetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify autoimmune disease..."/>
                          </div>
                        )}   




                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientblooddisorders" id="patientblooddisorders" checked={showblooddisorders} onChange={(e) => setshowblooddisorders(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientblooddisorders">Blood Disorder (if checked please define)</label>  
                        </div>
                        
                        {showblooddisorders && (
                          <div className="mt-3 ml-5">
                              <textarea ref={textarearef} rows={1} style={{minHeight:'44px'}}  className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  "  type="text" value={blooddisordersdetails} onChange={(e) =>{ setblooddisordersdetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify blood disorder/s..."/>
                          </div>
                        )}   






                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patienthypertension" id="patienthypertension"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patienthypertension">Cardiovascular Diseases</label>     
                        </div>


                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientneuro" id="patientneuro" checked={showneuro} onChange={(e) => setshowneuro(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientneuro">Neurological Disorders (if checked please define)</label>  
                        </div>
                        
                        {showneuro && (
                          <div className="mt-3 ml-5">
                              <textarea ref={textarearef} rows={1} style={{minHeight:'44px'}}   className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " type="text" value={neurodetails} onChange={(e) => {setneurodetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify neurological disorders..."/>
                          </div>
                        )}   





                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientallergies" id="patientallergies" checked={showallergies} onChange={(e) => setshowallergies(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientallergies">Allergies (if checked please define)</label>  
                        </div>
                        
                        {showallergies && (
                          <div className="mt-3 ml-5">
                              <textarea ref={textarearef} rows={1} style={{minHeight:'44px'}}   className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " type="text" value={allergiesdetails} onChange={(e) => {setallergiesdetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify allergies..."/>
                          </div>
                        )}   







                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientmedication" id="patientmedication" checked={showmedications} onChange={(e) => setshowmedications(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientmedication">Current Medications (if checked please define)</label>   
                        </div>
                        
                        {showmedications && (
                          <div className="mt-3 ml-5">
                              <textarea className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={medicationdetails} onChange={(e) =>{ setmedicationdetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify current medications..."/>
                          </div>
                        )}   






                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patienteyesurgeries" id="patienteyesurgeries" checked={showpasteyesurgeries} onChange={(e) => setshowpasteyesurgeries(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientsurgeries">Previous Eye Surgeries (if checked please define)</label>   
                        </div>
                        
                        {showpasteyesurgeries && (
                          <div className="mt-3 ml-5">
                              <textarea className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={eyesurgeriesdetails} onChange={(e) => {seteyesurgeriesdetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify past eye surgeries..."/>
                          </div>
                        )}   




                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientfamilyhistory" id="patientfamilyhistory" checked={showeyedisease} onChange={(e) => setshoweyedisease(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientfamilyhistory">Family History of Eye Diseases (if checked please define)</label>  
                        </div>
                        
                        {showeyedisease && (
                          <div className="mt-3 ml-5">
                              <textarea className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={eyediseasedetails} onChange={(e) => {seteyediseasedetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify family history eye disease..."/>
                          </div>
                        )}   




                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientadditionalnotes" id="patientadditionalnotes" checked={showadditionalnotes} onChange={(e) => setshowadditionalnotes(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientadditionalnotes">Additional Notes</label>  
                        </div>
                        
                        {showadditionalnotes && (
                          <div className="mt-3 ml-5">
                              <textarea className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={additionaldetails} onChange={(e) => {setadditionaldetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify patient additional notes..."/>
                          </div>
                        )}   



                    </div>




                       </div>


                    </div>








{/* Ocular History Form */} {/* Ocular History Form */} {/* Ocular History Form */} {/* Ocular History Form */} {/* Ocular History Form */} {/* Ocular History Form */}
                        
                    <div id="ocularhistoryform"  className="h-max mt-5 pl-10" style={{display: activeForm === "ocularhistory" ? "block" : "none"}}>

                    <h1 className="text-[23px]  font-bold  text-[#2d2d44] ">Current Eye Sypmtoms:</h1>
                        <div className=" h-fit form-group  ">


                      <div className="">

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Blurred Vision (Distance/Near) </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Double Vision (Diplopia) </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Eye Pain/Discomfort </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Redness/Burning/Itching </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Dry Eyes </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Excessive Tearing </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Floaters/Flashes </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Night Vision Problems </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Light Sensitivity (Photophobia) </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Headaches with Visual Strain </label>     
                        </div>





                      </div>
                       </div>





                       <h1 className="text-[23px]  font-bold  text-[#2d2d44] mt-10">Past Eye Conditions:</h1>
                        <div className=" h-fit form-group  ">


                      <div className="">

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Glaucoma </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Cataracts </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Macular Degeneration (AMD)</label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Diabetic Retinopathy </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Retinal Detachment/Tears </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Keratoconus </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Strabismus (Crossed Eyes) </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Amblyopia (Lazy Eye) </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Uveitis/Iritis </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Conjuctivitis (Pink Eye – Viral/Bacterial/Allergic) </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Corneal Abrasions/Ulcers </label>     
                        </div>


                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patientotherpasteyecondition" id="patientotherpasteyecondition" checked={showotherpasteyecondition} onChange={(e) => setshowotherpasteyecondition(e.target.checked)}/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patientotherpasteyecondition">Other (Specify)</label>  
                        </div>
                        
                        {showotherpasteyecondition && (
                          <div className="mt-3 ml-5">
                              <textarea className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={otherpasteyeconditiondetails} onChange={(e) => {setotherpasteyeconditiondetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify other past eye conditions.."/>
                          </div>
                        )}   






                      </div>
                       </div>  
                    </div>





{/* Lifestyle & Visual Form */} {/* Lifestyle & Visual Form */} {/* Lifestyle & Visual Form */} {/* Lifestyle & Visual Form */} {/* Lifestyle & Visual Form */} {/* Lifestyle & Visual Form */}

                    <div id="lifestyle&visualform"  className="h-max mt-5 pl-10" style={{display: activeForm === "lifestylevisual" ? "block" : "none"}}>


                    <h1 className="text-[23px]  font-bold  text-[#2d2d44] ">Occupational & Visual Demands:</h1>
                        <div className=" h-fit form-group  ">


                      <div className="">

                        <div className="flex items-center mt-5 ml-5">
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Computer Use (Hours/Day): <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/> </label> 
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Driving (Day/Night, Frequency):  <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/> </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">    
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Reading/Close Work (Hours/Day):  <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/></label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Sports/Activities:  <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/></label>     
                        </div>











                      </div>
                       </div>





                       <h1 className="text-[23px]  font-bold  text-[#2d2d44] mt-10">Lifestyle Factors:</h1>
                        <div className=" h-fit form-group  ">


                        <div className="">

                        <div className="flex items-center mt-5 ml-5">
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Alcohol Consuption (Frequency):  <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/></label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Smoking (Current/Past):  <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/></label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Diet (Balanced/High Sugar/Processed Foods):  <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/></label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> UV Exposure (Sunglasses Use: Yes/No):  <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/></label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Screen Time (Mobile, TV, Gaming):  <input  className="w-[250px] text-center border-b-2 border-[#2d2d44]" type="text" name="patient" id="patient"/></label>     
                        </div>

                      </div>
                       </div>  
                       




                       <h1 className="text-[23px]  font-bold  text-[#2d2d44] mt-10">Special Visual Needs:</h1>
                        <div className=" h-fit form-group  ">


                        <div className="">

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Need for Safety Glasses (e.g., Design, Electrical Work) </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Color Vision Requirements (e.g., Design, Eletrical Work) </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Night Driving Difficulties </label>     
                        </div>

                        <div className="flex items-center mt-5 ml-5">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  type="checkbox" name="patient" id="patient"/>
                        <label className="text-[23px]  font-semibold  text-[#2d2d44] "htmlFor="patient"> Need for Blue Filtering (Digital Strain) </label>     
                        </div>

                      </div>
                       </div>  






                    </div>



                </div>
                </div>
            </div>


           </div>
        </section>




    </>
   )
  }
        
export default PatientInformation