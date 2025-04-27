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




function AdminDashboard(){


  
  
  const [adminfirstname, setadminfirstname] = useState('');
  const [adminprofilepicture, setadminprofilepicture] = useState('');


  const [showlogoutbtn, setshowlogoutbtn] = useState(false);
  const showlogout = () => {
    setshowlogoutbtn(!showlogoutbtn);
  }



  
  //Retrieveing Data from useAuth Hook
  const {stafflogout, fetchstaffdetails} = useStaffAuth();
  const {ownerlogout, fetchownerdetails} = useOwnerAuth();
  const {adminlogout, fetchadmindetails} = useAdminAuth();


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
          setadminprofilepicture(data.adminprofilepicture || '');
        }
      }


      else if(currentuserloggedin === "Staff"){
        data = await fetchstaffdetails();
        
        if(data) {
          setadminfirstname(data.stafffirstname || '');
          setadminprofilepicture(data.staffprofilepicture || '');
        }
      }

      else if(currentuserloggedin === "Owner"){
        data = await fetchownerdetails();
        
        if(data) {
          setadminfirstname(data.ownerfirstname || '');
          setadminprofilepicture(data.ownerprofilepicture || '');
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
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Password</th>
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
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">{patient.patientlastname}</td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium max-w-[150px]">{patient.patientfirstname}</td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">{patient.patientmiddlename}</td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
                <a href={`mailto:${patient.patientemail}`} className="text-blue-400 hover:underline">
                  {patient.patientemail}
                </a>

              </td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium "><span title="Password Hidden for Security">{patient.patientpassword.substring(0,6)}...</span></td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
                <span className={`rounded-2xl text-xs px-5 py-4 ${patient.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                  {patient.isVerified ? 'Active' : 'Pending'}
                </span>
              </td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
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
                   password: patient.patientpassword,
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
  
            //Request to server if the email exists in adminaccounts collection
            const adminresponse = await fetch(
              `http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(formdata.patientemail)}`
       
            );
            
          const patientdata = await patientresponse.json();
          const admindata = await adminresponse.json();
          //Save wether email existss in db
          setemailexist(patientdata.exists  ||  admindata.exists); 
          setemailerror(patientdata.exists  ||  admindata.exists);
  
  
  
  
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


      //If response is not ok
      if(!response.ok) {
        const errorresult = await response.json();
        console.error("Account Creation Failed : ", errorresult);
        throw new Error(errorresult.message || "Account Creation Failed");
      }
      //If response is success, it will send data to the api and to the database   
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
            <th className="pb-3 pt-3 pl-2 pr-2  text-center">Password</th>
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
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">{staff.stafflastname}</td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium max-w-[150px]">{staff.stafffirstname}</td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">{staff.staffmiddlename}</td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
                <a href={`mailto:${staff.staffemail}`} className="text-blue-400 hover:underline">
                  {staff.staffemail}
                </a>

              </td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium "><span title="Password Hidden for Security">{staff.staffpassword.substring(0,6)}...</span></td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
                <span className={`rounded-2xl text-xs px-5 py-4 ${staff.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                  {staff.isVerified ? 'Active' : 'Pending'}
                </span>
              </td>
              <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
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
                   password: staff.staffpassword,
                   lastname: staff.stafflastname,
                   firstname: staff.stafffirstname,
                   middlename: staff.staffmiddlename,
                   profilepicture: staff.staffprofilepicture
                   });

                setstaffformdata({
                  role: 'staff',
                  staffemail: staff.staffemail,
                  staffpassword: staff.staffpassword,
                  stafflastname: staff.stafflastname,
                  stafffirstname: staff.stafffirstname,
                  staffmiddlename: staff.staffmiddlename,
                  staffprofilepicture: staff.staffprofilepicture
                });

                setstaffpreviewimage(staff.staffprofilepicture);
                setshowviewstaffdialog(true);}}

               className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-pencil text-white mr-1"/><h1 className="text-white">Edit</h1></div></td>
  
              <td><div onClick={() =>  {
                setselectedstaffaccount({
                   id: staff.staffId,
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
        staffprofilepicture: staffpreviewimage || staffformdata.staffprofilepicture
      };



  //Sends all staff data to the server
      const response = await fetch("http://localhost:3000/api/staffaccounts",{
            method: "POST",
            headers: {
              "Content-Type":"application/json",
              'Authorization': `Bearer ${currentusertoken}`
            },
            body: JSON.stringify(staffaccsubmission)
      });


      //If response is not ok
      if(!response.ok) {
        const errorresult = await response.json();
        console.error("Account Creation Failed : ", errorresult);
        throw new Error(errorresult.message || "Account Creation Failed");
      }
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
              <th className="pb-3 pt-3 pl-2 pr-2 text-center">Password</th>
              <th className="pb-3 pt-3 pl-2 pr-2  text-center">Clinic</th>
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
                <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">{owner.ownerlastname}</td>
                <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium max-w-[150px]">{owner.ownerfirstname}</td>
                <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">{owner.ownermiddlename}</td>
                <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
                  <a href={`mailto:${owner.owneremail}`} className="text-blue-400 hover:underline">
                    {owner.owneremail}
                  </a>
  
                </td>
                <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium "><span title="Password Hidden for Security">{owner.ownerpassword.substring(0,6)}...</span></td>
                <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">{owner.ownerclinic}</td>
                <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
                  <span className={`rounded-2xl text-xs px-5 py-4 ${owner.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                    {owner.isVerified ? 'Active' : 'Pending'}
                  </span>
                </td>
                <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
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
                     password: owner.ownerpassword,
                     lastname: owner.ownerlastname,
                     firstname: owner.ownerfirstname,
                     middlename: owner.ownermiddlename,
                     clinic: owner.ownerclinic,
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
                    ownerprofilepicture: owner.ownerprofilepicture
                  });
  
                  setownerpreviewimage(owner.ownerprofilepicture);
                  setshowviewownerdialog(true);}}
  
                 className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-pencil text-white mr-1"/><h1 className="text-white">Edit</h1></div></td>
    
                <td><div onClick={() =>  {
                  setselectedowneraccount({
                     id: owner.ownerId,
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
          ownerprofilepicture: ownerpreviewimage || ownerformdata.ownerprofilepicture
        };
  
  
  
    //Sends all owner data to the server
        const response = await fetch("http://localhost:3000/api/owneraccounts",{
              method: "POST",
              headers: {
                "Content-Type":"application/json",
                'Authorization': `Bearer ${currentusertoken}`
              },
              body: JSON.stringify(owneraccsubmission)
        });
  
  
        //If response is not ok
        if(!response.ok) {
          const errorresult = await response.json();
          console.error("Account Creation Failed : ", errorresult);
          throw new Error(errorresult.message || "Account Creation Failed");
        }
        //If response is success, it will send data to the api and to the database   
        await response.json();
        setownermessage({text:"Registration Sucessful!",type:"success"});
        
          
           
          //Resets the input forms except the profile picture
          setownerformdata({
            role: 'owner',
            owneremail:'',
            ownerpassword:'',
            ownerlastname:'',
            ownerfirstname:'',
            ownermiddlename:'',
            ownerprofilepicture: ''
          });
  
  
  
          setownerselectedprofile(null);
          setownerpreviewimage(null);
  
  
  
     
      //Error encounter  
        } catch(error) {
          console.error("Error:", error)
          setownermessage({text:"Registration Failed. Try again",type:"error"});
               
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
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Password</th>
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
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">{admin.adminlastname}</td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium max-w-[150px]">{admin.adminfirstname}</td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">{admin.adminmiddlename}</td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
              <a href={`mailto:${admin.adminemail}`} className="text-blue-400 hover:underline">
                {admin.adminemail}
              </a>

            </td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium "><span title="Password Hidden for Security">{admin.adminpassword.substring(0,6)}...</span></td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
              <span className={`rounded-2xl text-xs px-5 py-4 ${admin.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                {admin.isVerified ? 'Active' : 'Pending'}
              </span>
            </td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
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
                 password: admin.adminpassword,
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


    //If response is not ok
    if(!response.ok) {
      const errorresult = await response.json();
      console.error("Account Creation Failed : ", errorresult);
      throw new Error(errorresult.message || "Account Creation Failed");
    }
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
        <section className="h-full bg-gray-100 min-w-[99vw] flex justify-center align-center mt-3"   >

    
        
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

            <h1 className="ml-5 mt-1 font-albertsans font-bold text-[40px] text-[#212134]">Good Day, {adminfirstname}</h1>
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
                      <div className=" rounded-3xl w-full h-[50px] mt-5  flex justify-center items-center">
                      <div className={`border-2 b-[#909090] mr-1 flex justify-center items-center w-[20%] h-full s hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activetodaysappointmentfilter ==='filteralltoday' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activetodayfilter('filteralltoday')} id="filteralltoday"><i className={`bx bx-list-ul text-[#5d5d5d] font-semibold text-[21px] ${activetodaysappointmentfilter ==='filteralltoday' ? 'text-[#fdfdfd]' : ''}`}/><p className={`pb-1 text-[#5d5d5d] ml-2 font-semibold truncate ${activetodaysappointmentfilter ==='filteralltoday' ? 'text-[#fdfdfd]' : ''}`}>All</p></div>
                      <div className={`border-2 b-[#909090] flex justify-center items-center w-[40%] h-full  hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activetodaysappointmentfilter ==='filterambhertoday' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activetodayfilter  ('filterambhertoday')} id="filterambhertoday"><img src={ambherlogo || 'default-profile.png'} alt="Ambher Optical" className="w-8 h-4 "/><p className={`font-semibold pb-1 text-[#5d5d5d] ml-2 truncate ${activetodaysappointmentfilter ==='filterambhertoday' ? 'text-[#fdfdfd]' : ''}`}>Ambher</p></div>
                      <div className={`border-2 b-[#909090] ml-1 flex justify-center items-center w-[40%] h-full  hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activetodaysappointmentfilter ==='filterbautistatoday' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activetodayfilter  ('filterbautistatoday')} id="filterbautistatoday"><img src={bautistalogo || 'default-profile.png'} alt="" className="w-8 h-4 "/><p className={`font-semibold pb-1 text-[#5d5d5d] ml-2 truncate ${activetodaysappointmentfilter ==='filterbautistatoday' ? 'text-[#fdfdfd]' : ''}`}>Bautista</p></div>
                     </div>



                      <div className=" w-full h-auto flex justify-center items-center mt-5"><p className="font-albertsans font-semibold  text-[60px] text-[#5d5d5d] ">10</p></div>

                     
                     <div id="appointmentlist" className="h-auto bg-[rgb(249,249,249)] border-t-2 border-[#909090] rounded-2xl p-2 overflow-y-auto mt-5 transition-all duration-300 ease-in-out ">
          
                       <div className="mb-2 mt-6 flex justify-center items-center transition-all duration-300 h-auto ease-in-out "><div className="flex items-center pl-1 pr-1 h-full w-full "><img src={adminprofilepicture || 'default-profile.png'} alt="Profile" className="h-12 w-12 rounded-full"></img><div className="flex flex-col justify-center  ml-5 w-[250px] overflow-hidden  " id="namecontainer"><h1 className="font-albertsans font-semibold text-[#444444] truncate text-[18px]">Francis Daniel M. Genese</h1><div className="flex items-center"><img src={bautistalogo || 'default-profile.png'} alt="" className="w-8 h-4 "/><p className="pb-1 text-[#1569a9] font-semibold ml-2 truncate">Bautista Eye Center</p></div></div> <div className="ml-auto flex-shrink-0"><p className="w-auto text-[#444444] font-geistsemibold text-[14px]">10:00 A.M.</p></div></div></div>
                       <div className="mb-2 mt-7 flex justify-center items-center transition-all duration-300 h-auto ease-in-out "><div className="flex items-center pl-1 pr-1 h-full w-full "><img src={adminprofilepicture || 'default-profile.png'} alt="Profile" className="h-12 w-12 rounded-full"></img><div className="flex flex-col justify-center  ml-5 w-[250px] overflow-hidden  " id="namecontainer"><h1 className="font-albertsans font-semibold text-[#444444] truncate text-[18px]">Francis Daniel M. Genese</h1><div className="flex items-center"><img src={bautistalogo || 'default-profile.png'} alt="" className="w-8 h-4 "/><p className="pb-1 text-[#1569a9] font-semibold ml-2 truncate">Bautista Eye Center</p></div></div> <div className="ml-auto flex-shrink-0"><p className="w-auto text-[#444444] font-geistsemibold text-[14px]">10:00 A.M.</p></div></div></div>
                       <div className="mb-2 mt-7 flex justify-center items-center transition-all duration-300 h-auto ease-in-out "><div className="flex items-center pl-1 pr-1 h-full w-full "><img src={adminprofilepicture || 'default-profile.png'} alt="Profile" className="h-12 w-12 rounded-full"></img><div className="flex flex-col justify-center  ml-5 w-[250px] overflow-hidden  "><h1 className="font-albertsans font-semibold text-[#444444] truncate text-[18px]">Francis Daniel M. Genese</h1><div className="flex items-center"><img src={ambherlogo || 'default-profile.png'} alt="Ambher Optical" className="w-8 h-4 "/><p className="pb-1 text-[#0d8911] font-semibold ml-2 truncate">Ambher Optical</p></div></div> <div className="ml-auto flex-shrink-0"><p className="w-auto text-[#444444] font-geistsemibold text-[14px]">10:00 A.M.</p></div></div></div>
                       <div className="mb-2 mt-7 flex justify-center items-center transition-all duration-300 h-auto ease-in-out "><div className="flex items-center pl-1 pr-1 h-full w-full "><img src={adminprofilepicture || 'default-profile.png'} alt="Profile" className="h-12 w-12 rounded-full"></img><div className="flex flex-col justify-center  ml-5 w-[250px] overflow-hidden  "><h1 className="font-albertsans font-semibold text-[#444444] truncate text-[18px]">Francis Daniel M. Genese</h1><div className="flex items-center"><img src={ambherlogo || 'default-profile.png'} alt="Ambher Optical" className="w-8 h-4 "/><p className="pb-1 text-[#0d8911] font-semibold ml-2 truncate">Ambher Optical</p></div></div> <div className="ml-auto flex-shrink-0"><p className="w-auto text-[#444444] font-geistsemibold text-[14px]">10:00 A.M.</p></div></div></div>


                      </div>
                    </div>




                  </div>


                  {/* Right */}
                  <div className=" w-[65%] h-[100%] rounded-2xl flex flex-col justify-center items-center ml-2">
                    <div className=" w-full h-[40%] rounded-2xl mb-2 flex justify-center items-center">



                      <div className="pl-5 pr-5 pb-4 pt-4  transition-all duration-300 ease-in-out  shadow-lg w-[55%] mr-2 h-full rounded-2xl bg-[#ffffff]   " id="stockscontainer">
                      <div className="flex items-center"><i className="bx bxs-package text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Stock Inventory</h1></div>
                      <div className=" rounded-3xl w-full h-[50px] mt-5  flex justify-center items-center">
                      <div className={`border-2 b-[#909090] mr-1 flex justify-center items-center w-[20%] h-full s hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activestockfilter ==='filterallstock' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activestockinventoryfilter('filterallstock')} id="filterallstock"><i className={`bx bx-list-ul text-[#5d5d5d] font-semibold text-[21px] ${activestockfilter ==='filterallstock' ? 'text-[#fdfdfd]' : ''}`}/><p className={`pb-1 text-[#5d5d5d] ml-2 font-semibold truncate ${activestockfilter ==='filterallstock' ? 'text-[#fdfdfd]' : ''}`}>All</p></div>
                      <div className={`border-2 b-[#909090] flex justify-center items-center w-[40%] h-full  hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activestockfilter ==='filterambherstock' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activestockinventoryfilter('filterambherstock')} id="filterambherstock"><img src={ambherlogo || 'default-profile.png'} alt="Ambher Optical" className="w-8 h-4 "/><p className={`font-semibold pb-1 text-[#5d5d5d] ml-2 truncate ${activestockfilter ==='filterambherstock' ? 'text-[#fdfdfd]' : ''}`}>Ambher</p></div>
                      <div className={`border-2 b-[#909090] ml-1 flex justify-center items-center w-[40%] h-full  hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activestockfilter ==='filterbautistastock' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activestockinventoryfilter('filterbautistastock')} id="filterbautistastock"><img src={bautistalogo || 'default-profile.png'} alt="" className="w-8 h-4 "/><p className={`font-semibold pb-1 text-[#5d5d5d] ml-2 truncate ${activestockfilter ==='filterbautistastock' ? 'text-[#fdfdfd]' : ''}`}>Bautista</p></div>
                       </div>
                      <div className="mt-7 w-full h-auto flex justify-center items-center "><p className="font-albertsans font-semibold  text-[60px] text-[#5d5d5d] ">10</p></div>
                      </div>






                      <div className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300 ease-in-out  shadow-lg w-[45%] ml-2 h-full rounded-2xl bg-[#ffffff]   " id="unreadmessagescontainer">
                      <div className="flex items-center"><i className="bx bxs-message-dots text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Unread Messages</h1></div>
                      <div className=" rounded-3xl w-full h-[50px] mt-5  flex justify-center items-center">
                      <div className={`border-2 b-[#909090] mr-1 flex justify-center items-center w-[20%] h-full s hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activeunreadfilter ==='filterallunread' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activeunreadmessagesfilter('filterallunread')} id="filteralltoday"><i className={`bx bx-list-ul text-[#5d5d5d] font-semibold text-[21px] ${activeunreadfilter ==='filterallunread' ? 'text-[#fdfdfd]' : ''}`}/><p className={`pb-1 text-[#5d5d5d] ml-2 font-semibold truncate ${activeunreadfilter ==='filterallunread' ? 'text-[#fdfdfd]' : ''}`}>All</p></div>
                      <div className={`border-2 b-[#909090] flex justify-center items-center w-[40%] h-full  hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activeunreadfilter ==='filterambherunread' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activeunreadmessagesfilter  ('filterambherunread')} id="filterambhertoday"><img src={ambherlogo || 'default-profile.png'} alt="Ambher Optical" className="w-8 h-4 "/><p className={`font-semibold pb-1 text-[#5d5d5d] ml-2 truncate ${activeunreadfilter ==='filterambherunread' ? 'text-[#fdfdfd]' : ''}`}>Ambher</p></div>
                      <div className={`border-2 b-[#909090] ml-1 flex justify-center items-center w-[40%] h-full  hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activeunreadfilter ==='filterbautistaunread' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activeunreadmessagesfilter ('filterbautistaunread')} id="filterbautistatoday"><img src={bautistalogo || 'default-profile.png'} alt="" className="w-8 h-4 "/><p className={`font-semibold pb-1 text-[#5d5d5d] ml-2 truncate ${activeunreadfilter ==='filterbautistaunread' ? 'text-[#fdfdfd]' : ''}`}>Bautista</p></div>
                       </div>
                      <div className="mt-7 w-full h-auto flex justify-center items-center "><p className="font-albertsans font-semibold  text-[60px] text-[#5d5d5d] ">10</p></div>
                      </div>





                    </div>

                    
                    <div id="pendingorderscontainer"  className="flex flex-col   h-[60%] bg-[#ffffff]    shadow-lg w-full  rounded-2xl pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out ">

                      <div className="flex items-center"><i className="bx bxs-cart-alt text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Pending Orders</h1></div>


                      <div className=" rounded-3xl w-full h-[50px] mt-5  flex justify-center items-center">
                      <div className={`border-2 b-[#909090] mr-1 flex justify-center items-center w-[20%] h-full s hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activependingordersfilter ==='filterallpending' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activependingfilter('filterallpending')} id="filterallpending"><i className={`bx bx-list-ul text-[#5d5d5d] font-semibold text-[21px] ${activependingordersfilter ==='filterallpending' ? 'text-[#fdfdfd]' : ''}`}/><p className={`pb-1 text-[#5d5d5d] ml-2 font-semibold truncate ${activependingordersfilter ==='filterallpending' ? 'text-[#fdfdfd]' : ''}`}>All</p></div>
                      <div className={`border-2 b-[#909090] flex justify-center items-center w-[40%] h-full  hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activependingordersfilter ==='filterambherpending' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activependingfilter  ('filterambherpending')} id="filterambherpending"><img src={ambherlogo || 'default-profile.png'} alt="Ambher Optical" className="w-8 h-4 "/><p className={`font-semibold pb-1 text-[#5d5d5d] ml-2 truncate ${activependingordersfilter ==='filterambherpending' ? 'text-[#fdfdfd]' : ''}`}>Ambher</p></div>
                      <div className={`border-2 b-[#909090] ml-1 flex justify-center items-center w-[40%] h-full  hover:rounded-2xl  hover:cursor-pointer rounded-3xl transition-all duration-300 ease-in-out ${activependingordersfilter ==='filterbautistapending' ? 'bg-[#2781af] rounded-2xl' : ''}`} onClick={() => activependingfilter  ('filterbautistapending')} id="filterbautistapending"><img src={bautistalogo || 'default-profile.png'} alt="" className="w-8 h-4 "/><p className={`font-semibold pb-1 text-[#5d5d5d] ml-2 truncate ${activependingordersfilter ==='filterbautistapending' ? 'text-[#fdfdfd]' : ''}`}>Bautista</p></div>
                      </div>


                      <div className=" w-full h-auto flex justify-center items-center "><p className="font-albertsans font-semibold  text-[60px] text-[#5d5d5d]">10</p></div>




                      <div id="pendingorderlist" className="h-auto bg-[rgb(249,249,249)] border-t-2 border-[#909090] rounded-2xl p-2 overflow-y-auto mt-1 transition-all duration-300 ease-in-out ">
           
                       <div className="mb-2 mt-7 flex justify-center items-center transition-all duration-300 h-auto ease-in-out "><div className="flex items-center pl-1 pr-1 h-full w-full "><img src={adminprofilepicture || 'default-profile.png'} alt="Profile" className="h-12 w-12 rounded-full"></img><div className="flex flex-col justify-center  ml-5 w-[450px] overflow-hidden  " id="namecontainer"><h1 className="font-albertsans font-semibold text-[#444444] truncate text-[18px]">Francis Daniel M. Genese</h1><div className="flex items-center"><img src={bautistalogo || 'default-profile.png'} alt="" className="w-8 h-4 "/><p className="pb-1 text-[#1569a9] font-semibold ml-2 truncate ">Bautista Eye Center</p></div></div><div className="flex items-center justify-center"><h1 className="font-albertsans font-semibold text-[#444444] truncate text-[18px]">April 20, 2025</h1></div> <div className="ml-auto flex-shrink-0 "><p className="w-auto text-[#16911c] font-geistsemibold text-[18px]">₱ 50,000</p></div></div></div>
                       <div className="mb-2 mt-6 flex justify-center items-center transition-all duration-300 h-auto ease-in-out "><div className="flex items-center pl-1 pr-1 h-full w-full "><img src={adminprofilepicture || 'default-profile.png'} alt="Profile" className="h-12 w-12 rounded-full"></img><div className="flex flex-col justify-center  ml-5 w-[450px] overflow-hidden  " id="namecontainer"><h1 className="font-albertsans font-semibold text-[#444444] truncate text-[18px]">Francis Daniel M. Genese</h1><div className="flex items-center"><img src={bautistalogo || 'default-profile.png'} alt="" className="w-8 h-4 "/><p className="pb-1 text-[#1569a9] font-semibold ml-2 truncate ">Bautista Eye Center</p></div></div><div className="flex items-center justify-center"><h1 className="font-albertsans font-semibold text-[#444444] truncate text-[18px]">April 20, 2025</h1></div> <div className="ml-auto flex-shrink-0 "><p className="w-auto text-[#16911c] font-geistsemibold text-[18px]">₱ 50,000</p></div></div></div>

                    </div>
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
                                  <div onClick={() => setshowaddpatientdialog(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
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

                              <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#cfcfcf]">Delete Patient Account</h1></div>
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
                                                          patientpassword: '',
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
    <div onClick={() => setshowaddstaffdialog(true)}  className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-user-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add staff</p></div>
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
                 <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Edit staff Account</h1></div>
                 <div onClick={() => {setshowviewstaffdialog(false);
                                      setselectededitstaffaccount(null);
                                      setstaffformdata({
                                        role: 'staff',
                                        staffemail: '',
                                        staffpassword: '',
                                        stafflastname: '',
                                        stafffirstname: '',
                                        staffmiddlename: '',
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
                      
                      <div className="form-group mt-5">
                      <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerclinic">Clinic :</label>
                      <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-21 h-10 w-70" placeholder="Enter your clinic ..." type="text" name="ownerclinic" id="ownerclinic" value={ownerformdata.ownerclinic} onChange={ownerhandlechange} required/></div>
        
                     
                   
                      <button type="submit" disabled={ownerissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
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
                                        ownerpassword: '',
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
                                         
                       <div className="form-group mt-5">
                       <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="ownerclinic">Clinic :</label>
                       <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-21   h-10 w-70" placeholder="Enter your clinic..." type="text" name="ownerclinic" id="ownerclinic" value={ownerformdata.ownerclinic} onChange={ownerhandlechange} required/></div>
                                
                                        
                                  
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
                                        adminpassword: '',
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

              { activedashboard === 'profileinformation' && ( <div id="profileinformation" className="border-2 border-violet-500 w-[100%] h-[100%] rounded-2xl" >   </div> )}















              { activedashboard === 'appointmentmanagement' && ( <div id="appointmentmanagement" className="border-2 border-violet-500 w-[100%] h-[100%] rounded-2xl" >   </div> )}
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



            </section>





    </>
   )
  }
        
export default AdminDashboard