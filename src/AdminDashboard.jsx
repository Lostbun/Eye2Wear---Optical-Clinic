import React, { useState,useRef, useEffect, useCallback } from "react";
import { Link} from "react-router-dom";

import landinglogo from "../src/assets/images/landinglogo.png";
import { useAuth as useAdminAuth} from "./hooks/adminuseAuth";
import { useAuth as useStaffAuth} from "./hooks/staffuseAuth";
import { useAuth as useOwnerAuth} from "./hooks/owneruseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bautistalogo from"../src/assets/images/bautistalogo.png";
import ambherlogo from"../src/assets/images/ambherlogo.png";
import defaultprofilepic from '../src/assets/images/defaulticon.png'
import imageCompression from "browser-image-compression";
import darklogo from "../src/assets/images/darklogo.png";
import axios from "axios";
import { GenderBoxAdminDash } from "./components/GenderBoxAdminDash";
import { OwnerClinicBox } from "./components/OwnerClinicBox";
import {OwnereyespecialistYesorNoBox} from "./components/OwnereyespecialistYesorNoBox";
import { StaffeyespecialistYesorNoBox } from "./components/StaffeyespecialistYesorNoBox";
import { BautistaeyespecialistBox } from "./components/BautistaeyespecialistBox";
import { AmbhereyespecialistBox } from "./components/AmbhereyespecialistBox";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import defaultimageplaceholder from "../src/assets/images/defaultimageplaceholder.png";
import { AmbherinventorycategoryBox } from "./components/AmbherinventorycategoryBox";
import { BautistainventorycategoryBox } from "./components/BautistainventorycategoryBox";
import cautionlowstockalert from "../src/assets/images/caution.png";
function AdminDashboard(){


  const loggedinusertype = JSON.parse(localStorage.getItem('currentuser'));
  



  const [adminfirstname, setadminfirstname] = useState('');
  const [adminmiddlename, setadminmiddlename] = useState('');
  const [adminlastname, setadminlastname] = useState('');
  const [admintype, setadmintype] = useState('');
  const [adminprofilepicture, setadminprofilepicture] = useState('');


  const [showlogoutbtn, setshowlogoutbtn] = useState(false);
  const showlogout = () => {
    setshowlogoutbtn(!showlogoutbtn);
  }



  
  //Retrieveing Data from useAuth Hook
  const {stafflogout, fetchstaffdetails} = useStaffAuth();
  const {ownerlogout, fetchownerdetails} = useOwnerAuth();
  const {adminlogout, fetchadmindetails} = useAdminAuth();

  const [ownerownedclinic,setownerownedclinic] = useState('');


  const currentusertoken = localStorage.getItem("stafftoken") ||
                           localStorage.getItem("ownertoken") ||
                           localStorage.getItem("admintoken");



  
  const currentuserloggedin = localStorage.getItem("stafftoken") ? "Staff" :
                              localStorage.getItem("ownertoken") ? "Owner" :
                              localStorage.getItem("admintoken") ? "Admin" : null;


  const handlelogout = () => {
    if(currentuserloggedin === "Admin") adminlogout();
    else if(currentuserloggedin === "Staff") stafflogout();
    else if (currentuserloggedin === "Owner") ownerlogout();
  }                           
  


  
  useEffect(() => {
    const loaduser = async () => {
    let data;

      if(currentuserloggedin === "Admin"){
        data = await fetchadmindetails();
        
        if(data) {
          setadminfirstname(data.adminfirstname || '');
          setadminmiddlename(data.adminmiddlename || '');
          setadminlastname(data.adminlastname || '');
          setadminprofilepicture(data.adminprofilepicture || '');
        }
      }


      else if(currentuserloggedin === "Staff"){
        data = await fetchstaffdetails();
        
        if(data) {
          setadminfirstname(data.stafffirstname || '');
          setadminmiddlename(data.staffmiddlename || '');
          setadminlastname(data.stafflastname || '');
          setadminprofilepicture(data.staffprofilepicture || '');
        }
      }

      else if(currentuserloggedin === "Owner"){
        data = await fetchownerdetails();
        if(data) {
          setadminfirstname(data.ownerfirstname || '');
          setadminmiddlename(data.ownermiddlename || '');
          setadminlastname(data.ownerlastname || '');
          setadminprofilepicture(data.ownerprofilepicture || '');
          setownerownedclinic(data.ownerclinic || '');
        }
      }

 


    };

    loaduser();
  }, [fetchadmindetails, fetchownerdetails, fetchstaffdetails, currentuserloggedin]);








  const [sidebarexpanded, setsidebarexpanded] = useState(false);
  const toggleadminsidebar = () => {
    setsidebarexpanded(!sidebarexpanded);
  }


  const [activedashboard, setactivedashboard] = useState('summaryoverview');
  const showdashboard = (dashboardid) => {
     setactivedashboard(dashboardid);
  };



  

  const [currenttime, setcurrenttime] = useState(new Date());

  useEffect(() => {
    const time  = setInterval(() =>{
      setcurrenttime(new Date());
    },1000);

    return () => clearInterval(time);
  }, []);

  const currentdateoption = {weekday: 'long', year: 'numeric', month:'long', day:'numeric'};
  const currenttimeoption = {hour: '2-digit', minute: '2-digit', second: '2-digit'};





  const [activetodaysappointmentfilter, setactivetodaysappointmentfilter] = useState('filteralltoday');
  const activetodayfilter = (activefilter) => {
    setactivetodaysappointmentfilter(activefilter);
  };


  const [activependingordersfilter, setactivependingordersfilter] = useState('filterallpending');
  const activependingfilter = (activependingorder) => {
    setactivependingordersfilter(activependingorder);
  };



  const [activestockfilter, setactivestockfilter] = useState('filterallstock');
  const activestockinventoryfilter = (activestockinvfilter) => {
    setactivestockfilter(activestockinvfilter);
  };




  const [activeunreadfilter, setactiveunreadfilter] = useState('filterallunread');
  const activeunreadmessagesfilter = (activeunreadmsgfilter) => {
    setactiveunreadfilter(activeunreadmsgfilter);
  };





  const [activeaccounttable, setactiveaccounttable] = useState('patientaccounttable');
  const showaccounttable = (accounttableid) => {
        setactiveaccounttable(accounttableid);
  };






//PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE
//PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE
//PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE
//PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE
//PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE
//PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE
//PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE //PATIENT ACCOUNT TABLE
  const [showaddpatientdialog, setshowaddpatientdialog] = useState(false);
  const [showviewpatientdialog, setshowviewpatientdialog] = useState(false);
  const [showdeletepatientdialog, setshowdeletepatientdialog] = useState(false);
  const [patients, setpatients] = useState([]);
  const [selectedpatientaccount, setselectedpatientaccount] = useState(null);
  const [selectededitpatientaccount, setselectededitpatientaccount] = useState(null);
  const [loadingpatients, setloadingpatients] = useState(true);
  const [failedloadingpatients, setfailedloadingpatients] = useState(null);
  const [selectedprofile, setselectedprofile] = useState(null);
  const [previewimage, setpreviewimage] = useState (null);
  const imageinputref = useRef(null);
  const [searchpatients, setsearchpatients] = useState('');
  const [filteredpatients, setfilteredpatients] = useState([]);
  const [emailexist, setemailexist] = useState(false);
  const [checkemail, setcheckemail] = useState(false);
  const [emailerror, setemailerror] = useState(false);
  const emailcharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [issubmitting, setissubmitting] = useState(false);
  const [message, setmessage] = useState({ text:'', type:''});


  //Blank variables that stores all data to be sent to database
  const [formdata, setformdata] = useState({
      role:'Patient',
      patientemail:'',
      patientpassword:'',
      patientlastname:'',
      patientfirstname:'',
      patientmiddlename:'',
      patientprofilepicture:'' // Holds the profile picture 
  });

  //Debounce check for search input
  const searchpatientdebounce = (functions, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => functions.apply(this, args), delay);
    }
  };

  //Patient search filter
  const filterpatientaccount = useCallback(searchpatientdebounce((term) => {
    if(!term) {
      setfilteredpatients(patients);
      return;
    }
  
    const filtered = patients.filter(patient =>
      patient.patientlastname.toLowerCase().includes(term.toLowerCase()) ||
      patient.patientfirstname.toLowerCase().includes(term.toLowerCase()) ||
      patient.patientmiddlename.toLowerCase().includes(term.toLowerCase()) ||
      patient.patientemail.toLowerCase().includes(term.toLowerCase()) ||
      patient.patientId.toString().includes(term)
    );

    setfilteredpatients(filtered);
  }, 300), [patients]);

  //Fetching patient list and data from database
  useEffect(() => {
    if(activeaccounttable === 'patientaccounttable'){

      const fetchpatients = async () => {
        try{

          const fetchresponse = await fetch('/api/patientaccounts', {
            headers: {
              'Authorization': `Bearer ${currentusertoken}`
            }
          });
          
          if(!fetchresponse.ok){
            throw new Error("Failed to fetch patient accounts");
          }

          const patientdata = await fetchresponse.json();
          setpatients(patientdata);
        
        }catch(error){
          setfailedloadingpatients(error.message);
        }finally{
          setloadingpatients(false);
        }
      };
      fetchpatients();

    }
  }, [activeaccounttable]);

  //Patient Filter
  useEffect(() => {
    filterpatientaccount(searchpatients);
  }, [searchpatients, filterpatientaccount]);

  const renderpatientaccounts = () => {

  const patientstorender = searchpatients ? filteredpatients : patients;

  if (loadingpatients) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (failedloadingpatients) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error: {failedloadingpatients}
      </div>
    );
  }



  if(searchpatients && filteredpatients.length == 0){
    return(
      <div className="rounded-2xl py-6 px-4 bg-yellow-50 text-yellow-600">
        No patients found.
      </div>
    )
  }




  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="w-full rounded-tl-2xl  rounded-tr-2xl shadow-lg">
        <thead className="rounded-tl-2xl rounded-tr-2xl">
          <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl ">
            <th className="pb-3 pt-3 pl-2 pr-2 text-center  rounded-tl-2xl">Id</th>
            <th className="pb-3 pt-3 pl-5 pr-5 text-center"></th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Lastname</th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Firstname</th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Middlename</th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Email</th>

            <th className="pb-3 pt-3 pl-2 pr-2 text-center">isVerified</th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th>
            <th className="pb-3 pt-3 text-center pr-3"></th>
            <th className="pb-3 pt-3 text-center pr-3  rounded-tr-2xl"></th>

          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200 bg-white">
        {patientstorender.map((patient) => (
            <tr key={patient._id}  className="hover:bg-gray-100  transition-all duration-300 ease-in-out hover:cursor-pointer ">
              <td  className="py-3 px-6 text-[#3a3a3a] font-albertsans font-medium ">#{patient.patientId}</td>
              <td  className="px-6 py-3 text-center">
                <div className="flex justify-center">
                <img 
                  src={patient.patientprofilepicture} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'default-profile-url'; // Fallback image
                  }}
                />
                </div>
              </td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">{patient.patientlastname}</td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium max-w-[150px]">{patient.patientfirstname}</td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">{patient.patientmiddlename}</td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                <a href={`mailto:${patient.patientemail}`} className="text-blue-400 hover:underline">
                  {patient.patientemail}
                </a>

              </td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                <span className={`rounded-2xl text-xs px-5 py-4 ${patient.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                  {patient.isVerified ? 'Active' : 'Pending'}
                </span>
              </td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                {new Date(patient.createdAt).toLocaleDateString('en-US',{
                  year:'numeric',
                  month: 'short',
                  day:'numeric'
                })}
              </td>
              <td><div onClick={() =>  {
                setselectededitpatientaccount({
                   id: patient._id,
                   email: patient.patientemail,
                   lastname: patient.patientlastname,
                   firstname: patient.patientfirstname,
                   middlename: patient.patientmiddlename,
                   profilepicture: patient.patientprofilepicture
                   });

                setformdata({
                  role: 'Patient',
                  patientemail: patient.patientemail,
                  patientpassword: patient.patientpassword,
                  patientlastname: patient.patientlastname,
                  patientfirstname: patient.patientfirstname,
                  patientmiddlename: patient.patientmiddlename,
                  patientprofilepicture: patient.patientprofilepicture
                });

                setpreviewimage(patient.patientprofilepicture);
                setshowviewpatientdialog(true);}}

               className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-pencil text-white mr-1"/><h1 className="text-white">Edit</h1></div></td>
  
              <td><div onClick={() =>  {
                setselectedpatientaccount({
                   id: patient.patientId,
                   email: patient.patientemail,
                   name: `${patient.patientfirstname} ${patient.patientlastname}`});
                            
                setshowdeletepatientdialog(true);}}

               className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div></td>


              </tr>
  ))}
        </tbody>
      </table>
      

    </div>
  );
  };

  //PROFILE IMAGE TYPE HANDLING
  const handleprofilechange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;


    const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
    if(!imagefiletype.includes(file.type)) {
      alert("Please select an image file (JPG or PNG)");
      return;
    }


    const maximagefile = 1;
    if(file.size > maximagefile * 1024 * 1024){
      alert("Image is too large. Please select image under 1MB");
      return;
    }

    setselectedprofile(null);
    setpreviewimage(null);

    if(imageinputref.current){
      imageinputref.current.value = "";
    }






    try{

      const imageconfiguration = {
        maximagemb: 1,
        maxworh: 800,
        useWebWorker: true,
        initialQuality: 0.8
      };


      const compressedimageprofile = await imageCompression(file, imageconfiguration);
      const reader = new FileReader();
      reader.onloadend = () => {

        if(reader.error){
          console.error("Error processing image file : ", reader.error);
          alert("Error processing image file. Try again");
          return;
        }
        setpreviewimage(reader.result);
      };


      reader.onerror = () => {
        console.error("File Reader Error : ", reader.error);
        alert("Error reading file. Try again");
        return;
      };

      reader.readAsDataURL(compressedimageprofile);
      setselectedprofile(compressedimageprofile);
    

    } catch (error) {

      console.error("Image file compression failed : ", error.message);
      alert("Image file compression failed. Try again");
      return;

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


  //Chceks if email is already existing
 useEffect(() => {
        const debounceemailcheck = async () => {
          
          //Don't check if email input is empty
          if(!formdata.patientemail) {
            setemailerror(false);
            setemailexist(false);
            return;
          }
  
  
  
          if(!emailcharacters.test(formdata.patientemail)) {
            setemailerror(true);
            return;
          }
  
          setcheckemail (true);
  
          try{
            //Request to server if the email exists in patientaccounts collection
            const patientresponse = await fetch(
              `http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(formdata.patientemail)}`
       
            );
  


            //Request to server if the email exists in staffaccounts collection
            const staffresponse = await fetch(
               `http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(formdata.patientemail)}`
                   
            );


            //Request to server if the email exists in adminaccounts collection
            const ownerresponse = await fetch(
                `http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(formdata.patientemail)}`
                   
             );


            //Request to server if the email exists in adminaccounts collection
            const adminresponse = await fetch(
                `http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(formdata.patientemail)}`
                   
            );
            
          const patientdata = await patientresponse.json();
          const staffdata = await staffresponse.json();
          const ownerdata = await ownerresponse.json();
          const admindata = await adminresponse.json();

          //Save wether email existss in db
          setemailexist(patientdata.exists || staffdata.exists  ||  ownerdata.exists   ||  admindata.exists); 
          setemailerror(patientdata.exists || staffdata.exists  ||  ownerdata.exists   ||  admindata.exists);
  
  
  
  
        }catch(error){
          console.error("Failed email validation:", error);
        }finally{
          //Check email done
          setcheckemail(false);
        }
  
        }
  
        const timer = setTimeout(debounceemailcheck, 500);
        return () => clearTimeout(timer); //Cleanup
  }, [formdata.patientemail]);





    //Handlechange function to be used in input forms
  const handlechange = (e) => {
      const {name, value} = e.target
      setformdata(prev => ({
        ...prev,
        [name]: value
      }))
  } 

    
  //INSERT PATIENT ACCOUNT  //INSERT PATIENT ACCOUNT  //INSERT PATIENT ACCOUNT   //INSERT PATIENT ACCOUNT  //INSERT PATIENT ACCOUNT  //INSERT PATIENT ACCOUNT 
    const handlesubmit = async (e) => {
      e.preventDefault()
      setissubmitting(true)
      setmessage({
        text:'', type:''
      })

    try{

      const patientaccsubmission = {
        ...formdata,
        patientprofilepicture: previewimage || formdata.patientprofilepicture
      };

  //Sends all patient data to the server
      const response = await fetch("http://localhost:3000/api/patientaccounts",{
            method: "POST",
            headers: {
              "Content-Type":"application/json",
              'Authorization': `Bearer ${currentusertoken}`
            },
            body: JSON.stringify(patientaccsubmission)
      });


      await axios.post('http://localhost:3000/api/accountcreation/patient', {
        email: formdata.patientemail, 
        password: formdata.patientpassword});

      await response.json();
      setmessage({text:"Registration Sucessful!",type:"success"});
        
    
        //Resets the input forms except the profile picture
        setformdata({
          role: 'Patient',
          patientemail:'',
          patientpassword:'',
          patientlastname:'',
          patientfirstname:'',
          patientmiddlename:'',
          patientprofilepicture: ''
        });

        setselectedprofile(null);
        setpreviewimage(null);


   
    //Error encounter  
      } catch(error) {
        console.error("Error:", error)
        setmessage({text:"Registration Failed. Try again",type:"error"});
             
      } finally {
        setissubmitting(false)
      }
  }

  //DELETE PATIENT ACCOUNT    //DELETE PATIENT ACCOUNT    //DELETE PATIENT ACCOUNT    //DELETE PATIENT ACCOUNT    //DELETE PATIENT ACCOUNT    //DELETE PATIENT ACCOUNT  
    const deletepatientaccount = async () => {
      try{
        if(!selectedpatientaccount) return;

        const response = await fetch(`/api/patientaccounts/${selectedpatientaccount.id}`,{
          method: 'DELETE',
          headers:{
            'Authorization': `Bearer ${currentusertoken}`
          }
        });



        await axios.post('http://localhost:3000/api/accountdeletion/patient', {
          email: selectedpatientaccount.email});



        if(!response.ok){
          throw new Error("Failed to delete patient account");
        }



        const fetchresponse = await fetch('/api/patientaccounts', {
            headers:{
              'Authorization':`Bearer ${localStorage.getItem('admintoken')}`
            }
        });

        if(!fetchresponse.ok) {
          throw new Error("Failed to retrieve updated patientaccounts table");
        }

        const patientaccounts = await fetchresponse.json();
        setpatients(patientaccounts);

        setshowdeletepatientdialog(false);
        setselectedpatientaccount(null);

        
      }catch (error){
        console.error("Failed deleting patient: ", error);
      }
    };

  //UPDATE PATIENT ACCOUNT  //UPDATE PATIENT ACCOUNT  //UPDATE PATIENT ACCOUNT  //UPDATE PATIENT ACCOUNT  //UPDATE PATIENT ACCOUNT  //UPDATE PATIENT ACCOUNT
    const updatepatientaccount = async (e) => {
      
      e.preventDefault();
      setissubmitting(true);
      setmessage({text:'', type:''});

      try{
        if(!selectededitpatientaccount) return;

        const updatepatientaccountdetails = {
          ...formdata,
          patientprofilepicture: previewimage || formdata.patientprofilepicture
        };

        const response = await fetch(`/api/patientaccounts/${selectededitpatientaccount.id}`,{
          method:'PUT',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('admintoken')}`
          },
          body: JSON.stringify(updatepatientaccountdetails)
        });


        if(!response.ok) {
          const errorresponse = await response.json();
          throw new Error(errorresponse.message || "Failed to update patient account");
        }

        const fetchresponse = await fetch('/api/patientaccounts',{
          headers: {
            'Authorization' : `Bearer ${localStorage.getItem('admintoken')}` 
          }
        });

        if(!fetchresponse.ok) {
          const errorresponse = await response.json();
          throw new Error(errorresponse.message || "Failed to update patient account table");
        }

        //Success account update
        const patientdata = await fetchresponse.json();
        setpatients(patientdata);
        setmessage({text:"Patient Account Updated Successfully!", type:"success"});

        setTimeout(() => {
          setissubmitting(false);
          setselectededitpatientaccount(null);
          setshowviewpatientdialog(false);
        }, 1500);

      } catch (error){
        console.error("Error updating patient account : ", error);
        setissubmitting(false);
        setmessage({text: "Failed to update account. Please try again", type:"error"});
      }
    }








  



  










//STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE
//STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE
//STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE
//STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE
//STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE
//STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE
//STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE //STAFF ACCOUNT TABLE

const [showaddstaffdialog, setshowaddstaffdialog] = useState(false);
  const [showviewstaffdialog, setshowviewstaffdialog] = useState(false);
  const [showdeletestaffdialog, setshowdeletestaffdialog] = useState(false);
  const [staffs, setstaffs] = useState([]);
  const [selectedstaffaccount, setselectedstaffaccount] = useState(null);
  const [selectededitstaffaccount, setselectededitstaffaccount] = useState(null);
  const [loadingstaffs, setloadingstaffs] = useState(true);
  const [failedloadingstaffs, setfailedloadingstaffs] = useState(null);
  const [staffselectedprofile, setstaffselectedprofile] = useState(null);
  const [staffpreviewimage, setstaffpreviewimage] = useState (null);
  const staffimageinputref = useRef(null);
  const [searchstaffs, setsearchstaffs] = useState('');
  const [filteredstaffs, setfilteredstaffs] = useState([]);
  const [staffemailexist, setstaffemailexist] = useState(false);
  const [staffcheckemail, setstaffcheckemail] = useState(false);
  const [staffemailerror, setstaffemailerror] = useState(false);
  const staffemailcharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [staffissubmitting, setstaffissubmitting] = useState(false);
  const [staffmessage, setstaffmessage] = useState({ text:'', type:''});


  //Blank variables that stores all data to be sent to database
  const [staffformdata, setstaffformdata] = useState({
      role:'Staff',
      staffemail:'',
      staffpassword:'',
      stafflastname:'',
      stafffirstname:'',
      staffmiddlename:'',
      staffclinic:'',
      staffiseyespecialist: '',
      staffprofilepicture:'' // Holds the profile picture 
  });

  //Debounce check for search input
  const searchstaffdebounce = (functions, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => functions.apply(this, args), delay);
    }
  };

  //staff search filter
  const filterstaffaccount = useCallback(searchstaffdebounce((term) => {
    if(!term) {
      setfilteredstaffs(staffs);
      return;
    }
  
    const filtered = staffs.filter(staff =>
      staff.stafflastname.toLowerCase().includes(term.toLowerCase()) ||
      staff.stafffirstname.toLowerCase().includes(term.toLowerCase()) ||
      staff.staffmiddlename.toLowerCase().includes(term.toLowerCase()) ||
      staff.staffemail.toLowerCase().includes(term.toLowerCase()) ||
      staff.staffId.toString().includes(term)
    );

    setfilteredstaffs(filtered);
  }, 300), [staffs]);

  //Fetching staff list and data from database
  useEffect(() => {
    if(activeaccounttable === 'staffaccounttable'){

      const fetchstaffs = async () => {
        try{

          const fetchresponse = await fetch('/api/staffaccounts', {
            headers: {
              'Authorization': `Bearer ${currentusertoken}`
            }
          });
          
          if(!fetchresponse.ok){
            throw new Error("Failed to fetch staff accounts");
          }

          const staffdata = await fetchresponse.json();
          setstaffs(staffdata);
        
        }catch(error){
          setfailedloadingstaffs(error.message);
        }finally{
          setloadingstaffs(false);
        }
      };
      fetchstaffs();

    }
  }, [activeaccounttable]);

  //staff Filter
  useEffect(() => {
    filterstaffaccount(searchstaffs);
  }, [searchstaffs, filterstaffaccount]);

  const renderstaffaccounts = () => {

  const staffstorender = searchstaffs ? filteredstaffs : staffs;

  if (loadingstaffs) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (failedloadingstaffs) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error: {failedloadingstaffs}
      </div>
    );
  }



  if(searchstaffs && filteredstaffs.length == 0){
    return(
      <div className="rounded-2xl py-6 px-4 bg-yellow-50 text-yellow-600">
        No staffs found.
      </div>
    )
  }




  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="w-full rounded-tl-2xl  rounded-tr-2xl shadow-lg">
        <thead className="rounded-tl-2xl rounded-tr-2xl">
          <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl ">
            <th className="pb-3 pt-3 pl-2 pr-2 text-center  rounded-tl-2xl">Id</th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center"></th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Lastname</th>
            <th className="pb-3 pt-3 pl-2 pr-2  text-center">Firstname</th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Middlename</th>
            <th className="pb-3 pt-3  pl-2 pr-2 text-center">Email</th>
            <th className="pb-3 pt-3  pl-2 pr-2 text-center">Clinic</th>
            <th className="pb-3 pt-3  pl-2 pr-2 text-center">Eye Specialist</th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">isVerified</th>
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th>
            <th className="pb-3 pt-3 text-center pr-3"></th>
            <th className="pb-3 pt-3 text-center pr-3  rounded-tr-2xl"></th>

          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200 bg-white">
        {staffstorender.map((staff) => (
            <tr key={staff._id}  className="hover:bg-gray-100  transition-all duration-300 ease-in-out hover:cursor-pointer ">
              <td  className="py-3 px-6 text-[#3a3a3a] font-albertsans font-medium ">#{staff.staffId}</td>
              <td  className="px-6 py-3 text-center">
              <div className="flex justify-center">
                <img 
                  src={staff.staffprofilepicture} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'default-profile-url'; // Fallback image
                  }}
                />
                </div>
              </td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">{staff.stafflastname}</td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium max-w-[150px]">{staff.stafffirstname}</td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">{staff.staffmiddlename}</td>
      
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                <a href={`mailto:${staff.staffemail}`} className="text-blue-400 hover:underline">
                  {staff.staffemail}
                </a>

              </td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">{staff.staffclinic}</td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">{staff.staffiseyespecialist}</td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                <span className={`rounded-2xl text-xs px-5 py-4 ${staff.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                  {staff.isVerified ? 'Active' : 'Pending'}
                </span>
              </td>
              <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                {new Date(staff.createdAt).toLocaleDateString('en-US',{
                  year:'numeric',
                  month: 'short',
                  day:'numeric'
                })}
              </td>
              <td><div onClick={() =>  {
                setselectededitstaffaccount({
                   id: staff._id,
                   email: staff.staffemail,
                   lastname: staff.stafflastname,
                   firstname: staff.stafffirstname,
                   middlename: staff.staffmiddlename,
                   eyespecialist: staff.staffiseyespecialist,
                   profilepicture: staff.staffprofilepicture
                   });

                setstaffformdata({
                  role: 'staff',
                  staffemail: staff.staffemail,
                  staffpassword: staff.staffpassword,
                  stafflastname: staff.stafflastname,
                  stafffirstname: staff.stafffirstname,
                  staffmiddlename: staff.staffmiddlename,
                  staffiseyespecialist: staff.staffiseyespecialist,
                  staffprofilepicture: staff.staffprofilepicture
                });

                setstaffpreviewimage(staff.staffprofilepicture);
                setshowviewstaffdialog(true);}}

               className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-pencil text-white mr-1"/><h1 className="text-white">Edit</h1></div></td>
  
              <td><div onClick={() =>  {
                setselectedstaffaccount({
                   id: staff.staffId,
                   email: staff.staffemail,
                   name: `${staff.stafffirstname} ${staff.stafflastname}`});
                            
                setshowdeletestaffdialog(true);}}

               className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div></td>


              </tr>
  ))}
        </tbody>
      </table>
      

    </div>
  );
  };

  //PROFILE IMAGE TYPE HANDLING
  const staffhandleprofilechange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;


    const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
    if(!imagefiletype.includes(file.type)) {
      alert("Please select an image file (JPG or PNG)");
      return;
    }


    const maximagefile = 1;
    if(file.size > maximagefile * 1024 * 1024){
      alert("Image is too large. Please select image under 1MB");
      return;
    }

    setstaffselectedprofile(null);
    setstaffpreviewimage(null);

    if(staffimageinputref.current){
      staffimageinputref.current.value = "";
    }






    try{

      const imageconfiguration = {
        maximagemb: 1,
        maxworh: 800,
        useWebWorker: true,
        initialQuality: 0.8
      };


      const compressedimageprofile = await imageCompression(file, imageconfiguration);
      const reader = new FileReader();
      reader.onloadend = () => {

        if(reader.error){
          console.error("Error processing image file : ", reader.error);
          alert("Error processing image file. Try again");
          return;
        }
        setstaffpreviewimage(reader.result);
      };


      reader.onerror = () => {
        console.error("File Reader Error : ", reader.error);
        alert("Error reading file. Try again");
        return;
      };

      reader.readAsDataURL(compressedimageprofile);
      setstaffselectedprofile(compressedimageprofile);
    

    } catch (error) {

      console.error("Image file compression failed : ", error.message);
      alert("Image file compression failed. Try again");
      return;

    }
      

  };

  //Handles the click event of upload button
  const staffhandleuploadclick = () => {
    staffimageinputref.current.click();
  };

  const staffhandleremoveprofile = () => {
    setstaffselectedprofile(null);
    setstaffpreviewimage(null);
    if(staffimageinputref.current){
      staffimageinputref.current.value = "";
    }
  }


  //Chceks if email is already existing
  useEffect(() => {
        const debounceemailcheck = async () => {
          
          //Don't check if email input is empty
          if(!staffformdata.staffemail) {
            setstaffemailerror(false);
            setstaffemailexist(false);
            return;
          }
  
  
  
          if(!staffemailcharacters.test(staffformdata.staffemail)) {
            setstaffemailerror(true);
            return;
          }
  
          setstaffcheckemail (true);
  
          try{
            //Request to server if the email exists in patientaccounts collection
            const patientresponse = await fetch(
              `http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(staffformdata.staffemail)}`
       
            );
  


            //Request to server if the email exists in staffaccounts collection
            const staffresponse = await fetch(
               `http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(staffformdata.staffemail)}`
                   
            );


            //Request to server if the email exists in adminaccounts collection
            const ownerresponse = await fetch(
                `http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(staffformdata.staffemail)}`
                   
             );


            //Request to server if the email exists in adminaccounts collection
            const adminresponse = await fetch(
                `http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(staffformdata.staffemail)}`
                   
            );
            
          const patientdata = await patientresponse.json();
          const staffdata = await staffresponse.json();
          const ownerdata = await ownerresponse.json();
          const admindata = await adminresponse.json();

          //Save wether email existss in db
          setstaffemailexist(patientdata.exists || staffdata.exists  ||  ownerdata.exists   ||  admindata.exists); 
          setstaffemailerror(patientdata.exists || staffdata.exists  ||  ownerdata.exists   ||  admindata.exists);
  
  
  
  
        }catch(error){
          console.error("Failed email validation:", error);
        }finally{
          //Check email done
          setstaffcheckemail(false);
        }
  
        }
  
        const timer = setTimeout(debounceemailcheck, 500);
        return () => clearTimeout(timer); //Cleanup
  }, [staffformdata.staffemail]);




    //Handlechange function to be used in input forms
  const staffhandlechange = (e) => {
      const {name, value} = e.target
      setstaffformdata(prev => ({
        ...prev,
        [name]: value
      }))
  }

    
  //INSERT staff ACCOUNT  //INSERT staff ACCOUNT  //INSERT staff ACCOUNT   //INSERT staff ACCOUNT  //INSERT staff ACCOUNT  //INSERT staff ACCOUNT 
    const staffhandlesubmit = async (e) => {
      e.preventDefault()
      setstaffissubmitting(true)
      setstaffmessage({
        text:'', type:''
      })

    try{

      
      const staffaccsubmission = {
        ...staffformdata,
        staffclinic: ownerownedclinic,
        staffiseyespecialist: staffformdata.staffiseyespecialist,
        staffprofilepicture: staffpreviewimage || staffformdata.staffprofilepicture
      };

      console.log(staffaccsubmission);

  //Sends all staff data to the server
      const response = await fetch("http://localhost:3000/api/staffaccounts",{
            method: "POST",
            headers: {
              "Content-Type":"application/json",
              'Authorization': `Bearer ${currentusertoken}`
            },
            body: JSON.stringify(staffaccsubmission)
      });


      await axios.post('http://localhost:3000/api/accountcreation/staff', {
        email: staffformdata.staffemail, 
        password: staffformdata.staffpassword});


      //If response is success, it will send data to the api and to the database   
      await response.json();
      setstaffmessage({text:"Registration Sucessful!",type:"success"});
      
        
         
        //Resets the input forms except the profile picture
        setstaffformdata({
          role: 'staff',
          staffemail:'',
          staffpassword:'',
          stafflastname:'',
          stafffirstname:'',
          staffmiddlename:'',
          staffclinic: '',
          staffiseyespecialist:'',
          staffprofilepicture: ''
        });



        setstaffselectedprofile(null);
        setstaffpreviewimage(null);



   
    //Error encounter  
      } catch(error) {
        console.error("Error:", error)
        setstaffmessage({text:"Registration Failed. Try again",type:"error"});
             
      } finally {
        setstaffissubmitting(false)
      }
  }

  //DELETE staff ACCOUNT    //DELETE staff ACCOUNT    //DELETE staff ACCOUNT    //DELETE staff ACCOUNT    //DELETE staff ACCOUNT    //DELETE staff ACCOUNT  
    const deletestaffaccount = async () => {
      try{
        if(!selectedstaffaccount) return;

        const response = await fetch(`/api/staffaccounts/${selectedstaffaccount.id}`,{
          method: 'DELETE',
          headers:{
            'Authorization': `Bearer ${currentusertoken}`
          }
        });



        await axios.post('http://localhost:3000/api/accountdeletion/staff', {
          email: selectedstaffaccount.email});



        if(!response.ok){
          throw new Error("Failed to delete staff account");
        }

        const fetchresponse = await fetch('/api/staffaccounts', {
            headers:{
              'Authorization':`Bearer ${localStorage.getItem('admintoken')}`
            }
        });
        
        if(!fetchresponse.ok) {
          throw new Error("Failed to retrieve updated staffaccounts table");
        }

        const staffaccounts = await fetchresponse.json();
        setstaffs(staffaccounts);

        setshowdeletestaffdialog(false);
        setselectedstaffaccount(null);

        
      }catch (error){
        console.error("Failed deleting staff: ", error);
      }
    };

  //UPDATE staff ACCOUNT  //UPDATE staff ACCOUNT  //UPDATE staff ACCOUNT  //UPDATE staff ACCOUNT  //UPDATE staff ACCOUNT  //UPDATE staff ACCOUNT
    const updatestaffaccount = async (e) => {
      
      e.preventDefault();
      setstaffissubmitting(true);
      setstaffmessage({text:'', type:''});

      try{
        if(!selectededitstaffaccount) return;

        const updatestaffaccountdetails = {
          ...staffformdata,
          staffiseyespecialist:staffformdata.staffiseyespecialist,
          staffprofilepicture: staffpreviewimage || staffformdata.staffprofilepicture
        };

        const response = await fetch(`/api/staffaccounts/${selectededitstaffaccount.id}`,{
          method:'PUT',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('admintoken')}`
          },
          body: JSON.stringify(updatestaffaccountdetails)
        });


        if(!response.ok) {
          const errorresponse = await response.json();
          throw new Error(errorresponse.message || "Failed to update staff account");
        }

        const fetchresponse = await fetch('/api/staffaccounts',{
          headers: {
            'Authorization' : `Bearer ${localStorage.getItem('admintoken')}` 
          }
        });

        if(!fetchresponse.ok) {
          const errorresponse = await response.json();
          throw new Error(errorresponse.message || "Failed to update staff account table");
        }

        //Success account update
        const staffdata = await fetchresponse.json();
        setstaffs(staffdata);
        setstaffmessage({text:"Staff Account Updated Successfully!", type:"success"});

        setTimeout(() => {
          setstaffissubmitting(false);
          setselectededitstaffaccount(null);
          setshowviewstaffdialog(false);
          setstaffmessage({text:"", type:""});
        }, 1500);

      } catch (error){
        console.error("Error updating staff account : ", error);
        setstaffissubmitting(false);
        setstaffmessage({text: "Failed to update account. Please try again", type:"error"});
      }
    }











//OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE
//OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE
//OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE
//OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE
//OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE
//OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE
//OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE //OWNER ACCOUNT TABLE

    const [showaddownerdialog, setshowaddownerdialog] = useState(false);
    const [showviewownerdialog, setshowviewownerdialog] = useState(false);
    const [showdeleteownerdialog, setshowdeleteownerdialog] = useState(false);
    const [owners, setowners] = useState([]);
    const [selectedowneraccount, setselectedowneraccount] = useState(null);
    const [selectededitowneraccount, setselectededitowneraccount] = useState(null);
    const [loadingowners, setloadingowners] = useState(true);
    const [failedloadingowners, setfailedloadingowners] = useState(null);
    const [ownerselectedprofile, setownerselectedprofile] = useState(null);
    const [ownerpreviewimage, setownerpreviewimage] = useState (null);
    const ownerimageinputref = useRef(null);
    const [searchowners, setsearchowners] = useState('');
    const [filteredowners, setfilteredowners] = useState([]);
    const [owneremailexist, setowneremailexist] = useState(false);
    const [ownercheckemail, setownercheckemail] = useState(false);
    const [owneremailerror, setowneremailerror] = useState(false);
    const owneremailcharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [ownerissubmitting, setownerissubmitting] = useState(false);
    const [ownermessage, setownermessage] = useState({ text:'', type:''});
  
  
    //Blank variables that stores all data to be sent to database
    const [ownerformdata, setownerformdata] = useState({
        role:'Owner',
        owneremail:'',
        ownerpassword:'',
        ownerlastname:'',
        ownerfirstname:'',
        ownermiddlename:'',
        ownerclinic: '',
        owneriseyespecialist: '',
        ownerprofilepicture:'' // Holds the profile picture 
    });
  
    //Debounce check for search input
    const searchownerdebounce = (functions, delay) => {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => functions.apply(this, args), delay);
      }
    };
  
    //owner search filter
    const filterowneraccount = useCallback(searchownerdebounce((term) => {
      if(!term) {
        setfilteredowners(owners);
        return;
      }
    
      const filtered = owners.filter(owner =>
        owner.ownerlastname.toLowerCase().includes(term.toLowerCase()) ||
        owner.ownerfirstname.toLowerCase().includes(term.toLowerCase()) ||
        owner.ownermiddlename.toLowerCase().includes(term.toLowerCase()) ||
        owner.owneremail.toLowerCase().includes(term.toLowerCase()) ||
        owner.ownerclinic.toLowerCase().includes(term.toLowerCase()) ||
        owner.ownerId.toString().includes(term)
      );
  
      setfilteredowners(filtered);
    }, 300), [owners]);
  
    //Fetching owner list and data from database
    useEffect(() => {
      if(activeaccounttable === 'owneraccounttable'){
  
        const fetchowners = async () => {
          try{
  
            const fetchresponse = await fetch('/api/owneraccounts', {
              headers: {
                'Authorization': `Bearer ${currentusertoken}`
              }
            });
            
            if(!fetchresponse.ok){
              throw new Error("Failed to fetch owner accounts");
            }
  
            const ownerdata = await fetchresponse.json();
            setowners(ownerdata);
          
          }catch(error){
            setfailedloadingowners(error.message);
          }finally{
            setloadingowners(false);
          }
        };
        fetchowners();
  
      }
    }, [activeaccounttable]);
  
    //owner Filter
    useEffect(() => {
      filterowneraccount(searchowners);
    }, [searchowners, filterowneraccount]);
  
    const renderowneraccounts = () => {
  
    const ownerstorender = searchowners ? filteredowners : owners;
  
    if (loadingowners) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  
    if (failedloadingowners) {
      return (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          Error: {failedloadingowners}
        </div>
      );
    }
  
  
  
    if(searchowners && filteredowners.length == 0){
      return(
        <div className="rounded-2xl py-6 px-4 bg-yellow-50 text-yellow-600">
          No owners found.
        </div>
      )
    }
  
  
  
  
    return (
      <div className="overflow-x-auto w-full h-full">
        <table className="w-full rounded-tl-2xl  rounded-tr-2xl shadow-lg">
          <thead className="rounded-tl-2xl  rounded-tr-2xl">
            <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl ">
              <th className="pb-3 pt-3 pl-2 pr-2 text-center rounded-tl-2xl">Id</th>
              <th className="pb-3 pt-3 pl-12 pr-12 text-center"></th>
              <th className="pb-3 pt-3 pl-2 pr-2 text-center">Lastname</th>
              <th className="pb-3 pt-3 pl-2 pr-2 text-center">Firstname</th>
              <th className="pb-3 pt-3 pl-2 pr-2 text-center">Middlename</th>
              <th className="pb-3 pt-3 pl-2 pr-2 text-center">Email</th>
              <th className="pb-3 pt-3 pl-2 pr-2  text-center">Clinic</th>
              <th className="pb-3 pt-3 pl-2 pr-2  text-center">Eye Specialist</th>
              <th className="pb-3 pt-3 pl-2 pr-2 text-center">isVerified</th>
              <th className="pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th>
              <th className="pb-3 pt-3 text-center pr-3"></th>
              <th className="pb-3 pt-3 text-center pr-3  rounded-tr-2xl"></th>
  
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200 bg-white">
          {ownerstorender.map((owner) => (
              <tr key={owner._id}  className="hover:bg-gray-100  transition-all duration-300 ease-in-out hover:cursor-pointer ">
                <td  className="py-3 px-6 text-[#3a3a3a] font-albertsans font-medium ">#{owner.ownerId}</td>
                <td  className="px-6 py-3 text-center">
                  <div className="flex justify-center">
                  <img 
                    src={owner.ownerprofilepicture} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'default-profile-url'; // Fallback image
                    }}
                  />
                  </div>
                </td>
                <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">{owner.ownerlastname}</td>
                <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium max-w-[150px]">{owner.ownerfirstname}</td>
                <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">{owner.ownermiddlename}</td>
                <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                  <a href={`mailto:${owner.owneremail}`} className="text-blue-400 hover:underline">
                    {owner.owneremail}
                  </a>
  
                </td>
                <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">{owner.ownerclinic}</td>
                <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">{owner.owneriseyespecialist}</td>
                <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                  <span className={`rounded-2xl text-xs px-5 py-4 ${owner.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                    {owner.isVerified ? 'Active' : 'Pending'}
                  </span>
                </td>
                <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
                  {new Date(owner.createdAt).toLocaleDateString('en-US',{
                    year:'numeric',
                    month: 'short',
                    day:'numeric'
                  })}
                </td>
                <td><div onClick={() =>  {
                  setselectededitowneraccount({
                     id: owner._id,
                     email: owner.owneremail,
                     lastname: owner.ownerlastname,
                     firstname: owner.ownerfirstname,
                     middlename: owner.ownermiddlename,
                     clinic: owner.ownerclinic,
                     eyespecialist: owner.owneriseyespecialist,
                     profilepicture: owner.ownerprofilepicture
                     });
  
                  setownerformdata({
                    role: 'owner',
                    owneremail: owner.owneremail,
                    ownerpassword: owner.ownerpassword,
                    ownerlastname: owner.ownerlastname,
                    ownerfirstname: owner.ownerfirstname,
                    ownermiddlename: owner.ownermiddlename,
                    ownerclinic: owner.ownerclinic,
                    owneriseyespecialist: owner.owneriseyespecialist,
                    ownerprofilepicture: owner.ownerprofilepicture
                  });
  
                  setownerpreviewimage(owner.ownerprofilepicture);
                  setshowviewownerdialog(true);}}
  
                 className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-pencil text-white mr-1"/><h1 className="text-white">Edit</h1></div></td>
    
                <td><div onClick={() =>  {
                  setselectedowneraccount({
                     id: owner.ownerId,
                     email: owner.owneremail,
                     name: `${owner.ownerfirstname} ${owner.ownerlastname}`});
                              
                  setshowdeleteownerdialog(true);}}
  
                 className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div></td>
  
  
                </tr>
    ))}
          </tbody>
        </table>
        
  
      </div>
    );
    };
  
    //PROFILE IMAGE TYPE HANDLING
    const ownerhandleprofilechange = async (e) => {
      const file = e.target.files[0];
  
      if (!file) return;
  
  
      const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
      if(!imagefiletype.includes(file.type)) {
        alert("Please select an image file (JPG or PNG)");
        return;
      }
  
  
      const maximagefile = 1;
      if(file.size > maximagefile * 1024 * 1024){
        alert("Image is too large. Please select image under 1MB");
        return;
      }
  
      setownerselectedprofile(null);
      setownerpreviewimage(null);
  
      if(ownerimageinputref.current){
        ownerimageinputref.current.value = "";
      }
  
  
  
  
  
  
      try{
  
        const imageconfiguration = {
          maximagemb: 1,
          maxworh: 800,
          useWebWorker: true,
          initialQuality: 0.8
        };
  
  
        const compressedimageprofile = await imageCompression(file, imageconfiguration);
        const reader = new FileReader();
        reader.onloadend = () => {
  
          if(reader.error){
            console.error("Error processing image file : ", reader.error);
            alert("Error processing image file. Try again");
            return;
          }
          setownerpreviewimage(reader.result);
        };
  
  
        reader.onerror = () => {
          console.error("File Reader Error : ", reader.error);
          alert("Error reading file. Try again");
          return;
        };
  
        reader.readAsDataURL(compressedimageprofile);
        setownerselectedprofile(compressedimageprofile);
      
  
      } catch (error) {
  
        console.error("Image file compression failed : ", error.message);
        alert("Image file compression failed. Try again");
        return;
  
      }
        
  
    };
  
    //Handles the click event of upload button
    const ownerhandleuploadclick = () => {
      ownerimageinputref.current.click();
    };
  
    const ownerhandleremoveprofile = () => {
      setownerselectedprofile(null);
      setownerpreviewimage(null);
      if(ownerimageinputref.current){
        ownerimageinputref.current.value = "";
      }
    }
  
  
    //Chceks if email is already existing
    useEffect(() => {
          const debounceemailcheck = async () => {
            
            //Don't check if email input is empty
            if(!ownerformdata.owneremail) {
              setowneremailerror(false);
              setowneremailexist(false);
              return;
            }
    
    
    
            if(!owneremailcharacters.test(ownerformdata.owneremail)) {
              setowneremailerror(true);
              return;
            }
    
            setownercheckemail (true);
    
            try{
              //Request to server if the email exists in patientaccounts collection
              const patientresponse = await fetch(
                `http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(ownerformdata.owneremail)}`
         
              );
    
              //Request to server if the email exists in adminaccounts collection
              const staffresponse = await fetch(
                `http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(ownerformdata.owneremail)}`
         
              );
              
  
              //Request to server if the email exists in owneraccounts collection
              const ownerresponse = await fetch(
                 `http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(ownerformdata.owneremail)}`
                     
              );
  
  
              //Request to server if the email exists in adminaccounts collection
              const adminresponse = await fetch(
                 `http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(ownerformdata.owneremail)}`
                     
              );
              
            const patientdata = await patientresponse.json();
            const staffdata = await staffresponse.json();
            const ownerdata = await ownerresponse.json();
            const admindata = await adminresponse.json();
  
            //Save wether email existss in db
            setowneremailexist(patientdata.exists  ||  staffdata.exists || ownerdata.exists  ||  admindata.exists); 
            setowneremailerror(patientdata.exists  ||  staffdata.exists || ownerdata.exists  ||  admindata.exists);
    
    
    
    
          }catch(error){
            console.error("Failed email validation:", error);
          }finally{
            //Check email done
            setownercheckemail(false);
          }
    
          }
    
          const timer = setTimeout(debounceemailcheck, 500);
          return () => clearTimeout(timer); //Cleanup
    }, [ownerformdata.owneremail]);
  
  
  
  
      //Handlechange function to be used in input forms
    const ownerhandlechange = (e) => {
        const {name, value} = e.target
        setownerformdata(prev => ({
          ...prev,
          [name]: value
        }))
    }
  
      
    //INSERT owner ACCOUNT  //INSERT owner ACCOUNT  //INSERT owner ACCOUNT   //INSERT owner ACCOUNT  //INSERT owner ACCOUNT  //INSERT owner ACCOUNT 
      const ownerhandlesubmit = async (e) => {
        e.preventDefault()
        setownerissubmitting(true)
        setownermessage({
          text:'', type:''
        })
  
      try{
  
        
        const owneraccsubmission = {
          ...ownerformdata,
          ownerclinic: ownerformdata.ownerclinic,
          owneriseyespecialist: ownerformdata.owneriseyespecialist,
          ownerprofilepicture: ownerpreviewimage || ownerformdata.ownerprofilepicture
        };
  
        console.log("Submitting", owneraccsubmission);
  
  
    //Sends all owner data to the server
        const response = await fetch("http://localhost:3000/api/owneraccounts",{
              method: "POST",
              headers: {
                "Content-Type":"application/json",
                'Authorization': `Bearer ${currentusertoken}`
              },
              body: JSON.stringify(owneraccsubmission)
        });




        const data = await response.json();
        if(!response.ok) {
          throw new Error(data.message || "Registration Failed");
        }

        //If response is success, it will send data to the api and to the database   
        setownermessage({text:"Registration Sucessful!",type:"success"});
        
          
           
          //Resets the input forms except the profile picture
          setownerformdata({
            role: 'owner',
            owneremail:'',
            ownerpassword:'',
            ownerlastname:'',
            ownerfirstname:'',
            ownermiddlename:'',
            ownerclinic: '',
            owneriseyespecialist: '',
            ownerprofilepicture: ''
          });
  
  
  
          setownerselectedprofile(null);
          setownerpreviewimage(null);
  
  
  
     
      //Error encounter  
        } catch(error) {
          console.error("Error:", error)
          setownermessage({text: error.message || "Registration Failed",type:"error"});
               
        } finally {
          setownerissubmitting(false)
        }
    }
  
    //DELETE owner ACCOUNT    //DELETE owner ACCOUNT    //DELETE owner ACCOUNT    //DELETE owner ACCOUNT    //DELETE owner ACCOUNT    //DELETE owner ACCOUNT  
      const deleteowneraccount = async () => {
        try{
          if(!selectedowneraccount) return;
  
          const response = await fetch(`/api/owneraccounts/${selectedowneraccount.id}`,{
            method: 'DELETE',
            headers:{
              'Authorization': `Bearer ${currentusertoken}`
            }
          });


          await axios.post('http://localhost:3000/api/accountdeletion/owner', {
            email: selectedowneraccount.email});

  
          if(!response.ok){
            throw new Error("Failed to delete owner account");
          }
  
          const fetchresponse = await fetch('/api/owneraccounts', {
              headers:{
                'Authorization':`Bearer ${localStorage.getItem('admintoken')}`
              }
          });
          
          if(!fetchresponse.ok) {
            throw new Error("Failed to retrieve updated owneraccounts table");
          }
  
          const owneraccounts = await fetchresponse.json();
          setowners(owneraccounts);
  
          setshowdeleteownerdialog(false);
          setselectedowneraccount(null);
  
          
        }catch (error){
          console.error("Failed deleting owner: ", error);
        }
      };
  
    //UPDATE owner ACCOUNT  //UPDATE owner ACCOUNT  //UPDATE owner ACCOUNT  //UPDATE owner ACCOUNT  //UPDATE owner ACCOUNT  //UPDATE owner ACCOUNT
      const updateowneraccount = async (e) => {
        
        e.preventDefault();
        setownerissubmitting(true);
        setownermessage({text:'', type:''});
  
        try{
          if(!selectededitowneraccount) return;
  
          const updateowneraccountdetails = {
            ...ownerformdata,
            ownerprofilepicture: ownerpreviewimage || ownerformdata.ownerprofilepicture
          };
  
          const response = await fetch(`/api/owneraccounts/${selectededitowneraccount.id}`,{
            method:'PUT',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${localStorage.getItem('admintoken')}`
            },
            body: JSON.stringify(updateowneraccountdetails)
          });
  
  
          if(!response.ok) {
            const errorresponse = await response.json();
            throw new Error(errorresponse.message || "Failed to update owner account");
          }
  
          const fetchresponse = await fetch('/api/owneraccounts',{
            headers: {
              'Authorization' : `Bearer ${localStorage.getItem('admintoken')}` 
            }
          });
  
          if(!fetchresponse.ok) {
            const errorresponse = await response.json();
            throw new Error(errorresponse.message || "Failed to update owner account table");
          }
  
          //Success account update
          const ownerdata = await fetchresponse.json();
          setowners(ownerdata);
          setownermessage({text:"Owner Account Updated Successfully!", type:"success"});
  
          setTimeout(() => {
            setownerissubmitting(false);
            setselectededitowneraccount(null);
            setshowviewownerdialog(false);
            setownermessage({text:"", type:""});
          }, 1500);
  
        } catch (error){
          console.error("Error updating owner account : ", error);
          setownerissubmitting(false);
          setownermessage({text: "Failed to update account. Please try again", type:"error"});
        }
      }
  
















//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE

const [showaddadmindialog, setshowaddadmindialog] = useState(false);
const [showviewadmindialog, setshowviewadmindialog] = useState(false);
const [showdeleteadmindialog, setshowdeleteadmindialog] = useState(false);
const [admins, setadmins] = useState([]);
const [selectedadminaccount, setselectedadminaccount] = useState(null);
const [selectededitadminaccount, setselectededitadminaccount] = useState(null);
const [loadingadmins, setloadingadmins] = useState(true);
const [failedloadingadmins, setfailedloadingadmins] = useState(null);
const [adminselectedprofile, setadminselectedprofile] = useState(null);
const [adminpreviewimage, setadminpreviewimage] = useState (null);
const adminimageinputref = useRef(null);
const [searchadmins, setsearchadmins] = useState('');
const [filteredadmins, setfilteredadmins] = useState([]);
const [adminemailexist, setadminemailexist] = useState(false);
const [admincheckemail, setadmincheckemail] = useState(false);
const [adminemailerror, setadminemailerror] = useState(false);
const adminemailcharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const [adminissubmitting, setadminissubmitting] = useState(false);
const [adminmessage, setadminmessage] = useState({ text:'', type:''});


//Blank variables that stores all data to be sent to database
const [adminformdata, setadminformdata] = useState({
    role:'Admin',
    adminemail:'',
    adminpassword:'',
    adminlastname:'',
    adminfirstname:'',
    adminmiddlename:'',
    adminprofilepicture:'' // Holds the profile picture 
});

//Debounce check for search input
const searchadmindebounce = (functions, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => functions.apply(this, args), delay);
  }
};

//admin search filter
const filteradminaccount = useCallback(searchadmindebounce((term) => {
  if(!term) {
    setfilteredadmins(admins);
    return;
  }

  const filtered = admins.filter(admin =>
    admin.adminlastname.toLowerCase().includes(term.toLowerCase()) ||
    admin.adminfirstname.toLowerCase().includes(term.toLowerCase()) ||
    admin.adminmiddlename.toLowerCase().includes(term.toLowerCase()) ||
    admin.adminemail.toLowerCase().includes(term.toLowerCase()) ||
    admin.adminId.toString().includes(term)
  );

  setfilteredadmins(filtered);
}, 300), [admins]);

//Fetching admin list and data from database
useEffect(() => {
  if(activeaccounttable === 'administratoraccounttable'){

    const fetchadmins = async () => {
      try{

        const fetchresponse = await fetch('/api/adminaccounts', {
          headers: {
            'Authorization': `Bearer ${currentusertoken}`
          }
        });
        
        if(!fetchresponse.ok){
          throw new Error("Failed to fetch admin accounts");
        }

        const admindata = await fetchresponse.json();
        setadmins(admindata);
      
      }catch(error){
        setfailedloadingadmins(error.message);
      }finally{
        setloadingadmins(false);
      }
    };
    fetchadmins();

  }
}, [activeaccounttable]);

//admin Filter
useEffect(() => {
  filteradminaccount(searchadmins);
}, [searchadmins, filteradminaccount]);

const renderadminaccounts = () => {

const adminstorender = searchadmins ? filteredadmins : admins;

if (loadingadmins) {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

if (failedloadingadmins) {
  return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg">
      Error: {failedloadingadmins}
    </div>
  );
}



if(searchadmins && filteredadmins.length == 0){
  return(
    <div className="rounded-2xl py-6 px-4 bg-yellow-50 text-yellow-600">
      No admins found.
    </div>
  )
}




return (
  <div className="overflow-x-auto w-full h-full">
    <table className="w-full rounded-tl-2xl  rounded-tr-2xl shadow-lg">
      <thead className="rounded-tl-2xl  rounded-tr-2xl">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl ">
          <th className="pb-3 pt-3 pl-2 pr-2 text-center rounded-tl-2xl">Id</th>
          <th className="pb-3 pt-3 pl-12 pr-12 text-center"></th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Lastname</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Firstname</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Middlename</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Email</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">isVerified</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th>
          <th className="pb-3 pt-3 text-center pr-3"></th>
          <th className="pb-3 pt-3 text-center pr-3  rounded-tr-2xl"></th>

        </tr>
      </thead>
      
      <tbody className="divide-y divide-gray-200 bg-white">
      {adminstorender.map((admin) => (
          <tr key={admin._id}  className="hover:bg-gray-100  transition-all duration-300 ease-in-out hover:cursor-pointer ">
            <td  className="py-3 px-6 text-[#3a3a3a] font-albertsans font-medium ">#{admin.adminId}</td>
            <td  className="px-6 py-3 text-center">
              <div className="flex justify-center">
              <img 
                src={admin.adminprofilepicture} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = 'default-profile-url'; // Fallback image
                }}
              />
              </div>
            </td>
            <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">{admin.adminlastname}</td>
            <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium max-w-[150px]">{admin.adminfirstname}</td>
            <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">{admin.adminmiddlename}</td>
            <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
              <a href={`mailto:${admin.adminemail}`} className="text-blue-400 hover:underline">
                {admin.adminemail}
              </a>

            </td>
            <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
              <span className={`rounded-2xl text-xs px-5 py-4 ${admin.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                {admin.isVerified ? 'Active' : 'Pending'}
              </span>
            </td>
            <td  className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium">
              {new Date(admin.createdAt).toLocaleDateString('en-US',{
                year:'numeric',
                month: 'short',
                day:'numeric'
              })}
            </td>
            <td><div onClick={() =>  {
              setselectededitadminaccount({
                 id: admin._id,
                 email: admin.adminemail,
                 lastname: admin.adminlastname,
                 firstname: admin.adminfirstname,
                 middlename: admin.adminmiddlename,
                 profilepicture: admin.adminprofilepicture
                 });

              setadminformdata({
                role: 'Admin',
                adminemail: admin.adminemail,
                adminpassword: admin.adminpassword,
                adminlastname: admin.adminlastname,
                adminfirstname: admin.adminfirstname,
                adminmiddlename: admin.adminmiddlename,
                adminprofilepicture: admin.adminprofilepicture
              });

              setadminpreviewimage(admin.adminprofilepicture);
              setshowviewadmindialog(true);}}

             className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-pencil text-white mr-1"/><h1 className="text-white">Edit</h1></div></td>

            <td><div onClick={() =>  {
              setselectedadminaccount({
                 id: admin.adminId,
                 email: admin.adminemail,
                 name: `${admin.adminfirstname} ${admin.adminlastname}`});
                          
              setshowdeleteadmindialog(true);}}

             className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div></td>


            </tr>
))}
      </tbody>
    </table>
    

  </div>
);
};

//PROFILE IMAGE TYPE HANDLING
const adminhandleprofilechange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;


  const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
  if(!imagefiletype.includes(file.type)) {
    alert("Please select an image file (JPG or PNG)");
    return;
  }


  const maximagefile = 1;
  if(file.size > maximagefile * 1024 * 1024){
    alert("Image is too large. Please select image under 1MB");
    return;
  }

  setadminselectedprofile(null);
  setadminpreviewimage(null);

  if(adminimageinputref.current){
    adminimageinputref.current.value = "";
  }






  try{

    const imageconfiguration = {
      maximagemb: 1,
      maxworh: 800,
      useWebWorker: true,
      initialQuality: 0.8
    };


    const compressedimageprofile = await imageCompression(file, imageconfiguration);
    const reader = new FileReader();
    reader.onloadend = () => {

      if(reader.error){
        console.error("Error processing image file : ", reader.error);
        alert("Error processing image file. Try again");
        return;
      }
      setadminpreviewimage(reader.result);
    };


    reader.onerror = () => {
      console.error("File Reader Error : ", reader.error);
      alert("Error reading file. Try again");
      return;
    };

    reader.readAsDataURL(compressedimageprofile);
    setadminselectedprofile(compressedimageprofile);
  

  } catch (error) {

    console.error("Image file compression failed : ", error.message);
    alert("Image file compression failed. Try again");
    return;

  }
    

};

//Handles the click event of upload button
const adminhandleuploadclick = () => {
  adminimageinputref.current.click();
};

const adminhandleremoveprofile = () => {
  setadminselectedprofile(null);
  setadminpreviewimage(null);
  if(adminimageinputref.current){
    adminimageinputref.current.value = "";
  }
}


//Chceks if email is already existing
useEffect(() => {
      const debounceemailcheck = async () => {
        
        //Don't check if email input is empty
        if(!adminformdata.adminemail) {
          setadminemailerror(false);
          setadminemailexist(false);
          return;
        }



        if(!adminemailcharacters.test(adminformdata.adminemail)) {
          setadminemailerror(true);
          return;
        }

        setadmincheckemail (true);

        try{
          //Request to server if the email exists in patientaccounts collection
          const patientresponse = await fetch(
            `http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(adminformdata.adminemail)}`
     
          );

          //Request to server if the email exists in adminaccounts collection
          const staffresponse = await fetch(
            `http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(adminformdata.adminemail)}`
     
          );
          

          //Request to server if the email exists in adminaccounts collection
          const ownerresponse = await fetch(
             `http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(adminformdata.adminemail)}`
                 
          );


          //Request to server if the email exists in adminaccounts collection
          const adminresponse = await fetch(
             `http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(adminformdata.adminemail)}`
                 
          );
          
        const patientdata = await patientresponse.json();
        const staffdata = await staffresponse.json();
        const ownerdata = await ownerresponse.json();
        const admindata = await adminresponse.json();

        //Save wether email existss in db
        setadminemailexist(patientdata.exists  ||  staffdata.exists || ownerdata.exists  ||  admindata.exists); 
        setadminemailerror(patientdata.exists  ||  staffdata.exists || ownerdata.exists  ||  admindata.exists);




      }catch(error){
        console.error("Failed email validation:", error);
      }finally{
        //Check email done
        setadmincheckemail(false);
      }

      }

      const timer = setTimeout(debounceemailcheck, 500);
      return () => clearTimeout(timer); //Cleanup
}, [adminformdata.adminemail]);




  //Handlechange function to be used in input forms
const adminhandlechange = (e) => {
    const {name, value} = e.target
    setadminformdata(prev => ({
      ...prev,
      [name]: value
    }))
}

  
//INSERT admin ACCOUNT  //INSERT admin ACCOUNT  //INSERT admin ACCOUNT   //INSERT admin ACCOUNT  //INSERT admin ACCOUNT  //INSERT admin ACCOUNT 
  const adminhandlesubmit = async (e) => {
    e.preventDefault()
    setadminissubmitting(true)
    setadminmessage({
      text:'', type:''
    })

  try{

    
    const adminaccsubmission = {
      ...adminformdata,
      adminprofilepicture: adminpreviewimage || adminformdata.adminprofilepicture
    };



//Sends all admin data to the server
    const response = await fetch("http://localhost:3000/api/adminaccounts",{
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            'Authorization': `Bearer ${currentusertoken}`
          },
          body: JSON.stringify(adminaccsubmission)
    });


    
    await axios.post('http://localhost:3000/api/accountcreation/admin', {
      email: adminformdata.adminemail, 
      password: adminformdata.adminpassword});

    //If response is success, it will send data to the api and to the database   
    await response.json();
    setadminmessage({text:"Registration Sucessful!",type:"success"});
    
      
       
      //Resets the input forms except the profile picture
      setadminformdata({
        role: 'Admin',
        adminemail:'',
        adminpassword:'',
        adminlastname:'',
        adminfirstname:'',
        adminmiddlename:'',
        adminprofilepicture: ''
      });



      setadminselectedprofile(null);
      setadminpreviewimage(null);



 
  //Error encounter  
    } catch(error) {
      console.error("Error:", error)
      setadminmessage({text:"Registration Failed. Try again",type:"error"});
           
    } finally {
      setadminissubmitting(false)
    }
}

//DELETE admin ACCOUNT    //DELETE admin ACCOUNT    //DELETE admin ACCOUNT    //DELETE admin ACCOUNT    //DELETE admin ACCOUNT    //DELETE admin ACCOUNT  
  const deleteadminaccount = async () => {
    try{
      if(!selectedadminaccount) return;

      const response = await fetch(`/api/adminaccounts/${selectedadminaccount.id}`,{
        method: 'DELETE',
        headers:{
          'Authorization': `Bearer ${currentusertoken}`
        }
      });


      await axios.post('http://localhost:3000/api/accountdeletion/admin', {
        email: selectedadminaccount.email});



      if(!response.ok){
        throw new Error("Failed to delete admin account");
      }

      const fetchresponse = await fetch('/api/adminaccounts', {
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('admintoken')}`
          }
      });
      
      if(!fetchresponse.ok) {
        throw new Error("Failed to retrieve updated adminaccounts table");
      }

      const adminaccounts = await fetchresponse.json();
      setadmins(adminaccounts);

      setshowdeleteadmindialog(false);
      setselectedadminaccount(null);

      
    }catch (error){
      console.error("Failed deleting admin: ", error);
    }
  };

//UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT
  const updateadminaccount = async (e) => {
    
    e.preventDefault();
    setadminissubmitting(true);
    setadminmessage({text:'', type:''});

    try{
      if(!selectededitadminaccount) return;

      const updateadminaccountdetails = {
        ...adminformdata,
        adminprofilepicture: adminpreviewimage || adminformdata.adminprofilepicture
      };

      const response = await fetch(`/api/adminaccounts/${selectededitadminaccount.id}`,{
        method:'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('admintoken')}`
        },
        body: JSON.stringify(updateadminaccountdetails)
      });


      if(!response.ok) {
        const errorresponse = await response.json();
        throw new Error(errorresponse.message || "Failed to update admin account");
      }

      const fetchresponse = await fetch('/api/adminaccounts',{
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('admintoken')}` 
        }
      });

      if(!fetchresponse.ok) {
        const errorresponse = await response.json();
        throw new Error(errorresponse.message || "Failed to update admin account table");
      }

      //Success account update
      const admindata = await fetchresponse.json();
      setadmins(admindata);
      setadminmessage({text:"Admin Account Updated Successfully!", type:"success"});

      setTimeout(() => {
        setadminissubmitting(false);
        setselectededitadminaccount(null);
        setshowviewadmindialog(false);
        setadminmessage({text:"", type:""});
      }, 1500);

    } catch (error){
      console.error("Error updating admin account : ", error);
      setadminissubmitting(false);
      setadminmessage({text: "Failed to update account. Please try again", type:"error"});
    }
};


















//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
//PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE //PATIENT PROFILE
const [showpatientpofile, setshowpatientpofile] = useState(false);
const [showaddpatientpofile, setshowaddpatientprofile] = useState(false);
const [activeprofiletable, setactiveprofiletable] = useState('patientprofiletable');
const [loadingpatientdemographics, setloadingpatientdemographics] = useState(true);
const [patientdemographics, setpatientdemographics] = useState([]);
const [patientdemoerror, setpatientdemoerror] = useState(null);
const [showdeletepatientprofiledialog, setshowdeletepatientprofiledialog] = useState(false);
const [selectedpatientprofile,setselectedpatientprofile] = useState(null);
const [demopatientemailexist, setdemopatientemailexist] = useState(false);
const [demopatientcheckemail, setdemopatientcheckemail] = useState(false);
const [demopatientemailerror, setdemopatientemailerror] = useState(false);
const [emailisnotpatient,setemailisnotpatient] = useState(false);
const [emailisnotpatienterror,setemailisnotpatienterror] = useState(false);
const demopatientemailcharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const [addpatientprofilemessage, setaddpatientprofilemessage] = useState ({text: "", type: ""});
const [addpatientprofileissubmitting, setaddpatientprofileissubmitting] = useState(false);
const [addpatientprofilepreviewimage, setaddpatientprofilepreviewimage] = useState(null);
const addpatientprofileimageinputref= useRef(null);




const resetpatientprofileformdata = () => {
  setdemoformdata({
    patientemail: '',
    patientlastname: '',
    patientfirstname: '',
    patientmiddlename: '',
    patientage: '',
    patientbirthdate: '',
    patientgender: '',
    patientcontactnumber: '',
    patienthomeaddress: '',
    patientemergencycontactname: '',
    patientemergencycontactnumber: '',
    patientprofilepicture: ''
  });
  setaddpatientprofilepreviewimage(null);
  setselectedpatientprofile(null);
  if (addpatientprofileimageinputref.current) {
    addpatientprofileimageinputref.current.value = "";
  }
};


const showprofiletable = (profiletableid) => {
      setactiveprofiletable(profiletableid);
};


const [selectedpatientdemo, setselectedpatientdemo] = useState(null);
const [demoformdata, setdemoformdata] = useState({
  patientemail: '',
  patientlastname: '',
  patientfirstname: '',
  patientmiddlename: '',
  patientage: '',
  patientbirthdate: '',
  patientgender: '',
  patientcontactnumber: '',
  patienthomeaddress: '',
  patientemergencycontactname: '',
  patientemergencycontactnumber: '',
  patientprofilepicture: ''
});



//RETRIEVING THE PATIENT DEMOGRAPHICS
useEffect(() => {
  if(activeprofiletable === "patientprofiletable") {
    const fetchpatientdemographics = async () => {
      try{
        const response = await fetch('/api/patientdemographics', {
          headers: {
            'Authorization' : `Bearer ${currentusertoken}`
          }
        });

        if(!response.ok) throw new Error("Failed to retrieve patient demographics");
        const data = await response.json();

        setpatientdemographics(data);


      }catch(error){
        setpatientdemoerror(error.message);
      }finally{
        setloadingpatientdemographics(false);
      }
  
    };
    fetchpatientdemographics();
  }
}, [activeprofiletable, currentusertoken]);




const renderpatientprofiles = () => {

  if(loadingpatientdemographics) {
    return(
      <div className="flex justiy-center p-8 items-center">
        <div className="animate-spin rounded-full border-t-2 border-b-2 border-blue-500 h-12 w-12"></div>
      </div>
    );
  }


  if(patientdemoerror){
    return(
      <div className="rounded-lg p-4 bg-red-50 text-red-600">
        Error: {patientdemoerror}
      </div>
    );
  }


  if(patientdemographics.length === 0){
    return(
      <div className="text-yellow-600 bg-yellow-50 rounded-2xl px-4 py-6">No patient profiles found.</div>
    );
  }




  return (
    <div className="overflow-y-auto w-full h-[480px] flex flex-wrap content-start gap-3 pl-2 pt-2">
    
    {patientdemographics.map((patient) => (
      <div id="patientcard" key={patient._id} onClick={() => {
      setshowpatientpofile(true);
      setselectedpatientdemo(patient);
      setdemoformdata({
        patientlastname: patient.patientlastname,
        patientfirstname: patient.patientfirstname,
        patientmiddlename: patient.patientmiddlename,
        patientage: patient.patientage,
        patientbirthdate: patient.patientbirthdate,
        patientgender: patient.patientgender,
        patientcontactnumber: patient.patientcontactnumber,
        patienthomeaddress: patient.patienthomeaddress,
        patientemergencycontactname: patient.patientemergencycontactname,
        patientemergencycontactnumber: patient.patientemergencycontactnumber,
        patientprofilepicture: patient.patientprofilepicture

      });

      setpreviewimage(patient.patientprofilepicture);
      setselectedpatientprofile({
        id: patient._id,
        email: patient.patientemail,
        name: `${patient.patientfirstname} ${patient.patientlastname}`});
    }}
    
    className="flex justify-center items-center mb-1 bg-white shadow-lg w-[316px] h-[120px] rounded-3xl hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 " >
      <div className="w-[125px] h-full  rounded-2xl flex justify-center items-center">
      <img src={patient.patientprofilepicture || defaultprofilepic} alt="Profile" className="h-18 w-18 rounded-full object-cover"></img>
      </div>
      <div className="bg-white min-w-0 flex flex-col justify-center items-start pl-2 pr-2 w-full h-full  rounded-3xl">
        <h1 className="font-albertsans font-semibold text-[17px] truncate w-full text-[#2d3744]">{patient.patientfirstname} {patient.patientlastname}</h1>
        <p className="text-[14px] truncate w-full">{patient.patientemail}</p>
      </div>
    </div>
    ))}
    </div>
  
  );
  };
 

  //Debounce Email Check
  useEffect(() =>{
    const demoformdebounceemailcheck = async () => {
      if(!demoformdata.patientemail) {
        setdemopatientemailerror(false);
        setdemopatientemailexist(false);
        setemailisnotpatient(false);
        setemailisnotpatienterror(false);
        return;
      }


      if(!demopatientemailcharacters.test(demoformdata.patientemail)){
        setdemopatientemailerror(false);
        setdemopatientemailexist(false);
        setemailisnotpatient(false);
        setemailisnotpatienterror(false); 
        return;
      }


      setdemopatientcheckemail(true);



      try{
        const demoresponse = await fetch(`http://localhost:3000/api/patientdemographics/patientemail/${encodeURIComponent(demoformdata.patientemail)}`);

        const demodata = await demoresponse.json();

        if(demodata && !demodata.message){
          setdemopatientemailerror(true);
          setdemopatientemailexist(true);
          setemailisnotpatient(false);
          setemailisnotpatienterror(false);
          setdemopatientcheckemail(false);
          return;
        }

        const [patientresponse, staffresponse, ownerresponse, adminresponse] = await Promise.all([
          fetch(`http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`)
        ]);


        const [patientdata, staffdata, ownerdata, admindata] = await Promise.all([
            patientresponse.json(),
            staffresponse.json(),
            ownerresponse.json(),
            adminresponse.json()
        ]);


        const accountexists = patientdata.exists || staffdata.exists || ownerdata.exists || admindata.exists;

        if(accountexists){
            const isnonpatient = staffdata.exists || ownerdata.exists || admindata.exists;
            setdemopatientemailerror(false);
            setdemopatientemailexist(false);
            setemailisnotpatient(isnonpatient);
            setemailisnotpatienterror(isnonpatient);
        }else{
            setdemopatientemailerror(false);
            setdemopatientemailexist(false);
            setemailisnotpatient(false);
            setemailisnotpatienterror(false);
        }


      }catch(error){
        console.error("Failed Email Validation: ", error);
            setdemopatientemailerror(false);
            setdemopatientemailexist(false);
            setemailisnotpatient(false);
            setemailisnotpatienterror(false);
      }finally{
            setdemopatientcheckemail(false);
      }


    };

    const timer = setTimeout(demoformdebounceemailcheck, 500);
    return () => clearTimeout(timer);
  }, [demoformdata.patientemail]);

 


  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE
  const addpatientprofile = async (e) => {
    e.preventDefault();
    setaddpatientprofileissubmitting(true);
    setaddpatientprofilemessage({text: "", type: ""});

    try{
      if(demopatientemailerror || demopatientemailexist || emailisnotpatienterror) {
        throw new Error("Fix email validation before submitting");
      }


      const demoformdatatosend = {
        ...demoformdata,
        patientprofilepicture: addpatientprofilepreviewimage || demoformdata.patientprofilepicture
      };

      const response = await fetch("http://localhost:3000/api/patientdemographics", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${currentusertoken}`
        },
        body: JSON.stringify(demoformdatatosend)
      });


      if(!response.ok) {
            const errordata = await response.json();
            throw new Error(errordata.message || "Failed to create patient profile");
      }

      const fetchresponse = await fetch('/api/patientdemographics', {
        headers: {
          'Authorization' : `Bearer ${currentusertoken}`
        }
      });

      const updateddata = await fetchresponse.json();
      setpatientdemographics(updateddata);

      resetpatientprofileformdata();
      setaddpatientprofilemessage({
        text: "Patient Profile successfully created",
        type: "success"
      });

    }catch (error) {
      console.error("Error creating patient profile: ", error);
      setaddpatientprofilemessage({
        text: error.message || "Failed to create patient profile",
        type: "success"
      });
    }finally{
      setaddpatientprofileissubmitting(false);
    }
  }



  //DISPLAY AND UPDATE PATIENT PROFILE
  const retrieveandupdatepatientprofile = async (e) => {
    e.preventDefault();

    try{


      const response = await fetch(`/api/patientdemographics/${selectedpatientdemo._id}`,{
        method: 'PUT',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${currentusertoken}`
        },
        body: JSON.stringify({
          ...demoformdata,
          patientprofilepicture: previewimage || demoformdata.patientprofilepicture
        })
      });


      if(!response.ok) throw new Error("Failed to update patient demographics");

      const fetchresponse = await fetch('/api/patientdemographics',{
        headers: {'Authorization' : `Bearer ${currentusertoken}`}
      });

      const updateddata = await fetchresponse.json();
      setpatientdemographics(updateddata);
      setshowpatientpofile(false);

    }catch(error){
      console.error("Error updating patient demographic: ", error);
    }
  }


  //DELETE PATIENT PROFILE  //DELETE PATIENT PROFILE  //DELETE PATIENT PROFILE  //DELETE PATIENT PROFILE  //DELETE PATIENT PROFILE  //DELETE PATIENT PROFILE
  const deletepatientprofile = async () => {
      try{
        if(!selectedpatientprofile) return;

        const response = await fetch(`/api/patientdemographics/${selectedpatientprofile.id}`,{
          method: 'DELETE',
          headers:{
            'Authorization': `Bearer ${currentusertoken}`
          }
        });



        if(!response.ok){
          throw new Error("Failed to delete patient account");
        }



        const fetchresponse = await fetch('/api/patientdemographics', {
            headers:{
              'Authorization':`Bearer ${localStorage.getItem('admintoken')}`
            }
        });

        if(!fetchresponse.ok) {
          throw new Error("Failed to retrieve updated patient profile");
        }
        const data = await fetchresponse.json();
        setpatientdemographics(data);

        setshowpatientpofile(false)
        setshowdeletepatientprofiledialog(false);
        setselectedpatientprofile(null);

        
      }catch (error){
        console.error("Failed deleting patient: ", error);
      }
    };



//PROFILE IMAGE TYPE HANDLING
const addpatientprofilehandlechange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;


  const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
  if(!imagefiletype.includes(file.type)) {
    alert("Please select an image file (JPG or PNG)");
    return;
  }


  const maximagefile = 1;
  if(file.size > maximagefile * 1024 * 1024){
    alert("Image is too large. Please select image under 1MB");
    return;
  }

  setselectedpatientprofile(null);
  setaddpatientprofilepreviewimage(null);

  if(addpatientprofileimageinputref.current){
    addpatientprofileimageinputref.current.value = "";
  }






  try{

    const imageconfiguration = {
      maximagemb: 1,
      maxworh: 800,
      useWebWorker: true,
      initialQuality: 0.8
    };


    const compressedimageprofile = await imageCompression(file, imageconfiguration);
    const reader = new FileReader();
    reader.onloadend = () => {

      if(reader.error){
        console.error("Error processing image file : ", reader.error);
        alert("Error processing image file. Try again");
        return;
      }
      setaddpatientprofilepreviewimage(reader.result);
    };


    reader.onerror = () => {
      console.error("File Reader Error : ", reader.error);
      alert("Error reading file. Try again");
      return;
    };

    reader.readAsDataURL(compressedimageprofile);
    setselectedpatientprofile(compressedimageprofile);
  

  } catch (error) {

    console.error("Image file compression failed : ", error.message);
    alert("Image file compression failed. Try again");
    return;

  }
    

};

//Handles the click event of upload button
const addpatientprofilehandleuploadclick = () => {
  addpatientprofileimageinputref.current.click();
};

const addpatientprofilehandleremoveprofile = () => {
  setselectedpatientprofile(null);
  setaddpatientprofilepreviewimage(null);
  if(addpatientprofileimageinputref.current){
    addpatientprofileimageinputref.current.value = "";
  }
}


  













//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT
//APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT //APPOINTMENT MANAGEMENT

const [activeappointmentstable, setactiveappointmentstable] = useState('allappointmentstable');
const showappointmentstable = (appointmentstableid) => {
      setactiveappointmentstable(appointmentstableid);
};
 const [patientappointments, setpatientappointments] = useState([]);
 const [loadingappointmens, setloadingappointments] = useState(false);
 const [errorloadingappointments, seterrorloadingappointments] = useState(null);
 const [selectedpatientappointment, setselectedpatientappointment] = useState(null);
 const [viewpatientappointment, setviewpatientappointment] = useState(false);
 const [deletepatientappointment, setdeletepatientappointment] = useState(false);
 const [bautistaeyespecialist, setbautistaeyespecialist] = useState('');
 const [ambhereyespecialist, setambhereyespecialist] = useState('');
 const [ambherappointmentpaymentotal, setambherappointmentpaymentotal] = useState(null);
 const [bautistaappointmentpaymentotal, setbautistaappointmentpaymentotal] = useState(null);
 const [bautistaappointmentconsultationremarkssubject, setbautistaappointmentconsultationremarkssubject] = useState("");
 const [ambherappointmentconsultationremarkssubject, setambherappointmentconsultationremarkssubject] = useState("");
 const [bautistaappointmentconsultationremarks, setbautistaappointmentconsultationremarks] = useState("");
 const [ambherappointmentconsultationremarks, setambherappointmentconsultationremarks] = useState("");
 const [bautistaappointmentprescription, setbautistaappointmentprescription] = useState("");
 const [ambherappointmentprescription, setambherappointmentprescription] = useState("");

  const textarearef = useRef(null);
  const adjusttextareaheight = () => {
    if(textarearef.current){
      textarearef.current.style.height = 'auto';
      textarearef.current.style.height = `${textarearef.current.scrollHeight}px`;
    }
  }









    const [showotherpatientbautistaappointmentotherservice, setshowotherpatientbautistaappointmentotherservice] = useState(false);
    const [patientbautistaappointmentotherservicenote, setpatientbautistaappointmentotherservicenote] = useState("");

    const [showotherpatientambherappointmentotherservice, setshowotherpatientambherappointmentotherservice] = useState(false);
    const [patientambherappointmentotherservicenote, setpatientambherappointmentotherservicenote] = useState("");



  useEffect(() => {
    adjusttextareaheight();
  });


 
 
 useEffect(() => {
   const fetchingallpatientappointments = async () => {
     setloadingappointments(true);
 
     try{

       const response = await fetch(
         `http://localhost:3000/api/patientappointments/appointments`,
         {
           headers: {
               Authorization: `Bearer ${localStorage.getItem('admintoken')}`
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
 
   if(activeappointmentstable === 'allappointmentstable') {
    fetchingallpatientappointments();
   }
 }, [activeappointmentstable]);






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



//WHOLE APPOINTMENT DELETE //WHOLE APPOINTMENT DELETE //WHOLE APPOINTMENT DELETE //WHOLE APPOINTMENT DELETE   
const handledeleteappointment = async (appointmentId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/patientappointments/appointments/${appointmentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
      }
    });

    if (!response.ok) throw new Error('Failed to Delete Appointment');
 
    setpatientappointments(prev =>
      prev.filter(appt => appt.patientappointmentid !== appointmentId)
    );

  } catch (error) {
    console.error("Appointment deletion failed: ", error);
    seterrorloadingappointments(error.message);
  }
}


//AICODE
//CLINIC APPOINTMENT DELETE (NULLIFY FIELDS)
const handledeleteappointmentbyclinic = async (appointmentId, clinicType) => {
  try {
    // First check if there's an appointment in the other clinic
    const appointment = patientappointments.find(appt => 
      clinicType === 'bautista' ? 
        appt.patientbautistaappointmentid === appointmentId :
        appt.patientambherappointmentid === appointmentId
    );

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Check if there's a scheduled appointment in the other clinic
    const hasOtherClinicAppointment = clinicType === 'bautista' ? 
      appointment.patientambherappointmentdate && appointment.patientambherappointmenttime :
      appointment.patientbautistaappointmentdate && appointment.patientbautistaappointmenttime;

    if (hasOtherClinicAppointment) {
      // If there's an appointment in the other clinic, nullify only the current clinic's fields
      const fieldsToNullify = clinicType === 'ambher' ? {
        patientambherappointmentid: null,
        patientambherappointmenteyespecialist: null,
        patientambherappointmentstaffname: null,
        patientambherappointmentdate: null,
        patientambherappointmenttime: null,
        patientambherappointmentcomprehensiveeyeexam: null,
        patientambherappointmentdiabeticretinopathy: null,
        patientambherappointmentglaucoma: null,
        patientambherappointmenthypertensiveretinopathy: null,
        patientambherappointmentretinolproblem: null,
        patientambherappointmentcataractsurgery: null,
        patientambherappointmentpterygiumsurgery: null,
        patientambherappointmentstatus: null,
        patientambherappointmentstatushistory: null,
        patientambherappointmentpaymentotal: null,
        patientambherappointmentconsultationremarkssubject: null,
        patientambherappointmentconsultationremarks: null,
        patientambherappointmentprescription: null,
        patientambherappointmentrating: null,
        patientambherappointmentfeedback: null
      } : {
        patientbautistaappointmentid: null,
        patientbautistaappointmenteyespecialist: null,
        patientbautistaappointmentstaffname: null,
        patientbautistaappointmentdate: null,
        patientbautistaappointmenttime: null,
        patientbautistaappointmentcomprehensiveeyeexam: null,
        patientbautistaappointmentdiabeticretinopathy: null,
        patientbautistaappointmentglaucoma: null,
        patientbautistaappointmenthypertensiveretinopathy: null,
        patientbautistaappointmentretinolproblem: null,
        patientbautistaappointmentcataractsurgery: null,
        patientbautistaappointmentpterygiumsurgery: null,
        patientbautistaappointmentstatus: null,
        patientbautistaappointmentstatushistory: null,
        patientbautistaappointmentpaymentotal: null,
        patientbautistaappointmentconsultationremarkssubject: null,
        patientbautistaappointmentconsultationremarks: null,
        patientbautistaappointmentprescription: null,
        patientbautistaappointmentrating: null,
        patientbautistaappointmentfeedback: null
      };

      // Make API call to update appointment with nullified fields
      const response = await fetch(
        `http://localhost:3000/api/patientappointments/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentusertoken}`
          },
          body: JSON.stringify(fieldsToNullify)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to nullify appointment fields');
      }

      // Update the UI with the new appointment data
      const updatedAppointment = await response.json();
      setselectedpatientappointment(updatedAppointment);
      
      // Update the appointments list to reflect the change
      setpatientappointments(prevAppointments => 
        prevAppointments.map(appt => 
          appt._id === updatedAppointment._id ? updatedAppointment : appt
        ).filter(appt => {
          if (clinicType === 'ambher') {
            return appt.patientambherappointmentdate !== null && 
                   appt.patientambherappointmenttime !== null && 
                   appt.patientambherappointmentid !== null;
          } else {
            return appt.patientbautistaappointmentdate !== null && 
                   appt.patientbautistaappointmenttime !== null && 
                   appt.patientbautistaappointmentid !== null;
          }
        })
      );


      
    } else {
      // If no appointment in other clinic, delete the entire appointment
      const response = await fetch(
        `http://localhost:3000/api/patientappointments/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${currentusertoken}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete appointment');
      }

      // Remove the appointment from the list
      setpatientappointments(prevAppointments =>
        prevAppointments.filter(appt => 
          clinicType === 'bautista' ? 
            appt.patientbautistaappointmentid !== appointmentId :
            appt.patientambherappointmentid !== appointmentId
        )
      );

      // Clear selected appointment if it was the deleted one
      if (selectedpatientappointment) {
        if (clinicType === 'bautista' && selectedpatientappointment.patientbautistaappointmentid === appointmentId) {
          setselectedpatientappointment(null);
        } else if (clinicType === 'ambher' && selectedpatientappointment.patientambherappointmentid === appointmentId) {
          setselectedpatientappointment(null);
        }
      }
    }
    
    console.log(`${clinicType} appointment handled successfully`);
  } catch (error) {
    console.error(`Error handling ${clinicType} appointment:`, error);
    // TODO: Add error handling UI feedback
  }
};

// ... existing code ...







const handleviewappointment = (appointment) => {
  setselectedpatientappointment(appointment);

};




//UPDATING APPOINTMENT STATUS
const handleacceptappointment = async (appointmentId, clinicType) => {
  try{
    const response = await fetch(`http://localhost:3000/api/patientappointments/appointments/${appointmentId}`,{
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
        [`patient${clinicType}appointmentstatus`]: 'Accepted',
        [`patient${clinicType}appointmentstatushistory`]:{
          status:'Accepted',
          changedAt: new Date(),
          changedBy: adminfirstname
        },
        [`patient${clinicType}appointmenteyespecialist`]:clinicType === 'ambher' ? ambhereyespecialist : bautistaeyespecialist
      })
    })


    if(!response.ok){
      throw new Error("Failed to update appointment status");
    }

    const updatedappointment = await response.json();
    setselectedpatientappointment(updatedappointment);
    setpatientappointments(prevappointments =>
      prevappointments.map(appt =>
        appt.id === updatedappointment._id ? updatedappointment : appt
      )
    );


    console.log(`${clinicType} Appointment has been accepted successfully`);

    }catch(error){
      console.error(`Failed to accept ${clinicType} patient appointment:`, error);
    }

  };





//AICODE
  const handleCompleteAppointment = async (appointmentId, clinicType) => {
    try {
      // Make API call to update appointment status with correct URL
      const response = await fetch(
        `http://localhost:3000/api/patientappointments/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentusertoken}`
          },
          body: JSON.stringify({
            [`patient${clinicType}appointmentstatus`]: 'Completed',
            [`patient${clinicType}appointmentstatushistory`]: {
              status: 'Completed',
              changedAt: new Date(),
              changedBy: adminfirstname
            },
            [`patient${clinicType}appointmentpaymentotal`]: clinicType === 'ambher' ? ambherappointmentpaymentotal : bautistaappointmentpaymentotal,
            [`patient${clinicType}appointmentconsultationremarkssubject`]: clinicType === 'ambher' ? ambherappointmentconsultationremarkssubject : bautistaappointmentconsultationremarkssubject,
            [`patient${clinicType}appointmentconsultationremarks`]: clinicType === 'ambher' ? ambherappointmentconsultationremarks : bautistaappointmentconsultationremarks,
            [`patient${clinicType}appointmentprescription`]: clinicType === 'ambher' ? ambherappointmentprescription : bautistaappointmentprescription,

          })
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update appointment status');
      }
  
      // Update the UI with the new appointment data
      const updatedAppointment = await response.json();
      setselectedpatientappointment(updatedAppointment);
      
      // Update the appointments list to reflect the change
      setpatientappointments(prevAppointments => 
        prevAppointments.map(appt => 
          appt._id === updatedAppointment._id ? updatedAppointment : appt
        )
      );
      
      console.log(`${clinicType} appointment completed successfully`);
    } catch (error) {
      console.error(`Error completing ${clinicType} appointment:`, error);
      // TODO: Add error handling UI feedback
    }
  };
  















 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  
 //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS //MEDICAL RECORDS  

const [activemedicalrecordstable, setactivemedicalrecordstable] = useState('allmedicalrecordstable');
const showmedicalrecordstable = (medicalrecordstableid) => {
      setactivemedicalrecordstable(medicalrecordstableid);
};

const [showotherclinicrecord, setshowotherclinicrecord] = useState(false);
const [activepatientmedicalrecordstable, setactivepatientmedicalrecordstable] = useState('medicalrecordsconsultationtable');
const showpatientmedicalrecordstable = (patientmedicalrecordstableid) => {
      setactivepatientmedicalrecordstable(patientmedicalrecordstableid);
};

const [selectedpatientmedicalrecord,setselectedpatientmedicalrecord] = useState(null);
const [showpatientmedicalrecord, setshowpatientmedicalrecord] = useState(false);
const [showpatientmedicalrecordconsultation, setshowpatientmedicalrecordconsultation] = useState(false);
const [showpatientaddothermedicalrecord, setshowpatientaddothermedicalrecord] = useState(false);




  const [otherclinicselectedimage, setotherclinicselectedimage] = useState(null);
  const [otherclinicpreviewimage, setotherclinicpreviewimage] = useState (null);
  const otherclinicimageinputref = useRef(null);


  //PROFILE IMAGE TYPE HANDLING
  const otherclinichandleprofilechange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;


    const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
    if(!imagefiletype.includes(file.type)) {
      alert("Please select an image file (JPG or PNG)");
      return;
    }


    const maximagefile = 2;
    if(file.size > maximagefile * 1024 * 1024){
      alert("Image is too large. Please select image under 2MB");
      return;
    }

    setotherclinicselectedimage(null);
    setotherclinicpreviewimage(null);

    if(otherclinicimageinputref.current){
      otherclinicimageinputref.current.value = "";
    }






    try{

      const imageconfiguration = {
        maximagemb: 1,
        maxworh: 800,
        useWebWorker: true,
        initialQuality: 0.8
      };


      const compressedimageprofile = await imageCompression(file, imageconfiguration);
      const reader = new FileReader();
      reader.onloadend = () => {

        if(reader.error){
          console.error("Error processing image file : ", reader.error);
          alert("Error processing image file. Try again");
          return;
        }
        setotherclinicpreviewimage(reader.result);
      };


      reader.onerror = () => {
        console.error("File Reader Error : ", reader.error);
        alert("Error reading file. Try again");
        return;
      };

      reader.readAsDataURL(compressedimageprofile);
      setotherclinicselectedimage(compressedimageprofile);
    

    } catch (error) {

      console.error("Image file compression failed : ", error.message);
      alert("Image file compression failed. Try again");
      return;

    }
      

  };

  //Handles the click event of upload button
  const otherclinichandleuploadclick = () => {
    otherclinicimageinputref.current.click();
  };

  const otherclinichandleremoveprofile = () => {
    setotherclinicselectedimage(null);
    setotherclinicpreviewimage(null);
    if(otherclinicimageinputref.current){
      otherclinicimageinputref.current.value = "";
    }
  }









const [otherclinicrecords, setotherclinicrecords] = useState([]);




  const fetchotherclinicrecords = async () => {
    try{

      const response = await fetch('http://localhost:3000/api/otherclinicrecord', {
        headers: {
          'Authorization' : `Bearer ${currentusertoken}`
        }
      });

      if(!response.ok){
        throw new Error (`HTTP error! Error: ${response.status}`);
      }

      const data = await response.json();
      setotherclinicrecords(data);

    }catch(error){
      console.error('Error fetching other clinic records: ', error);
    }
  };



useEffect(() => {


  if(currentusertoken){
    fetchotherclinicrecords();
  }
}, [currentusertoken]);





const [otherclinicname, setotherclinicname] = useState('');
const [othercliniceyespecialist, setothercliniceyespecialist] = useState('');
const [otherclinicconsultationdate, setotherclinicconsultationdate] = useState('');
const [otherclinicrecordissubmitting, setotherclinicrecordissubmitting] = useState(false);

const submitotherclinicdata = async (e) => {
  e.preventDefault();
  setotherclinicrecordissubmitting(true);

  try{


    const otherclinicrecorddata = {

        patientotherclinicprofilepicture: selectedpatientmedicalrecord.patientprofilepicture,
        patientothercliniclastname: selectedpatientmedicalrecord.patientlastname,
        patientotherclinicfirstname: selectedpatientmedicalrecord.patientfirstname,
        patientotherclinicmiddlename: selectedpatientmedicalrecord.patientmiddlename,
        patientotherclinicemail: selectedpatientmedicalrecord.patientemail,


        patientotherclinicname: otherclinicname,
        patientothercliniceyespecialist: othercliniceyespecialist,
        patientotherclinicconsultationdate: otherclinicconsultationdate,
        patientotherclinicsubmittedbyfirstname: adminfirstname,
        patientotherclinicsubmittedbymiddlename: adminmiddlename,
        patientotherclinicsubmittedbylastname: adminlastname,
        patientotherclinicsubmittedbytype: currentuserloggedin,

        patientotherclinicrecordimage: otherclinicpreviewimage,
        
        }
    console.log("Submittin ReCORDD", otherclinicrecorddata);

    const response = await fetch('http://localhost:3000/api/otherclinicrecord',{
            method: "POST",
            headers: {
              "Content-Type":"application/json",
              'Authorization': `Bearer ${currentusertoken}`
            },
            body: JSON.stringify(otherclinicrecorddata)
    });

    console.log("Submittin ReCORDD", otherclinicrecorddata);

    if(!response.ok){
      throw new Error(`HTTP error! Error: ${response.status}`);
    }


    const result = await response.json();
    console.log('Other Clinic Record Successfull Submitted for Review', result);
    await fetchotherclinicrecords();
    setotherclinicselectedimage(false);
    setotherclinicpreviewimage(null);
    setotherclinicname("");
    setothercliniceyespecialist("");
    setotherclinicconsultationdate("");



  }catch(error) {
    console.error('Error Submitting Other Clinic Record: ', error);
  }finally{
    setotherclinicrecordissubmitting(false);
  }
};












const [showdeleteotherclinicrecorddialog, setshowdeleteotherclinicrecorddialog] = useState(false);


const deleteotherclinicrecord = async () => {
  try{
    if(!selectedpatientappointment) return;

    const response = await fetch(`http://localhost:3000/api/otherclinicrecord/${selectedpatientappointment.otherclinicid}`,{
      method: 'DELETE',
      headers:{
        'Authorization' : `Bearer ${currentusertoken}`
      }
    });

    const result = await response.json();
    if(!response.ok){
      throw new Error(result.message || "Failed to delete record");
    }

    await fetchotherclinicrecords();
    setselectedpatientappointment(null);
    setshowdeleteotherclinicrecorddialog(false);
  
  }catch(error){
    console.error("Failed to delete:", error.message);
  }
}























 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT

const [activeinventorytable, setactiveinventorytable] = useState('ambherinventorytable');
const showinventorytable = (inventorytableid) => {
      setactiveinventorytable(inventorytableid);
};

const [activeambherinventorycategorytable, setactiveambherinventorycategorytable] = useState('all');
const showambherinventorycategory = (ambherinventorycategorytableid) => {
      setactiveambherinventorycategorytable(ambherinventorycategorytableid);
};

const [showaddambherinventorycategorydialog, setshowaddambherinventorycategorydialog] = useState(false);
const [showaddambheraddinventorycategory, setshowaddambheraddinventorycategory] = useState(false);
const [showdeleteambherinventorycategorydialog, setshowdeleteambherinventorycategorydialog] = useState(false);
const [ambherinventorycategorynameset, setambherinventorycategorynameset] = useState("");
const [ambherinventorycategoryissubmitting, setambherinventorycategoryissubmitting] = useState(false);
const [ambherinventorycategorynamecheck, setambherinventorycategorynamecheck] = useState(false);
const [ambherinventorycategorynameerror, setambherinventorycategorynameerror] = useState(false);
const [ambherinventorycategorynameexist, setambherinventorycategorynameexist] = useState(false);
const [ambherinventorycategorylist, setambherinventorycategorylist] = useState([]);
const [loadingambherinventorycategorylist, setloadingambherinventorycategorylist] = useState(true);
const [selectedambherinventorycategory, setselectedambherinventorycategory] = useState(null);




const currentuserdata = JSON.parse(localStorage.getItem("currentuser")) || {};


 //INSERT AMBHER INVENTORY CATEGORY NAME //INSERT AMBHER INVENTORY CATEGORY NAME //INSERT AMBHER INVENTORY CATEGORY NAME //INSERT AMBHER INVENTORY CATEGORY NAME //INSERT AMBHER INVENTORY CATEGORY NAME 
const submitambherinventorycategory = async (e) => {
    e.preventDefault();
    setambherinventorycategoryissubmitting(true);

  try{


    const ambherinventorycategorydata = {


      ambherinventorycategoryname: ambherinventorycategorynameset,

      ambherinventorycategoryaddedbyprofilepicture: currentuserdata.profilepicture || '',
      ambherinventorycategoryaddedbylastname: currentuserdata.lastname || '',
      ambherinventorycategoryaddedbyfirstname: currentuserdata.firstname || '',
      ambherinventorycategoryaddedbymiddlename: currentuserdata.middlename || '',
      ambherinventorycategoryaddedbytype: currentuserdata.type || '',
      ambherinventorycategoryaddedbyemail: currentuserdata.email || '',




    }

    console.log(ambherinventorycategorydata);
    const response = await fetch('http://localhost:3000/api/ambherinventorycategory',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${currentusertoken}`
      },
      body: JSON.stringify(ambherinventorycategorydata)
    });



    if(!response.ok){
      throw new Error(`Response fetching error! Error: ${response.status}`);

    }


    const result = await response.json();
    console.log('Ambher Inventory Category insertion successful: ', result);

    setambherinventorycategorylist(prev => [result, ...prev]);
    setambherinventorycategorynameset("");
    setshowaddambheraddinventorycategory(false);


  }catch(error) {
    console.error('Error Ambher Inventory Category insertion: ', error);
    setambherinventorycategoryissubmitting(false);
  }finally{
    setambherinventorycategoryissubmitting(false);
  }
};




//Checks If Category Name is Already is Existing
useEffect(() => {
  let ismounted = true;
  const checkambherinventorycategoryname = async () => {
    const categoryname = ambherinventorycategorynameset.trim();

    if(!categoryname){
      if(ismounted){
        setambherinventorycategorynameerror(false);
        setambherinventorycategorynameexist(false);
      }
      return;
    }


    if (ismounted) setambherinventorycategorynamecheck(true);

    try{
      const response = await fetch(`http://localhost:3000/api/ambherinventorycategory/ambherinventorycategoryname/${encodeURIComponent(categoryname)}`);
   
      if(!ismounted) return;

      const data = await response.json();

      if(response.ok){
        setambherinventorycategorynameerror(true);
        setambherinventorycategorynameexist(true);
      }else if(response.status === 404){
        setambherinventorycategorynameerror(false);
        setambherinventorycategorynameexist(false);
      }
    
    }catch(error){
      if(ismounted){
        setambherinventorycategorynameerror(false);
        setambherinventorycategorynameexist(false);
      }
    }finally{
      if(ismounted) setambherinventorycategorynamecheck(false);
    }

  };


  const timer = setTimeout(checkambherinventorycategoryname, 500);
  return () => {
    ismounted = false;
    clearTimeout(timer);
  };
}, [ambherinventorycategorynameset])



//Fetching Ambher Inventory Categories
useEffect(() => {
  const fetchambhercategories = async () => {
    try{
      const response = await fetch('http://localhost:3000/api/ambherinventorycategory');
      if(!response.ok) throw new Error("Failed to fetch Ambher Inevntory Categories");

      const data = await response.json();
      setambherinventorycategorylist(data);
    
    }catch(error){
      console.error("Error fetching ambher categories: ", error);
    }finally{
      setloadingambherinventorycategorylist(false);
    }
  };
  fetchambhercategories();
}, []);



const fetchambherinventorycategories = async () => {
  try{
    const response = await fetch('http://localhost:3000/api/ambherinventorycategory');
    if(!response.ok) throw new Error("Failed to retrieve ambher inventory categories");

    const data = await response.json();
    setambherinventorycategorylist(data);
  }catch(error){
    console.error("Fetching ambherinventorycategory failed", error);
  }finally{
    setloadingambherinventorycategorylist(false);
  }
};

useEffect(() => {
  fetchambherinventorycategories();
}, []);



//Delete Ambher Inventory Category
const deleteambherinventorycategory = async () => {
  if(!selectedambherinventorycategory) return;

  try{
    const response = await fetch(`http://localhost:3000/api/ambherinventorycategory/${selectedambherinventorycategory.ambherinventorycategoryid}`,{
      method: 'DELETE',
      headers:{
        'Authorization' : `Bearer ${currentusertoken}`
      }
    });

    if(!response.ok) throw new Error("Failed to delete ambher inventory category");

    setambherinventorycategorylist(prev => prev.filter(cat => cat.ambherinventorycategoryid !== selectedambherinventorycategory.ambherinventorycategoryid));
    setshowdeleteambherinventorycategorydialog(false);
    setselectedambherinventorycategory(null);

  }catch(error){
    console.error("Ambher Inventory Category Delete Failed: ", error);
  }
}
















const [activebautistainventorycategorytable, setactivebautistainventorycategorytable] = useState('all');
const showbautistainventorycategory = (bautistainventorycategorytableid) => {
      setactivebautistainventorycategorytable(bautistainventorycategorytableid);
};

const [showaddbautistainventorycategorydialog, setshowaddbautistainventorycategorydialog] = useState(false);
const [showaddbautistaaddinventorycategory, setshowaddbautistaaddinventorycategory] = useState(false);
const [showdeletebautistainventorycategorydialog, setshowdeletebautistainventorycategorydialog] = useState(false);
const [bautistainventorycategorynameset, setbautistainventorycategorynameset] = useState("");
const [bautistainventorycategoryissubmitting, setbautistainventorycategoryissubmitting] = useState(false);
const [bautistainventorycategorynamecheck, setbautistainventorycategorynamecheck] = useState(false);
const [bautistainventorycategorynameerror, setbautistainventorycategorynameerror] = useState(false);
const [bautistainventorycategorynameexist, setbautistainventorycategorynameexist] = useState(false);
const [bautistainventorycategorylist, setbautistainventorycategorylist] = useState([]);
const [loadingbautistainventorycategorylist, setloadingbautistainventorycategorylist] = useState(true);
const [selectedbautistainventorycategory, setselectedbautistainventorycategory] = useState(null);





 //INSERT AMBHER INVENTORY CATEGORY NAME //INSERT AMBHER INVENTORY CATEGORY NAME //INSERT AMBHER INVENTORY CATEGORY NAME //INSERT AMBHER INVENTORY CATEGORY NAME //INSERT AMBHER INVENTORY CATEGORY NAME 
const submitbautistainventorycategory = async (e) => {
    e.preventDefault();
    setbautistainventorycategoryissubmitting(true);

  try{


    const bautistainventorycategorydata = {


      bautistainventorycategoryname: bautistainventorycategorynameset,

      bautistainventorycategoryaddedbyprofilepicture: currentuserdata.profilepicture || '',
      bautistainventorycategoryaddedbylastname: currentuserdata.lastname || '',
      bautistainventorycategoryaddedbyfirstname: currentuserdata.firstname || '',
      bautistainventorycategoryaddedbymiddlename: currentuserdata.middlename || '',
      bautistainventorycategoryaddedbytype: currentuserdata.type || '',
      bautistainventorycategoryaddedbyemail: currentuserdata.email || '',




    }

    console.log(bautistainventorycategorydata);
    const response = await fetch('http://localhost:3000/api/bautistainventorycategory',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${currentusertoken}`
      },
      body: JSON.stringify(bautistainventorycategorydata)
    });



    if(!response.ok){
      throw new Error(`Response fetching error! Error: ${response.status}`);

    }


    const result = await response.json();
    console.log('Bautista Inventory Category insertion successful: ', result);

    setbautistainventorycategorylist(prev => [result, ...prev]);
    setbautistainventorycategorynameset("");
    setshowaddbautistaaddinventorycategory(false);


  }catch(error) {
    console.error('Error Bautista Inventory Category insertion: ', error);
    setbautistainventorycategoryissubmitting(false);
  }finally{
    setbautistainventorycategoryissubmitting(false);
  }
};




//Checks If Category Name is Already is Existing
useEffect(() => {
  let ismounted = true;
  const checkbautistainventorycategoryname = async () => {
    const categoryname = bautistainventorycategorynameset.trim();

    if(!categoryname){
      if(ismounted){
        setbautistainventorycategorynameerror(false);
        setbautistainventorycategorynameexist(false);
      }
      return;
    }


    if (ismounted) setbautistainventorycategorynamecheck(true);

    try{
      const response = await fetch(`http://localhost:3000/api/bautistainventorycategory/bautistainventorycategoryname/${encodeURIComponent(categoryname)}`);
   
      if(!ismounted) return;

      const data = await response.json();

      if(response.ok){
        setbautistainventorycategorynameerror(true);
        setbautistainventorycategorynameexist(true);
      }else if(response.status === 404){
        setbautistainventorycategorynameerror(false);
        setbautistainventorycategorynameexist(false);
      }
    
    }catch(error){
      if(ismounted){
        setbautistainventorycategorynameerror(false);
        setbautistainventorycategorynameexist(false);
      }
    }finally{
      if(ismounted) setbautistainventorycategorynamecheck(false);
    }

  };


  const timer = setTimeout(checkbautistainventorycategoryname, 500);
  return () => {
    ismounted = false;
    clearTimeout(timer);
  };
}, [bautistainventorycategorynameset])



//Fetching Bautista Inventory Categories
useEffect(() => {
  const fetchbautistacategories = async () => {
    try{
      const response = await fetch('http://localhost:3000/api/bautistainventorycategory');
      if(!response.ok) throw new Error("Failed to fetch Bautista Inevntory Categories");



      const data = await response.json();
      setbautistainventorycategorylist(data);
    
      console.log("Bautista categories", data);

    }catch(error){
      console.error("Error fetching bautista categories: ", error);
    }finally{
      setloadingbautistainventorycategorylist(false);
    }
  };
  fetchbautistacategories();
}, []);



const fetchbautistainventorycategories = async () => {
  try{
    const response = await fetch('http://localhost:3000/api/bautistainventorycategory');
    if(!response.ok) throw new Error("Failed to retrieve bautista inventory categories");

    const data = await response.json();
    setbautistainventorycategorylist(data);
  }catch(error){
    console.error("Fetching bautistainventorycategory failed", error);
  }finally{
    setloadingbautistainventorycategorylist(false);
  }
};

useEffect(() => {
  fetchbautistainventorycategories();
}, []);



//Delete Bautista Inventory Category
const deletebautistainventorycategory = async () => {
  if(!selectedbautistainventorycategory) return;

  try{
    const response = await fetch(`http://localhost:3000/api/bautistainventorycategory/${selectedbautistainventorycategory.bautistainventorycategoryid}`,{
      method: 'DELETE',
      headers:{
        'Authorization' : `Bearer ${currentusertoken}`
      }
    });

    if(!response.ok) throw new Error("Failed to delete bautista inventory category");

    setbautistainventorycategorylist(prev => prev.filter(cat => cat.bautistainventorycategoryid !== selectedbautistainventorycategory.bautistainventorycategoryid));
    setshowdeletebautistainventorycategorydialog(false);
    setselectedbautistainventorycategory(null);

  }catch(error){
    console.error("Bautista Inventory Category Delete Failed: ", error);
  }
}






//INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT
//INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT
//INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT
//INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT
//INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT
//INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT
//INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT //INVENTORY MANAGEMENT
const [showaddambherinventoryproductdialog, setshowaddambherinventoryproductdialog] = useState(false);
const [ambherinventorycategorynamebox, setambherinventorycategorynamebox] = useState("");
const [addambherinventoryproductname, setaddambherinventoryproductname] = useState("");
const [addambherinventoryproductbrand, setaddambherinventoryproductbrand] = useState("");
const [addambherinventoryproductmodelnumber, setaddambherinventoryproductmodelnumber] = useState("");
const [addambherinventoryproductdescription, setaddambherinventoryproductdescription] = useState("");
const [addambherinventoryproductprice, setaddambherinventoryproductprice] = useState();
const [addambherinventoryproductquantity, setaddambherinventoryproductquantity] = useState();
const [addambherinventoryproductimageselectedimages, setaddambherinventoryproductimageselectedimages] = useState([]);
const [addambherinventoryproductimagepreviewimages, setaddambherinventoryproductimagepreviewimages] = useState([]);
const [currentimageindex, setcurrentimageindex] = useState(0);
const addambherinventoryproductimageimageinputref = useRef(null);
const [ambherinventoryproductissubmitting, setambherinventoryproductissubmitting] = useState(false);
const [ambherinventoryproducts, setambherinventoryproducts] = useState([]);
const [ambherloadingproducts, setambherloadingproducts] = useState(true);
const [selectedambherproduct, setselectedambherproduct] = useState(null);
const [showdeleteambherproduct, setshowdeleteambherproduct] = useState(false);
const [selecteddeleteambherproduct, setselecteddeleteambherproduct] = useState([]);


const filteredproducts = ambherinventoryproducts.filter(product => 
  activeambherinventorycategorytable === 'all' || 
  product.ambherinventoryproductcategory === activeambherinventorycategorytable
);


const ambherinventoryproductcount = ambherinventoryproducts.filter(
  product => product.ambherinventoryproductquantity <= 10
);




//PRODUCT IMAGE HANDLING

const addambherinventoryproductimagehandlechange = async (e) => {
  const files = Array.from(e.target.files);

  if(addambherinventoryproductimageselectedimages.length + files.length > 5){
    alert("Maximum of only 5 product images");
    return;
  }

  const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
  const maximagefile = 2;

  for(const file of files) {
    if(!imagefiletype.includes(file.type)) {
      alert("Please select image files (JPG / PNG");
      return;
    }

    if(file.size > maximagefile * 1024 * 1024) {
      alert("Please select images under 2MB");
      return;
    }
  }



  try{
    const compressedimages = await Promise.all(
      files.map(async (file) => {
        const imageconfiguration = {
          maximagemb: 1,
          maxworh: 800,
          useWebWorker: true,
          initialQuality: 0.8
        };

        const compressedimage = await imageCompression(file, imageconfiguration);
        return compressedimage;
      })
    );



    const previewurls = await Promise.all(
      compressedimages.map(async (image) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(image);
        });
      })
    );



    setaddambherinventoryproductimageselectedimages(prev => [...prev, ...compressedimages]);
    setaddambherinventoryproductimagepreviewimages(prev => [...prev, ...previewurls]);
    setcurrentimageindex(0);


  }catch(error){
    console.error("Image compression failed: ", error.message);
    alert("Image compression failed");
  }

  if(addambherinventoryproductimageimageinputref.current){
     addambherinventoryproductimageimageinputref.current.value = "";
  }

};







//PREVIOUS  IMAGE
const handlepreviousimage = (e) => {
  e.preventDefault(); 
  if (selectedambherproduct) {
    if (!selectedambherproduct.ambherinventoryproductimagepreviewimages?.length) return;
    setcurrentimageindex(prev => prev === 0 ? selectedambherproduct.ambherinventoryproductimagepreviewimages.length - 1 : prev - 1 );

  } else {
    if (!addambherinventoryproductimagepreviewimages?.length) return;
    setcurrentimageindex(prev => prev === 0 ? addambherinventoryproductimagepreviewimages.length - 1 : prev - 1 );
  }
};

//NEXT IMAGE
const handlenextimage = (e) => {
  e.preventDefault();
  if (selectedambherproduct) {
    if (!selectedambherproduct.ambherinventoryproductimagepreviewimages?.length) return;
    setcurrentimageindex(prev => prev === selectedambherproduct.ambherinventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1 );

  } else {
    if (!addambherinventoryproductimagepreviewimages?.length) return;
    setcurrentimageindex(prev => prev === addambherinventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1);

  }
};





const addambherinventoryproductimagehandleremove = (indextoremove) => {
  setaddambherinventoryproductimageselectedimages(prev =>
    prev.filter((_, index) => index !== indextoremove)
  );

  setaddambherinventoryproductimagepreviewimages(prev =>
    prev.filter((_, index) => index !== indextoremove)
  );

  setcurrentimageindex(prev =>
    prev >= indextoremove && prev > 0 ? prev - 1 : prev
  );
};

const addambherinventoryproductimagehandleuploadclick = () => {
  addambherinventoryproductimageimageinputref.current.click();
};

 const resetaddambherinventoryproductdialog = () => {
  setambherinventorycategorynamebox("");
  setaddambherinventoryproductname("");
  setaddambherinventoryproductbrand("");
  setaddambherinventoryproductmodelnumber("");
  setaddambherinventoryproductdescription("");
  setaddambherinventoryproductprice("");
  setaddambherinventoryproductquantity("");
  setaddambherinventoryproductimageselectedimages([]);
  setaddambherinventoryproductimagepreviewimages([]);
  setcurrentimageindex(0);
  setmessage('');
  setselectedambherproduct(null);
};


//FETCHING PRODUCTS

  const fetchambherproducts = async () => {
    try{
      const response = await fetch('http://localhost:3000/api/ambherinventoryproduct', {
        headers:{
          'Authorization' : `Bearer ${currentusertoken}`
        }
      });
      
      if(!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setambherinventoryproducts(data);
       setambherloadingproducts(false);
    }catch(error){
      console.error("Failed fetching products: ", error);
      setambherloadingproducts(false);
    }
  };


  useEffect(() => {
    fetchambherproducts();
  }, []);



//INSERTING PRODUCT
const handlesubmitaddambherinventoryproduct = async (e) => {

    e.preventDefault();
    setambherinventoryproductissubmitting(true);

  try{

   if (addambherinventoryproductimagepreviewimages.length === 0) {
    alert("Upload at least 1 product image");
           return;
    }


    const ambherinventoryproductdata = {


      ambherinventoryproductcategory: ambherinventorycategorynamebox || '',
      ambherinventoryproductname: addambherinventoryproductname || '',
      ambherinventoryproductbrand:  addambherinventoryproductbrand || '',
      ambherinventoryproductmodelnumber: addambherinventoryproductmodelnumber || '',
      ambherinventoryproductdescription: addambherinventoryproductdescription || '',
      ambherinventoryproductprice: Number(addambherinventoryproductprice) || 0,
      ambherinventoryproductquantity:  Number(addambherinventoryproductquantity) || 0,
      ambherinventoryproductimagepreviewimages: addambherinventoryproductimagepreviewimages || '',



      ambherinventoryproductaddedbyprofilepicture: currentuserdata.profilepicture || '',
      ambherinventoryproductaddedbylastname: currentuserdata.lastname || '',
      ambherinventoryproductaddedbyfirstname: currentuserdata.firstname || '',
      ambherinventoryproductaddedbymiddlename: currentuserdata.middlename || '',
      ambherinventoryproductaddedbytype: currentuserdata.type || '',
      ambherinventoryproductaddedbyemail: currentuserdata.email || '',



    }

    console.log(ambherinventoryproductdata);
    const response = await fetch('http://localhost:3000/api/ambherinventoryproduct',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${currentusertoken}`
      },
      body: JSON.stringify(ambherinventoryproductdata)
    });



    if(!response.ok){
      throw new Error(`Response fetching error! Error: ${response.status}`);

    }


    const result = await response.json();
    console.log('Ambher Inventory Product insertion successful: ', result);
    await fetchambherproducts();
    resetaddambherinventoryproductdialog();
    setshowaddambherinventoryproductdialog(false);

  }catch(error) {
    console.error('Error Ambher Inventory Product insertion: ', error);
    setambherinventoryproductissubmitting(false);
  }finally{
    setambherinventoryproductissubmitting(false);
  }

};

//UPDATING PRODUCT
const handleupdateambherinventoryproduct = async (e) => {

    e.preventDefault();
    setambherinventoryproductissubmitting(true);

  try{
   
   if (!selectedambherproduct) {
      throw new Error ("No product is selected"); 
    }


    const updateambherproduct = {


      ambherinventoryproductcategory: ambherinventorycategorynamebox || '',
      ambherinventoryproductname: addambherinventoryproductname || '',
      ambherinventoryproductbrand:  addambherinventoryproductbrand || '',
      ambherinventoryproductmodelnumber: addambherinventoryproductmodelnumber || '',
      ambherinventoryproductdescription: addambherinventoryproductdescription || '',
      ambherinventoryproductprice: Number(addambherinventoryproductprice) || 0,
      ambherinventoryproductquantity:  Number(addambherinventoryproductquantity) || 0,
      ambherinventoryproductimagepreviewimages: addambherinventoryproductimagepreviewimages || '',



      ambherinventoryproductaddedbyprofilepicture: currentuserdata.profilepicture || '',
      ambherinventoryproductaddedbylastname: currentuserdata.lastname || '',
      ambherinventoryproductaddedbyfirstname: currentuserdata.firstname || '',
      ambherinventoryproductaddedbymiddlename: currentuserdata.middlename || '',
      ambherinventoryproductaddedbytype: currentuserdata.type || '',
      ambherinventoryproductaddedbyemail: currentuserdata.email || '',



    }


    const response = await fetch(`http://localhost:3000/api/ambherinventoryproduct/${selectedambherproduct.ambherinventoryproductid}`,{
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${currentusertoken}`
      },
      body: JSON.stringify(updateambherproduct)
    });



    if(!response.ok){
      throw new Error(`Response fetching error! Error: ${response.status}`);

    }


    const result = await response.json();
    console.log('Ambher Inventory Product updated successful: ', result);


    const updatedambherproduct = ambherinventoryproducts.map(product =>
      product.ambherinventoryproductid === selectedambherproduct.ambherinventoryproductid ? result : product);

    setambherinventoryproducts(updatedambherproduct);
    resetaddambherinventoryproductdialog();
    setshowaddambherinventoryproductdialog(false);
    setselectedambherproduct(null);

  }catch(error) {
    console.error('Error Ambher Inventory Product update: ', error);
    setambherinventoryproductissubmitting(false);
  }finally{
    setambherinventoryproductissubmitting(false);
  }

};


//DELETE PRODUCT
const deleteambherproduct = async (e) => {
    e.preventDefault();

    if(!selectedambherproduct) {
      alert("No product is selected");
      return;
    }

    try{
      const response = await fetch(`http://localhost:3000/api/ambherinventoryproduct/${selectedambherproduct.ambherinventoryproductid}`,{
        method: 'DELETE',
        headers: {
          'Authorization' : `Bearer ${currentusertoken}`
        }
      });

      if(!response.ok) {
        throw new Error(`Failed to delete ambher product: ${response.status}`);
      }


      setambherinventoryproducts(prev => prev.filter(product => product.ambherinventoryproductid!== selectedambherproduct.ambherinventoryproductid));
      resetaddambherinventoryproductdialog();
      setselectedambherproduct(null);
      setshowaddambherinventoryproductdialog(false);
      setshowdeleteambherproduct(false);

   
   
    }catch(error){
      console.error('Error deleting ambher product:', error);
    }

};




















const [showaddbautistainventoryproductdialog, setshowaddbautistainventoryproductdialog] = useState(false);
          const [bautistainventorycategorynamebox, setbautistainventorycategorynamebox] = useState("");
          const [addbautistainventoryproductname, setaddbautistainventoryproductname] = useState("");
          const [addbautistainventoryproductbrand, setaddbautistainventoryproductbrand] = useState("");
          const [addbautistainventoryproductmodelnumber, setaddbautistainventoryproductmodelnumber] = useState("");
          const [addbautistainventoryproductdescription, setaddbautistainventoryproductdescription] = useState("");
          const [addbautistainventoryproductprice, setaddbautistainventoryproductprice] = useState();
          const [addbautistainventoryproductquantity, setaddbautistainventoryproductquantity] = useState();
          const [addbautistainventoryproductimageselectedimages, setaddbautistainventoryproductimageselectedimages] = useState([]);
          const [addbautistainventoryproductimagepreviewimages, setaddbautistainventoryproductimagepreviewimages] = useState([]);
          const [bautistacurrentimageindex, setbautistacurrentimageindex] = useState(0);
          const addbautistainventoryproductimageimageinputref = useRef(null);
          const [bautistainventoryproductissubmitting, setbautistainventoryproductissubmitting] = useState(false);
          const [bautistainventoryproducts, setbautistainventoryproducts] = useState([]);
          const [bautistaloadingproducts, setbautistaloadingproducts] = useState(true);
          const [selectedbautistaproduct, setselectedbautistaproduct] = useState(null);
          const [showdeletebautistaproduct, setshowdeletebautistaproduct] = useState(false);
          const [selecteddeletebautistaproduct, setselecteddeletebautistaproduct] = useState([]);
          
          
          const bautistafilteredproducts = bautistainventoryproducts.filter(product => 
            activebautistainventorycategorytable === 'all' || 
            product.bautistainventoryproductcategory === activebautistainventorycategorytable
          );
          
const bautistainventoryproductcount = bautistainventoryproducts.filter(
  product => product.bautistainventoryproductquantity <= 10
);






          
          //PRODUCT IMAGE HANDLING
          
          const addbautistainventoryproductimagehandlechange = async (e) => {
            const files = Array.from(e.target.files);
          
            if(addbautistainventoryproductimageselectedimages.length + files.length > 5){
              alert("Maximum of only 5 product images");
              return;
            }
          
            const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
            const maximagefile = 2;
          
            for(const file of files) {
              if(!imagefiletype.includes(file.type)) {
                alert("Please select image files (JPG / PNG");
                return;
              }
          
              if(file.size > maximagefile * 1024 * 1024) {
                alert("Please select images under 2MB");
                return;
              }
            }
          
          
          
            try{
              const compressedimages = await Promise.all(
                files.map(async (file) => {
                  const imageconfiguration = {
                    maximagemb: 1,
                    maxworh: 800,
                    useWebWorker: true,
                    initialQuality: 0.8
                  };
          
                  const compressedimage = await imageCompression(file, imageconfiguration);
                  return compressedimage;
                })
              );
          
          
          
              const previewurls = await Promise.all(
                compressedimages.map(async (image) => {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      resolve(reader.result);
                    };
                    reader.readAsDataURL(image);
                  });
                })
              );
          
          
          
              setaddbautistainventoryproductimageselectedimages(prev => [...prev, ...compressedimages]);
              setaddbautistainventoryproductimagepreviewimages(prev => [...prev, ...previewurls]);
              setbautistacurrentimageindex(0);
          
          
            }catch(error){
              console.error("Image compression failed: ", error.message);
              alert("Image compression failed");
            }
          
            if(addbautistainventoryproductimageimageinputref.current){
               addbautistainventoryproductimageimageinputref.current.value = "";
            }
          
          };
          
          
          
          
          
          
          
          //PREVIOUS  IMAGE
          const bautistahandlepreviousimage = (e) => {
            e.preventDefault(); 
            if (selectedbautistaproduct) {
              if (!selectedbautistaproduct.bautistainventoryproductimagepreviewimages?.length) return;
              setbautistacurrentimageindex(prev => prev === 0 ? selectedbautistaproduct.bautistainventoryproductimagepreviewimages.length - 1 : prev - 1 );
          
            } else {
              if (!addbautistainventoryproductimagepreviewimages?.length) return;
              setbautistacurrentimageindex(prev => prev === 0 ? addbautistainventoryproductimagepreviewimages.length - 1 : prev - 1 );
            }
          };
          
          //NEXT IMAGE
          const bautistahandlenextimage = (e) => {
            e.preventDefault();
            if (selectedbautistaproduct) {
              if (!selectedbautistaproduct.bautistainventoryproductimagepreviewimages?.length) return;
              setbautistacurrentimageindex(prev => prev === selectedbautistaproduct.bautistainventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1 );
          
            } else {
              if (!addbautistainventoryproductimagepreviewimages?.length) return;
              setbautistacurrentimageindex(prev => prev === addbautistainventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1);
          
            }
          };
          
          
          
          
          
          const addbautistainventoryproductimagehandleremove = (indextoremove) => {
            setaddbautistainventoryproductimageselectedimages(prev =>
              prev.filter((_, index) => index !== indextoremove)
            );
          
            setaddbautistainventoryproductimagepreviewimages(prev =>
              prev.filter((_, index) => index !== indextoremove)
            );
          
            setbautistacurrentimageindex(prev =>
              prev >= indextoremove && prev > 0 ? prev - 1 : prev
            );
          };
          
          const addbautistainventoryproductimagehandleuploadclick = () => {
            addbautistainventoryproductimageimageinputref.current.click();
          };
          
           const resetaddbautistainventoryproductdialog = () => {
            setbautistainventorycategorynamebox("");
            setaddbautistainventoryproductname("");
            setaddbautistainventoryproductbrand("");
            setaddbautistainventoryproductmodelnumber("");
            setaddbautistainventoryproductdescription("");
            setaddbautistainventoryproductprice("");
            setaddbautistainventoryproductquantity("");
            setaddbautistainventoryproductimageselectedimages([]);
            setaddbautistainventoryproductimagepreviewimages([]);
            setbautistacurrentimageindex(0);
            setmessage('');
            setselectedbautistaproduct(null);
          };
          
          
          //FETCHING PRODUCTS
          
            const fetchbautistaproducts = async () => {
              try{
                const response = await fetch('http://localhost:3000/api/bautistainventoryproduct', {
                  headers:{
                    'Authorization' : `Bearer ${currentusertoken}`
                  }
                });
                
                if(!response.ok) throw new Error("Failed to fetch products");
          
                const data = await response.json();
                setbautistainventoryproducts(data);
                 setbautistaloadingproducts(false);
              }catch(error){
                console.error("Failed fetching products: ", error);
                setbautistaloadingproducts(false);
              }
            };
          
          
            useEffect(() => {
              fetchbautistaproducts();
            }, []);
          
          
          
          //INSERTING PRODUCT
          const handlesubmitaddbautistainventoryproduct = async (e) => {
          
              e.preventDefault();
              setbautistainventoryproductissubmitting(true);
          
            try{
          
             if (addbautistainventoryproductimagepreviewimages.length === 0) {
              alert("Upload at least 1 product image");
                     return;
              }
          
          
              const bautistainventoryproductdata = {
          
          
                bautistainventoryproductcategory: bautistainventorycategorynamebox || '',
                bautistainventoryproductname: addbautistainventoryproductname || '',
                bautistainventoryproductbrand:  addbautistainventoryproductbrand || '',
                bautistainventoryproductmodelnumber: addbautistainventoryproductmodelnumber || '',
                bautistainventoryproductdescription: addbautistainventoryproductdescription || '',
                bautistainventoryproductprice: Number(addbautistainventoryproductprice) || 0,
                bautistainventoryproductquantity:  Number(addbautistainventoryproductquantity) || 0,
                bautistainventoryproductimagepreviewimages: addbautistainventoryproductimagepreviewimages || '',
          
          
          
                bautistainventoryproductaddedbyprofilepicture: currentuserdata.profilepicture || '',
                bautistainventoryproductaddedbylastname: currentuserdata.lastname || '',
                bautistainventoryproductaddedbyfirstname: currentuserdata.firstname || '',
                bautistainventoryproductaddedbymiddlename: currentuserdata.middlename || '',
                bautistainventoryproductaddedbytype: currentuserdata.type || '',
                bautistainventoryproductaddedbyemail: currentuserdata.email || '',
          
          
          
              }
          
              console.log(bautistainventoryproductdata);
              const response = await fetch('http://localhost:3000/api/bautistainventoryproduct',{
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json',
                  'Authorization': `Bearer ${currentusertoken}`
                },
                body: JSON.stringify(bautistainventoryproductdata)
              });
          
          
          
              if(!response.ok){
                throw new Error(`Response fetching error! Error: ${response.status}`);
          
              }
          
          
              const result = await response.json();
              console.log('Ambher Inventory Product insertion successful: ', result);
              await fetchbautistaproducts();
              resetaddbautistainventoryproductdialog();
              setshowaddbautistainventoryproductdialog(false);
          
            }catch(error) {
              console.error('Error Ambher Inventory Product insertion: ', error);
              setbautistainventoryproductissubmitting(false);
            }finally{
              setbautistainventoryproductissubmitting(false);
            }
          
          };
          
          //UPDATING PRODUCT
          const handleupdatebautistainventoryproduct = async (e) => {
          
              e.preventDefault();
              setbautistainventoryproductissubmitting(true);
          
            try{
             
             if (!selectedbautistaproduct) {
                throw new Error ("No product is selected"); 
              }
          
          
              const updatebautistaproduct = {
          
          
                bautistainventoryproductcategory: bautistainventorycategorynamebox || '',
                bautistainventoryproductname: addbautistainventoryproductname || '',
                bautistainventoryproductbrand:  addbautistainventoryproductbrand || '',
                bautistainventoryproductmodelnumber: addbautistainventoryproductmodelnumber || '',
                bautistainventoryproductdescription: addbautistainventoryproductdescription || '',
                bautistainventoryproductprice: Number(addbautistainventoryproductprice) || 0,
                bautistainventoryproductquantity:  Number(addbautistainventoryproductquantity) || 0,
                bautistainventoryproductimagepreviewimages: addbautistainventoryproductimagepreviewimages || '',
          
          
          
                bautistainventoryproductaddedbyprofilepicture: currentuserdata.profilepicture || '',
                bautistainventoryproductaddedbylastname: currentuserdata.lastname || '',
                bautistainventoryproductaddedbyfirstname: currentuserdata.firstname || '',
                bautistainventoryproductaddedbymiddlename: currentuserdata.middlename || '',
                bautistainventoryproductaddedbytype: currentuserdata.type || '',
                bautistainventoryproductaddedbyemail: currentuserdata.email || '',
          
          
          
              }
          
          
              const response = await fetch(`http://localhost:3000/api/bautistainventoryproduct/${selectedbautistaproduct.bautistainventoryproductid}`,{
                method: 'PUT',
                headers: {
                  'Content-Type' : 'application/json',
                  'Authorization': `Bearer ${currentusertoken}`
                },
                body: JSON.stringify(updatebautistaproduct)
              });
          
          
          
              if(!response.ok){
                throw new Error(`Response fetching error! Error: ${response.status}`);
          
              }
          
          
              const result = await response.json();
              console.log('Ambher Inventory Product updated successful: ', result);
          
          
              const updatedbautistaproduct = bautistainventoryproducts.map(product =>
                product.bautistainventoryproductid === selectedbautistaproduct.bautistainventoryproductid ? result : product);
          
              setbautistainventoryproducts(updatedbautistaproduct);
              resetaddbautistainventoryproductdialog();
              setshowaddbautistainventoryproductdialog(false);
              setselectedbautistaproduct(null);
          
            }catch(error) {
              console.error('Error Ambher Inventory Product update: ', error);
              setbautistainventoryproductissubmitting(false);
            }finally{
              setbautistainventoryproductissubmitting(false);
            }
          
          };
          
          
          //DELETE PRODUCT
          const deletebautistaproduct = async (e) => {
              e.preventDefault();
          
              if(!selectedbautistaproduct) {
                alert("No product is selected");
                return;
              }
          
              try{
                const response = await fetch(`http://localhost:3000/api/bautistainventoryproduct/${selectedbautistaproduct.bautistainventoryproductid}`,{
                  method: 'DELETE',
                  headers: {
                    'Authorization' : `Bearer ${currentusertoken}`
                  }
                });
          
                if(!response.ok) {
                  throw new Error(`Failed to delete bautista product: ${response.status}`);
                }
          
          
                setbautistainventoryproducts(prev => prev.filter(product => product.bautistainventoryproductid!== selectedbautistaproduct.bautistainventoryproductid));
                resetaddbautistainventoryproductdialog();
                setselectedbautistaproduct(null);
                setshowaddbautistainventoryproductdialog(false);
                setshowdeletebautistaproduct(false);
          
             
             
              }catch(error){
                console.error('Error deleting bautista product:', error);
              }
          
          };



















































































































































































































  
  return (
    <>

     {/* NavBar */}
    <div className="  bg-gradient-to-tr from-[#0592d4]  to-[#1c1c34] rounded-full mt-2 ml-3 mr-3">
      <header id="header" className="flex justify-between items-center text-black py-4 px-8 md:px-20  ">
        <a id:logocontain href="#" >
          <img src={landinglogo} alt="Eye2Wear: Optical Clinic" className="w-60 hover:scale-105 transition-all   p-1"></img>
        </a>



      {/* Search 
      
              <div className="relative hidden md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"></input>
        </div>
        
      */}





{currentusertoken ? (
    <div className="relative">
    <div id="profile" onClick={showlogout}  className="ml-3  flex justify-center items-center  bg-[#fbfbfb00] rounded-full p-1 hover:cursor-pointer hover:scale-105 transition-all">

     <img src={adminprofilepicture || 'default-profile.png'} alt="Profile" className="h-10 w-10 rounded-full"></img>
    </div>

    {showlogoutbtn && (
         <div id="logoutdiv" className=" absolute left-1/2 transform -translate-x-1/2 ml-3 mt-3  flex justify-center items-center p-3 bg-[#ad4e43] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" onClick={handlelogout}>
         <i className="bx bx-exit mt-1 pr-2 font-semibold text-white text-[17px]"/>
         <p className="font-semibold text-white text-[17px]">Logout</p>
       </div>    
      )}
    </div>


) : (   <Link to="/userlogin">
  <div className="ml-3  flex justify-center items-center p-3 bg-[#027bbf] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" onClick={handlelogout}>
  <i className="bx bx-user-circle mt-1 pr-2 font-semibold text-white text-[17px]"/>
  <p className="font-semibold text-white text-[17px]">Login</p>
</div>
</Link>)}

    
       
 
   

  


  




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
        <section className="h-full  min-w-[99vw] flex justify-center align-center mt-3"   >

    
        
          <div className={`transition-all duration-300 ease-in-out flex flex-col justify-between items-start pl-3 bg-[#272828]  rounded-2xl    ml-3 mb-3 pt-3 pb-3 ${sidebarexpanded ? 'w-[365px]' : 'w-[85px]'}`} id="adminsidebar">

              <div className="group relative " id="expandbtn" onClick={toggleadminsidebar} ><div className="hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl  transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden">{sidebarexpanded &&(<i className='bx bx-collapse-horizontal  p-2 hover:text-white text-white text-[40px] ' ></i>)}   {!sidebarexpanded &&(<i className='bx bx-expand-horizontal  p-2 hover:text-white text-white text-[40px] ' ></i>)}<span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>{sidebarexpanded ? 'Collapse Sidebar' : ''}</span></div></div>
          
              <div className="group relative mt-5" onClick={() => showdashboard('summaryoverview')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl mr-2 transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden ${activedashboard ==='summaryoverview' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bx-list-ul  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='summaryoverview' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>   <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Summary Overview</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute  p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Summary Overview</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('accountmanagement')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden ${activedashboard ==='accountmanagement' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-user-account  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='accountmanagement' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Account Management</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Account Management</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('profileinformation')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='profileinformation' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-user-detail  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='profileinformation' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Profile Information</span>  {!sidebarexpanded && (<span className=" pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Profile Information</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('appointmentmanagement')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='appointmentmanagement' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-calendar  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='appointmentmanagement' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Appointment Management</span>  {!sidebarexpanded && (<span className=" pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Appointment Management</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('medicalrecords')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='medicalrecords' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-data  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='medicalrecords' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Medical Records</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Medical Records</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('inventorymanagement')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='inventorymanagement' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-package   p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='inventorymanagement' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Inventory Management</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Inventory Management</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('billingsandorders')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='billingsandorders' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-receipt   p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='billingsandorders' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Billing & Orders</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Billing & Orders</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('communicationcenter')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='communicationcenter' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-message-dots  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='communicationcenter' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Communication Center</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Communication Center</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('reportingandanalytics')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='reportingandanalytics' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-report  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='reportingandanalytics' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Reporting & Analytics</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Reporting & Analytics</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('clinicmanagement')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='clinicmanagement' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-clinic  p-3.5  text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='clinicmanagement' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Clinic Management</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Clinic Management</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('sytemadministration')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='sytemadministration' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-buildings  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='sytemadministration' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>System Administration</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">System Administration</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('wishlistandproductfeatures')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='wishlistandproductfeatures' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bxs-bookmark-heart  p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='wishlistandproductfeatures' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Wishlist & Products</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Wishlist & Products</span>)}  </div></div>
              <div className="group relative" onClick={() => showdashboard('mappingintegration')}><div className={`hover:bg-[#454545] hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out flex items-center justify-center w-fit overflow-hidden  ${activedashboard ==='mappingintegration' ? 'bg-[#454545] rounded-2xl' :''}`}><i className={`bx bx-street-view p-3.5    text-[#cacacf] hover:text-white text-[27px]${activedashboard ==='mappingintegration' ? 'bg-[#454545] rounded-2xl text-white text-[27px]' :''}`}></i>  <span className={`text-[16px] text-white font-semibold font-albertsans transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${sidebarexpanded ? 'opacity-100 w-auto ml-2 mr-2 animate-slideIn' : 'opacity-0 w-0 animate-slideOut'}`}>Mapping Integration</span>  {!sidebarexpanded && (<span className="pointer-events-none absolute p-4 rounded-2xl ml-4 left-full text-white font-albertsans font-semibold text-[16px] top-1/2 transform -translate-y-1/2  bg-[#2b2a2a]   whitespace-nowrap  group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out opacity-0 -translate-x-2 ">Mapping Integration</span>)}  </div></div>

              </div>








        <div  className=" rounded-2xl   ml-3  h-screen  w-[100%] flex flex-col items-center justify-center mr-3 mb-3" >
          
          <div className="flex flex-col items-start w-full h-[12%] rounded-2xl" id="greet">

            <h1 className="ml-5 mt-1 font-albertsans font-bold text-[40px] text-[#212134]">Good Day, {adminfirstname}!</h1>
            <p className="ml-5 font-geistsemibold text-[15px] text-[#23232a]">Stay on top of your tasks, monitor progress, and track status.  </p>

          </div>


          <div className="w-full h-[88%]  rounded-2xl" id="overview">





{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}
{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}
{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}
{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}
{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}{/* Summary Overview */}
              { activedashboard === 'summaryoverview' && ( <div id="summaryoverview" className="   flex justify-center items-center w-[100%] h-[100%] rounded-2xl" > 
                
                  {/* Left */}
                  <div className="pl-5 w-[35%] h-full rounded-2xl flex flex-col justify-center items-center mr-2">

                   <div id="todaysappointmentcontainer"  className="flex flex-col   h-[100%] bg-[#ffffff]    shadow-lg w-full  rounded-2xl pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out ">

                      <div className="flex items-center"><i className="bx bxs-calendar text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Today's Appointment</h1></div>
                      <p className="font-geistmedium text-[13px] text-[#333333]">{currenttime.toLocaleDateString(undefined, currentdateoption)}</p>
                      <p className="font-geistmedium text-[13px] text-[#333333]">{currenttime.toLocaleTimeString(undefined, currenttimeoption)}</p>


                    </div>




                  </div>


                  {/* Right */}
                  <div className=" w-[65%] h-[100%] rounded-2xl flex flex-col justify-center items-center ml-2">
                    <div className=" w-full h-[40%] rounded-2xl mb-2 flex justify-center items-center">



                      <div className="pl-5 pr-5 pb-4 pt-4  transition-all duration-300 ease-in-out  shadow-lg w-[55%] mr-2 h-full rounded-2xl bg-[#ffffff]   " id="stockscontainer">
                      <div className="flex items-center"><i className="bx bxs-package text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Stock Inventory</h1></div>

                      </div>






                      <div className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300 ease-in-out  shadow-lg w-[45%] ml-2 h-full rounded-2xl bg-[#ffffff]   " id="unreadmessagescontainer">
                      <div className="flex items-center"><i className="bx bxs-message-dots text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Unread Messages</h1></div>

                      </div>





                    </div>

                    
                    <div id="pendingorderscontainer"  className="flex flex-col   h-[60%] bg-[#ffffff]    shadow-lg w-full  rounded-2xl pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out ">

                      <div className="flex items-center"><i className="bx bxs-cart-alt text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Pending Orders</h1></div>


                      </div>

                  </div>  


                
                 </div> )}




{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}
{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}
{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}
{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}
{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}{/*Account Management*/}
              { activedashboard === 'accountmanagement' && ( <div id="accountmanagement" className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out border-1 bg-white border-gray-200 shadow-lg w-[100%] h-[100%] rounded-2xl" >   

                <div className="flex items-center"><i className="bx bxs-user-account text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Account Management</h1></div>
                <div className="flex justify-between items-center mt-3 h-[60px]">
                  <div onClick={() => showaccounttable('patientaccounttable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeaccounttable ==='patientaccounttable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeaccounttable ==='patientaccounttable' ? 'text-white' : ''}`}>Patients</h1></div>
                  <div onClick={() => showaccounttable('staffaccounttable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeaccounttable ==='staffaccounttable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeaccounttable ==='staffaccounttable' ? 'text-white' : ''}`}>Staff</h1></div>
                  <div onClick={() => showaccounttable('owneraccounttable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeaccounttable ==='owneraccounttable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeaccounttable ==='owneraccounttable' ? 'text-white' : ''}`}>Owner</h1></div>
                  <div onClick={() => showaccounttable('administratoraccounttable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeaccounttable ==='administratoraccounttable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeaccounttable ==='administratoraccounttable' ? 'text-white' : ''}`}>Administrator</h1></div>
                 </div>

        
        {/*Patient Account Table*/} {/*Patient Account Table*/} {/*Patient Account Table*/} {/*Patient Account Table*/} {/*Patient Account Table*/} {/*Patient Account Table*/} {/*Patient Account Table*/} {/*Patient Account Table*/} {/*Patient Account Table*/} 
                 { activeaccounttable === 'patientaccounttable' && ( <div id="patientaccounttable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
    
                      <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
                      <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." value={searchpatients} onChange={(e) => {setsearchpatients(e.target.value); filterpatientaccount(e.target.value);}} className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
                      <div onClick={() => setshowaddpatientdialog(true)}  className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-user-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Patient</p></div>
                      </div>

                      <div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
                       {renderpatientaccounts()}
                      </div>

                      
                      {/*Add Patient Dialog*/}
                         {showaddpatientdialog && (
                         <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
                                <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                  <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add Patient Account</h1></div>
                                  <div onClick={() => {setshowaddpatientdialog(false),   setmessage('') }} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>

                          <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" onSubmit={handlesubmit}>
                                <div className="flex justify-center items-center bg-[#fcfcfc] rounded-2xl w-full h-[590px]">
                                  <div className="w-full h-full  rounded-2xl flex justify-center mt-15">
                                    <div className=" w-fit h-fit">
                                      <img className=" object-cover h-90  w-90 rounded-full" src={previewimage || defaultprofilepic}/>
                                    
                                      <input  className="hidden" type="file" onChange={handleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={imageinputref} />
                                      <div onClick={handleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                                            
                                      {selectedprofile && (<div onClick={handleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                                      </div>
                                  </div>

                                  <div className="w-full h-full  rounded-2xl">
                                        <div className=" w-full h-full rounded-4xl">
                                  
                                  
              
                                        <div className="registration-container">
                                     
                                        <h1 className=" font-league text-[#3da9d1] text-[27px] ">Account Creation</h1>
                                        {message.text && (
                                          <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                                            {message.text}
                                          </div>
                                        )}
                                  
                                        <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Let's create patient account!</h1>
                                  
                                  
                                  
                                  
                                        <div className="form-group mt-10  flex">
                                        <label className="  font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="email">Email :</label>
                                        <div className="flex flex-col">
                                        <input className=" bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-22 h-10 w-70" placeholder="Enter your email..." type="text" name="patientemail" id="patientemail" value={formdata.patientemail} onChange={handlechange} required/>
                                        {checkemail && <p className="text-gray-500 text-sm ml-22">Checking Email</p>}
                                        {emailerror && !emailexist && !emailcharacters.test(formdata.patientemail) && (<p className="text-red-500 text-sm ml-22">Enter a valid email address</p>)}
                                        {emailerror && emailexist && (<p className= "text-red-500 text-sm ml-22">Email already exist</p>)}
                                     
                                        </div>
                                        </div>
                                  
                                  
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="passwrd">Password : </label>
                                        <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-11 h-10 w-70" placeholder="Enter your password..." type="password" name="patientpassword" id="patientpassword" value={formdata.patientpassword} onChange={handlechange} required min="6"/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="lastname">Last Name :</label>
                                        <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-10 h-10 w-70" placeholder="Enter your lastname..." type="text" name="patientlastname" id="patientlastname" value={formdata.patientlastname} onChange={handlechange} required/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="firstname">First Name :</label>
                                        <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-9 h-10 w-70" placeholder="Enter your firstname..." type="text" name="patientfirstname" id="patientfirstname" value={formdata.patientfirstname} onChange={handlechange} required/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="middlename">Middle Name :</label>
                                        <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-70" placeholder="Enter your middlename..." type="text" name="patientmiddlename" id="patientmiddlename" value={formdata.patientmiddlename} onChange={handlechange} required/></div>
                                        
                                  
                                       
                                     
                                        <button type="submit" disabled={issubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                                          {issubmitting ? "Creating Account..." : "Create Account"}
                                        </button>
                                     

                                  
                                  
                                        </div>
                                
                                  
                                  
                                        </div>

                                  </div>
                                </div>
                                </form>
                           </div>
                         </div>
                      )}






                      {showdeletepatientdialog && (
                         <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

                           <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
                           <form className="flex flex-col  w-full h-fit " onSubmit={handlesubmit}>

                              <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Patient Account</h1></div>
                              <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                  <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this patient account?</p>
                                  {selectedpatientaccount && ( <>
                                            <p className="text-[16px] mt-3">Patient Id: {selectedpatientaccount.id}</p>
                                            <p className="text-[16px]">Patient Name: {selectedpatientaccount.name}</p> </>)}  
                                  </div>        
                                  <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                    <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {setshowdeletepatientdialog(false); setselectedpatientaccount(null);}}><p className=" text-[#ffffff]">Cancel</p></div>
                                    <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={deletepatientaccount}><p className=" text-[#ffffff]">Delete</p></div>
                                  </div>
                              </div>

                           </form>
                           </div>
                         </div>
                      )}




                       {showviewpatientdialog && (
                          <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                            <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
                                 <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                   <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Edit Patient Account</h1></div>
                                   <div onClick={() => {setshowviewpatientdialog(false);
                                                        setselectededitpatientaccount(null);
                                                        setformdata({
                                                          role: 'Patient',
                                                          patientemail: '',

                                                          patientlastname: '',
                                                          patientfirstname: '',
                                                          patientmiddlename: '',
                                                          patientprofilepicture: ''
                                                        });
                                                        setpreviewimage(null);
                                   }} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                 </div>
  
                            <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" onSubmit={updatepatientaccount}>
                                 <div className="flex justify-center items-center bg-[#fcfcfc] rounded-2xl w-full h-[590px]">
                                    <div className="w-full h-full  rounded-2xl flex justify-center mt-15">
                                      <div className=" w-fit h-fit">
                                       <img className=" object-cover h-90  w-90 rounded-full" src={previewimage || defaultprofilepic}/>
                                      
                                        <input  className="hidden" type="file" onChange={handleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={imageinputref} />
                                        <div onClick={handleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                                                               
                                        {selectedprofile && (<div onClick={handleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                                       </div>
                                   </div>
                   
                                    <div className="w-full h-full  rounded-2xl">
                                          <div className=" w-full h-full rounded-4xl">
                                                     
                                                     
                                 
                                          <div className="registration-container">
                                      
                                          <h1 className=" font-league text-[#3da9d1] text-[27px] ">Account Details</h1>
                                          {message.text && (
                                            <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                                              {message.text}
                                            </div>
                                          )}
                                                     
                                         <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Let's modify your account!</h1>
                                                     
                                                     
                                                     
                                                     
                                         <div className="form-group mt-10  flex">
                                         <label className="  font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="email">Email :</label>
                                          <div className="flex flex-col">
                                          <input className=" bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-22 h-10 w-70" placeholder="Enter your email..." type="text" name="patientemail" id="patientemail" value={formdata.patientemail} onChange={handlechange} required/>
                                              {checkemail && <p className="text-gray-500 text-sm ml-22">Checking Email</p>}
                                              {emailerror && !emailexist && !emailcharacters.test(formdata.patientemail) && (<p className="text-red-500 text-sm ml-22">Enter a valid email address</p>)}
                                               {emailerror && emailexist && (<p className= "text-red-500 text-sm ml-22">Email already exist</p>)}
                                                        
                                         </div>
                                          </div>
                                                     
                                                     
               
                                         <div className="form-group mt-5">
                                         <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="lastname">Last Name :</label>
                                         <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-10 h-10 w-70" placeholder="Enter your lastname..." type="text" name="patientlastname" id="patientlastname" value={formdata.patientlastname} onChange={handlechange} required/></div>
                                                     
                                         <div className="form-group mt-5">
                                         <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="firstname">First Name :</label>
                                         <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-9 h-10 w-70" placeholder="Enter your firstname..." type="text" name="patientfirstname" id="patientfirstname" value={formdata.patientfirstname} onChange={handlechange} required/></div>
                                                     
                                         <div className="form-group mt-5">
                                         <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="middlename">Middle Name :</label>
                                         <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-70" placeholder="Enter your middlename..." type="text" name="patientmiddlename" id="patientmiddlename" value={formdata.patientmiddlename} onChange={handlechange} required/></div>
                                                           
                                                     
                                                          
                                                        
                                         <button type="submit" disabled={issubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                                           {issubmitting ? "Saving..." : "Save"}
                                         </button> 
                                                        
                   
                                                     
                                                     
                                         </div>
                                                   
                                                     
                                                     
                                          </div>
  
                                    </div>
                                 </div>
                                  </form>
                            </div>
                          </div>
                      )}

                 </div> )}



        {/*Staff Account Table*/} {/*Staff Account Table*/} {/*Staff Account Table*/} {/*Staff Account Table*/} {/*Staff Account Table*/} {/*Staff Account Table*/} {/*Staff Account Table*/} {/*Staff Account Table*/}              
                 { activeaccounttable === 'staffaccounttable' && ( <div id="staffaccounttable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
    
    <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
    <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." value={searchstaffs} onChange={(e) => {setsearchstaffs(e.target.value); filterstaffaccount(e.target.value);}} className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
    <div onClick={() => setshowaddstaffdialog(true)}  className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-user-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Staff</p></div>
    </div>

    <div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
     {renderstaffaccounts()}
    </div>

    
    {/*Add staff Dialog*/}
       {showaddstaffdialog && (
       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add staff Account</h1></div>
                <div onClick={() => setshowaddstaffdialog(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

        <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" onSubmit={staffhandlesubmit}>
              <div className="flex justify-center items-center bg-[#fcfcfc] rounded-2xl w-full h-[590px]">
                <div className="w-full h-full  rounded-2xl flex justify-center mt-15">
                  <div className=" w-fit h-fit">
                    <img className=" object-cover h-90  w-90 rounded-full" src={staffpreviewimage || defaultprofilepic}/>
                  
                    <input  className="hidden" type="file" onChange={staffhandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={staffimageinputref} />
                    <div onClick={staffhandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                          
                    {staffselectedprofile && (<div onClick={staffhandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                    </div>
                </div>

                <div className="w-full h-full  rounded-2xl">
                      <div className=" w-full h-full rounded-4xl">
                 
                

                      <div className="registration-container">
                   
                      <h1 className=" font-league text-[#3da9d1] text-[27px] ">Account Creation</h1>
                      {staffmessage.text && (
                        <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                          {staffmessage.text}
                        </div>
                      )}
                
                      <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Let's create staff account!</h1>
                
                
                
                
                      <div className="form-group mt-10  flex">
                      <label className="  font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="staffemail">Email :</label>
                      <div className="flex flex-col">
                      <input className=" bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-22 h-10 w-70" placeholder="Enter your email..." type="text" name="staffemail" id="staffemail" value={staffformdata.staffemail} onChange={staffhandlechange} required/>
                      {staffcheckemail && <p className="text-gray-500 text-sm ml-22">Checking Email</p>}
                      {staffemailerror && !staffemailexist && !staffemailcharacters.test(staffformdata.staffemail) && (<p className="text-red-500 text-sm ml-22">Enter a valid email address</p>)}
                      {staffemailerror && staffemailexist && (<p className= "text-red-500 text-sm ml-22">Email already exist</p>)}
                   
                      </div>
                      </div>
                
                
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="staffpassword">Password : </label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-11 h-10 w-70" placeholder="Enter your password..." type="password" name="staffpassword" id="staffpassword" value={staffformdata.staffpassword} onChange={staffhandlechange} required min="6"/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="stafflastname">Last Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-10 h-10 w-70" placeholder="Enter your lastname..." type="text" name="stafflastname" id="stafflastname" value={staffformdata.stafflastname} onChange={staffhandlechange} required/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="stafffirstname">First Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-9 h-10 w-70" placeholder="Enter your firstname..." type="text" name="stafffirstname" id="stafffirstname" value={staffformdata.stafffirstname} onChange={staffhandlechange} required/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="staffmiddlename">Middle Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-70" placeholder="Enter your middlename..." type="text" name="staffmiddlename" id="staffmiddlename" value={staffformdata.staffmiddlename} onChange={staffhandlechange} required/></div>
                      
                      <div className="form-group mt-5 flex">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="staffclinic">Eye Specialist:</label>
                      <div className="ml-4"><StaffeyespecialistYesorNoBox value={staffformdata.staffiseyespecialist} onChange={staffhandlechange} /></div>
                      </div>
                     
                   
                      <button type="submit" disabled={staffissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                        {staffissubmitting ? "Creating Account..." : "Create Account"}
                      </button>
                   

                
                
                      </div>
              
                
                
                      </div>

                </div>
              </div>
              </form>
         </div>
       </div>
    )}


    {showdeletestaffdialog && (
       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
         <form className="flex flex-col  w-full h-fit " onSubmit={staffhandlesubmit}>

            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#cfcfcf]">Delete Staff Account</h1></div>
            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this staff account?</p>
                {selectedstaffaccount && ( <>
                          <p className="text-[16px] mt-3">Staff Id: {selectedstaffaccount.id}</p>
                          <p className="text-[16px]">Staff Name: {selectedstaffaccount.name}</p> </>)}  
                </div>        
                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {setshowdeletestaffdialog(false); setselectedstaffaccount(null);}}><p className=" text-[#ffffff]">Cancel</p></div>
                  <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={deletestaffaccount}><p className=" text-[#ffffff]">Delete</p></div>
                </div>
            </div>

         </form>
         </div>
       </div>
    )}




     {showviewstaffdialog && (
        <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
          <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
               <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                 <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Edit Staff Account</h1></div>
                 <div onClick={() => {setshowviewstaffdialog(false);
                                      setselectededitstaffaccount(null);
                                      setstaffformdata({
                                        role: 'staff',
                                        staffemail: '',
                                        stafflastname: '',
                                        stafffirstname: '',
                                        staffmiddlename: '',
                                        staffiseyespecialist:'',
                                        staffprofilepicture: ''
                                      });
                                      setstaffpreviewimage(null);
                 }} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
               </div>

          <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" onSubmit={updatestaffaccount}>
               <div className="flex justify-center items-center bg-[#fcfcfc] rounded-2xl w-full h-[590px]">
                  <div className="w-full h-full  rounded-2xl flex justify-center mt-15">
                    <div className=" w-fit h-fit">
                     <img className=" object-cover h-90  w-90 rounded-full" src={staffpreviewimage || defaultprofilepic}/>
                    
                      <input  className="hidden" type="file" onChange={staffhandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={staffimageinputref} />
                      <div onClick={staffhandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                                             
                      {selectedprofile && (<div onClick={staffhandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                     </div>
                 </div>
 
                  <div className="w-full h-full  rounded-2xl">
                        <div className=" w-full h-full rounded-4xl">
                                   
                                   
               
                        <div className="registration-container">
                    
                        <h1 className=" font-league text-[#3da9d1] text-[27px] ">Account Details</h1>
                        {staffmessage.text && (
                          <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                            {staffmessage.text}
                          </div>
                        )}
                                   
                       <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Let's modify your account!</h1>
                                   
                                   
                                   
                                   
                       <div className="form-group mt-10  flex">
                       <label className="  font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="email">Email :</label>
                        <div className="flex flex-col">
                        <input className=" bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-22 h-10 w-70" placeholder="Enter your email..." type="text" name="staffemail" id="staffemail" value={staffformdata.staffemail} onChange={staffhandlechange} required/>
                       {staffcheckemail && <p className="text-gray-500 text-sm ml-22">Checking Email</p>}
                       {staffemailerror && !staffemailexist && !staffemailcharacters.test(staffformdata.staffemail) && (<p className="text-red-500 text-sm ml-22">Enter a valid email address</p>)}
                        {staffemailerror && staffemailexist && (<p className= "text-red-500 text-sm ml-22">Email already exist</p>)}
                                      
                       </div>
                        </div>
                                   
                                   
                  
            
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="stafflastname">Last Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-10 h-10 w-70" placeholder="Enter your lastname..." type="text" name="stafflastname" id="stafflastname" value={staffformdata.stafflastname} onChange={staffhandlechange} required/></div>
                                   
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="stafffirstname">First Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-9 h-10 w-70" placeholder="Enter your firstname..." type="text" name="stafffirstname" id="stafffirstname" value={staffformdata.stafffirstname} onChange={staffhandlechange} required/></div>
                                   
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="staffmiddlename">Middle Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-70" placeholder="Enter your middlename..." type="text" name="staffmiddlename" id="staffmiddlename" value={staffformdata.staffmiddlename} onChange={staffhandlechange} required/></div>
                                         
                                   
                       <div className="form-group mt-5 flex">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="staffclinic">Eye Specialist:</label>
                      <div className="ml-4"><StaffeyespecialistYesorNoBox value={staffformdata.staffiseyespecialist} onChange={staffhandlechange} /></div>
                      </div>
                                      
                       <button type="submit" disabled={staffissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                         {staffissubmitting ? "Saving..." : "Save"}
                       </button>
                                      
 
                                   
                                   
                       </div>
                                 
                                   
                                   
                        </div>

                  </div>
               </div>
                </form>
          </div>
        </div>
    )}

                 </div> )}



        {/*Owner Account Table*/} {/*Owner Account Table*/} {/*Owner Account Table*/} {/*Owner Account Table*/} {/*Owner Account Table*/} {/*Owner Account Table*/} {/*Owner Account Table*/}
                 { activeaccounttable === 'owneraccounttable' && ( <div id="owneraccounttable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
    
    <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
    <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." value={searchowners} onChange={(e) => {setsearchowners(e.target.value); filterowneraccount(e.target.value);}} className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
    <div onClick={() => setshowaddownerdialog(true)}  className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-user-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Owner</p></div>
    </div>

    <div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
     {renderowneraccounts()}
    </div>

    
    {/*Add owner Dialog*/}
       {showaddownerdialog && (
       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add Owner Account</h1></div>
                <div onClick={() => setshowaddownerdialog(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

        <form className="flex flex-col  ml-15 mr-15   w-fullx" onSubmit={ownerhandlesubmit}>
              <div className="flex justify-center items-center bg-[#fcfcfc] rounded-2xl w-full h-[590px]">
                <div className="w-full h-full  rounded-2xl flex justify-center mt-15">
                  <div className=" w-fit h-fit">
                    <img className=" object-cover h-90  w-90 rounded-full" src={ownerpreviewimage || defaultprofilepic}/>
                  
                    <input  className="hidden" type="file" onChange={ownerhandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={ownerimageinputref} />
                    <div onClick={ownerhandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                          
                    {ownerselectedprofile && (<div onClick={ownerhandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                    </div>
                </div>

                <div className="w-full h-full  rounded-2xl">
                      <div className=" w-full h-full rounded-4xl">
                 
                

                      <div className=" registration-container">
                   
                      <h1 className=" font-league text-[#3da9d1] text-[27px] ">Account Creation</h1>
                      {ownermessage.text && (
                        <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                          {ownermessage.text}
                        </div>
                      )}
                
                      <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Let's create owner account!</h1>
                
                
                
                
                      <div className="form-group mt-10  flex">
                      <label className="  font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="owneremail">Email :</label>
                      <div className="flex flex-col">
                      <input className=" bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-22 h-10 w-70" placeholder="Enter your email..." type="text" name="owneremail" id="owneremail" value={ownerformdata.owneremail} onChange={ownerhandlechange} required/>
                      {ownercheckemail && <p className="text-gray-500 text-sm ml-22">Checking Email</p>}
                      {owneremailerror && !owneremailexist && !owneremailcharacters.test(ownerformdata.owneremail) && (<p className="text-red-500 text-sm ml-22">Enter a valid email address</p>)}
                      {owneremailerror && owneremailexist && (<p className= "text-red-500 text-sm ml-22">Email already exist</p>)}
                   
                      </div>
                      </div>
                
                
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerpassword">Password : </label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-11 h-10 w-70" placeholder="Enter your password..." type="password" name="ownerpassword" id="ownerpassword" value={ownerformdata.ownerpassword} onChange={ownerhandlechange} required min="6"/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerlastname">Last Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-10 h-10 w-70" placeholder="Enter your lastname..." type="text" name="ownerlastname" id="ownerlastname" value={ownerformdata.ownerlastname} onChange={ownerhandlechange} required/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerfirstname">First Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-9 h-10 w-70" placeholder="Enter your firstname..." type="text" name="ownerfirstname" id="ownerfirstname" value={ownerformdata.ownerfirstname} onChange={ownerhandlechange} required/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownermiddlename">Middle Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-70" placeholder="Enter your middlename..." type="text" name="ownermiddlename" id="ownermiddlename" value={ownerformdata.ownermiddlename} onChange={ownerhandlechange} required/></div>
                      
                       <div className="form-group mt-5 flex">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerclinic">Clinic :</label>
                      <div className="ml-22"><OwnerClinicBox value={ownerformdata.ownerclinic} onChange={ownerhandlechange} /></div>   
                      </div>
                   

                      <div className="form-group mt-5 flex">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerclinic">Eye Specialist:</label>
                      <div className="ml-4"><OwnereyespecialistYesorNoBox value={ownerformdata.owneriseyespecialist} onChange={ownerhandlechange} /></div>
                      </div>
                      
        
                     
                   
                      <button type="submit" disabled={ownerissubmitting} className="submit-btn mt-6 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                        {ownerissubmitting ? "Creating Account..." : "Create Account"}
                      </button>
                   

                
                
                      </div>
              
                
                
                      </div>

                </div>
              </div>
              </form>
         </div>
       </div>
    )}


    {showdeleteownerdialog && (
       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
         <form className="flex flex-col  w-full h-fit " onSubmit={ownerhandlesubmit}>

            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#cfcfcf]">Delete owner Account</h1></div>
            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this owner account?</p>
                {selectedowneraccount && ( <>
                          <p className="text-[16px] mt-3">Owner Id: {selectedowneraccount.id}</p>
                          <p className="text-[16px]">Owner Name: {selectedowneraccount.name}</p> </>)}  
                </div>        
                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {setshowdeleteownerdialog(false); setselectedowneraccount(null);}}><p className=" text-[#ffffff]">Cancel</p></div>
                  <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={deleteowneraccount}><p className=" text-[#ffffff]">Delete</p></div>
                </div>
            </div>

         </form>
         </div>
       </div>
    )}




     {showviewownerdialog && (
        <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
          <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
               <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                 <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Edit Owner Account</h1></div>
                 <div onClick={() => {setshowviewownerdialog(false);
                                      setselectededitowneraccount(null);
                                      setownerformdata({
                                        role: 'Owner',
                                        owneremail: '',
                                        ownerlastname: '',
                                        ownerfirstname: '',
                                        ownermiddlename: '',
                                        ownerclinic: '',
                                        ownerprofilepicture: ''
                                      });
                                      setownerpreviewimage(null);
                 }} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
               </div>

          <form className="flex flex-col  ml-15 mr-15  w-fullx" onSubmit={updateowneraccount}>
               <div className="flex justify-center items-center bg-[#fcfcfc] rounded-2xl w-full h-[590px]">
                  <div className="w-full h-full  rounded-2xl flex justify-center mt-15">
                    <div className=" w-fit h-fit">
                     <img className=" object-cover h-90  w-90 rounded-full" src={ownerpreviewimage || defaultprofilepic}/>
                    
                      <input  className="hidden" type="file" onChange={ownerhandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={ownerimageinputref} />
                      <div onClick={ownerhandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                                             
                      {selectedprofile && (<div onClick={ownerhandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                     </div>
                 </div>
 
                  <div className="w-full h-full  rounded-2xl">
                        <div className=" w-full h-full rounded-4xl">
                                   
                                   
               
                        <div className="registration-container">
                    
                        <h1 className=" font-league text-[#3da9d1] text-[27px] ">Account Details</h1>
                        {ownermessage.text && (
                          <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                            {ownermessage.text}
                          </div>
                        )}
                                   
                       <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Let's modify your account!</h1>
                                   
                                   
                                   
                                   
                       <div className="form-group mt-10  flex">
                       <label className="  font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="email">Email :</label>
                        <div className="flex flex-col">
                        <input className=" bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-22 h-10 w-70" placeholder="Enter your email..." type="text" name="owneremail" id="owneremail" value={ownerformdata.owneremail} onChange={ownerhandlechange} required/>
                       {ownercheckemail && <p className="text-gray-500 text-sm ml-22">Checking Email</p>}
                       {owneremailerror && !owneremailexist && !owneremailcharacters.test(ownerformdata.owneremail) && (<p className="text-red-500 text-sm ml-22">Enter a valid email address</p>)}
                        {owneremailerror && owneremailexist && (<p className= "text-red-500 text-sm ml-22">Email already exist</p>)}
                                      
                       </div>
                        </div>
                                   
                                   
              
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerlastname">Last Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-10 h-10 w-70" placeholder="Enter your lastname..." type="text" name="ownerlastname" id="ownerlastname" value={ownerformdata.ownerlastname} onChange={ownerhandlechange} required/></div>
                                   
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerfirstname">First Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-9 h-10 w-70" placeholder="Enter your firstname..." type="text" name="ownerfirstname" id="ownerfirstname" value={ownerformdata.ownerfirstname} onChange={ownerhandlechange} required/></div>
                                   
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownermiddlename">Middle Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-70" placeholder="Enter your middlename..." type="text" name="ownermiddlename" id="ownermiddlename" value={ownerformdata.ownermiddlename} onChange={ownerhandlechange} required/></div>
                                         
                       <div className="form-group mt-5 flex">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerclinic">Clinic :</label>
                      <div className="ml-22"><OwnerClinicBox value={ownerformdata.ownerclinic} onChange={ownerhandlechange} /></div>   
                      </div>
                   

                      <div className="form-group mt-5 flex">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerclinic">Eye Specialist:</label>
                      <div className="ml-4"><OwnereyespecialistYesorNoBox value={ownerformdata.owneriseyespecialist} onChange={ownerhandlechange} /></div>
                      </div>        
                                        
                                  
                       <button type="submit" disabled={ownerissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                         {ownerissubmitting ? "Saving..." : "Save"}
                       </button>
                                      
 
                                   
                                   
                       </div>
                                 
                                   
                                   
                        </div>

                  </div>
               </div>
                </form>
          </div>
        </div>
    )}

                 </div> )}




        {/*Admin Account Table*/} {/*Admin Account Table*/} {/*Admin Account Table*/} {/*Admin Account Table*/} {/*Admin Account Table*/} {/*Admin Account Table*/} {/*Admin Account Table*/} {/*Admin Account Table*/}
                 { activeaccounttable === 'administratoraccounttable' && ( <div id="administratoraccounttable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
    
    <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
    <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." value={searchadmins} onChange={(e) => {setsearchadmins(e.target.value); filteradminaccount(e.target.value);}} className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
    <div onClick={() => setshowaddadmindialog(true)}  className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-user-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Admin</p></div>
    </div>

    <div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
     {renderadminaccounts()}
    </div>

    
    {/*Add admin Dialog*/}
       {showaddadmindialog && (
       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add Admin Account</h1></div>
                <div onClick={() => setshowaddadmindialog(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

        <form className="flex flex-col  ml-15 mr-15   w-fullx" onSubmit={adminhandlesubmit}>
              <div className="flex justify-center items-center bg-[#fcfcfc] rounded-2xl w-full h-[590px]">
                <div className="w-full h-full  rounded-2xl flex justify-center mt-15">
                  <div className=" w-fit h-fit">
                    <img className=" object-cover h-90  w-90 rounded-full" src={adminpreviewimage || defaultprofilepic}/>
                  
                    <input  className="hidden" type="file" onChange={adminhandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={adminimageinputref} />
                    <div onClick={adminhandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                          
                    {adminselectedprofile && (<div onClick={adminhandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                    </div>
                </div>

                <div className="w-full h-full  rounded-2xl">
                      <div className=" w-full h-full rounded-4xl">
                 
                

                      <div className=" registration-container">
                   
                      <h1 className=" font-league text-[#3da9d1] text-[27px] ">Account Creation</h1>
                      {adminmessage.text && (
                        <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                          {adminmessage.text}
                        </div>
                      )}
                
                      <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Let's create admin account!</h1>
                
                
                
                
                      <div className="form-group mt-10  flex">
                      <label className="  font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="adminemail">Email :</label>
                      <div className="flex flex-col">
                      <input className=" bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-22 h-10 w-70" placeholder="Enter your email..." type="text" name="adminemail" id="adminemail" value={adminformdata.adminemail} onChange={adminhandlechange} required/>
                      {admincheckemail && <p className="text-gray-500 text-sm ml-22">Checking Email</p>}
                      {adminemailerror && !adminemailexist && !adminemailcharacters.test(adminformdata.adminemail) && (<p className="text-red-500 text-sm ml-22">Enter a valid email address</p>)}
                      {adminemailerror && adminemailexist && (<p className= "text-red-500 text-sm ml-22">Email already exist</p>)}
                   
                      </div>
                      </div>
                
                
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="adminpassword">Password : </label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-11 h-10 w-70" placeholder="Enter your password..." type="password" name="adminpassword" id="adminpassword" value={adminformdata.adminpassword} onChange={adminhandlechange} required min="6"/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="adminlastname">Last Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-10 h-10 w-70" placeholder="Enter your lastname..." type="text" name="adminlastname" id="adminlastname" value={adminformdata.adminlastname} onChange={adminhandlechange} required/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="adminfirstname">First Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-9 h-10 w-70" placeholder="Enter your firstname..." type="text" name="adminfirstname" id="adminfirstname" value={adminformdata.adminfirstname} onChange={adminhandlechange} required/></div>
                
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="adminmiddlename">Middle Name :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-70" placeholder="Enter your middlename..." type="text" name="adminmiddlename" id="adminmiddlename" value={adminformdata.adminmiddlename} onChange={adminhandlechange} required/></div>
                      

                     
                   
                      <button type="submit" disabled={adminissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                        {adminissubmitting ? "Creating Account..." : "Create Account"}
                      </button>
                   

                
                
                      </div>
              
                
                
                      </div>

                </div>
              </div>
              </form>
         </div>
       </div>
    )}


    {showdeleteadmindialog && (
       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
         <form className="flex flex-col  w-full h-fit " onSubmit={adminhandlesubmit}>

            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#cfcfcf]">Delete Admin Account</h1></div>
            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this admin account?</p>
                {selectedadminaccount && ( <>
                          <p className="text-[16px] mt-3">Admin Id: {selectedadminaccount.id}</p>
                          <p className="text-[16px]">Admin Name: {selectedadminaccount.name}</p> </>)}  
                </div>        
                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {setshowdeleteadmindialog(false); setselectedadminaccount(null);}}><p className=" text-[#ffffff]">Cancel</p></div>
                  <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={deleteadminaccount}><p className=" text-[#ffffff]">Delete</p></div>
                </div>
            </div>

         </form>
         </div>
       </div>
    )}




     {showviewadmindialog && (
        <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
          <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
               <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                 <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Edit Admin Account</h1></div>
                 <div onClick={() => {setshowviewadmindialog(false);
                                      setselectededitadminaccount(null);
                                      setadminformdata({
                                        role: 'Admin',
                                        adminemail: '',
                                        adminlastname: '',
                                        adminfirstname: '',
                                        adminmiddlename: '',
                                        adminprofilepicture: ''
                                      });
                                      setadminpreviewimage(null);
                 }} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
               </div>

          <form className="flex flex-col  ml-15 mr-15  w-fullx" onSubmit={updateadminaccount}>
               <div className="flex justify-center items-center bg-[#fcfcfc] rounded-2xl w-full h-[590px]">
                  <div className="w-full h-full  rounded-2xl flex justify-center mt-15">
                    <div className=" w-fit h-fit">
                     <img className=" object-cover h-90  w-90 rounded-full" src={adminpreviewimage || defaultprofilepic}/>
                    
                      <input  className="hidden" type="file" onChange={adminhandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={adminimageinputref} />
                      <div onClick={adminhandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                                             
                      {selectedprofile && (<div onClick={adminhandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                     </div>
                 </div>
 
                  <div className="w-full h-full  rounded-2xl">
                        <div className=" w-full h-full rounded-4xl">
                                   
                                   
               
                        <div className="registration-container">
                    
                        <h1 className=" font-league text-[#3da9d1] text-[27px] ">Account Details</h1>
                        {adminmessage.text && (
                          <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                            {adminmessage.text}
                          </div>
                        )}
                                   
                       <h1 className=" font-albertsans  italic text-[#060606] text-[20px]">Let's modify your account!</h1>
                                   
                                   
                                   
                                   
                       <div className="form-group mt-10  flex">
                       <label className="  font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="email">Email :</label>
                        <div className="flex flex-col">
                        <input className=" bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-22 h-10 w-70" placeholder="Enter your email..." type="text" name="adminemail" id="adminemail" value={adminformdata.adminemail} onChange={adminhandlechange} required/>
                       {admincheckemail && <p className="text-gray-500 text-sm ml-22">Checking Email</p>}
                       {adminemailerror && !adminemailexist && !adminemailcharacters.test(adminformdata.adminemail) && (<p className="text-red-500 text-sm ml-22">Enter a valid email address</p>)}
                        {adminemailerror && adminemailexist && (<p className= "text-red-500 text-sm ml-22">Email already exist</p>)}
                                      
                       </div>
                        </div>
                                   
                                   
                  

                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="adminlastname">Last Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-10 h-10 w-70" placeholder="Enter your lastname..." type="text" name="adminlastname" id="adminlastname" value={adminformdata.adminlastname} onChange={adminhandlechange} required/></div>
                                   
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="adminfirstname">First Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-9 h-10 w-70" placeholder="Enter your firstname..." type="text" name="adminfirstname" id="adminfirstname" value={adminformdata.adminfirstname} onChange={adminhandlechange} required/></div>
                                   
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="adminmiddlename">Middle Name :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-70" placeholder="Enter your middlename..." type="text" name="adminmiddlename" id="adminmiddlename" value={adminformdata.adminmiddlename} onChange={adminhandlechange} required/></div>
                                                    
                                        
                                  
                       <button type="submit" disabled={adminissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                         {adminissubmitting ? "Saving..." : "Save"}
                       </button>
                                      
 
                                   
                                   
                       </div>
                                 
                                   
                                   
                        </div>

                  </div>
               </div>
                </form>
          </div>
        </div>
    )}

                 </div> )}

              
              </div> )}




{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}
{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}
{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}
{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}
{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}{/*Profile Information*/}

{ activedashboard === 'profileinformation' && ( <div id="profileinformation" className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out border-1 bg-white border-gray-200 shadow-lg w-[100%] h-[100%] rounded-2xl" >   


           <div className="flex items-center"><i className="bx bxs-user-detail text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Profile Information</h1></div>
           <div className="flex justify-between items-center mt-3 h-[60px]">
            <div onClick={() => showprofiletable('patientprofiletable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeprofiletable ==='patientprofiletable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeprofiletable ==='patientprofiletable' ? 'text-white' : ''}`}>Patients</h1></div>
            <div onClick={() => showprofiletable('staffprofiletable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeprofiletable ==='staffprofiletable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeprofiletable ==='staffprofiletable' ? 'text-white' : ''}`}>Staff</h1></div>
            <div onClick={() => showprofiletable('ownerprofiletable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeprofiletable ==='ownerprofiletable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeprofiletable ==='ownerprofiletable' ? 'text-white' : ''}`}>Owner</h1></div>
            <div onClick={() => showprofiletable('administratorprofiletable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeprofiletable ==='administratorprofiletable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeprofiletable ==='administratorprofiletable' ? 'text-white' : ''}`}>Administrator</h1></div>
           </div>


{/*Patient profile Table*/} {/*Patient profile Table*/} {/*Patient profile Table*/} {/*Patient profile Table*/} {/*Patient profile Table*/} {/*Patient profile Table*/} {/*Patient profile Table*/} {/*Patient profile Table*/} {/*Patient profile Table*/} 
 { activeprofiletable === 'patientprofiletable' && ( <div id="patientprofiletable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

  <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
     <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." value={searchpatients} onChange={(e) => {setsearchpatients(e.target.value); filterpatientaccount(e.target.value);}} className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
      <div onClick={() => setshowaddpatientprofile(true)}  className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-user-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Patient Profile</p></div>
       </div>

       <div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
       {renderpatientprofiles()}
       </div>





       {showpatientpofile && (
       <div id="patientdemographicprofileform" className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[780px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Patient Profile</h1></div>
                <div onClick={() => {setshowpatientpofile(false); resetpatientprofileformdata();}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

              <form onSubmit={retrieveandupdatepatientprofile}>
                         
                         <div className="ml-25 mt-5 flex ">
   
   
                         <div className=" w-60 h-60 ml-10">
                           <img className=" object-cover h-60 w-full rounded-full" src={previewimage || defaultprofilepic}/>
   
                           <input  className="hidden" type="file" onChange={handleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={imageinputref} />
                           <div onClick={handleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                           
                           {selectedprofile && (<div onClick={handleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                         </div>
   
                         <div className=" ml-15">

                          

                          <div className=" h-fit form-group  ">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientlastname">Last Name :</label>     
                           <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientlastname} onChange={(e) => setdemoformdata({...demoformdata, patientlastname: e.target.value})} type="text" name="patientlastname" id="patientlastname" placeholder="Patient Last Name..."/></div>
   
                           <div className=" h-fit form-group  mt-5">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientfirstname">First Name :</label>     
                           <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientfirstname} onChange={(e) => setdemoformdata({...demoformdata, patientfirstname: e.target.value})}  type="text" name="patientfirstname" id="patientfirstname" placeholder="Patient First Name..."/></div>
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientmiddlename">Middle Name :</label>     
                           <input className="w-112 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientmiddlename} onChange={(e) => setdemoformdata({...demoformdata, patientmiddlename: e.target.value})}  type="text" name="patientmiddlename" id="patientmiddlename" placeholder="Patient Middle Name.."/></div>
   
   
   
                           <div className=" mt-5 flex items-center">
                           <div className="">
   
                           <div className=" h-fit form-group">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientage">Age :</label>     
                           <input className="w-32 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientage} onChange={(e) => setdemoformdata({...demoformdata, patientage: e.target.value})} type="number" name="patientage" id="patientage" placeholder="Age..."/></div>
   
                               </div>
   
                               <div className="">
                                 
                               <div className=" h-fit form-group ml-15">
                              <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientbirthdate">Birthdate :</label>     
                              <input className="w-38 justify-center border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientbirthdate} onChange={(e) => setdemoformdata({...demoformdata, patientbirthdate: e.target.value})}  type="date" name="patientbirthdate" id="patientbirthdate" placeholder=""/> </div>
   
                               </div>
   
   
                           </div>
   
   
   
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientgender">Gender :</label>     
                           <div className="ml-3"><GenderBoxAdminDash value={demoformdata.patientgender} onChange={(e) => setdemoformdata({...demoformdata, patientgender: e.target.value})} /></div>  </div>
   
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientcontactnumber">Contact Number :</label>     
                           <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientcontactnumber} onChange={(e) => setdemoformdata({...demoformdata, patientcontactnumber: e.target.value})} type="text" name="patientcontactnumber" id="patientcontactnumber" placeholder="Ex: 09xxxxxxxxx"/> </div>
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patienthomeaddress">Home Address :</label>     
                           <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"   value={demoformdata.patienthomeaddress} onChange={(e) => setdemoformdata({...demoformdata, patienthomeaddress: e.target.value})}  type="text" name="patienthomeaddress" id="patienthomeaddress" placeholder="Ex: #001 Sison St., Townsite, Limay, Bataan"/> </div>
   
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactname">Emergency Contact Name :</label>     
                           <input className="w-90 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientemergencycontactname} onChange={(e) => setdemoformdata({...demoformdata,patientemergencycontactname: e.target.value})}  type="text" name="patientemergencycontactname" id="patientemergencycontactname" placeholder="Ex: Juan Dela Cruz"/> </div>
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactnumber">Emergency Contact Number :</label>     
                           <input className="w-84 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demoformdata.patientemergencycontactnumber} onChange={(e) => setdemoformdata({...demoformdata, patientemergencycontactnumber: e.target.value})}  type="text" name="patientemergencycontactnumber" id="patientemergencyconctactnumber" placeholder="Ex: 09xxxxxxxxx"/> </div>
   
   
          
                         <div className=" mt-10">
   
                         <button type="submit" disabled={issubmitting} className={`submit-btn mt-12 w-full flex justify-center items-center ${issubmitting? "opacity-75 cursor-not-allowed" : "" }`} style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                            Save Changes
                         </button>
   
                           </div>


   
                           <div onClick={() =>  {
                setshowdeletepatientprofiledialog(true);
                }}

               className="bg-[#8c3226] hover:bg-[#ab4f43] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Delete</h1></div>




              {showdeletepatientprofiledialog && (
                         <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

                           <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
    

                              <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Patient Profile</h1></div>
                              <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                  <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this patient profile?</p>
                                  {selectedpatientprofile && ( <>
                                           <p className="text-[16px]">Patient Name: {selectedpatientprofile.name}</p>
                                            <p className="text-[16px] mt-3">Patient Email: {selectedpatientprofile.email}</p>
                                             </>)}  
                                  </div>        
                                  <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                    <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {setshowdeletepatientprofiledialog(false); setselectedpatientprofile(null);}}><p className=" text-[#ffffff]">Cancel</p></div>
                                    <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={deletepatientprofile}><p className=" text-[#ffffff]">Delete</p></div>
                                  </div>
                              </div>

                           </div>
                         </div>
                      )}
                     
   
                        </div>
                           
   
                         </div>
                       
     
                        </form>
       </div>
     </div>)}





     {showaddpatientpofile && (
       <div id="patientdemographicprofileform" className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[780px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add Patient Profile</h1></div>
                <div onClick={() =>{setshowaddpatientprofile(false); resetpatientprofileformdata();}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

              <form onSubmit={addpatientprofile}>
                         
                         <div className="ml-25 mt-5 flex ">
   
   
                         <div className=" w-60 h-60 ml-10">
                           <img className=" object-cover h-60 w-full rounded-full" src={addpatientprofilepreviewimage || defaultprofilepic}/>
   
                           <input  className="hidden" type="file" onChange={addpatientprofilehandlechange} accept="image/jpeg, image/jpg, image/png" ref={addpatientprofileimageinputref} />
                           <div onClick={addpatientprofilehandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                           
                           {selectedpatientprofile && (<div onClick={addpatientprofilehandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                         </div>
   
                         <div className=" ml-15">

  
                         <div className="form-group flex mb-3">
                             <label className="text-[23px] font-bold text-[#2d2d44]"  htmlFor="patientemail">Patient Email :</label>
                             <div className="flex flex-col">
                             <input className="bg-gray-200 text-[20px] text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-114" onChange={(e) => setdemoformdata({...demoformdata, patientemail: e.target.value.trim()})} value={demoformdata.patientemail} id="patientemail" name="patientemail" required type="email" placeholder="Patient Email"/>
                             <div>
                                     {demopatientcheckemail && (
                                      <p className="text-gray-500 text-sm">Checking Email...</p>
                                     )}

   

                                     {!demopatientcheckemail && (
                                      <>
          
                                      {demopatientemailerror && !demopatientemailexist && (
                                           <p className="text-red-500 text-sm">
                                            Please enter a valid email address
                                           </p>
                                         )}
                            

                                      {demopatientemailexist && (
                                           <p className="text-red-500 text-sm">
                                              A patient profile already exists with this email
                                           </p>
                                          )}

                            
                                      {emailisnotpatienterror && (
                                            <p className="text-red-500 text-sm">
                                               This email belongs to a staff/admin account and cannot be used for patient profiles
                                            </p>
                                           )}
                                      </>
                                     )}

                             </div>
                              </div>
                            
                              </div>


                          <div className=" h-fit form-group  ">
                           <label className="text-[23px]  font-bold  text-[#2d2d44]" htmlFor="patientlastname">Last Name :</label>     
                           <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientlastname} onChange={(e) => setdemoformdata({...demoformdata, patientlastname: e.target.value})} type="text" name="patientlastname" id="patientlastname" placeholder="Patient Last Name..."/></div>
   
                           <div className=" h-fit form-group  mt-5">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientfirstname">First Name :</label>     
                           <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientfirstname} onChange={(e) => setdemoformdata({...demoformdata, patientfirstname: e.target.value})}  type="text" name="patientfirstname" id="patientfirstname" placeholder="Patient First Name..."/></div>
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientmiddlename">Middle Name :</label>     
                           <input className="w-112 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientmiddlename} onChange={(e) => setdemoformdata({...demoformdata, patientmiddlename: e.target.value})}  type="text" name="patientmiddlename" id="patientmiddlename" placeholder="Patient Middle Name.."/></div>
   
   
   
                           <div className=" mt-5 flex items-center">
                           <div className="">
   
                           <div className=" h-fit form-group">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientage">Age :</label>     
                           <input className="w-32 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientage} onChange={(e) => setdemoformdata({...demoformdata, patientage: e.target.value})} type="number" name="patientage" id="patientage" placeholder="Age..."/></div>
   
                               </div>
   
                               <div className="">
                                 
                               <div className=" h-fit form-group ml-15">
                              <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientbirthdate">Birthdate :</label>     
                              <input className="w-38 justify-center border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientbirthdate} onChange={(e) => setdemoformdata({...demoformdata, patientbirthdate: e.target.value})}  type="date" name="patientbirthdate" id="patientbirthdate" placeholder=""/> </div>
   
                               </div>
   
   
                           </div>
   
   
   
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientgender">Gender :</label>     
                           <div className="ml-3"><GenderBoxAdminDash value={demoformdata.patientgender} onChange={(e) => setdemoformdata({...demoformdata, patientgender: e.target.value})} /></div>  </div>
   
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientcontactnumber">Contact Number :</label>     
                           <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientcontactnumber} onChange={(e) => setdemoformdata({...demoformdata, patientcontactnumber: e.target.value})} type="text" name="patientcontactnumber" id="patientcontactnumber" placeholder="Ex: 09xxxxxxxxx"/> </div>
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patienthomeaddress">Home Address :</label>     
                           <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"   value={demoformdata.patienthomeaddress} onChange={(e) => setdemoformdata({...demoformdata, patienthomeaddress: e.target.value})}  type="text" name="patienthomeaddress" id="patienthomeaddress" placeholder="Ex: #001 Sison St., Townsite, Limay, Bataan"/> </div>
   
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactname">Emergency Contact Name :</label>     
                           <input className="w-90 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientemergencycontactname} onChange={(e) => setdemoformdata({...demoformdata,patientemergencycontactname: e.target.value})}  type="text" name="patientemergencycontactname" id="patientemergencycontactname" placeholder="Ex: Juan Dela Cruz"/> </div>
   
                           <div className=" h-fit form-group  mt-5 flex">
                           <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactnumber">Emergency Contact Number :</label>     
                           <input className="w-84 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demoformdata.patientemergencycontactnumber} onChange={(e) => setdemoformdata({...demoformdata, patientemergencycontactnumber: e.target.value})}  type="text" name="patientemergencycontactnumber" id="patientemergencyconctactnumber" placeholder="Ex: 09xxxxxxxxx"/> </div>
   
   
          
                         <div className=" mt-10">
   
                         <button type="submit" disabled={issubmitting} className={`submit-btn mt-12 w-full flex justify-center items-center ${issubmitting? "opacity-75 cursor-not-allowed" : "" }`} style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                            Create Patient Profile
                         </button>
   
                           </div>




   
                        </div>
                           
   
                         </div>
                       
     
                        </form>
       </div>
     </div>)}



 </div>)}



{/*Staff profile Table*/} {/*Staff profile Table*/} {/*Staff profile Table*/} {/*Staff profile Table*/} {/*Staff profile Table*/} {/*Staff profile Table*/} {/*Staff profile Table*/} {/*Staff profile Table*/}              
{ activeprofiletable === 'staffprofiletable' && ( <div id="staffprofiletable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
    </div>)}



{/*Owner profile Table*/} {/*Owner profile Table*/} {/*Owner profile Table*/} {/*Owner profile Table*/} {/*Owner profile Table*/} {/*Owner profile Table*/} {/*Owner profile Table*/}
{ activeprofiletable === 'ownerprofiletable' && ( <div id="ownerprofiletable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
    </div>)}




{/*Admin profile Table*/} {/*Admin profile Table*/} {/*Admin profile Table*/} {/*Admin profile Table*/} {/*Admin profile Table*/} {/*Admin profile Table*/} {/*Admin profile Table*/} {/*Admin profile Table*/}
{ activeprofiletable === 'administratorprofiletable' && ( <div id="administratorprofiletable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
  </div>)}






</div> )}


























 {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/}
 {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/}
 {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/}
 {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/}
 {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/} {/*APPOINTMENT MANAGEMENT*/}
{ activedashboard === 'appointmentmanagement' && (<div id="appointmentmanagement" className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out border-1 bg-white border-gray-200 shadow-lg w-[100%] h-[100%] rounded-2xl" >   

<div className="flex items-center"><i className="bx bxs-calendar text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Appointment Management</h1></div>



{loggedinusertype?.type === "Admin"&& (

  <div className="flex justify-between items-center mt-3 h-[60px]">
  <div onClick={() => showappointmentstable('allappointmentstable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmentstable ==='allappointmentstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmentstable ==='allappointmentstable' ? 'text-white' : ''}`}>All</h1></div>
  <div onClick={() => showappointmentstable('ambherappointmentstable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmentstable ==='ambherappointmentstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmentstable ==='ambherappointmentstable' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
  <div onClick={() => showappointmentstable('bautistaappointmentstable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmentstable ==='bautistaappointmentstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmentstable ==='bautistaappointmentstable' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
  </div>
 )} 
 



{(loggedinusertype?.type === "Owner" || loggedinusertype?.type === "Staff") && loggedinusertype?.clinic === "Bautista Eye Center" && (
  <div className="flex justify-between items-center mt-3 h-[60px]">
  <div onClick={() => showappointmentstable('bautistaappointmentstable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmentstable ==='bautistaappointmentstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmentstable ==='bautistaappointmentstable' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
  </div>
 )}



{(loggedinusertype?.type === "Owner" || loggedinusertype?.type === "Staff") && loggedinusertype?.clinic === "Ambher Optical" && (
  <div className="flex justify-between items-center mt-3 h-[60px]">
  <div onClick={() => showappointmentstable('ambherappointmentstable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmentstable ==='ambherappointmentstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmentstable ==='ambherappointmentstable' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
  </div>
 )} 











{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}
 { activeappointmentstable === 'allappointmentstable' && ( <div id="allappointmentstable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

      <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
      <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
      </div>

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

  ) :(<div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-">
          <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
            <th className="rounded-tl-2xl pb-3 pt-3 pl-2 pr-2 text-center">ID</th> 
            <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Patient</th> 
            <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th> 
            <th className="pb-3 pt-3 pl-2 pr-2  text-center">Ambher Appoinment</th>
            <th className="pb-3 pt-3 pl-2 pr-2  text-center">Bautista Appoinment</th>
            <th className="rounded-tr-2xl pb-3 pt-3 pl-2 pr-2  text-center">Actions</th>
          </tr>
        </thead>


        <tbody className="divide-y divide-gray-200 bg-white">
          {patientappointments.map((appointment) => (
            <tr 
              key={appointment._id}
              className="hover:bg-gray-50 transition-all ease-in-out duration-300 border-b-2"
            >
              <td className="py-3 px-6 text-[#171717] text-[15px] text-center font-albertsans font-medium  ">
                #{appointment.patientappointmentid}
              </td>
              <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
                     <div className="flex  items-center">
                  <img 
                    src={appointment.patientappointmentprofilepicture} 
                    alt="Profile" 
                    className=" rounded-full h-12 mr-3 w-12 object-cover"
                    onError={(e) => {
                      e.target.src = 'default-profile-url';
                    }}
                  />
                  <h1 className="py-3 px-6 text-[#171717] text-[15px] text-center font-albertsans font-medium ">{appointment.patientappointmentfirstname} {appointment.patientappointmentlastname}</h1>
                  </div>
              </td>

              <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
                  <span className="py-3 px-6 text-[#171717] text-[15px]  text-center font-albertsans font-medium ">
                    {new Date(appointment.createdAt).toLocaleDateString('en-US',{
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}  
                  </span>          
              </td>

              <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
                {appointment.patientambherappointmentdate && (
                  <div className="font-albertsans text-[#171717] font-medium flex  justify-center items-center">
                    <span className="font-albertsans text-[#171717] text-[15px] font-medium">{formatappointmatedates(appointment.patientambherappointmentdate)} </span> 
                    <span className="ml-1 font-albertsans text-[#171717] text-[15px] font-medium">({formatappointmenttime(appointment.patientambherappointmenttime)})</span> 
                    <span className={`ml-3 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex
  ${appointment.patientambherappointmentstatus === 'Cancelled' ? 'bg-[#9f6e61] text-[#421a10]':
    appointment.patientambherappointmentstatus === 'Pending' ? 'bg-yellow-100 text-yellow-800':
    appointment.patientambherappointmentstatus === 'Accepted' ? 'bg-[#9edc7a] text-[#2b5910]':
    appointment.patientambherappointmentstatus === 'Completed' ? 'bg-[#74c4ce] text-[#1a5566]':
    'bg-red-100 text-red-800'}`}>{appointment.patientambherappointmentstatus}</span>
                  </div>
                )}
              </td>

              <td className="py-3 px-6 w-auto  text-center font-albertsans text-[#171717] font-medium ">
                {appointment.patientbautistaappointmentdate && (
                  <div className="font-albertsans text-[#171717] font-medium flex justify-center items-center">
                    <span className="font-albertsans text-[15px]  text-[#171717] font-medium">{formatappointmatedates(appointment.patientbautistaappointmentdate)}</span> 
                    <span className="ml-1 font-albertsans  text-[15px] text-[#171717] font-medium">({formatappointmenttime(appointment.patientbautistaappointmenttime)})</span> 
                    
<span className={` ml-3 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex
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
                  className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><h1 className="text-white ">View</h1></div>

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
                                    <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {handledeleteappointment(selectedpatientappointment.patientappointmentid);setdeletepatientappointment(false); }}><p className=" text-[#ffffff]">Delete</p></div>
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

 {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
 {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
                         {viewpatientappointment && selectedpatientappointment && (
                         <div id="viewpatientappointment" className="overflow-y-auto h-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] mt-10  animate-fadeInUp ">
                                 <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                 <Link to=""><div id="patientcard"  className=" flex justify-center items-start mt-5 ml-3 hover:scale-105 hover:cursor-pointer bg-white transition-all duration-300 ease-in-out  rounded-2xl w-[500px] h-[80px]">
                        <div className="w-max mr-3 h-full  rounded-2xl flex justify-center items-center">
                        <img  src={selectedpatientappointment?.patientappointmentprofilepicture || defaultprofilepic}  alt="Profile" className="h-20 w-20 rounded-full object-cover"></img>
                        </div>
                        <div className="bg-white  flex flex-col justify-center items-start pl-2 pr-2 w-[500px] h-full  rounded-3xl">
                          <h1 className="font-albertsans font-bold text-[20px] w-full text-[#2d3744]"> {selectedpatientappointment?.patientappointmentfirstname || ''} {selectedpatientappointment?.patientappointmentlastname || ''}</h1>
                          <p className="text-[15px]  w-full text-[#535354]">{selectedpatientappointment?.patientappointmentemail || ''}</p>
                        </div>
                    </div>
                    </Link> 
                                   <div onClick={() => {setviewpatientappointment(false); setbautistaeyespecialist(''); setambhereyespecialist('');}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                 </div>






                  <div className="mt-10 flex justify-start items-start  w-full rounded-3xl ">
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
    <label className="text-[18px]   font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentcontactlensefitting">Contact Lense Fitting</label>   
    </div>  


  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={selectedpatientappointment.patientambherappointmentotherservice} onChange={(e) => setshowotherpatientambherappointmentotherservice(e.target.checked)}  type="checkbox" name="patientambherappointmentotherservice" id="patientambherappointmentotherservice" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentotherservice">Other</label>   
    </div>  
     
     {selectedpatientappointment.patientambherappointmentotherservice && (
          <div className="mt-3 ml-17">
              <p className="text-[18px]  font-medium font-albertsans  text-[#343436] ">- {selectedpatientappointment.patientambherappointmentotherservicenote}</p>
          </div>
      )}    



    {selectedpatientappointment.patientambherappointmentstatus === "Pending" && (
  <div id="patientambherappointmentpaymentotal" className="mt-7 ml-6 mr-4" >
    <h1 className="font-bold text-[17px] text-[#343436] mb-3">Eye Specialist : </h1>
    <div className=""><AmbhereyespecialistBox value={ambhereyespecialist} onChange={(e) => setambhereyespecialist(e.target.value)} /></div>  

    {ambhereyespecialist && (
    <div onClick={() => handleacceptappointment(selectedpatientappointment.patientambherappointmentid, 'ambher')} className=" bg-[#5f9e1b]  hover:bg-[#55871f] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Accept Ambher Appointment</h1></div>
    )} 
    </div>
  

)}



{selectedpatientappointment.patientambherappointmentstatus === "Accepted" && (
  <div id="patientambherappointmentpaymentotal" className="mt-7 ml-6" >
    <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436]mb-3">Total Payment for Ambher Optical  : </h1>
    <input className="w-full border-b-2 border-gray-600  text-[18px]  font-semibold font-albertsans  text-[#343436]"  value={ambherappointmentpaymentotal} onChange={(e) => setambherappointmentpaymentotal(Number(e.target.value))}  type="number" name="patientambherappointmentpaymentotal" id="patientambherappointmentpaymentotal" placeholder="Total Payment"/>


    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentconsultationremarkssubject">Consultation Subject :</label>  
      <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={ambherappointmentconsultationremarkssubject} onChange={(e) => {setambherappointmentconsultationremarkssubject(e.target.value); adjusttextareaheight();}} placeholder="Specify findings or remarks..."/>
    </div>


    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentconsultationremarks">Consultation Remarks :</label>  
      <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={ambherappointmentconsultationremarks} onChange={(e) => {setambherappointmentconsultationremarks(e.target.value); adjusttextareaheight();}} placeholder="Specify findings or remarks..."/>
    </div>

    


     <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentprescription">Prescription :</label>  
      <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={ambherappointmentprescription} onChange={(e) => {setambherappointmentprescription(e.target.value); adjusttextareaheight();}} placeholder="Specify prescription if available..."/>
    </div>


  {ambherappointmentpaymentotal && ambherappointmentconsultationremarks && (
    <div onClick={() => handleCompleteAppointment(selectedpatientappointment.patientambherappointmentid, 'ambher')}  className=" bg-[#2d91cf]  hover:bg-[#1b6796] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Complete Ambher Appointment</h1></div>
  )}


       </div>
)}



{selectedpatientappointment.patientambherappointmentstatus === "Completed" && (
  <div id="patientambherappointmentpaymentotal" className="mt-15" >


    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentconsultationremarkssubject">Consultation Subject :</label>  
      <p>{selectedpatientappointment.patientambherappointmentconsultationremarkssubject}</p>
    </div>


    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentconsultationremarks">Consultation Remarks :</label>  
      <p>{selectedpatientappointment.patientambherappointmentconsultationremarks}</p>
    </div>

    <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentprescription">Presciption :</label>  
    <p>{selectedpatientappointment.patientambherappointmentprescription}</p>
  </div>
    {selectedpatientappointment.patientambherappointmentrating != 0 && selectedpatientappointment.patientambherappointmentfeedback != "" && (
  <div className="mt-10"> 

  <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436] ">Patient Feedback :</h1>           
  <Stack spacing={1}>
   <Rating size="large" value={selectedpatientappointment.patientambherappointmentrating} readOnly /> 
  </Stack>  
  <p>{selectedpatientappointment.patientambherappointmentfeedback}</p>
 </div>
)} 

  </div>
)}










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

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={selectedpatientappointment.patientbautistaappointmentotherservice}  type="checkbox" name="patientbautistaappointmentotherservice" id="patientbautistaappointmentotherservice" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentotherservice">Other</label>   
    </div>  
     

     {selectedpatientappointment.patientbautistaappointmentotherservice && (
          <div className="mt-3 ml-17">
              <p className="text-[18px]  font-medium font-albertsans  text-[#343436] ">- {selectedpatientappointment.patientbautistaappointmentotherservicenote}</p>
          </div>
      )}    






    {selectedpatientappointment.patientbautistaappointmentstatus === "Pending" && (
  <div id="patientbautistaappointmentpaymentotal" className="mt-7 ml-6" >
    <h1 className="font-bold text-[17px] text-[#343436] mb-3">Eye Specialist : </h1>
    <div className=""><BautistaeyespecialistBox value={bautistaeyespecialist} onChange={(e) => setbautistaeyespecialist(e.target.value)}/></div>
   {bautistaeyespecialist && (
    <div onClick={() => handleacceptappointment(selectedpatientappointment.patientbautistaappointmentid, 'bautista')} className=" bg-[#5f9e1b]  hover:bg-[#55871f] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Accept Bautista Appointment</h1></div>
   )}
       </div>
)}



{selectedpatientappointment.patientbautistaappointmentstatus === "Accepted" && (
  <div id="patientbautistaappointmentpaymentotal" className="mt-7 ml-6" >
    <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436]mb-3">Total Payment for Bautista Eye Center  : </h1>
    <input className="w-full border-b-2 border-gray-600  text-[18px]  font-semibold font-albertsans  text-[#343436]"  value={bautistaappointmentpaymentotal} onChange={(e) => setbautistaappointmentpaymentotal(Number(e.target.value))}  type="number" name="patientbautistaappointmentpaymentotal" id="patientbautistaappointmentpaymentotal" placeholder="Total Payment"/>

    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentconsultationremarkssubject">Consultation Subject :</label>  
      <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={bautistaappointmentconsultationremarkssubject} onChange={(e) => {setbautistaappointmentconsultationremarkssubject(e.target.value); adjusttextareaheight();}} placeholder="Specify consultation subject..."/>
    </div>

    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentconsultationremarks">Consultation Remarks :</label>  
      <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={bautistaappointmentconsultationremarks} onChange={(e) => {setbautistaappointmentconsultationremarks(e.target.value); adjusttextareaheight();}} placeholder="Specify findings or remarks..."/>
    </div>



    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentprescription">Prescription :</label>  
      <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={bautistaappointmentprescription} onChange={(e) => {setbautistaappointmentprescription(e.target.value); adjusttextareaheight();}} placeholder="Specify prescription if available..."/>
    </div>


  {bautistaappointmentpaymentotal && bautistaappointmentconsultationremarks && (
    <div onClick={() => handleCompleteAppointment(selectedpatientappointment.patientbautistaappointmentid, 'bautista')}  className=" bg-[#2d91cf]  hover:bg-[#1b6796] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Complete Bautista Appointment</h1></div>
  )}

       </div>
)}


{selectedpatientappointment.patientbautistaappointmentstatus === "Completed" && (
  <div id="patientbautistaappointmentpaymentotal" className="mt-15" >


    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentconsultationremarkssubject">Consultation Subject :</label>  
      <p>{selectedpatientappointment.patientbautistaappointmentconsultationremarkssubject}</p>
    </div>

    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentconsultationremarks">Consultation Remarks :</label>  
      <p>{selectedpatientappointment.patientbautistaappointmentconsultationremarks}</p>
    </div>


      <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentprescription">Presciption :</label>  
    <p>{selectedpatientappointment.patientbautistaappointmentprescription}</p>
  </div>



    {selectedpatientappointment.patientbautistaappointmentrating != 0 && selectedpatientappointment.patientbautistaappointmentfeedback != "" && (
    <div className="mt-10"> 
  
    <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436] ">Patient Feedback :</h1>           
    <Stack spacing={1}>
     <Rating size="large" value={selectedpatientappointment.patientbautistaappointmentrating} readOnly /> 
    </Stack>  
    <p>{selectedpatientappointment.patientbautistaappointmentfeedback}</p>
   </div>
  )} 


  </div>
)}








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






<div className="w-full mt-5 p-3 flex flex-col mb-7 bg-[#e5e7eb] rounded-2xl  ">
                          <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientadditionalappointmentnotes">Patient Appointment Notes :</label>  

                           <div>{selectedpatientappointment.patientadditionalappointmentnotes ||"No additional notes"}</div>
                                                 <div className=" w-fit h-fit mt-5 mb-5">
                                                 <img className=" object-cover  rounded-2xl" src={selectedpatientappointment.patientadditionalappointmentnotesimage || defaultimageplaceholder}/>                 
                                                 </div>
                          </div>
                           </div>

                         </div>
                      )}


 </div> )}



















{/*Ambher Appointments Table*/}{/*Ambher Appointments Table*/}{/*Ambher Appointments Table*/}{/*Ambher Appointments Table*/}{/*Ambher Appointments Table*/}{/*Ambher Appointments Table*/}{/*Ambher Appointments Table*/}
{ activeappointmentstable === 'ambherappointmentstable' && ( <div id="ambherappointmentstable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

<div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
    <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
    </div>

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

) :(<div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
          <th className="rounded-tl-2xl pb-3 pt-3 pl-2 pr-2 text-center">ID</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Patient</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th> 
          <th className="pb-3 pt-3 pl-2 pr-2  text-center">Ambher Appoinment</th>

  
          <th className="rounded-tr-2xl pb-3 pt-3 pl-2 pr-2  text-center">Actions</th>
        </tr>
      </thead>


      <tbody className="divide-y divide-gray-200 bg-white">
    
      {patientappointments.filter(appointment =>{
        if(activeappointmentstable === 'ambherappointmentstable'){
          return appointment.patientambherappointmentdate !== "" &&
                 appointment.patientambherappointmenttime !== "" &&
                 appointment.patientambherappointmentid !== null;
        }
        return true;
         }).map((appointment) => (
          <tr 
            key={appointment._id}
            className="hover:bg-gray-50 transition-all ease-in-out duration-300 border-b-2"
          >
            <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
              #{appointment.patientappointmentid}
            </td>
            <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
                   <div className="flex  items-center">
                <img 
                  src={appointment.patientappointmentprofilepicture} 
                  alt="Profile" 
                  className=" rounded-full h-12 mr-3 w-12 object-cover"
                  onError={(e) => {
                    e.target.src = 'default-profile-url';
                  }}
                />
                <h1 className="font-albertsans text-[#171717]font-medium ">{appointment.patientappointmentfirstname} {appointment.patientappointmentlastname}</h1>
                </div>
            </td>

            <td className="py-3 px-6  text-center font-albertsans text-[#171717] font-medium ">
                <span className="font-albertsans text-[#171717]font-medium">
                  {new Date(appointment.createdAt).toLocaleDateString('en-US',{
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}  
                </span>          
            </td>

            <td className="">
              {appointment.patientambherappointmentdate && (
                <div className=" font-albertsans text-[#171717] font-medium flex  justify-center items-center">
                  <span className="font-albertsans text-[#171717]font-medium">{formatappointmatedates(appointment.patientambherappointmentdate)} </span> 
                  <span className="ml-1 font-albertsans text-[#171717]font-medium">({formatappointmenttime(appointment.patientambherappointmenttime)})</span> 
                  <span className={`ml-3 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex
${appointment.patientambherappointmentstatus === 'Cancelled' ? 'bg-[#9f6e61] text-[#421a10]':
  appointment.patientambherappointmentstatus === 'Pending' ? 'bg-yellow-100 text-yellow-800':
  appointment.patientambherappointmentstatus === 'Accepted' ? 'bg-[#9edc7a] text-[#2b5910]':
  appointment.patientambherappointmentstatus === 'Completed' ? 'bg-[#74c4ce] text-[#1a5566]':
  'bg-red-100 text-red-800'}`}>{appointment.patientambherappointmentstatus}</span>
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
                                          <p className="text-[18px] mt-3">Appointment Id: {selectedpatientappointment.patientambherappointmentid}</p> </>)}  
                                </div>        
                                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setdeletepatientappointment(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                  <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {handledeleteappointmentbyclinic(selectedpatientappointment.patientambherappointmentid, 'ambher');setdeletepatientappointment(false); }}><p className=" text-[#ffffff]">Delete</p></div>
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



{/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
{/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
                       {viewpatientappointment && selectedpatientappointment && (
                       <div id="viewpatientappointment" className="overflow-y-auto h-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] mt-10  animate-fadeInUp ">
                               <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                               <Link to=""><div id="patientcard"  className=" flex justify-center items-start mt-5 ml-3 hover:scale-105 hover:cursor-pointer bg-white transition-all duration-300 ease-in-out  rounded-2xl w-[500px] h-[80px]">
                      <div className="w-max mr-3 h-full  rounded-2xl flex justify-center items-center">
                      <img  src={selectedpatientappointment?.patientappointmentprofilepicture || defaultprofilepic}  alt="Profile" className="h-20 w-20 rounded-full object-cover"></img>
                      </div>
                      <div className="bg-white  flex flex-col justify-center items-start pl-2 pr-2 w-[500px] h-full  rounded-3xl">
                        <h1 className="font-albertsans font-bold text-[20px] w-full text-[#2d3744]"> {selectedpatientappointment?.patientappointmentfirstname || ''} {selectedpatientappointment?.patientappointmentlastname || ''}</h1>
                        <p className="text-[15px]  w-full text-[#535354]">{selectedpatientappointment?.patientappointmentemail || ''}</p>
                      </div>
                  </div>
                  </Link> 
                                 <div onClick={() => {setviewpatientappointment(false); setambhereyespecialist('');}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                               </div>






                <div className="mt-10 flex justify-start items-start  w-full rounded-3xl ">
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
  <label className="text-[18px]   font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentcontactlensefitting">Contact Lense Fitting</label>   
  </div>  

  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={selectedpatientappointment.patientambherappointmentotherservice}  type="checkbox" name="patientambherappointmentotherservice" id="patientambherappointmentotherservice" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentotherservice">Other</label>   
    </div>  
     

     {selectedpatientappointment.patientambherappointmentotherservice && (
          <div className="mt-3 ml-17 flex">
               <p className="text-[18px]  font-medium font-albertsans  text-[#343436] ">- {selectedpatientappointment.patientambherappointmentotherservicenote}</p>
          </div>
      )}   


  {selectedpatientappointment.patientambherappointmentstatus === "Pending" && (
<div id="patientambherappointmentpaymentotal" className="mt-7 ml-6 mr-4" >
  <h1 className="font-bold text-[17px] text-[#343436] mb-3">Eye Specialist : </h1>
  <div className=""><AmbhereyespecialistBox value={ambhereyespecialist} onChange={(e) => setambhereyespecialist(e.target.value)} /></div>  

  {ambhereyespecialist && (
  <div onClick={() => handleacceptappointment(selectedpatientappointment.patientambherappointmentid, 'ambher')} className=" bg-[#5f9e1b]  hover:bg-[#55871f] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Accept Ambher Appointment</h1></div>
  )} 
  </div>


)}



{selectedpatientappointment.patientambherappointmentstatus === "Accepted" && (
<div id="patientambherappointmentpaymentotal" className="mt-7 ml-6 " >
  <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436]mb-3">Total Payment for Ambher Optical  : </h1>
  <input className="w-full border-b-2 border-gray-600  text-[18px]  font-semibold font-albertsans  text-[#343436]"  value={ambherappointmentpaymentotal} onChange={(e) => setambherappointmentpaymentotal(Number(e.target.value))}  type="number" name="patientambherappointmentpaymentotal" id="patientambherappointmentpaymentotal" placeholder="Total Payment"/>



  <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentconsultationremarkssubject">Consultation Subject :</label>  
    <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={ambherappointmentconsultationremarkssubject} onChange={(e) => {setambherappointmentconsultationremarkssubject(e.target.value); adjusttextareaheight();}} placeholder="Specify findings or remarks..."/>
  </div>

  <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentconsultationremarks">Consultation Remarks :</label>  
    <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={ambherappointmentconsultationremarks} onChange={(e) => {setambherappointmentconsultationremarks(e.target.value); adjusttextareaheight();}} placeholder="Specify findings or remarks..."/>
  </div>

          
    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentprescription">Prescription :</label>  
      <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={ambherappointmentprescription} onChange={(e) => {setambherappointmentprescription(e.target.value); adjusttextareaheight();}} placeholder="Specify prescription if available..."/>
    </div>


{ambherappointmentpaymentotal && ambherappointmentconsultationremarks && (
  <div onClick={() => handleCompleteAppointment(selectedpatientappointment.patientambherappointmentid, 'ambher')}  className=" bg-[#2d91cf]  hover:bg-[#1b6796] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Complete Ambher Appointment</h1></div>
)}


     </div>
)}



{selectedpatientappointment.patientambherappointmentstatus === "Completed" && (
<div id="patientambherappointmentpaymentotal" className="mt-15" >


  <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentconsultationremarkssubject">Consultation Subject :</label>  
    <p>{selectedpatientappointment.patientambherappointmentconsultationremarkssubject}</p>
  </div>

  <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentconsultationremarks">Consultation Remarks :</label>  
    <p>{selectedpatientappointment.patientambherappointmentconsultationremarks}</p>
  </div>

    <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentprescription">Presciption :</label>  
    <p>{selectedpatientappointment.patientambherappointmentprescription}</p>
  </div>


  {selectedpatientappointment.patientambherappointmentrating != 0 && selectedpatientappointment.patientambherappointmentfeedback != "" && (
<div className="mt-10"> 

<h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436] ">Patient Feedback :</h1>           
<Stack spacing={1}>
 <Rating size="large" value={selectedpatientappointment.patientambherappointmentrating} readOnly /> 
</Stack>  
<p>{selectedpatientappointment.patientambherappointmentfeedback}</p>
</div>
)} 

</div>
)}



</div>

</div>
)}



</div>


<div className="w-full mt-5 p-3 flex flex-col mb-7 bg-[#e5e7eb] rounded-2xl  ">
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientadditionalappointmentnotes">Patient Appointment Notes :</label>  

                         <div>{selectedpatientappointment.patientadditionalappointmentnotes ||"No additional notes"}</div>
                                               <div className=" w-fit h-fit mt-5 mb-5">
                                               <img className=" object-cover  rounded-2xl" src={selectedpatientappointment.patientadditionalappointmentnotesimage || defaultimageplaceholder}/>                 
                                               </div>
                        </div>
                         </div>

                       </div>
                    )}


</div>)}







{/*Bautista Appointments Table*/}{/*Bautista Appointments Table*/}{/*Bautista Appointments Table*/}{/*Bautista Appointments Table*/}{/*Bautista Appointments Table*/}{/*Bautista Appointments Table*/}
 { activeappointmentstable === 'bautistaappointmentstable' && ( <div id="bautistaappointmentstable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
  <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
    <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
    </div>

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

) :(<div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
          <th className="rounded-tl-2xl pb-3 pt-3 pl-2 pr-2 text-center">ID</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Patient</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th> 
          <th className="pb-3 pt-3 pl-2 pr-2  text-center">Bautista Appoinment</th>
          <th className="rounded-tr-2xl pb-3 pt-3 pl-2 pr-2  text-center">Actions</th>
        </tr>
      </thead>


      <tbody className="divide-y divide-gray-200 bg-white">
      {patientappointments.filter(appointment =>{
        if(activeappointmentstable === 'bautistaappointmentstable'){
          return appointment.patientbautistaappointmentdate !== "" &&
                 appointment.patientbautistaappointmenttime !== "" &&
                 appointment.patientbautistaappointmentid !== null;
        }
        return true;
         }).map((appointment) => (
          <tr 
            key={appointment._id}
            className="hover:bg-gray-50 transition-all ease-in-out duration-300 border-b-2"
          >
            <td className="py-3 px-6  text-center font-albertsans text-[#171717]font-medium ">
              #{appointment.patientappointmentid}
            </td>
            <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
                   <div className="flex  items-center">
                <img 
                  src={appointment.patientappointmentprofilepicture} 
                  alt="Profile" 
                  className=" rounded-full h-12 mr-3 w-12 object-cover"
                  onError={(e) => {
                    e.target.src = 'default-profile-url';
                  }}
                />
                <h1 className="font-albertsans text-[#171717]font-medium">{appointment.patientappointmentfirstname} {appointment.patientappointmentlastname}</h1>
                </div>
            </td>

            <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
                <span className="font-albertsans text-[#171717]font-medium">
                  {new Date(appointment.createdAt).toLocaleDateString('en-US',{
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}  
                </span>          
            </td>



            <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
              {appointment.patientbautistaappointmentdate && (
                <div className="font-albertsans text-[#171717] font-medium flex justify-center items-center">
                  <span className="font-albertsans text-[#171717] font-medium">{formatappointmatedates(appointment.patientbautistaappointmentdate)}</span> 
                  <span className="ml-1 font-albertsans text-[#171717] font-medium">({formatappointmenttime(appointment.patientbautistaappointmenttime)})</span> 
                  
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
                                          <p className="text-[18px] mt-3">Appointment Id: {selectedpatientappointment.patientbautistaappointmentid}</p> </>)}  
                                </div>        
                                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setdeletepatientappointment(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                  <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {handledeleteappointmentbyclinic(selectedpatientappointment.patientbautistaappointmentid, 'bautista') ;setdeletepatientappointment(false); }}><p className=" text-[#ffffff]">Delete</p></div>
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

{/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
{/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
                       {viewpatientappointment && selectedpatientappointment && (
                       <div id="viewpatientappointment" className="overflow-y-auto h-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] mt-10  animate-fadeInUp ">
                               <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                               <Link to=""><div id="patientcard"  className=" flex justify-center items-start mt-5 ml-3 hover:scale-105 hover:cursor-pointer bg-white transition-all duration-300 ease-in-out  rounded-2xl w-[500px] h-[80px]">
                      <div className="w-max mr-3 h-full  rounded-2xl flex justify-center items-center">
                      <img  src={selectedpatientappointment?.patientappointmentprofilepicture || defaultprofilepic}  alt="Profile" className="h-20 w-20 rounded-full object-cover"></img>
                      </div>
                      <div className="bg-white  flex flex-col justify-center items-start pl-2 pr-2 w-[500px] h-full  rounded-3xl">
                        <h1 className="font-albertsans font-bold text-[20px] w-full text-[#2d3744]"> {selectedpatientappointment?.patientappointmentfirstname || ''} {selectedpatientappointment?.patientappointmentlastname || ''}</h1>
                        <p className="text-[15px]  w-full text-[#535354]">{selectedpatientappointment?.patientappointmentemail || ''}</p>
                      </div>
                  </div>
                  </Link> 
                                 <div onClick={() => {setviewpatientappointment(false); setbautistaeyespecialist('');}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                               </div>






                <div className="mt-10 flex justify-start items-start  w-full rounded-3xl ">








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


  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={selectedpatientappointment.patientbautistaappointmentotherservice} onChange={(e) => setshowotherpatientbautistaappointmentotherservice(e.target.checked)}  type="checkbox" name="patientbautistaappointmentotherservice" id="patientbautistaappointmentotherservice" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentotherservice">Other</label>   
    </div>  
     

     {selectedpatientappointment.patientbautistaappointmentotherservice && (
          <div className="mt-3 ml-17">
              <p className="text-[18px]  font-medium font-albertsans  text-[#343436] ">- {selectedpatientappointment.patientbautistaappointmentotherservicenote}</p>
          </div>
      )}    



  {selectedpatientappointment.patientbautistaappointmentstatus === "Pending" && (
<div id="patientbautistaappointmentpaymentotal" className="mt-7 ml-6" >
  <h1 className="font-bold text-[17px] text-[#343436] mb-3">Eye Specialist : </h1>
  <div className=""><BautistaeyespecialistBox value={bautistaeyespecialist} onChange={(e) => setbautistaeyespecialist(e.target.value)}/></div>
 {bautistaeyespecialist && (
  <div onClick={() => handleacceptappointment(selectedpatientappointment.patientbautistaappointmentid, 'bautista')} className=" bg-[#5f9e1b]  hover:bg-[#55871f] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Accept Bautista Appointment</h1></div>
 )}
     </div>
)}



{selectedpatientappointment.patientbautistaappointmentstatus === "Accepted" && (
<div id="patientbautistaappointmentpaymentotal" className="mt-7 ml-6" >
  <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436]mb-3">Total Payment for Bautista Eye Center  : </h1>
  <input className="w-full border-b-2 border-gray-600  text-[18px]  font-semibold font-albertsans  text-[#343436]"  value={bautistaappointmentpaymentotal} onChange={(e) => setbautistaappointmentpaymentotal(Number(e.target.value))}  type="number" name="patientbautistaappointmentpaymentotal" id="patientbautistaappointmentpaymentotal" placeholder="Total Payment"/>


  <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentconsultationremarkssubject">Consultation Subject :</label>  
    <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={bautistaappointmentconsultationremarkssubject} onChange={(e) => {setbautistaappointmentconsultationremarkssubject(e.target.value); adjusttextareaheight();}} placeholder="Specify findings or remarks..."/>
  </div>

  <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentconsultationremarks">Consultation Remarks :</label>  
    <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={bautistaappointmentconsultationremarks} onChange={(e) => {setbautistaappointmentconsultationremarks(e.target.value); adjusttextareaheight();}} placeholder="Specify findings or remarks..."/>
  </div>


    <div className="mt-3 w-full flex flex-col">
      <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentprescription">Prescription :</label>  
      <textarea className="w-full text-[18px]  font-semibold font-albertsans  text-[#343436] rounded-md border-2 border-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={bautistaappointmentprescription} onChange={(e) => {setbautistaappointmentprescription(e.target.value); adjusttextareaheight();}} placeholder="Specify prescription if available..."/>
    </div>


{bautistaappointmentpaymentotal && bautistaappointmentconsultationremarks && (
  <div onClick={() => handleCompleteAppointment(selectedpatientappointment.patientbautistaappointmentid, 'bautista')}  className=" bg-[#2d91cf]  hover:bg-[#1b6796] mt-4 h-[50px]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Complete Bautista Appointment</h1></div>
)}

     </div>
)}


{selectedpatientappointment.patientbautistaappointmentstatus === "Completed" && (
<div id="patientbautistaappointmentpaymentotal" className="mt-15" >

  <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentconsultationremarkssubject">Consultation Subject :</label>  
    <p>{selectedpatientappointment.patientbautistaappointmentconsultationremarkssubject}</p>
  </div>

  <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentconsultationremarks">Consultation Remarks :</label>  
    <p>{selectedpatientappointment.patientbautistaappointmentconsultationremarks}</p>
  </div>


    <div className="mt-3 w-full flex flex-col">
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentprescription">Presciption :</label>  
    <p>{selectedpatientappointment.patientbautistaappointmentprescription}</p>
  </div>


  {selectedpatientappointment.patientbautistaappointmentrating != 0 && selectedpatientappointment.patientbautistaappointmentfeedback != "" && (
  <div className="mt-10"> 

  <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436] ">Patient Feedback :</h1>           
  <Stack spacing={1}>
   <Rating size="large" value={selectedpatientappointment.patientbautistaappointmentrating} readOnly /> 
  </Stack>  
  <p>{selectedpatientappointment.patientbautistaappointmentfeedback}</p>
 </div>
)} 


</div>
)}



</div>

</div>
</div>
)}
</div>




<div className="w-full mt-5 p-3 flex flex-col mb-7 bg-[#e5e7eb] rounded-2xl  ">
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientadditionalappointmentnotes">Patient Appointment Notes :</label>  

                         <div>{selectedpatientappointment.patientadditionalappointmentnotes ||"No additional notes"}</div>
                                               <div className=" w-fit h-fit mt-5 mb-5">
                                               <img className=" object-cover  rounded-2xl" src={selectedpatientappointment.patientadditionalappointmentnotesimage || defaultimageplaceholder}/>                 
                                               </div>
                        </div>
                         </div>

                       </div>
                    )}


</div> )}

</div>)}




































              {/*Start of Medical Records*/}{/*Start of Medical Records*/}{/*Start of Medical Records*/}{/*Start of Medical Records*/}{/*Start of Medical Records*/}{/*Start of Medical Records*/}{/*Start of Medical Records*/}
              { activedashboard === 'medicalrecords' && (<div id="medicalrecords" className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out border-1 bg-white border-gray-200 shadow-lg w-[100%] h-[100%] rounded-2xl" >   
                


              <div className="flex items-center"><i className="bx bxs-data text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Medical Records</h1></div>















 { activemedicalrecordstable === 'allmedicalrecordstable' && ( <div id="allmedicalrecordstable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[90%] rounded-2xl mt-5" >

      <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
      <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
      </div>

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

) :(

<div className="overflow-y-auto overflow-hidden rounded-3xl  w-full mt-2 bg-[#f7f7f7] ">
    <table className=" min-w-full divide-y divide-gray-200 ">
      <thead className="bg-">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
          <th className="rounded-tl-2xl pb-3 pt-3 pl-2 pr-2 text-center">ID</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Patient</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Last Ambher Appointment</th> 
          <th className="pb-3 pt-3 pl-2 pr-2  text-center">Last Bautista Appointment</th>

  
          <th className="rounded-tr-2xl pb-3 pt-3 pl-2 pr-2  text-center">Actions</th>
        </tr>
      </thead>


      <tbody className=" divide-y divide-gray-200 bg-white  ">

      {patientdemographics.map((patients) => (
          <tr 
            key={patients._id}
            className="hover:bg-gray-50 transition-all ease-in-out duration-300 border-b-2"
          >
            <td className="py-3 px-6 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
              #{patients.patientdemographicId}
            </td>
            <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
                   <div className="flex  items-center">
                <img 
                  src={patients.patientprofilepicture} 
                  alt="Profile" 
                  className=" rounded-full h-12 mr-3 w-12 object-cover"
                  onError={(e) => {
                    e.target.src = 'default-profile-url';
                  }}
                />
                <h1 className="font-albertsans text-[#171717]  text-center text-[15px] font-medium ">{patients.patientfirstname} {patients.patientlastname}</h1>
                </div>
            </td>

            <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
                {(() => {
                const lastambherappointment = patientappointments
                                                .filter(lastapp => lastapp.patientappointmentemail === patients.patientemail && lastapp.patientambherappointmentdate && lastapp.patientambherappointmentstatus === 'Completed')
                                                .sort((a,b) => new Date(b.patientambherappointmentdate) - new Date(a.patientambherappointmentdate))[0];
                
                return lastambherappointment ? (
                  <div>
                    <p>{formatappointmatedates(lastambherappointment.patientambherappointmentdate)}</p>
                    <p className="text-gray-500 text-[14px]">{formatappointmenttime(lastambherappointment.patientambherappointmenttime)}</p>
                  </div>
                ):(
                  <p className="text-gray-500">No completed appointments</p>
                );
               })()}
            </td>

            <td className="py-3 px-6 text-[#171717] text-center font-albertsans font-medium ">
               {(() => {
                const lastbautistaappointment = patientappointments
                                                .filter(lastapp => lastapp.patientappointmentemail === patients.patientemail && lastapp.patientbautistaappointmentdate  && lastapp.patientbautistaappointmentstatus === 'Completed')
                                                .sort((a,b) => new Date(b.patientbautistaappointmentdate) - new Date(a.patientbautistaappointmentdate))[0];
                
                return lastbautistaappointment ? (
                  <div>
                    <p>{formatappointmatedates(lastbautistaappointment.patientbautistaappointmentdate)}</p>
                    <p className="text-gray-500 text-[14px]">{formatappointmenttime(lastbautistaappointment.patientbautistaappointmenttime)}</p>
                  </div>
                ):(
                  <p className="text-gray-500">No completed appointments</p>
                );
               })()}
            </td>





            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center items-center">
             
            <div onClick={() =>  {setshowpatientmedicalrecord(true);
                                  setselectedpatientmedicalrecord(patients);}} className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><h1 className="text-white">View</h1></div>




                    

            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
)}

 </div> )}




       {showpatientmedicalrecord && (
       <div id="patientdemographicprofileform" className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 pb-5 bg-white rounded-2xl w-[1300px] h-[780px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Patient Medical Record</h1></div>
                <div onClick={() => setshowpatientmedicalrecord(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

              <div className="flex justify-center items-center rounded-2xl h-[670px] w-full">
                <div className=" flex flex-col pt-10 pl-3 items-center h-full w-[35%]  rounded-2xl">
                    <img src={selectedpatientmedicalrecord.patientprofilepicture} className="w-65 h-65 rounded-full"></img>
                     <div className="mt-10  flex  items-center h-auto w-full">
                      <h1 className="  w-[130px] font-albertsans font-semibold italic text-[#3d3d3d] text-[20px]">Name :</h1>
                      <p className=" text-center bg-[#e5e7eb] px-4 rounded-2xl py-1 font-albertsans font-semibold italic text-[#3d3d3d] text-[19px]">{selectedpatientmedicalrecord.patientfirstname}  {selectedpatientmedicalrecord.patientlastname}</p>
                     </div>
                     <div className="mt-3   flex  items-center h-auto w-full">
                      <h1 className=" w-[130px] font-albertsans font-semibold italic text-[#3d3d3d] text-[20px]">Email :</h1>
                      <p className=" text-center  bg-[#e5e7eb] px-4 rounded-2xl py-1 font-albertsans font-semibold italic text-[#3d3d3d] text-[19px]">{selectedpatientmedicalrecord.patientemail}</p>
                     </div>
                      <div className="mt-3   flex  items-center h-auto w-full">
                      <h1 className=" w-[130px] font-albertsans font-semibold italic text-[#3d3d3d] text-[20px]">Contact No :</h1>
                      <p className=" text-center  bg-[#e5e7eb] px-4 rounded-2xl py-1 font-albertsans font-semibold italic text-[#3d3d3d] text-[19px]">{selectedpatientmedicalrecord.patientcontactnumber}</p>
                     </div>
                      <div className="mt-3   flex  items-center h-auto w-full">
                      <h1 className="w-[130px] font-albertsans font-semibold italic text-[#3d3d3d] text-[20px]">Gender :</h1>
                      <p className=" text-center  bg-[#e5e7eb] px-4 rounded-2xl py-1 font-albertsans font-semibold italic text-[#3d3d3d] text-[19px]">{selectedpatientmedicalrecord.patientgender}</p>
                     </div>
                      <div className="mt-3   flex  items-center h-auto w-full">
                      <h1 className=" w-[130px] font-albertsans font-semibold italic text-[#3d3d3d] text-[20px]">Bithdate :</h1>
                      <p className=" text-center  bg-[#e5e7eb] px-4 rounded-2xl py-1 font-albertsans font-semibold italic text-[#3d3d3d] text-[19px]">{formatappointmatedates(selectedpatientmedicalrecord.patientbirthdate)}</p>
                     </div>
                                  
            

                </div>
                <div className="h-full flex flex-col  w-[65%] px-3 rounded-2xl">
                    <div className="flex justify-center items-center mt-3 w-full h-[60px]">
                    <div onClick={() => showpatientmedicalrecordstable('medicalrecordsconsultationtable')}  className={`w-full mr-5 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activepatientmedicalrecordstable ==='medicalrecordsconsultationtable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activepatientmedicalrecordstable ==='medicalrecordsconsultationtable' ? 'text-white' : ''}`}>Consultation</h1></div>
                    <div onClick={() => showpatientmedicalrecordstable('medicalrecordspastvisitstable')}  className={` w-full ml-5 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activepatientmedicalrecordstable ==='medicalrecordspastvisitstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d]   ${activepatientmedicalrecordstable ==='medicalrecordspastvisitstable' ? 'text-white' : ''}`}>Other Clinic Records</h1></div>
                    </div>

               { activepatientmedicalrecordstable === 'medicalrecordsconsultationtable' && (
                <div  id='medicalrecordsconsultationtable'className="border-10 overflow-y-auto p-2 w-full h-full bg-[#e5e7eb] mt-3 rounded-2xl">  

                 {(() => {
                        
                         const completedAppointments = patientappointments
                           .filter(appointment => 
                                   appointment.patientappointmentemail === selectedpatientmedicalrecord.patientemail && 
                                   ((appointment.patientambherappointmentstatus === 'Completed') || 
                                    (appointment.patientbautistaappointmentstatus === 'Completed')))

                           .flatMap(appointment => {
                              const appointments = [];

                              if(appointment.patientambherappointmentstatus === 'Completed'){
                                appointments.push({
                                    ...appointment,
                                    clinicType: 'ambher',
                                    profilepicture: appointment.patientappointmentprofilepicture,
                                    firstname: appointment.patientappointmentfirstname,
                                    middlename: appointment.patientappointmentmiddlename,
                                    lastname: appointment.patientappointmentlastname,
                                    email: appointment.patientappointmentemail,
                                    date: appointment.patientambherappointmentdate,
                                    time: appointment.patientambherappointmenttime,
                                    status: appointment.patientambherappointmentstatus,
                                    eyespecialist: appointment.patientambherappointmenteyespecialist,
                                    consultationremarkssubject: appointment.patientambherappointmentconsultationremarkssubject,
                                    consultationremarks: appointment.patientambherappointmentconsultationremarks,
                                    consultationprescription: appointment.patientambherappointmentprescription
                                });  
                              }


                              if(appointment.patientbautistaappointmentstatus === 'Completed'){
                                appointments.push({
                                    ...appointment,
                                    clinicType: 'bautista',
                                    profilepicture: appointment.patientappointmentprofilepicture,
                                    firstname: appointment.patientappointmentfirstname,
                                    middlename: appointment.patientappointmentmiddlename,
                                    lastname: appointment.patientappointmentlastname,
                                    email: appointment.patientappointmentemail,
                                    date: appointment.patientbautistaappointmentdate,
                                    time: appointment.patientbautistaappointmenttime,
                                    status: appointment.patientbautistaappointmentstatus,
                                    eyespecialist: appointment.patientbautistaappointmenteyespecialist,
                                    consultationremarkssubject: appointment.patientbautistaappointmentconsultationremarkssubject,
                                    consultationremarks: appointment.patientbautistaappointmentconsultationremarks,
                                    consultationprescription: appointment.patientbautistaappointmentprescription
                                });  
                              }

                              return appointments;
                           })
                           .sort((a, b) => {
                              const datea = new Date(a.date);
                              const dateb = new Date(b.date);
                              return dateb - datea;
                           });
                           

                     return completedAppointments.map((appointment, index) => (

                       <div key={index} className="pl-3 mt-3 w-full h-[80px] shadow-sm bg-white rounded-2xl flex justify-between items-center">
                          <div className="px-2 flex justify-center items-center rounded-2xl h-full w-[220px]">
                              <h1 className="font-albertsans truncate w-full font-semibold text-[#134882] text-[18px]">{appointment.consultationremarkssubject}</h1>
                          </div>


                          <div className=" px-2 flex flex-col justify-center items-center rounded-2xl h-full w-[220px]">
                            <h1 className="font-medium truncate w-full">{formatappointmatedates(appointment.date)}</h1> 
                            <h1 className="text-[#4a4a4a] font-sm truncate w-full">{formatappointmenttime(appointment.time)}</h1> 
                          </div>

                          <div className=" px-2 flex justify-center items-center rounded-2xl h-full w-[220px] ">
                            <h1 className="font-medium truncate w-full">{appointment.eyespecialist}</h1>
                          </div>

                            <div className="rounded-2xl h-full w-auto mr-4 flex justify-center items-center "><div onClick={() => {setshowpatientmedicalrecordconsultation(true);setselectedpatientappointment(appointment);}} className="bg-[#383838]  hover:bg-[#595959]   transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><h1 className="text-white ">View</h1></div></div>
                          </div>

                           ));
                           
                    })()}      

   </div>
   )}









      {/*AICODE*/}

               { activepatientmedicalrecordstable === 'medicalrecordspastvisitstable' && (
                <div  id='medicalrecordspastvisitstable'className="  p-2 w-full h-full mt-3 rounded-2xl">  
                   <div onClick={() => setshowpatientaddothermedicalrecord(true)}  className="py-2 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-user-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Record</p></div>
                <div className="border-10 overflow-y-auto p-2 w-full h-[530px] bg-[#e5e7eb] mt-3 rounded-2xl"> 

                       {(() => {
        const filteredRecords = otherclinicrecords
          .filter(record => 
            record.patientotherclinicemail === selectedpatientmedicalrecord.patientemail
          )
          .sort((a, b) => new Date(b.patientotherclinicconsultationdate) - new Date(a.patientotherclinicconsultationdate));

        if (filteredRecords.length === 0) {
          return <div className="text-center text-gray-500 mt-4">No other clinic records found</div>;
        }

        return filteredRecords.map((record, index) => (
          <div key={index} className="pl-3 mt-3 w-full h-[80px] shadow-sm bg-white rounded-2xl flex justify-between items-center">
            <div className="px-2 flex justify-center items-center rounded-2xl h-full w-[220px]">
              <h1 className="font-albertsans truncate w-full font-semibold text-[#134882] text-[18px]">{record.patientotherclinicname}</h1>
            </div>

            <div className="px-2 flex flex-col justify-center items-center rounded-2xl h-full w-[220px]">
              <h1 className="font-medium truncate w-full">{formatappointmatedates(record.patientotherclinicconsultationdate)}</h1>
            </div>

            <div className="px-2 flex justify-center items-center rounded-2xl h-full w-[220px]">
              <h1 className="font-medium truncate w-full">{record.patientothercliniceyespecialist}</h1>
            </div>

            <div className="rounded-2xl h-full w-auto mr-4 flex justify-center items-center">
              <div 
                onClick={() => {
                  setshowotherclinicrecord(true);
                  setselectedpatientappointment({
                    ...record,
                    otherclinicid: record.patientotherclinicrecordid,
                    date: record.patientotherclinicconsultationdate,
                    eyespecialist: record.patientothercliniceyespecialist,
                    clinicname: record.patientotherclinicname,
                    submittedbyfirstname: record.patientotherclinicsubmittedbyfirstname,
                    submittedbymiddlename: record.patientotherclinicsubmittedbymiddlename,
                    submittedbylastname: record.patientotherclinicsubmittedbylastname,
                    patientotherclinicrecordimage: record.patientotherclinicrecordimage
                  });
                }} 
                className="bg-[#383838] hover:bg-[#595959] transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"
              >
                <h1 className="text-white">View</h1>
              </div>

              <div onClick={() =>  {
                  setselectedpatientappointment({
                    ...record,
                    otherclinicid: record.patientotherclinicrecordid,
                    date: record.patientotherclinicconsultationdate,
                    eyespecialist: record.patientothercliniceyespecialist,
                    clinicname: record.patientotherclinicname,
                    submittedbyfirstname: record.patientotherclinicsubmittedbyfirstname,
                    submittedbymiddlename: record.patientotherclinicsubmittedbymiddlename,
                    submittedbylastname: record.patientotherclinicsubmittedbylastname,
                    patientotherclinicrecordimage: record.patientotherclinicrecordimage
                  });
                setshowdeleteotherclinicrecorddialog(true);}}

               className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-3 ml-2 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div>
            </div>
          </div>
        ));
      })()}

                        
                        
                </div>
                 </div>
               )}
            

                 
                </div>
              </div>


       </div>



       
     </div>)}


       {showpatientmedicalrecordconsultation && (
       <div id="patientdemographicprofileformconsultation" className="overflow-y-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="mt-50 mb-30 pl-5 pr-5 pb-5 bg-white rounded-2xl w-[800px] h-max  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">View Consultation</h1></div>
                <div onClick={() => setshowpatientmedicalrecordconsultation(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

                <div className="px-2 pt-5 flex flex-col  h-max w-full rounded-2xl ">
                  <div className="w-full h-auto flex justify-between items-center">
                  <h1 className="font-albertsans font-bold text-[17px] text-[#2b2b2b]"><span className="text-[#333333] text-[19px] font-albertsans font-semibold">{selectedpatientappointment.eyespecialist}</span></h1>
                  <div className="pr-4 flex flex-col justify-center items-center">
                  <h1 className="text-[#333333] text-[17px] font-albertsans font-semibold"> {formatappointmatedates(selectedpatientappointment.date)}</h1>
                  <h1 className="text-[#333333] text-[15px] font-albertsans font-medium"> {formatappointmenttime(selectedpatientappointment.time)}</h1>
                  </div>
                </div>


                    <h1 className="text-[#333333] text-[16px] mt-15 font-albertsans font-semibold">{selectedpatientappointment.consultationremarkssubject}</h1>
                    <h1 className="text-[#333333] text-[15px]  font-albertsans font-medium mt-1"> - {selectedpatientappointment.consultationremarks}</h1>
                  <div className="p-2 w-full h-auto rounded-2xl border-3 mt-3 bg-[#e5e7eb]">

                    <h1 className="text-[#333333] text-[15px] font-albertsans font-bold mt-1">Prescription</h1>
                    <h1 className="break-words min-w-0 text-[#333333] text-[15px] font-albertsans font-medium mt-1"> {selectedpatientappointment.consultationprescription}</h1>
                  </div>

                </div>



       </div>



       
     </div>)}





       {showpatientaddothermedicalrecord && (
       <div id="patientshowpatientaddothermedicalrecord" className="overflow-y-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="mt-30 mb-30 pl-5 pr-5 pb-5 bg-white rounded-2xl w-[800px] h-max  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add Other Clinic Record</h1></div>
                <div onClick={() => setshowpatientaddothermedicalrecord(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

            <form onSubmit={submitotherclinicdata}>
              <div className="px-2 pt-5 flex flex-col justify-center items-center  h-max w-full rounded-2xl ">
                         <div className=" form-group flex justify-center items-center mb-3">
                             <label className=" w-[180px] font-albertsans font-bold italic text-[#3d3d3d] text-[20px]" htmlFor="otherclinicname">Clinic :</label>
                             <div className="flex flex-col ">
                             <input className="bg-gray-200 text-[20px] text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-114" value={otherclinicname} onChange={(e) => setotherclinicname(e.target.value)} id="otherclinicname" name="otherclinicname" required  placeholder="Other clinic name..."/>
                              </div>
                          </div>


                          <div className=" form-group flex justify-center items-center mb-3">
                             <label className=" w-[180px] font-albertsans font-bold italic text-[#3d3d3d] text-[20px]" htmlFor="othercliniceyespecialist">Eye Specialist :</label>
                             <div className="flex flex-col ">
                             <input className="bg-gray-200 text-[20px] text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-114" value={othercliniceyespecialist} onChange={(e) => setothercliniceyespecialist(e.target.value)} id="othercliniceyespecialist" name="othercliniceyespecialist" required  placeholder="Eye specialist name..."/>
                              </div>
                          </div>

                          <div className="form-group flex  items-center mb-3">
                             <label className=" w-[192px] font-albertsans font-bold italic text-[#3d3d3d] text-[20px]"htmlFor="otherclinicconsultationdate">Consulted Date: </label>     
                             <input className=" h-10 w-114 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold" value={otherclinicconsultationdate} onChange={(e) => setotherclinicconsultationdate(e.target.value)} type="date" name="patientambherappointmentdate" id="patientambherappointmentdate" placeholder="" /> </div>
                     


                          <div className="flex flex-col justify center items-center w-fit h-fit mt-5">
                              <img className=" object-cover max-w-150 rounded-2xl" src={otherclinicpreviewimage || defaultimageplaceholder}/>
                                              
                              <input  className="hidden" type="file" onChange={otherclinichandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={otherclinicimageinputref} />
                            {!otherclinicselectedimage && (<div onClick={otherclinichandleuploadclick}  className="w-70 mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                )}                              
                              {otherclinicselectedimage && (
                                <div onClick={otherclinichandleremoveprofile} className="w-70 mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>
                                )}

                          {otherclinicselectedimage && otherclinicname !== "" && othercliniceyespecialist!== "" &&  otherclinicconsultationdate !== "" && (

                       <button type="submit" disabled={otherclinicrecordissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                         {otherclinicrecordissubmitting ? "Submitting..." : "Submit"}
                       </button>
                          )}      
                          </div>
              </div>

</form>


       </div>



       
     </div>)}





    {showotherclinicrecord && (

       <div id="patientshowpatientaddothermedicalrecord" className="overflow-y-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="mt-30 mb-30 pl-5 pr-5 pb-5 bg-white rounded-2xl w-[800px] h-max  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">View Clinic Record</h1></div>
                <div onClick={() => setshowotherclinicrecord(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>

            <form onSubmit={submitotherclinicdata}>
              <div className="px-2 pt-5 flex flex-col justify-center items-center  h-max w-full rounded-2xl ">
                         <div className=" form-group flex justify-center items-center mb-3">
                             <label className=" w-[180px] font-albertsans font-bold italic text-[#3d3d3d] text-[20px]" htmlFor="otherclinicname">Clinic :</label>
                             <div className="flex flex-col ">
                             <input className="bg-gray-200 text-[20px] text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-114" value={selectedpatientappointment.clinicname}  id="otherclinicname" name="otherclinicname" required  placeholder="Other clinic name..."/>
                              </div>
                          </div>


                          <div className=" form-group flex justify-center items-center mb-3">
                             <label className=" w-[180px] font-albertsans font-bold italic text-[#3d3d3d] text-[20px]" htmlFor="othercliniceyespecialist">Eye Specialist :</label>
                             <div className="flex flex-col ">
                             <input className="bg-gray-200 text-[20px] text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-114" value={selectedpatientappointment.eyespecialist} id="othercliniceyespecialist" name="othercliniceyespecialist" required  placeholder="Eye specialist name..."/>
                              </div>
                          </div>

                          <div className="form-group flex  items-center mb-3">
                             <label className=" w-[192px] font-albertsans font-bold italic text-[#3d3d3d] text-[20px]"htmlFor="otherclinicconsultationdate">Consulted Date: </label>     
                             <input className=" h-10 w-114 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold" value={selectedpatientappointment.date} type="date" name="patientambherappointmentdate" id="patientambherappointmentdate" placeholder="" /> </div>
                     


                          <div className="flex flex-col justify center items-center w-fit h-fit mt-5">
                              <img className=" object-cover max-w-150 rounded-2xl" src={selectedpatientappointment.patientotherclinicrecordimage || defaultimageplaceholder}/>
                                              
                              <input  className="hidden" type="file" onChange={otherclinichandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={otherclinicimageinputref} />


  
                          </div>
              </div>

</form>


       </div>



       
     </div>


    )}







     {showdeleteotherclinicrecorddialog && (

                         <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">

                           <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
                           

                              <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Clinic Record</h1></div>
                              <div className="mt-10 flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                  <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this clinic record?</p>
                                  {selectedpatientappointment && ( <>
                                            <p className="text-[16px] mt-5 font-albertsans ">Clinic Name: {selectedpatientappointment.clinicname}</p>
                                            <p className="text-[16px] mt-2 font-albertsans">Eye Specialist: {selectedpatientappointment.eyespecialist}</p>
                                            <p className="text-[16px] mt-2 font-albertsans">Consulted Date: {formatappointmatedates(selectedpatientappointment.date)}</p>
                                            </>)}  
                                  </div>        
                                  <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                    <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => {setshowdeleteotherclinicrecorddialog(false); setselectedpatientaccount(null);}}><p className=" text-[#ffffff]">Cancel</p></div>
                                    <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={deleteotherclinicrecord}><p className=" text-[#ffffff]">Delete</p></div>
                                  </div>
                              </div>

                           </div>
                         </div>
              
     )}

                
              </div> )}
              {/*End of Medical Records*/}{/*End of Medical Records*/}{/*End of Medical Records*/}{/*End of Medical Records*/}{/*End of Medical Records*/}{/*End of Medical Records*/}{/*End of Medical Records*/}
              
              
              




































































              {/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}
              {/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}
              {/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}
              {/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}
              {/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}{/*Start of Inventory Management*/}

              { activedashboard === 'inventorymanagement' && ( <div id="inventorymanagement" className="pl-5 pr-5 pb-26 pt-4 transition-all duration-300  ease-in-out border-1 bg-white border-gray-200 shadow-lg w-[100%] h-auto rounded-2xl" >   

              <div className="flex items-center"><i className="bx bxs-package text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Inventory Management</h1></div>

  <div className="flex justify-start items-center mt-3 h-[60px]">
 {/*<div onClick={() => showinventorytable('allinventorytable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='allinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='allinventorytable' ? 'text-white' : ''}`}>All</h1></div>*/}
  <div onClick={() => showinventorytable('ambherinventorytable')}  className={`mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='ambherinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='ambherinventorytable' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
  <div onClick={() => showinventorytable('bautistainventorytable')}  className={`ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='bautistainventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='bautistainventorytable' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
  
  
  </div>


          { activeinventorytable === 'allinventorytable' && ( <div id="allinventorytable" className="animate-fadeInUp flex flex-col items-center border-[#909090] w-[100%] h-[90%] rounded-2xl mt-5" >   

          </div>)}
                









          { activeinventorytable === 'ambherinventorytable' && ( <div id="ambherinventorytable" className="p-2  animate-fadeInUp  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >



        {ambherinventoryproductcount.length > 0 && (
        <div className="flexitems-center p-5 w-full h-auto bg-yellow-100 rounded-2xl border-1 border-yellow-600 ">
         <div className="flex items-center">
           <img src={cautionlowstockalert} className="w-8 h-8"></img>
           <h1 className="ml-1 font-albertsans font-semibold text-yellow-900 text-[18px]">Low Stock Alert</h1>
         </div>

         <div className="ml-1">
           <p className="font-semibold text-orange-900 text-[14px]">  {ambherinventoryproductcount.length} Item(s) need attention.</p>
         </div>
         </div>
         )}




         <div className="flex  items-start mt-5">

          <div className="p-3   rounded-2xl w-[20%] h-full  mr-2 overflow-y-auto overflow-x-hidden">
        
          
                <div onClick={() => {setambherinventorycategorynamebox(null); setshowaddambherinventorycategorydialog(true);}}   className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#383838] rounded-3xl flex justify-center items-center px-4 py-2 transition-all duration-300 ease-in-out"><p className="font-semibold font-albertsans text-white text-[18px] ml-2">Manage Categories</p></div>
                <div className="border-b-2 pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

                <div onClick={() => showambherinventorycategory('all')}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activeambherinventorycategorytable ==='all' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeambherinventorycategorytable ==='all' ? 'text-white' : ''}`}>All</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{ambherinventoryproducts.length}</span></div>


                {ambherinventorycategorylist.map(category => {
                  const productcount = ambherinventoryproducts.filter(product =>
                    product.ambherinventoryproductcategory === category.ambherinventorycategoryname).length;
                  return(
                  <div key={category._id} onClick={() => setactiveambherinventorycategorytable(category.ambherinventorycategoryname)}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activeambherinventorycategorytable ===category.ambherinventorycategoryname ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeambherinventorycategorytable ===category.ambherinventorycategoryname ? 'text-white' : 'text-[#5d5d5d]'}`}>{category.ambherinventorycategoryname}</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{productcount}</span></div>
                  )
                })}



            
            {/*<div className=""> <AmbherinventorycategoryBox value={ambherinventorycategorynamebox} loading={loadingambherinventorycategorylist} onChange={(e) => setambherinventorycategorynamebox(e.target.value)} categories={ambherinventorycategorylist}/></div>*/}

          </div>
          <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  h-auto shadow-b-lg ">
              <div className="flex justify-end items-center w-full h-[9%] rounded-2xl mb-2 mt-3"> <div onClick={() => setshowaddambherinventoryproductdialog(true)}  className="w-50 p-2 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx  bx-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Product</p></div> </div>

              <div className=" w-[100%] rounded-2xl h-full flex flex-wrap content-start gap-3 pl-2 pt-2 bg-[#ffffff]">
                

              <div className="flex flex-wrap p-4">
                {ambherloadingproducts ? (
                  <div>Loading Ambher Products...</div> 
                ): ambherinventoryproducts.length === 0 ? (
                  <div>No Products Found...</div> 
                ):(
                  [...filteredproducts]
                  .sort((a, b) => {
                    const aquant = a.ambherinventoryproductquantity || 0;
                    const bquant = b.ambherinventoryproductquantity || 0;
                    return aquant <= 10 ? (bquant <= 10 ? 0 : -1) : 1;
                  }).map((product) => (
              <div key={product.ambherinventoryproductid} onClick={() => {setshowaddambherinventoryproductdialog(true);
                                                                           setselectedambherproduct(product);
                                                                           setcurrentimageindex(0);
                                                                           setambherinventorycategorynamebox(product?.ambherinventoryproductcategory || '');
                                                                           setaddambherinventoryproductname(product?.ambherinventoryproductname || '');
                                                                           setaddambherinventoryproductbrand(product?.ambherinventoryproductbrand || '');
                                                                           setaddambherinventoryproductmodelnumber(product?.ambherinventoryproductmodelnumber || '');
                                                                           setaddambherinventoryproductdescription(product?.ambherinventoryproductdescription || '');
                                                                           setaddambherinventoryproductprice(product?.ambherinventoryproductprice || 0);
                                                                           setaddambherinventoryproductquantity(product?.ambherinventoryproductquantity || 0);
                                                                           setaddambherinventoryproductimagepreviewimages(product?.ambherinventoryproductimagepreviewimages || []);
              }} className={`mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl ${product.ambherinventoryproductquantity <=10 ? 'border-2 border-yellow-600' : ''}`}>
                <img src={product.ambherinventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={product.ambherinventoryproductname} className="rounded-tr-2xl  rounded-tl-2xl w-full h-45"/>
                <div className={` mx-1  w-fit rounded-md py-1 px-2  rounded-1xl h-fit  mt-2 break-words min-w-0 ${product.ambherinventoryproductquantity <=10 ? 'bg-yellow-700' : ' bg-[#F0F6FF]'}`}><h1 className={`font-medium   text-[13px] min-w-0 break-words ${product.ambherinventoryproductquantity <=10 ? 'text-white' : 'text-[#0d0d0d]'}`}>{product.ambherinventoryproductcategory}</h1></div>
                <div className="w-full h-auto ml-2 mt-2 "><h1 className={` font-semibold  text-[15px] min-w-0 break-words ${product.ambherinventoryproductquantity <=10 ? 'text-yellow-600' : 'text-[#0d0d0d]'}`}>{product.ambherinventoryproductname}</h1></div>
                <div className="w-fit h-auto ml-2 mt-1 "><h1 className={`font-albertsans font-bold text-[18px] min-w-0 break-words ${product.ambherinventoryproductquantity <=10 ? 'text-yellow-600' : 'text-[#0d0d0d]'}`}>₱ {product.ambherinventoryproductprice?.toLocaleString()}</h1></div>
                <div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className={`font-albertsans font-medium  text-[15px] min-w-0 break-words ${product.ambherinventoryproductquantity <=10 ? 'text-yellow-600' : 'text-[#4e4f4f]'}`}>In Stock: {product.ambherinventoryproductquantity}     {product.ambherinventoryproductquantity <= 10 && '(Low)'} </h1></div>
              </div>
                  ))
                )}
              </div>

              
              

              </div>
          </div>
        </div>
          </div>)}








        {/*Ambher Inventory Category*/}
          {showaddambherinventorycategorydialog && (

       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Category Management</h1></div>
                <div onClick={() => setshowaddambherinventorycategorydialog(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>
          
              <div className="flex flex-col justify-center items-center h-[84%] rounded-2xl w-full">
                <div className=" h-[10%] mb-2 mt-2 w-full rounded-2xl flex justify-end items-center">
                      <div onClick={() => setshowaddambheraddinventorycategory(true)}  className="py-2 w-[200px] mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-categories text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Category</p></div>

                </div>
                <div  className="p-2  animate-fadeInUp flex  items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
<div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
    {ambherinventorycategorylist.length === 0 ? (
        <div className="bg-yellow-100 w-full py-3 rounded-tl-2xl rounded-tr-2xl flex justify-center items-center"><h1 className="text-yellow-900 font-albertsans font-medium ">No Ambher Optical Inventory Categories</h1></div>
  ):(
   <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
          <th className="rounded-tl-2xl pb-3 pt-3 pl-2 pr-2 text-center">Category</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Created By</th> 
          <th className="pb-3 pt-3 pl-2 pr-2  text-center">Date Created</th>

  
          <th className="rounded-tr-2xl pb-3 pt-3 pl-2 pr-2  text-center">Actions</th>
        </tr>
      </thead>




      <tbody className="divide-y divide-gray-200 bg-white">
  {loadingambherinventorycategorylist ? (
    <tr>

        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

    </tr>
  ): (
    ambherinventorycategorylist.map((category) => (

      <tr 
        key={category._id}
        className="hover:bg-gray-50 transition-all ease-in-out duration-300 border-b-2"
      >

        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          {category.ambherinventorycategoryname}
        </td>
        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          <div className="flex items-center justify-center">
            <img 
              src={category.ambherinventorycategoryaddedbyprofilepicture || 'default-profile.png'}
              alt="Profile" 
              className="rounded-full h-12 w-12 object-cover mr-3"
              onError={(e) => {
                e.target.src = 'default-profile.png';
              }}
            />
            <div>
              <p className="font-medium">
                {category.ambherinventorycategoryaddedbyfirstname} {category.ambherinventorycategoryaddedbylastname}
              </p>
              <p className="text-gray-500 text-sm ">
                {category.ambherinventorycategoryaddedbytype}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          {new Date(category.createdAt).toLocaleDateString()}
        </td>
        <td className="flex justify-center items-center  font-medium px-5 py-4 whitespace-nowrap text-sm  ">


            <div onClick={() => {setshowdeleteambherinventorycategorydialog(true);
                                setselectedambherinventorycategory(category);}} className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div>
        </td>
      </tr>
    ))
  )}
</tbody>
 </table>
  )}
    
    </div>
                </div>
              </div>
          
        
         </div>
       </div>
 


          )}

          {showaddambheraddinventorycategory && (

       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[700px] h-[270px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add Category Name</h1></div>
                <div onClick={() => setshowaddambheraddinventorycategory(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>
        <form onSubmit={submitambherinventorycategory}>
              <div className="flex flex-col justify-center items-center h-[84%] rounded-2xl w-full">
                <div className="  mt-10 h-auto  w-full rounded-2xl flex flex-col  justify-center items-end">
                       <div className="w-full ">
                          <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="lastname">Category Name :</label>
                          <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-120"  value={ambherinventorycategorynameset} onChange={(e) => setambherinventorycategorynameset(e.target.value)} type="text" name="patientlastname" id="patientlastname"  required/></div>
                     
                          {ambherinventorycategorynamecheck && (
                             <div className="mt-1 w-120">
                                      <p className="text-gray-500  font-medium font-albertsans">Checking Category Name...</p>
                             </div>
                          )}
                          
                          {ambherinventorycategorynameexist && (
                             <div className="mt-1 w-120">
                                      <p className="text-red-500 font-medium font-albertsans">Category is already existing...</p>
                             </div>
                          )}


              
                      <button type="submit" disabled={ambherinventorycategoryissubmitting} className="submit-btn mt-2 w-full" style={{ backgroundColor: "#4ca22b", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px", width: "200px"  }}>
                        {ambherinventorycategoryissubmitting ? "Adding..." : "Add"}
                      </button>       
           

                </div>
                <div className=" h-full w-full rounded-2xl"></div>
             
              </div>
      </form>
         </div>
       </div>

          )}

          {showdeleteambherinventorycategorydialog && (
                       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#0000004a] bg-opacity-50">

                         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
               

                            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Inventory Category</h1></div>
                            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this category?</p>
                                {selectedambherinventorycategory && ( <>
                                          <p className="text-[18px] mt-3">Category Name: {selectedambherinventorycategory.ambherinventorycategoryname}</p> </>)}  
                                </div>        
                                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setshowdeleteambherinventorycategorydialog(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                  <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => deleteambherinventorycategory()}><p className=" text-[#ffffff]">Delete</p></div>
                                </div>
                            </div>

                         </div>
                       </div>
          )}

        {/*Ambher Inventory Product*/}
          {showaddambherinventoryproductdialog && (

                         <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="mt-10 pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-auto mb-10 animate-fadeInUp ">
                                <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                  <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">{selectedambherproduct ?  "Edit Product" : "Add Product"}</h1></div>
                                  <div onClick={() => {setshowaddambherinventoryproductdialog(false);  resetaddambherinventoryproductdialog(); }} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>

                          <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" onSubmit={selectedambherproduct ? handleupdateambherinventoryproduct : handlesubmitaddambherinventoryproduct}>
                                <div className="flex justify-center items-start bg-[#fcfcfc] rounded-2xl w-full h-auto">
                                  <div className="pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mt-5">



                                      <div className="h-fit w-fit ">
  
                                <div className="relative">
                                <img  className="w-120 object-cover rounded-2xl h-120" src={(selectedambherproduct?.ambherinventoryproductimagepreviewimages?.[currentimageindex]) || (addambherinventoryproductimagepreviewimages?.[currentimageindex]) || defaultimageplaceholder}/>


                                     {((selectedambherproduct?.ambherinventoryproductimagepreviewimages?.length || 0) > 1 || 
                                       addambherinventoryproductimagepreviewimages?.length > 1) && (
                                         <>
                                           <button type="button" onClick={handlepreviousimage}  className="bg-opacity-50 hover:bg-opacity-75 rounded-full text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-black"><i className="bx bx-chevron-left text-2xl" /></button>

                                           <button type="button" onClick={handlenextimage}  className="rounded-full absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-black hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></button>

                                         </>
                                       )}
                                     </div>
                                      
                                      
                                        {addambherinventoryproductimagepreviewimages.length > 0 && (
                                          <div className="overflow-x-auto flex gap-2 mt-2 ">
                                            {addambherinventoryproductimagepreviewimages.map((preview, index) => (
                                                <div key={index} className="relative">
                                                <img src={preview} className={`rounded-lg cursor-pointer object-cover w-20 h-20 ${currentimageindex === index ? 'ring-2 ring-blue-500' : ''}`} />
                                                <button onClick={() => addambherinventoryproductimagehandleremove(index)}   className="absolute -top-2 -right-2  rounded-full p-1 hover:bg-red-600 bg-red-500 text-white  " > <i className="bx bx-x text-lg" /></button>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      
                                      
                                        <input className="hidden"  multiple type="file" accept="image/jpeg, image/jpg, image/png" ref={addambherinventoryproductimageimageinputref} onChange={addambherinventoryproductimagehandlechange}    />

                                        <div onClick={addambherinventoryproductimagehandleuploadclick} className="hover:cursor-pointer  hover:scale-105 transition-all mt-3 rounded-2xl flex justify-center items-center align-middle p-3 bg-[#0ea0cd]  " ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/>
                                          <p className="text-white font-semibold text-[20px] ">Upload {addambherinventoryproductimagepreviewimages.length}/5 Images</p>

                                        </div>
                                      </div>









                                  </div>

                                  <div className="w-full h-auto flex items-start mb-10 rounded-2xl">
                                        <div className=" w-full h-auto  rounded-4xl">
                                  
                                  
              
                                        <div className="registration-container">
                                     
                                        <h1 className=" font-league text-[#3da9d1] text-[27px] ">Product Details</h1>
                                        {message.text && (
                                          <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                                            {message.text}
                                          </div>
                                        )}
                                  
                                        <h1 className=" font-albertsans font-semibold italic text-[#595968] text-[20px]">Let's add product inventory!</h1>
                                  
                                  
                                  
                                  
                                        <div className="form-group mt-10  flex">
                                        <label className="  font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="ambherinventorycategorynamebox">Category :</label>
                                        <div className="flex flex-col">
                                        <div className="ml-13"> <AmbherinventorycategoryBox  value={ambherinventorycategorynamebox} loading={loadingambherinventorycategorylist} onChange={(e) => setambherinventorycategorynamebox(e.target.value)} categories={ambherinventorycategorylist}/></div>
                                        </div>
                                        </div>
                                  
                                  
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addambherinventoryproductname">Product Name : </label>
                                        <input className="bg-gray-200 text-[18px] text-gray-600 pl-3 rounded-2xl ml-1 h-10 w-70" placeholder="Enter Product Name..." type="text" name="addambherinventoryproductname" id="addambherinventoryproductname" value={addambherinventoryproductname} onChange={(e) => setaddambherinventoryproductname(e.target.value)} required /></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addambherinventoryproductbrand">Product Brand : </label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-1 h-10 w-70" placeholder="Enter Product Brand..." type="text" name="addambherinventoryproductbrand" id="addambherinventoryproductbrand" value={addambherinventoryproductbrand} onChange={(e) => setaddambherinventoryproductbrand(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addambherinventoryproductmodelnumber">Model Number :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Model Number..." type="text" name="addambherinventoryproductmodelnumber" id="addambherinventoryproductmodelnumber" value={addambherinventoryproductmodelnumber} onChange={(e) => setaddambherinventoryproductmodelnumber(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5 flex flex-col">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addambherinventoryproductdescription">Product Description:</label>
                                         <textarea className="w-full text-[18px]  text-gray-600 rounded-md  border-2  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={addambherinventoryproductdescription} onChange={(e) => {setaddambherinventoryproductdescription(e.target.value); adjusttextareaheight();}} placeholder="Product description..."/>
                                        </div>
 
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addambherinventoryproductprice">Price :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Price..." type="number" name="addambherinventoryproductprice" id="addambherinventoryproductprice" value={addambherinventoryproductprice} onChange={(e) => setaddambherinventoryproductprice(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addambherinventoryproductquantity">Quantity :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Quantity..." type="number" name="addambherinventoryproductquantity" id="addambherinventoryproductquantity" value={addambherinventoryproductquantity} onChange={(e) => setaddambherinventoryproductquantity(e.target.value)} required/></div>
                                  

                                        <button type="submit" disabled={ambherinventoryproductissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                                                    {ambherinventoryproductissubmitting 
                                                   ? (selectedambherproduct ? "Updating..." : "Adding...") 
                                                   : (selectedambherproduct ? "Update Product" : "Add Product")}
                                        </button>
                                      {selectedambherproduct && (
                                       <div className="mt-3 w-full hover:cursor-pointer bg-[#4e0f0f] justify-center flex items-center  rounded-2xl h-fit w-fit px-7 py-3  transition-all duration-300 ease-in-out" onClick={() => {setshowdeleteambherproduct(true); setselecteddeleteambherproduct(selectedambherproduct);}}><p className=" text-[#ffffff] font-semibold font-albertsans text-[20px]">Delete</p></div>

                                      )}

                                  
                                  
                                        </div>
                                
                                  
                                  
                                        </div>

                                  </div>
                                </div>
                                </form>
                           </div>
                         </div>
              

          )}



          {showdeleteambherproduct && (
                       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#0000004a] bg-opacity-50">

                         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
               

                            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Ambher Optical Product</h1></div>
                            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this product?</p>
                                {selecteddeleteambherproduct && ( <>
                                          <p className="text-[18px] mt-3">Product Name: {selecteddeleteambherproduct.ambherinventoryproductname}</p> </>)}  
                                </div>        
                                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setshowdeleteambherproduct(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                      {selectedambherproduct && (
                                 <button type="button" onClick={deleteambherproduct}  className="submit-btn w-full" style={{ backgroundColor: "#4e0f0f", fontSize: "20px", color: "white", borderRadius: "20px", width: "120px"}}>
                                    Delete
                                 </button>)} 
            
           
        
            
        
    
                                </div>
                            </div>

                         </div>
                       </div>
          )}

          






























        

       



          { activeinventorytable === 'bautistainventorytable' && ( <div id="bautistainventorytable" className="p-2  animate-fadeInUp  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >


         {bautistainventoryproductcount.length > 0 && (
        <div className="flexitems-center p-5 w-full h-auto bg-yellow-100 rounded-2xl border-1 border-yellow-600 ">
         <div className="flex items-center">
           <img src={cautionlowstockalert} className="w-8 h-8"></img>
           <h1 className="ml-1 font-albertsans font-semibold text-yellow-900 text-[18px]">Low Stock Alert</h1>
         </div>

         <div className="ml-1">
           <p className="font-semibold text-orange-900 text-[14px]">  {bautistainventoryproductcount.length} Item(s) need attention.</p>
         </div>
         </div>
         )}


         <div className="flex  items-start mt-5">
          <div className="p-3 shadow-b-lg  rounded-2xl w-[20%] h-full  mr-2 overflow-y-auto overflow-x-hidden">
        
                <div onClick={() => {setbautistainventorycategorynamebox(null); setshowaddbautistainventorycategorydialog(true);}}   className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#383838] rounded-3xl flex justify-center items-center px-4 py-2 transition-all duration-300 ease-in-out"><p className="font-semibold font-albertsans text-white text-[18px] ml-2">Manage Categories</p></div>
                <div className="border-b-2 pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

                <div onClick={() => showbautistainventorycategory('all')}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ==='all' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistainventorycategorytable ==='all' ? 'text-white' : ''}`}>All</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{bautistainventoryproducts.length}</span></div>


                {bautistainventorycategorylist.map(category => {
                  const productcount = bautistainventoryproducts.filter(product =>
                    product.bautistainventoryproductcategory === category.bautistainventorycategoryname).length;
                  return(
                  <div key={category._id} onClick={() => setactivebautistainventorycategorytable(category.bautistainventorycategoryname)}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ===category.bautistainventorycategoryname ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistainventorycategorytable ===category.bautistainventorycategoryname ? 'text-white' : 'text-[#5d5d5d]'}`}>{category.bautistainventorycategoryname}</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{productcount}</span></div>
                  )
                })}



            
            {/*<div className=""> <AmbherinventorycategoryBox value={bautistainventorycategorynamebox} loading={loadingbautistainventorycategorylist} onChange={(e) => setbautistainventorycategorynamebox(e.target.value)} categories={bautistainventorycategorylist}/></div>*/}

          </div>
          <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  h-auto shadow-b-lg ">
              <div className="flex justify-end items-center w-full h-[9%] rounded-2xl mb-2 mt-3"> <div onClick={() => setshowaddbautistainventoryproductdialog(true)}  className="w-50 p-2 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx  bx-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Product</p></div> </div>

              <div className="overflow-y-auto w-[100%] rounded-2xl h-full flex flex-wrap content-start gap-3 pl-2 pt-2 bg-[#ffffff]">
                

              <div className="flex flex-wrap p-4">
                {bautistaloadingproducts ? (
                  <div>Loading Ambher Products...</div> 
                ): bautistainventoryproducts.length === 0 ? (
                  <div>No Products Found...</div> 
                ):(
                  [...bautistafilteredproducts]
                  .sort((a, b) => {
                    const aquant = a.bautistainventoryproductquantity || 0;
                    const bquant = b.bautistainventoryproductquantity || 0;
                    return aquant <= 10 ? (bquant <= 10 ? 0 : -1) : 1;
                  }).map((product) => (
              <div key={product.bautistainventoryproductid} onClick={() => {setshowaddbautistainventoryproductdialog(true);
                                                                           setselectedbautistaproduct(product);
                                                                           setbautistacurrentimageindex(0);
                                                                           setbautistainventorycategorynamebox(product?.bautistainventoryproductcategory || '');
                                                                           setaddbautistainventoryproductname(product?.bautistainventoryproductname || '');
                                                                           setaddbautistainventoryproductbrand(product?.bautistainventoryproductbrand || '');
                                                                           setaddbautistainventoryproductmodelnumber(product?.bautistainventoryproductmodelnumber || '');
                                                                           setaddbautistainventoryproductdescription(product?.bautistainventoryproductdescription || '');
                                                                           setaddbautistainventoryproductprice(product?.bautistainventoryproductprice || 0);
                                                                           setaddbautistainventoryproductquantity(product?.bautistainventoryproductquantity || 0);
                                                                           setaddbautistainventoryproductimagepreviewimages(product?.bautistainventoryproductimagepreviewimages || []);
              }} className={`mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl ${product.bautistainventoryproductquantity <=10 ? 'border-2 border-yellow-600' : ''}`}>
                <img src={product.bautistainventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={product.bautistainventoryproductname} className="rounded-tr-2xl  rounded-tl-2xl w-full h-45"/>
                <div className={` mx-1  w-fit rounded-md py-1 px-2  rounded-1xl h-fit  mt-2 break-words min-w-0 ${product.bautistainventoryproductquantity <=10 ? 'bg-yellow-700' : ' bg-[#F0F6FF]'}`}><h1 className={`font-medium   text-[13px] min-w-0 break-words ${product.bautistainventoryproductquantity <=10 ? 'text-white' : 'text-[#0d0d0d]'}`}>{product.bautistainventoryproductcategory}</h1></div>
                <div className="w-full h-auto ml-2 mt-2 "><h1 className={` font-semibold  text-[15px] min-w-0 break-words ${product.bautistainventoryproductquantity <=10 ? 'text-yellow-600' : 'text-[#0d0d0d]'}`}>{product.bautistainventoryproductname}</h1></div>
                <div className="w-fit h-auto ml-2 mt-1 "><h1 className={`font-albertsans font-bold text-[18px] min-w-0 break-words ${product.bautistainventoryproductquantity <=10 ? 'text-yellow-600' : 'text-[#0d0d0d]'}`}>₱ {product.bautistainventoryproductprice?.toLocaleString()}</h1></div>
                <div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className={`font-albertsans font-medium  text-[15px] min-w-0 break-words ${product.bautistainventoryproductquantity <=10 ? 'text-yellow-600' : 'text-[#4e4f4f]'}`}>In Stock: {product.bautistainventoryproductquantity}     {product.bautistainventoryproductquantity <= 10 && '(Low)'} </h1></div>
              </div>
                  ))
                )}
              </div>

              
              

              </div>
          </div>
   </div>

          </div>)}




        {/*Ambher Inventory Category*/}
          {showaddbautistainventorycategorydialog && (

       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Category Management</h1></div>
                <div onClick={() => setshowaddbautistainventorycategorydialog(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>
          
              <div className="flex flex-col justify-center items-center h-[84%] rounded-2xl w-full">
                <div className=" h-[10%] mb-2 mt-2 w-full rounded-2xl flex justify-end items-center">
                      <div onClick={() => setshowaddbautistaaddinventorycategory(true)}  className="py-2 w-[200px] mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-categories text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Category</p></div>

                </div>
                <div  className="p-2  animate-fadeInUp flex  items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
<div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
    {bautistainventorycategorylist.length === 0 ? (
        <div className="bg-yellow-100 w-full py-3 rounded-tl-2xl rounded-tr-2xl flex justify-center items-center"><h1 className="text-yellow-900 font-albertsans font-medium ">No Ambher Optical Inventory Categories</h1></div>
  ):(
   <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
          <th className="rounded-tl-2xl pb-3 pt-3 pl-2 pr-2 text-center">Category</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Created By</th> 
          <th className="pb-3 pt-3 pl-2 pr-2  text-center">Date Created</th>

  
          <th className="rounded-tr-2xl pb-3 pt-3 pl-2 pr-2  text-center">Actions</th>
        </tr>
      </thead>




      <tbody className="divide-y divide-gray-200 bg-white">
  {loadingbautistainventorycategorylist ? (
    <tr>

        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

    </tr>
  ): (
    bautistainventorycategorylist.map((category) => (

      <tr 
        key={category._id}
        className="hover:bg-gray-50 transition-all ease-in-out duration-300 border-b-2"
      >

        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          {category.bautistainventorycategoryname}
        </td>
        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          <div className="flex items-center justify-center">
            <img 
              src={category.bautistainventorycategoryaddedbyprofilepicture || 'default-profile.png'}
              alt="Profile" 
              className="rounded-full h-12 w-12 object-cover mr-3"
              onError={(e) => {
                e.target.src = 'default-profile.png';
              }}
            />
            <div>
              <p className="font-medium">
                {category.bautistainventorycategoryaddedbyfirstname} {category.bautistainventorycategoryaddedbylastname}
              </p>
              <p className="text-gray-500 text-sm ">
                {category.bautistainventorycategoryaddedbytype}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          {new Date(category.createdAt).toLocaleDateString()}
        </td>
        <td className="flex justify-center items-center  font-medium px-5 py-4 whitespace-nowrap text-sm  ">


            <div onClick={() => {setshowdeletebautistainventorycategorydialog(true);
                                setselectedbautistainventorycategory(category);}} className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div>
        </td>
      </tr>
    ))
  )}
</tbody>
 </table>
  )}
    
    </div>
                </div>
              </div>
          
        
         </div>
       </div>
 


          )}

          {showaddbautistaaddinventorycategory && (

       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[700px] h-[270px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add Category Name</h1></div>
                <div onClick={() => setshowaddbautistaaddinventorycategory(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>
        <form onSubmit={submitbautistainventorycategory}>
              <div className="flex flex-col justify-center items-center h-[84%] rounded-2xl w-full">
                <div className="  mt-10 h-auto  w-full rounded-2xl flex flex-col  justify-center items-end">
                       <div className="w-full ">
                          <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="lastname">Category Name :</label>
                          <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-120"  value={bautistainventorycategorynameset} onChange={(e) => setbautistainventorycategorynameset(e.target.value)} type="text" name="patientlastname" id="patientlastname"  required/></div>
                     
                          {bautistainventorycategorynamecheck && (
                             <div className="mt-1 w-120">
                                      <p className="text-gray-500  font-medium font-albertsans">Checking Category Name...</p>
                             </div>
                          )}
                          
                          {bautistainventorycategorynameexist && (
                             <div className="mt-1 w-120">
                                      <p className="text-red-500 font-medium font-albertsans">Category is already existing...</p>
                             </div>
                          )}


              
                      <button type="submit" disabled={bautistainventorycategoryissubmitting} className="submit-btn mt-2 w-full" style={{ backgroundColor: "#4ca22b", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px", width: "200px"  }}>
                        {bautistainventorycategoryissubmitting ? "Adding..." : "Add"}
                      </button>       
           

                </div>
                <div className=" h-full w-full rounded-2xl"></div>
             
              </div>
      </form>
         </div>
       </div>

          )}

          {showdeletebautistainventorycategorydialog && (
                       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#0000004a] bg-opacity-50">

                         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
               

                            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Inventory Category</h1></div>
                            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this category?</p>
                                {selectedbautistainventorycategory && ( <>
                                          <p className="text-[18px] mt-3">Category Name: {selectedbautistainventorycategory.bautistainventorycategoryname}</p> </>)}  
                                </div>        
                                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setshowdeletebautistainventorycategorydialog(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                  <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => deletebautistainventorycategory()}><p className=" text-[#ffffff]">Delete</p></div>
                                </div>
                            </div>

                         </div>
                       </div>
          )}

        {/*Ambher Inventory Product*/}
          {showaddbautistainventoryproductdialog && (

                         <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="mt-10 pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-auto mb-10 animate-fadeInUp ">
                                <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                  <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">{selectedbautistaproduct ?  "Edit Product" : "Add Product"}</h1></div>
                                  <div onClick={() => {setshowaddbautistainventoryproductdialog(false);  resetaddbautistainventoryproductdialog(); }} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>

                          <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" onSubmit={selectedbautistaproduct ? handleupdatebautistainventoryproduct : handlesubmitaddbautistainventoryproduct}>
                                <div className="flex justify-center items-start bg-[#fcfcfc] rounded-2xl w-full h-auto">
                                  <div className="pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mt-5">



                                      <div className="h-fit w-fit ">
  
                                <div className="relative">
                                <img  className="w-120 object-cover rounded-2xl h-120" src={(selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || (addbautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || defaultimageplaceholder}/>


                                     {((selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.length || 0) > 1 || 
                                       addbautistainventoryproductimagepreviewimages?.length > 1) && (
                                         <>
                                           <button type="button" onClick={bautistahandlepreviousimage}  className="bg-opacity-50 hover:bg-opacity-75 rounded-full text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-black"><i className="bx bx-chevron-left text-2xl" /></button>

                                           <button type="button" onClick={bautistahandlenextimage}  className="rounded-full absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-black hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></button>

                                         </>
                                       )}
                                     </div>
                                      
                                      
                                        {addbautistainventoryproductimagepreviewimages.length > 0 && (
                                          <div className="overflow-x-auto flex gap-2 mt-2 ">
                                            {addbautistainventoryproductimagepreviewimages.map((preview, index) => (
                                                <div key={index} className="relative">
                                                <img src={preview} className={`rounded-lg cursor-pointer object-cover w-20 h-20 ${bautistacurrentimageindex === index ? 'ring-2 ring-blue-500' : ''}`} />
                                                <button onClick={() => addbautistainventoryproductimagehandleremove(index)}   className="absolute -top-2 -right-2  rounded-full p-1 hover:bg-red-600 bg-red-500 text-white  " > <i className="bx bx-x text-lg" /></button>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      
                                      
                                        <input className="hidden"  multiple type="file" accept="image/jpeg, image/jpg, image/png" ref={addbautistainventoryproductimageimageinputref} onChange={addbautistainventoryproductimagehandlechange}    />

                                        <div onClick={addbautistainventoryproductimagehandleuploadclick} className="hover:cursor-pointer  hover:scale-105 transition-all mt-3 rounded-2xl flex justify-center items-center align-middle p-3 bg-[#0ea0cd]  " ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/>
                                          <p className="text-white font-semibold text-[20px] ">Upload {addbautistainventoryproductimagepreviewimages.length}/5 Images</p>

                                        </div>
                                      </div>









                                  </div>

                                  <div className="w-full h-auto flex items-start mb-10 rounded-2xl">
                                        <div className=" w-full h-auto  rounded-4xl">
                                  
                                  
              
                                        <div className="registration-container">
                                     
                                        <h1 className=" font-league text-[#3da9d1] text-[27px] ">Product Details</h1>
                                        {message.text && (
                                          <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                                            {message.text}
                                          </div>
                                        )}
                                  
                                        <h1 className=" font-albertsans font-semibold italic text-[#595968] text-[20px]">Let's add product inventory!</h1>
                                  
                                  
                                  
                                  
                                        <div className="form-group mt-10  flex">
                                        <label className="  font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="bautistainventorycategorynamebox">Category :</label>
                                        <div className="flex flex-col">
                                        <div className="ml-13"> <BautistainventorycategoryBox  value={bautistainventorycategorynamebox} loading={loadingbautistainventorycategorylist} onChange={(e) => setbautistainventorycategorynamebox(e.target.value)} categories={bautistainventorycategorylist}/></div>
                                        </div>
                                        </div>
                                  
                                  
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductname">Product Name : </label>
                                        <input className="bg-gray-200 text-[18px] text-gray-600 pl-3 rounded-2xl ml-1 h-10 w-70" placeholder="Enter Product Name..." type="text" name="addbautistainventoryproductname" id="addbautistainventoryproductname" value={addbautistainventoryproductname} onChange={(e) => setaddbautistainventoryproductname(e.target.value)} required /></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductbrand">Product Brand : </label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-1 h-10 w-70" placeholder="Enter Product Brand..." type="text" name="addbautistainventoryproductbrand" id="addbautistainventoryproductbrand" value={addbautistainventoryproductbrand} onChange={(e) => setaddbautistainventoryproductbrand(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductmodelnumber">Model Number :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Model Number..." type="text" name="addbautistainventoryproductmodelnumber" id="addbautistainventoryproductmodelnumber" value={addbautistainventoryproductmodelnumber} onChange={(e) => setaddbautistainventoryproductmodelnumber(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5 flex flex-col">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductdescription">Product Description:</label>
                                         <textarea className="w-full text-[18px]  text-gray-600 rounded-md  border-2  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={addbautistainventoryproductdescription} onChange={(e) => {setaddbautistainventoryproductdescription(e.target.value); adjusttextareaheight();}} placeholder="Product description..."/>
                                        </div>
 
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductprice">Price :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Price..." type="number" name="addbautistainventoryproductprice" id="addbautistainventoryproductprice" value={addbautistainventoryproductprice} onChange={(e) => setaddbautistainventoryproductprice(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductquantity">Quantity :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Quantity..." type="number" name="addbautistainventoryproductquantity" id="addbautistainventoryproductquantity" value={addbautistainventoryproductquantity} onChange={(e) => setaddbautistainventoryproductquantity(e.target.value)} required/></div>
                                  

                                        <button type="submit" disabled={bautistainventoryproductissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                                                    {bautistainventoryproductissubmitting 
                                                   ? (selectedbautistaproduct ? "Updating..." : "Adding...") 
                                                   : (selectedbautistaproduct ? "Update Product" : "Add Product")}
                                        </button>
                                      {selectedbautistaproduct && (
                                       <div className="mt-3 w-full hover:cursor-pointer bg-[#4e0f0f] justify-center flex items-center  rounded-2xl h-fit w-fit px-7 py-3  transition-all duration-300 ease-in-out" onClick={() => {setshowdeletebautistaproduct(true); setselecteddeletebautistaproduct(selectedbautistaproduct);}}><p className=" text-[#ffffff] font-semibold font-albertsans text-[20px]">Delete</p></div>

                                      )}

                                  
                                  
                                        </div>
                                
                                  
                                  
                                        </div>

                                  </div>
                                </div>
                                </form>
                           </div>
                         </div>
              

          )}



          {showdeletebautistaproduct && (
                       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#0000004a] bg-opacity-50">

                         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
               

                            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Bautista Eye Center Product</h1></div>
                            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this product?</p>
                                {selecteddeletebautistaproduct && ( <>
                                          <p className="text-[18px] mt-3">Product Name: {selecteddeletebautistaproduct.bautistainventoryproductname}</p> </>)}  
                                </div>        
                                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setshowdeletebautistaproduct(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                      {selectedbautistaproduct && (
                                 <button type="button" onClick={deletebautistaproduct}  className="submit-btn w-full" style={{ backgroundColor: "#4e0f0f", fontSize: "20px", color: "white", borderRadius: "20px", width: "120px"}}>
                                    Delete
                                 </button>)} 
            
           
        
            
        
    
                                </div>
                            </div>

                         </div>
                       </div>
          )}











              </div> )}

              {/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}
              {/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}
              {/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}
              {/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}
              {/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}{/*End of Inventory Management*/}




























































































              { activedashboard === 'billingsandorders' && ( <div id="billingsandorders" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" > asdas7  </div> )}
              { activedashboard === 'communicationcenter' && ( <div id="communicationcenter" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" > sadasd6  </div> )}
              { activedashboard === 'reportingandanalytics' && ( <div id="reportingandanalytics" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" >  asdasd5 </div> )}
              { activedashboard === 'clinicmanagement' && ( <div id="clinicmanagement" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" > asdsad4  </div> )}
              { activedashboard === 'sytemadministration' && ( <div id="sytemadministration" className=" w-[100%] h-[100%] rounded-2xl p" ></div> )}
              { activedashboard === 'wishlistandproductfeatures' && ( <div id="wishlistandproductfeatures" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" >  sadasd2  </div> )}
              { activedashboard === 'mappingintegration' && ( <div id="mappingintegration" className="border-2 border-red-500 w-[100%] h-[100%] rounded-2xl" >  sadsad1  </div> )}

           </div>
           </div>



            </section>





    </>
   )
  }
        
export default AdminDashboard