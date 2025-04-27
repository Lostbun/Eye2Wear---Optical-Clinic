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
  const [patientlastname, setpatientlastname] = useState('');
  const [patientfirstname, setpatientfirstname] = useState('');
  const [patientmiddlename, setpatientmiddlename] = useState('');
   const [patientprofilepicture, setpatientprofilepicture] = useState('');
  const [patientage  , setpatientage ] = useState('');
  const [patientbirthdate  , setpatientbirthdate ] = useState('');
  const [patientgender  , setpatientgender ] = useState('');
  const [patientcontactnumber  , setpatientcontactnumber ] = useState('');
  const [patienthomeaddress  , setpatienthomeaddress ] = useState('');
  const [patientemergencycontactname  , setpatientemergencycontactname ] = useState('');
  const [patientemergencycontactnumber  , setpatientemergencycontactnumber ] = useState('');




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


  //PROFILE IMAGE TYPE HANDLING
  const handleprofilechange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if(!file.type.match('image.*')){
        alert("Please select an image file (JPG or PNG)");
        return;
      }

      setselectedprofile(file);


      const reader = new FileReader();
      reader.onloadend = () => {
        setpreviewimage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };



  //Handles the click event of upload button
  const handleuploadclick = () => {
    imageinputref.current.click();
  };


  const handleremoveprofile = () => {
    setselectedprofile(null);
    setpreviewimage(null);
    if(imageinputref.current){
      imageinputref.current.value = "";
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








  const [showlogoutbtn, setshowlogoutbtn] = useState(false);
  const showlogout = () => {
    setshowlogoutbtn(!showlogoutbtn);
  }


  
  //Retrieveing Data from useAuth Hook
  const {handlelogout, fetchpatientdetails} = useAuth();
  useEffect(() => {
    const loadpatient = async () => {
      const data = await fetchpatientdetails();

      if(data){
        setpatientlastname(data.patientlastname || '');
        setpatientfirstname(data.patientfirstname || '');
        setpatientmiddlename(data.patientmiddlename || '');
        setpatientprofilepicture(data.patientprofilepicture || '');
      }
    };

    loadpatient();
  }, [fetchpatientdetails]);













  return (
    <>

     {/* NavBar */}
    <div className=" bg-white" >
      <header id="header" className="flex justify-between items-center text-black py-4 px-8 md:px-32 bg-white rounded-4xl drop-shadow-md">
        <a id:logocontain href="#">
          <img src={navlogo} alt="" className="w-52 hover:scale-105 transition-all"></img>
        </a>

        <ul id:listcontain  className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <Link to="/patientlandingpage" className="text-[#000000] hover:text-white no-underline"><li className="p-3 hover:bg-sky-400 text-black hover:text-white rounded-md transition-all cursor-pointer">Home</li></Link>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Products</li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Explore</li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Contact</li>
        </ul>

        <div className="relative">
    <div id="profile" onClick={showlogout}  className="ml-3  flex justify-center items-center p-2 bg-[#fbfbfb00] border-2 border-gray-200  shadow-lg  rounded-full hover:cursor-pointer hover:scale-105 transition-all">
     <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-10 w-10 rounded-full"></img>
     <p className="font-albertsans font-bold ml-3 text-gray-500 text-[17px]">Hi, {patientfirstname} </p>
    </div>

    {showlogoutbtn && (
         <div id="logoutdiv" className=" absolute left-1/2 transform -translate-x-1/2 ml-3 mt-3  flex justify-center items-center p-3 bg-[#ad4e43] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" onClick={handlelogout}>
         <i className="bx bx-exit mt-1 pr-2 font-semibold text-white text-[17px]"/>
         <p className="font-semibold text-white text-[17px]">Logout</p>
       </div>    
      )}
    </div>



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

                          <div className={`pl-5 w-full h-12  flex items-center  hover:cursor-pointer hover:scale-105 transition-all  ${activeForm === `patientdemographic` ? `bg-sky-700 rounded-4xl` : ``}`}  onClick={() => setactiveForm(`patientdemographic`)} ><i className="bx bxs-user  pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Patient Demographic</span></div>
                          <div className={`pl-5 w-full h-12 mt-5 flex items-center hover:cursor-pointer hover:scale-105 transition-all ${activeForm === `medicalhistory` ? `bg-sky-700 rounded-4xl` : ``}`}  onClick={() => setactiveForm(`medicalhistory`)}><FontAwesomeIcon icon={faClock}  className="pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Medical History</span></div>
                          <div className={`pl-5 w-full h-12 mt-5 flex items-center xhover:cursor-pointer hover:scale-105 transition-all ${activeForm === `ocularhistory` ? `bg-sky-700 rounded-4xl` : ``}`}  onClick={() => setactiveForm(`ocularhistory`)}><FontAwesomeIcon icon={faEye}  className="pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Ocular History</span></div>
                          <div className={`pl-5 w-full h-12 mt-5 flex items-center hover:cursor-pointer hover:scale-105 transition-all ${activeForm === `lifestylevisual` ? `bg-sky-700 rounded-4xl` : ``}`}  onClick={() => setactiveForm(`lifestylevisual`)}><i className="bx bx-run  pr-2 font-bold text-[22px] text-white"/><span className="font-semibold text-white text-[20px]">Lifestyle & Visual</span></div>
                          <div className="mt-5 flex justify-center align-middle p-3 bg-[#1cad11] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><p className="font-semibold text-[20px] text-white">Save</p></div>
                       


                    </div>
                </div>
                <div className="bg-white border-3 h-max pb-10 border-gray-100 shadow-lg w-[1000px] rounded-4xl flex flex-col  ml-10">
                    <div className="bg-[#2d2d44] h-[100px] flex items-center justify-center rounded-tl-4xl rounded-tr-4xl ">
                    <i class="bx bx-clipboard 0 text-[50px] font-albertsans font-extrabold italic text-white"/>
                    <h1 className="text-[40px]  pl-5 font-bold  text-white ">Patient Information Form</h1>
          
                    </div>
                     <div className="flex items-center justify-center mt-10"> <h1 className="text-[25px]  pl-5 font-league  text-[#2d2d44] ">{formtitles[activeForm]}</h1></div>









{/* Patient Demographic Form */} {/* Patient Demographic Form */}  {/* Patient Demographic Form */}  {/* Patient Demographic Form */}  {/* Patient Demographic Form */} 

                    <div id="patientdemographicform" className=" h-[760px] mt-5 overflow-y-auto max-h-[750px]" style={{display: activeForm === "patientdemographic" ? "block" : "none"}}>
                    <form>
                    
                      <div className=" mt-5 flex ">


                      <div className=" w-60 h-60 ml-10">
                        <img className=" object-cover h-60 w-full rounded-full" src={patientprofilepicture || defaultprofilepic}/>

                        <input  className="hidden" type="file" onChange={handleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={imageinputref} />
                        <div onClick={handleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                        
                        {selectedprofile && (<div onClick={handleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                      </div>

                      <div className=" ml-15">
                       <div className=" h-fit form-group  ">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientlastname">Last Name :</label>     
                        <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patientlastname} onChange={(e) => setpatientlastname(e.target.value)} type="text" name="patientlastname" id="patientlastname" placeholder="Patient Last Name..."/></div>

                        <div className=" h-fit form-group  mt-5">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientfirstname">First Name :</label>     
                        <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patientfirstname} onChange={(e) => setpatientfirstname(e.target.value)}  type="text" name="patientfirstname" id="patientfirstname" placeholder="Patient First Name..."/></div>

                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientmiddlename">Middle Name :</label>     
                        <input className="w-112 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patientmiddlename} onChange={(e) => setpatientmiddlename(e.target.value)}  type="text" name="patientmiddlename" id="patientmiddlename" placeholder="Patient Middle Name.."/></div>



                        <div className=" mt-5 flex items-center">
                        <div className="">

                        <div className=" h-fit form-group">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientage">Age :</label>     
                        <input className="w-32 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patientage} onChange={(e) => setpatientage(e.target.value)}  type="number" name="patientage" id="patientage" placeholder="Age..."/></div>

                            </div>

                            <div className="">
                              
                            <div className=" h-fit form-group ml-15">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientbirthdate">Birthdate :</label>     
                           <input className="w-32 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patientbirthdate} onChange={(e) => setpatientbirthdate(e.target.value)}  type="text" name="patientbirthdate" id="patientbirthdate" placeholder="mm/dd/yyyy"/> </div>

                            </div>


                        </div>




                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientgender">Gender :</label>     
                        <div className="ml-3"><GenderBox value={patientgender} onChange={(e) => setpatientgender(e.target.value)} /></div>  </div>


                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientcontactnumber">Contact Number :</label>     
                        <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patientcontactnumber} onChange={(e) => setpatientcontactnumber(e.target.value)}  type="text" name="patientcontactnumber" id="patientcontactnumber" placeholder="Patient Contact Number.."/> </div>

                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patienthomeaddress">Home Address :</label>     
                        <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patienthomeaddress} onChange={(e) => setpatienthomeaddress(e.target.value)}  type="text" name="patienthomeaddress" id="patienthomeaddress" placeholder="Patient Home Address.."/> </div>


                        <div className=" h-fit form-group  mt-20 flex">
                        <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactname">Emergency Contact Name :</label>     
                        <input className="w-90 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patientemergencycontactname} onChange={(e) => setpatientemergencycontactname(e.target.value)}  type="text" name="patientemergencycontactname" id="patientemergencycontactname" placeholder="Emergency Contact Name.."/> </div>

                        <div className=" h-fit form-group  mt-5 flex">
                        <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactnumber">Emergency Contact Number :</label>     
                        <input className="w-84 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={patientemergencycontactnumber} onChange={(e) => setpatientemergencycontactnumber(e.target.value)}  type="text" name="patientemergencycontactnumber" id="patientemergencyconctactnumber" placeholder="Emergency Contact Number.."/> </div>


       
                        <div className=" mt-15">
                    
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