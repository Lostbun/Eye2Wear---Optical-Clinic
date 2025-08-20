import React, {useState, useEffect, useRef, useCallback} from "react";
import {Link} from "react-router-dom";
import navlogo from  "../src/assets/images/navlogo.png";

import defaultprofilepic from '../src/assets/images/defaulticon.png';
import ambherlogo from '../src/assets/images/ambherlogo.png';
import bautistalogo from '../src/assets/images/bautistalogo.png';
import darklogo from "../src/assets/images/darklogo.png";
import defaultimageplaceholder from "../src/assets/images/defaultimageplaceholder.png";
import { useAuth } from "./hooks/patientuseAuth";
import useApiService from "./hooks/useApiService";
import useSmartCache from "./hooks/useSmartCache";
import imageCompression from "browser-image-compression";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import profileuser from "../src/assets/images/profile-user.png";
import logout from "../src/assets/images/logout.png";

// Skeleton Loading Components for Appointments
const AppointmentRowSkeleton = () => (
  <tr className="hover:bg-gray-50 transition-all ease-in-out duration-100 border-b-2 animate-pulse">
    {/* Date Created column */}
    <td className="py-3 px-6 text-center">
      <div className="h-5 bg-gray-300 rounded w-24 mx-auto"></div>
    </td>
    
    {/* Ambher Appointment column */}
    <td className="py-3 px-6 text-center">
      <div className="flex justify-center items-center">
        <div className="h-5 bg-gray-300 rounded w-20 mr-1"></div>
        <div className="h-5 bg-gray-300 rounded w-16 mr-3"></div>
        <div className="h-8 bg-gray-200 rounded-full w-20 px-4 py-2"></div>
      </div>
    </td>
    
    {/* Empty column */}
    <td className="py-3 px-6 text-center"></td>
    
    {/* Bautista Appointment column */}
    <td className="py-3 px-6 text-center">
      <div className="flex justify-center items-center">
        <div className="h-5 bg-gray-300 rounded w-20 mr-1"></div>
        <div className="h-5 bg-gray-300 rounded w-16 mr-3"></div>
        <div className="h-8 bg-gray-200 rounded-full w-20 px-4 py-2"></div>
      </div>
    </td>
    
    {/* Actions column */}
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex justify-center items-center">
        <div className="h-9 bg-gray-300 rounded-2xl w-16 mr-2"></div>
        <div className="h-9 bg-gray-300 rounded-2xl w-20"></div>
      </div>
    </td>
  </tr>
);

const AppointmentTableSkeleton = () => (
  <div className="overflow-x-auto rounded-2xl shadow-lg w-full h-full mt-">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th> 
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Ambher Appointment</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center"></th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Bautista Appointment</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {[...Array(5)].map((_, index) => (
          <AppointmentRowSkeleton key={index} />
        ))}
      </tbody>
    </table>
  </div>
);
function PatientDashboard(){

  const apiUrl = import.meta.env.VITE_API_URL;

  




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
 const { 
   fetchPatientAppointments, 
   invalidateAppointmentData 
 } = useApiService();

 // Smart caching with real-time updates for appointments
 const { smartFetch, realtimeUpdates, CACHE_DURATIONS } = useSmartCache();

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






    const [showotherpatientbautistaappointmentotherservice, setshowotherpatientbautistaappointmentotherservice] = useState(false);
    const [patientbautistaappointmentotherservicenote, setpatientbautistaappointmentotherservicenote] = useState("");

    const [showotherpatientambherappointmentotherservice, setshowotherpatientambherappointmentotherservice] = useState(false);
    const [patientambherappointmentotherservicenote, setpatientambherappointmentotherservicenote] = useState("");



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
      patientambherappointmentotherservice: formData.has('patientambherappointmentotherservice'),
      patientambherappointmentotherservicenote: patientambherappointmentotherservicenote || '',
      patientambherappointmentstatus: "Pending",
      patientambherappointmentpaymentotal: 1000,
      patientambherappointmentconsultationremarkssubject: "",
      patientambherappointmentconsultationremarks:"",
      patientambherappointmentprescription: "",
      patientambherappointmentrating: 0,
      patientambherappointmentfeedback: "",

      



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
      patientbautistaappointmentotherservice: formData.has('patientbautistaappointmentotherservice'),
      patientbautistaappointmentotherservicenote: patientambherappointmentotherservicenote || '',
      patientbautistaappointmentstatus: "Pending",
      patientbautistaappointmentpaymentotal: 1000,
      patientbautistaappointmentconsultationremarkssubject: "",
      patientbautistaappointmentconsultationremarks: "",
      patientbautistaappointmentprescription: "",
      patientbautistaappointmentrating: 0,
      patientbautistaappointmentfeedback: "",



      patientadditionalappointmentnotes: additionaldetails,
      patientadditionalappointmentnotesimage: appointmentpreviewimage || defaultimageplaceholder,
      patientappointmentpaymentotal: 1000,

    }


    const response = await fetch(`/api/patientappointments/appointments`,{
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

    // Invalidate appointment cache and refresh the list
    invalidateAppointmentData();
    
    // Switch to appointment list and refresh cached data
    setactiveappointmenttable('appointmentlist');
    
    // Force refresh cached appointment data to show new appointment
    setTimeout(() => {
      fetchAppointmentData(true);
    }, 100);

    setadditionaldetails('');
    setappointmentpreviewimage(defaultimageplaceholder);
  }catch(error) {
    console.error('Error Submitting Patient Appointment: ', error);
  }finally{
    setissubmitting(false);
  }
};









//CHECKS AMBHER OPTICAL AND BAUTISTA EYE CENTER EXISTING SCHEDULED APPOINTMENTS
const checkclinicscheduledappointments = async (formData) => {
  try {
    const existingappointmentambherDate = formData.get('patientambherappointmentdate');
    const existingappointmentambherTime = formData.get('patientambherappointmenttime');
    const existingappointmentbautistaDate = formData.get('patientbautistaappointmentdate');
    const existingappointmentbautistaTime = formData.get('patientbautistaappointmenttime');

    //Checks existing appointment schedules for Ambher Optical
    if (existingappointmentambherDate && existingappointmentambherTime) {
      const ambherexistingscheduleresponse = await fetch(`/api/patientappointments/appointments/ambher/${existingappointmentambherDate}/${existingappointmentambherTime}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      });
      

      if (ambherexistingscheduleresponse.ok) {
        const existingAmbherAppointments = await ambherexistingscheduleresponse.json();
        if (existingAmbherAppointments.length > 0) {
          return {
            conflict: true,
            message: "Selected date and time for Ambher Optical is already booked by another patient."
          };
        }
      }
    }

    //Checks existing appointment schedules for Bautista Eye Center
    if (existingappointmentbautistaDate && existingappointmentbautistaTime) {
      const bautisaexistingscheduleresponse = await fetch(`/api/patientappointments/appointments/bautista/${existingappointmentbautistaDate}/${existingappointmentbautistaTime}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      });
      
      if (bautisaexistingscheduleresponse.ok) {
        const existingBautistaAppointments = await bautisaexistingscheduleresponse.json();
        if (existingBautistaAppointments.length > 0) {
          return {
            conflict: true,
            message: "Selected date and time for Bautista Eye Center is already booked by another patient."};}}
          

      }return { conflict: false };
      


  } catch (error) {
    console.error("Failed to check existing appointments:", error);
    return { conflict: false }; 
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
const [showpatientappointmentformError, setshowpatientappointmentformError] = useState(false);
const [patientappointmentformerrorClosing, setpatientappointmentformerrorClosing] = useState(false);




const handlesubmitpatientappointment = async (e) => {
  e.preventDefault();


  const appointmentformdata = new FormData(e.target);
  
  const { conflict, message } = await checkclinicscheduledappointments(appointmentformdata);
  if (conflict) {
    setpatientappointmentformerror(message);
    setshowpatientappointmentformError(true);
    setpatientappointmentformerrorClosing(false);
    return;
  }


  const patientambherappointmentdate = appointmentformdata.get('patientambherappointmentdate');
  const patientambherappointmenttime = appointmentformdata.get('patientambherappointmenttime');
  const patientbautistaappointmentdate = appointmentformdata.get('patientbautistaappointmentdate');
  const patientbautistaappointmenttime = appointmentformdata.get('patientbautistaappointmenttime');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowdate = tomorrow.toISOString().split('T')[0];




  ambherservicesselected = [
    'patientambherappointmentcataractscreening',
    'patientambherappointmentpediatricassessment',
    'patientambherappointmentcolorvisiontesting',
    'patientambherappointmentlowvisionaid',
    'patientambherappointmentrefraction',
    'patientambherappointmentcontactlensefitting',
    'patientambherappointmentotherservice',
    'patientambherappointmentotherservicenote'
  ].some(service => appointmentformdata.has(service));

  bautistaservicesselected = [
    'patientbautistaappointmentcomprehensiveeyeexam',
    'patientbautistaappointmentdiabeticretinopathy',
    'patientbautistaappointmentglaucoma',
    'patientbautistaappointmenthypertensiveretinopathy',
    'patientbautistaappointmentretinolproblem',
    'patientbautistaappointmentcataractsurgery',
    'patientbautistaappointmentpterygiumsurgery',
    'patientbautistaappointmentotherservice',
    'patientbautistaappointmentotherservicenote'
  ].some(service => appointmentformdata.has(service));

  let errormessage = null;
  
  if(!patientambherappointmentdate && !patientbautistaappointmentdate) {
    errormessage = "Please select at least one clinic appointment date";
  }
  else if((patientambherappointmentdate && !patientambherappointmenttime) || 
          (patientbautistaappointmentdate && !patientbautistaappointmenttime)){
    errormessage = "Please select time for your appointment";
  }
  else if((patientambherappointmentdate || patientambherappointmenttime) && !ambherservicesselected){
    errormessage = "Please select at least one service from Ambher Optical";
  }
  else if((patientbautistaappointmentdate || patientbautistaappointmenttime) && !bautistaservicesselected){
    errormessage = "Please select at least one service from Bautista Eye Center";
  }
  else if(patientambherappointmentdate && patientambherappointmentdate < tomorrowdate) {
    errormessage = "Scheduled appointment date for Ambher Optical must be scheduled for tomorrow or later";
  }
  else if(patientbautistaappointmentdate && patientbautistaappointmentdate < tomorrowdate) {
    errormessage = "Scheduled appointment date for Bautista Eye Center must be scheduled for tomorrow or later";
  }
  else if(patientambherappointmentdate && patientbautistaappointmentdate &&
          patientambherappointmentdate === patientbautistaappointmentdate &&
          patientambherappointmenttime === patientbautistaappointmenttime) {
    errormessage = "Appointed schedule for date and time cannot be the same for both clinics";
  }

  if(errormessage){
    setpatientappointmentformerror(errormessage);
    setshowpatientappointmentformError(true);
    setpatientappointmentformerrorClosing(false);
    return;
  }

  setshowpatientappointmentformError(false);
  setpatientappointmentformerror(null);
  patientsubmitappointment(appointmentformdata);
};


//TIMEOUT FOR APPOINTMENTFORM ERROR 
useEffect(() => {
  if (showpatientappointmentformError) {
    const timer = setTimeout(() => {
      setpatientappointmentformerrorClosing(true);
      setTimeout(() => {
        setshowpatientappointmentformError(false);
        setpatientappointmentformerror(null); }, 300);
     }, 4000); 
    return () => clearTimeout(timer);
  }
}, [showpatientappointmentformError]);











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

 
 // Smart cached appointment fetching with real-time updates
 const fetchAppointmentData = useCallback(async (forceRefresh = false) => {
   setloadingappointments(true);
   seterrorloadingappointments(null);

   try {
     const email = localStorage.getItem("patientemail");
     if (!email) {
       throw new Error("Patient email not found");
     }
     
     console.log('📅 Fetching appointment data...', { forceRefresh });
     
     // Use smart cached appointment fetching
     const data = await smartFetch(
       `appointmentData_${email}`,
       () => fetchPatientAppointments(email),
       CACHE_DURATIONS.appointments,
       forceRefresh
     );
     
     console.log('📅 Appointment data received:', data?.length || 0, 'appointments');
     setpatientappointments(data || []);

   } catch (error) {
     console.error("Error fetching appointments: ", error);
     seterrorloadingappointments(error.message);
   } finally {
     setloadingappointments(false);
   }
 }, [smartFetch, CACHE_DURATIONS, fetchPatientAppointments]);

 useEffect(() => {
   if (activeappointmenttable === 'appointmentlist') {
     fetchAppointmentData();
   }
 }, [activeappointmenttable, fetchAppointmentData]);

 // Listen for real-time appointment updates
 useEffect(() => {
   if (realtimeUpdates.has('appointment')) {
     console.log('📅 Real-time appointment update detected, refreshing data...');
     fetchAppointmentData(true); // Force refresh on real-time update
   }
 }, [realtimeUpdates, fetchAppointmentData]);
 

 

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



//Formats the time selected
const formatappointmenttimes = (formattedtimestring) => {
  if (!formattedtimestring) return ''; 
  return formattedtimestring; 
};




//DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT
//DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT
//DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT
//DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT
//DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT //DELETE PATIENT APPOINTMENT
const handledeleteappointment = async (appointmentId) => {
  try{
    const response = await fetch(`/api/patientappointments/appointments/${appointmentId}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
      }
    });

      if(!response.ok) throw new Error('Failed to Delete Appointment');
 
    // Remove from local state immediately
    setpatientappointments(prev =>
      prev.filter(appt => appt.patientappointmentid !== appointmentId)
    );

    // Refresh cached data to ensure consistency
    console.log('📅 Appointment deleted, refreshing cache...');
    fetchAppointmentData(true);

    }catch(error){
      console.error("Appointment deletion failed: ", error);
      seterrorloadingappointments(error.message);
    }
}







  const [appointmentselectedimage, setappointmentselectedimage] = useState(null);
  const [appointmentpreviewimage, setappointmentpreviewimage] = useState (null);
  const appointmentimageinputref = useRef(null);


  //PROFILE IMAGE TYPE HANDLING
  const appointmenthandleprofilechange = async (e) => {
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

    setappointmentselectedimage(null);
    setappointmentpreviewimage(null);

    if(appointmentimageinputref.current){
      appointmentimageinputref.current.value = "";
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
        setappointmentpreviewimage(reader.result);
      };


      reader.onerror = () => {
        console.error("File Reader Error : ", reader.error);
        alert("Error reading file. Try again");
        return;
      };

      reader.readAsDataURL(compressedimageprofile);
      setappointmentselectedimage(compressedimageprofile);
    

    } catch (error) {

      console.error("Image file compression failed : ", error.message);
      alert("Image file compression failed. Try again");
      return;

    }
      

  };

  //Handles the click event of upload button
  const appointmenthandleuploadclick = () => {
    appointmentimageinputref.current.click();
  };

  const appointmenthandleremoveprofile = () => {
    setappointmentselectedimage(null);
    setappointmentpreviewimage(null);
    if(appointmentimageinputref.current){
      appointmentimageinputref.current.value = "";
    }
  }






 const [showbautistafeedbackdialog, setshowbautistafeedbackdialog] = useState(false);
 const [showambherfeedbackdialog, setshowambherfeedbackdialog] = useState(false);
 const [bautistaappointmentrating, setbautistaappointmentrating] = useState(null);
 const [bautistaappointmentfeedback, setbautistaappointmentfeedback] = useState("");
 const [ambherappointmentrating, setambherappointmentrating] = useState(null);
 const [ambherappointmentfeedback, setambherappointmentfeedback] = useState("");




 //UPDATING THE FIELDS OF PATIENT APPOINTMENT FEEDBACKS
 const handlesubmitfeedback = async(clinicType) => {
  try{
    const appointmentid = selectedpatientappointment.patientappointmentid;
    const feedbackrating = clinicType === 'ambher' ? ambherappointmentrating : bautistaappointmentrating;
    const feedbackmessage = clinicType === 'ambher' ? ambherappointmentfeedback : bautistaappointmentfeedback;

    const response = await fetch(`/api/patientappointments/appointments/${appointmentid}`,{
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('patienttoken')}`
      },
      body: JSON.stringify({
        [`patient${clinicType}appointmentrating`] : feedbackrating,
        [`patient${clinicType}appointmentfeedback`] : feedbackmessage
      })
    });


    if(!response.ok) {
      throw new Error("Failed to submit patient feedback");
    }

    const updatedappointment = await response.json();
    setselectedpatientappointment(updatedappointment);
    setpatientappointments(prevappointments =>
      prevappointments.map(appt =>
        appt.patientappointmentid === updatedappointment.patientappointmentid ? updatedappointment : appt
      )
    );


    if(clinicType === 'ambher') {
      setshowambherfeedbackdialog(false);
      setambherappointmentrating(null);
      setambherappointmentfeedback("");
    }else{
      setshowbautistafeedbackdialog(false);
      setbautistaappointmentrating(null);
      setbautistaappointmentfeedback("");
    }


    console.log(`${clinicType} Feedback Submitted Successfully`);
  
  }catch (error){
    console.error(`Patient feedback submission failed: ${clinicType} `, error);
  }
 };







//AVAILABLE TIME FOR EACH CLINIC

const ambherappointmentschedules = [
  '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  
];

const bautistaappointmentschedules = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '1:00 PM', '2:00 PM',  '3:00 PM'
 
];



//GET TOMORROW DATE
const getdatetomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};


//GET UP TO THREE MONTHS OF APPOINTMET AVAILABILITY
const getuptothreemonthsappointmentavailability = () => {
  const threemonthsavailability = new Date();
  threemonthsavailability.setMonth(threemonthsavailability.getMonth() + 3);
  return threemonthsavailability.toISOString().split('T')[0];
};


//DISABLES WEEKEND APPOINTMENTS IN BAUTISTA
const disablebautistaweekends = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const day = date.getDay();
  return day === 0 || day === 6; 
};



//TOAST MESSAAGE WHEN SELECTED A WRONG DATEs
 const [bautistashownotavailweekendToast, setbautistashownotavailweekendToast] = useState(false);
 const [bautistashownotavailweekendToastClosing, setbautistashownotavailweekendToastClosing] = useState(false);


useEffect(() => {
  if(bautistashownotavailweekendToast){
    const bautistashownotavailweekendToastTimer = setTimeout(() => {
      setbautistashownotavailweekendToastClosing(true);
      setTimeout(() => setbautistashownotavailweekendToast(false), 300);}, 4000);
  
    return () => clearTimeout(bautistashownotavailweekendToastTimer);
  }
}, [bautistashownotavailweekendToast]);















































































































  return (
    <>

     {/* NavBar */}
    <div className=" bg-white w-[99vw]">
      <header id="header" className="top-0 absolute flex justify-between items-center text-black  md:px-32 bg-white w-full drop-shadow-md">
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
     {!patientprofilepicture ? (
       // Skeleton loading for navbar profile picture
       <div className="h-13 w-13 rounded-full bg-gray-300 animate-pulse"></div>
     ) : (
       <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-13 w-13 rounded-full"></img>
     )}
    </div>

{showlogoutbtn && (
    <div className="w-75 flex-col  p-5  motion-preset-fade absolute top-full mt-2  flex justify-center items-start bg-[#ffffff] rounded-2xl hover:cursor-pointer  transition-all" >


      <div className="hover:bg-[#f7f7f7] transition-all duration-300 ease-in-out py-2 px-1 rounded-2xl  gap-3 flex items-center h-auto w-full ">
        {!patientprofilepicture ? (
          // Skeleton loading for dropdown profile picture
          <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
        ) : (
          <img src={patientprofilepicture}  className="w-12 rounded-full"/>
        )}
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
    <section className="bg-cover bg-center min-h-[100vh]  w-[99vw] flex justify-center align-center" >
    <div className="bg-cover bg-center h-full w-full flex items-center justify-center " >

      <div className="w-full h-full flex justify-start items-start pt-3 ">




          

       <div  className="  ml-3  h-auto  w-full flex flex-col items-center justify-center mr-3 mb-3" >


      
      <div id="appointment" className=" bg-white w-full h-[100%] p-4 mt-12 rounded-2xl" >  
          
                <div className="flex items-center"><i className="bx bxs-calendar text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Appointments</h1></div>

                                 <div className="flex justify-between items-center mt-8 h-[60px]">
                <Link to="/patientinformation">
                {!patientdemographics ? (
                  // Skeleton Loading State
                  <div id="patientcard" className="flex justify-center items-start border-1 bg-white rounded-2xl shadow-md w-[290px] h-[80px] animate-pulse">
                    <div className="w-[125px] h-full rounded-2xl flex justify-center items-center">
                      <div className="h-18 w-18 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="bg-white min-w-0 flex flex-col justify-center items-start pl-2 pr-2 w-full h-full rounded-3xl">
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ) : (
                  // Actual Patient Card
                  <div id="patientcard" className="flex justify-center items-start border-1 hover:scale-105 hover:cursor-pointer bg-white transition-all duration-100 ease-in-out rounded-2xl shadow-md w-[290px] h-[80px]">
                    <div className="w-[125px] h-full rounded-2xl flex justify-center items-center">
                      <img src={patientdemographics?.patientprofilepicture || defaultprofilepic} alt="Profile" className="h-18 w-18 rounded-full object-cover"></img>
                    </div>
                    <div className="bg-white min-w-0 flex flex-col justify-center items-start pl-2 pr-2 w-full h-full rounded-3xl">
                      <h1 className="font-albertsans font-bold text-[17px] truncate w-full text-[#2d3744]">{patientdemographics?.patientfirstname || ''} {patientdemographics?.patientlastname || ''}</h1>
                      <p className="text-[13px] truncate w-full text-[#535354]">{patientdemographics?.patientemail || ''}</p>
                    </div>
                  </div>
                )}
                </Link> 
                   <div className="flex justify-center items-center">
                  <div onClick={() => showappointmenttable('bookappointment')}  className={`hover:cursor-pointer hover:rounded-2xl mr-5 transition-all duration-100 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmenttable==='bookappointment' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmenttable ==='bookappointment' ? 'text-white' : ''}`}>Book Appointment</h1></div>
                  <div onClick={() => showappointmenttable('appointmentlist')}  className={`hover:cursor-pointer hover:rounded-2xl ml-5 transition-all duration-100 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmenttable ==='appointmentlist' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmenttable ==='appointmentlist' ? 'text-white' : ''}`}>Appointment List</h1></div>
                 </div> 
                 </div> 
                                 
                
                <div className="flex justify-center items-start" id="overview">


  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
  {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/} {/*Patient Appointment Booking*/}
                 { activeappointmenttable === 'bookappointment' && ( <div id="bookappointment" className="animate-fadeInUp flex flex-col items-center   w-max h-[83%] rounded-2xl mt-6" >
                  <form onSubmit={handlesubmitpatientappointment}>      

                  {patientappointmentformerror && (
                 <div className=" top-4  -translate-x-1/2  z-100   left-1/2 transform fixed " >
                  <div  className={` ${patientappointmentformerrorClosing  ? 'motion-opacity-out-0' : 'motion-preset-bounce'}  bg-red-100 flex items-center   rounded-md shadow-lg text-gray-900 font-semibold px-6 py-3`} >
                      <span className="text-red-800 font-semibold text-[20px]"><i className="mr-2 bx bx-x-circle "></i></span><h1 className="text-red-950">{patientappointmentformerror}</h1>
                   </div>
           
                </div>
                  )}


                  <div className="mt-3  flex justify-center items-start h-fit w-full rounded-3xl "  >

                    <div className="flex flex-col mr-3 bg-[#fdfdfd] h-max w-full rounded-3xl">
                      <div className="flex p-3">
                      <img src={ambherlogo} className="w-15"/>  
                      <h1 className="font-albertsans font-bold text-[20px] text-[#237234] mt-1 ml-3">Ambher Optical</h1>
                      </div>

                     <div className="flex justify-center items-center">           
                      <div className="mr-10 flex flex-col h-fit form-group ml-3 mt-4 ">
                             <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientambherappointmentdate">Preferred Appointment Date: </label>     
                             <input className="[&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[70%] h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"  min={getdatetomorrow()} max={getuptothreemonthsappointmentavailability()} type="date" name="patientambherappointmentdate" id="patientambherappointmentdate" placeholder="" required={!!ambherservicesselected}/> </div>
                     
                      <div className="ml-10 flex flex-col h-fit form-group mt-4 ">
                             <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientambherappointmenttime">Preferred Appointment Time: </label>     
                             <select  name="patientambherappointmenttime" id="patientambherappointmenttime"  required={!!ambherservicesselected}  className="h-10 w-60 p-2 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px] font-semibold">
                               <option value="">Select a time</option>
                               {ambherappointmentschedules.map((time, index) => (<option key={index} value={time}>{time}</option>))}
                             </select>
                     </div>
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

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={showotherpatientambherappointmentotherservice} onChange={(e) => setshowotherpatientambherappointmentotherservice(e.target.checked)}  type="checkbox" name="patientambherappointmentotherservice" id="patientambherappointmentotherservice" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentotherservice">Other</label>   
                        </div>  
     

                      {showotherpatientambherappointmentotherservice && (
                          <div className="mt-3 ml-5">
                              <textarea className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={patientambherappointmentotherservicenote} onChange={(e) => {setpatientambherappointmentotherservicenote(e.target.value); adjusttextareaheight();}} placeholder="Please specify other Ambher Optical services.."/>
                          </div>
                        )}   



           


                     </div>

                    </div>

                    <div className=" ml-3 bg-[#fdfdfd]  h-max w-full rounded-3xl">
                    <div className="flex p-3">
                      <img src={bautistalogo} className="w-15"/>  
                      <h1 className="font-albertsans font-bold text-[20px] text-[#2387c5] mt-1 ml-3">Bautista Eye Center</h1>
                      </div>


                      
                    <div className="flex flex-col mr-3 bg-[#fdfdfd] h-full w-full rounded-3xl">


                     <div className="flex justify-center items-center">           
                      <div className="mr-10 flex flex-col h-fit form-group ml-3 mt-4 ">
                             <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientbautistaappointmentdate">Preferred Appointment Date: </label>     
                             <input className="[&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[70%] h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"   type="date" name="patientbautistaappointmentdate" id="patientbautistaappointmentdate" placeholder=""   min={getdatetomorrow()} 
                               max={getuptothreemonthsappointmentavailability()}
                               required={!!bautistaservicesselected}
                               onChange={(e) => {
                                 if (disablebautistaweekends(e.target.value)) {
                                   setbautistashownotavailweekendToast(false);
                                   setbautistashownotavailweekendToastClosing(false);
                                   setTimeout(() => {
                                     setbautistashownotavailweekendToast(true);
                                     e.target.value = "";
                                   }, 50);
                                 }
                               }}/> </div>

          {bautistashownotavailweekendToast && (
            <div className="top-4  -translate-x-1/2  z-100   left-1/2 transform fixed " >
                  <div  className={` ${bautistashownotavailweekendToastClosing ? 'motion-opacity-out-0' : 'motion-preset-bounce'}  flex items-center bg-red-100   rounded-md shadow-lg text-gray-900 font-semibold px-6 py-3`} >
                      <span className="text-red-800 font-semibold text-[20px]"><i className="mr-2 bx bx-x-circle "></i></span><h1 className="text-red-950">Bautista weekend dates are not available</h1>
                  </div>
           
            </div>
          )}
                     
                      <div className="ml-10 flex flex-col h-fit form-group mt-4 ">
                             <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientbautistaappointmenttime">Preferred Appointment Time: </label>     
                             <select  name="patientbautistaappointmenttime" id="patientbautistaappointmenttime"  required={!!bautistaservicesselected}  className="h-10 w-60 p-2 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px] font-semibold">
                               <option value="">Select a time</option>
                               {bautistaappointmentschedules.map((time, index) => (<option key={index} value={time}>{time}</option>))}
                             </select>                
                      </div>  </div>
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

                      <div className="flex items-center mt-5 ml-7">
                        <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={showotherpatientbautistaappointmentotherservice} onChange={(e) => setshowotherpatientbautistaappointmentotherservice(e.target.checked)}  type="checkbox" name="patientbautistaappointmentotherservice" id="patientbautistaappointmentotherservice" />
                        <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentotherservice">Other</label>   
                        </div>  
     

                      {showotherpatientbautistaappointmentotherservice && (
                          <div className="mt-3 ml-5">
                              <textarea className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={patientbautistaappointmentotherservicenote} onChange={(e) => {setpatientbautistaappointmentotherservicenote(e.target.value); adjusttextareaheight();}} placeholder="Please specify other Bautista Eye Center services..."/>
                          </div>
                        )}   




                     </div>

                    </div>
                    </div>

                  </div>

                <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              

                </div>

                                  
                <div className="mt-3 ml-7 w-max flex flex-col">
                          <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientadditionalappointmentnotes">Additional Appointment Notes</label>  

                              <textarea className="w-[1280px] text-[20px] rounded-md p-2 border-2 border-[#2d2d44]   text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={additionaldetails} onChange={(e) => {setadditionaldetails(e.target.value); adjusttextareaheight();}} placeholder="Please specify additional appointment notes..."/>
                          
                       <div className=" w-fit h-fit mt-5">
                      <img className=" object-cover max-w-320 rounded-2xl" src={appointmentpreviewimage || defaultimageplaceholder}/>
                    
                      <input  className="hidden" type="file" onChange={appointmenthandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={appointmentimageinputref} />
                      <div onClick={appointmenthandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                            
                      {appointmentselectedimage && (<div onClick={appointmenthandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                      </div>
                  
                          
                </div>


                          

                <div className="w-full flex justify-end  pl-7 mt-5 mb-5">

              <button type="submit" disabled={issubmitting} className={`submit-btn mt-12 w-full flex items-center justify-center gap-2 ${issubmitting ? 'bg-gray-400 cursor-not-allowed' : 'hover:scale-105'} transition-all duration-300 ease-in-out`} style={{ backgroundColor: issubmitting ? "#9ca3af" : "#5e9e3b", fontSize: "20px", padding: "16px 20px", color: "white", borderRadius: "20px" }}>
                {issubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting Appointment...</span>
                  </>
                ) : (
                  "Submit Appointment"
                )}
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
                
                <div className=" flex justify-center items-start h-[500px] w-full rounded-3xl ">

      {loadingappointmens ? (
        <AppointmentTableSkeleton />
      ) : errorloadingappointments ? (
    <div className="w-full h-[40px] rounded-tl-2xl rounded-tr-2xl flex justify-center items-center bg-red-50 text-red-600 font-semibold font-albertsans">
    Error: {errorloadingappointments}
  </div>
  ) : patientappointments.length === 0 ? (
    <div className="w-full h-[40px] rounded-tl-2xl rounded-tr-2xl flex justify-center items-center text-yellow-600 bg-yellow-50 font-semibold font-albertsans">No patient appointments found.</div>
    

  ) : (
    <div className="overflow-x-auto rounded-2xl shadow-lg  w-full h-full mt-">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-">
          <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
            <th className="pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th> 
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
              className="hover:bg-gray-50 transition-all ease-in-out duration-100 border-b-2"
            >
              <td className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">
                {formatappointmatedates(appointment.createdAt)}{}
              </td>
              <td className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">
                {appointment.patientambherappointmentdate && (
                  <div className="text-sm font-albertsans text-gray-900 flex  justify-center items-center">
                    <span className="font-semibold items-start">{formatappointmatedates(appointment.patientambherappointmentdate)} </span> 
                    <span className="ml-1 font-semibold items-start">({formatappointmenttimes(appointment.patientambherappointmenttime)})</span> 
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
                    <span className="ml-1 font-semibold">({formatappointmenttimes(appointment.patientbautistaappointmenttime)})</span> 
                    
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
                  className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-100 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><h1 className="text-white">View</h1></div>

              <div onClick={() =>  {setdeletepatientappointment(true);
                                setselectedpatientappointment(appointment);
              }}
                className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-100 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div>

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
                                    <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-100 ease-in-out" onClick={() => setdeletepatientappointment(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                    <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-100 ease-in-out" onClick={() => {handledeleteappointment(selectedpatientappointment.patientappointmentid);setdeletepatientappointment(false); }}><p className=" text-[#ffffff]">Delete</p></div>
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

     
  


 {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
 {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/} {/*Viewing Appointment Details*/}
                         {viewpatientappointment && selectedpatientappointment && (
                         <div id="viewpatientappointment" className="overflow-y-auto h-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] mt-10 mb-10 animate-fadeInUp ">
                                 <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                   <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">View Appointment</h1></div>
                                   <div onClick={() => setviewpatientappointment(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-100 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
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
     <h1>{formatappointmatedates(selectedpatientappointment.patientambherappointmentdate)} <span className="ml-2">({formatappointmenttimes(selectedpatientappointment.patientambherappointmenttime)})</span></h1>


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


  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={selectedpatientappointment.patientambherappointmentotherservice} onChange={(e) => setshowotherpatientambherappointmentotherservice(e.target.checked)}  type="checkbox" name="patientambherappointmentotherservice" id="patientambherappointmentotherservice" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientambherappointmentotherservice">Other</label>   
    </div>  
     

     {selectedpatientappointment.patientambherappointmentotherservice && (
          <div className="mt-3 ml-17">
              <p className="text-[18px]  font-medium font-albertsans  text-[#343436] ">- {selectedpatientappointment.patientambherappointmentotherservicenote}</p>
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
      


    {selectedpatientappointment.patientambherappointmentrating === 0 && selectedpatientappointment.patientambherappointmentfeedback === "" && (
      <div  onClick={() => setshowambherfeedbackdialog(true)}  className="bg-[#2d91cf]  hover:bg-[#1b6796] mt-4 h-[50px]  transition-all duration-100 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Submit a Feedback</h1></div>


   )}  

    {selectedpatientappointment.patientambherappointmentrating != 0 && selectedpatientappointment.patientambherappointmentfeedback != "" && (
      <div className="mt-10"> 

      <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436] ">Patient Feedback :</h1>           
      <Stack spacing={1}>
       <Rating size="large" value={selectedpatientappointment.patientambherappointmentrating} readOnly /> 
      </Stack>  
      <p>{selectedpatientappointment.patientambherappointmentfeedback}</p>
     </div>
     )} 


{showambherfeedbackdialog &&(
  <div className="overflow-y-auto h-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
     <div className="flex flex-col items mt-60 mb-60 bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
     <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#08404d]"><i className="ml-3 bx bxs-message-square-dots text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[20px] font-albertsans font-bold text-[#f0f0f0]">Ambher Optical Appointment FeedBack</h1></div>
   <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
       <div className="px-5 flex flex-col justify-center  h-full mt-4 w-full"><p className="font-albertsans font-semibold text-[20px] text-[#424242] ">Rate our service</p>
       <Stack spacing={1}>
                <Rating size="large" value={ambherappointmentrating}  onChange={(e) => setambherappointmentrating(Number(e.target.value))}  sx={{fontSize: '2rem'}} name="half-rating-read" defaultValue={0} precision={1} />
        </Stack>  
       </div>


       <div className=" mt-4 px-5 w-full  flex flex-col">
          <textarea className="w-full text-[20px] rounded-md p-2  bg-[#ededed]   text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={ambherappointmentfeedback} onChange={(e) => {setambherappointmentfeedback(e.target.value); adjusttextareaheight();}} placeholder="How's your experience?"/>                   
       </div>

       <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
         <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-100 ease-in-out" onClick={() => {setshowambherfeedbackdialog(false); setambherappointmentfeedback(""); setambherappointmentrating(null);}}><p className=" text-[#ffffff]">Cancel</p></div>
         <div className="hover:cursor-pointer bg-[#08404d]  ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-100 ease-in-out" onClick={() => {handlesubmitfeedback('ambher'); setshowambherfeedbackdialog(false);}}><p className=" text-[#ffffff]">Submit</p></div>
       </div>
       </div>
     </div>
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
     <h1>{formatappointmatedates(selectedpatientappointment.patientbautistaappointmentdate)} <span className="ml-2">({formatappointmenttimes(selectedpatientappointment.patientbautistaappointmenttime)})</span></h1>


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
              <p className="font-albertsans text-[17px]">{selectedpatientappointment.patientbautistaappointmentotherservicenote}</p>
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

  
    {selectedpatientappointment.patientbautistaappointmentrating === 0 && selectedpatientappointment.patientbautistaappointmentfeedback === "" && (
    <div  onClick={() => setshowbautistafeedbackdialog(true)}  className="bg-[#2d91cf]  hover:bg-[#1b6796] mt-4 h-[50px]  transition-all duration-100 ease-in-out flex justify-center items-center py-2 px-5 hover:cursor-pointer rounded-[20px]"><h1 className="text-white font-albertsans font-semibold text-[20px]">Submit a Feedback</h1></div>


 )}  

  {selectedpatientappointment.patientbautistaappointmentrating != 0 && selectedpatientappointment.patientbautistaappointmentfeedback != "" && (
    <div className="mt-10"> 

    <h1 className="text-[18px]  font-semibold font-albertsans  text-[#343436] ">Patient Feedback :</h1>           
    <Stack spacing={1}>
     <Rating size="large" value={selectedpatientappointment.patientbautistaappointmentrating} readOnly /> 
    </Stack>  
    <p>{selectedpatientappointment.patientbautistaappointmentfeedback}</p>
   </div>
   )} 



  


{showbautistafeedbackdialog &&(
  <div className="overflow-y-auto h-auto bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
     <div className="flex flex-col items mt-60 mb-60 bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
     <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#08404d]"><i className="ml-3 bx bxs-message-square-dots text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[20px] font-albertsans font-bold text-[#f0f0f0]">Bautista Eye Center Appointment FeedBack</h1></div>
   <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
       <div className="px-5 flex flex-col justify-center  h-full mt-4 w-full"><p className="font-albertsans font-semibold text-[20px] text-[#424242] ">Rate our service</p>
       <Stack spacing={1}>
                <Rating size="large" value={bautistaappointmentrating}  onChange={(e) => setbautistaappointmentrating(Number(e.target.value))}  sx={{fontSize: '2rem'}} name="half-rating-read" defaultValue={0} precision={1} />
        </Stack>  
       </div>


       <div className=" mt-4 px-5 w-full  flex flex-col">
          <textarea className="w-full text-[20px] rounded-md p-2  bg-[#ededed]   text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={bautistaappointmentfeedback} onChange={(e) => {setbautistaappointmentfeedback(e.target.value); adjusttextareaheight();}} placeholder="How's your experience?"/>                   
       </div>

       <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
         <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-100 ease-in-out" onClick={() => {setshowbautistafeedbackdialog(false); setbautistaappointmentfeedback(""); setbautistaappointmentrating(null);}}><p className=" text-[#ffffff]">Cancel</p></div>
         <div className="hover:cursor-pointer bg-[#08404d]  ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-100 ease-in-out" onClick={() => {handlesubmitfeedback('bautista'); setshowbautistafeedbackdialog(false);}}><p className=" text-[#ffffff]">Submit</p></div>
       </div>
       </div>
     </div>
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






<div className="w-full mt-5 p-3 flex flex-col mb-5 bg-[#ededed] rounded-2xl  ">
                          <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientadditionalappointmentnotes">Patient Appointment Notes :</label>  

                           <div>{selectedpatientappointment.patientadditionalappointmentnotes ||"No additional notes"}
                           <div className=" w-fit h-fit mt-5">
                          <img className=" object-cover  rounded-2xl" src={selectedpatientappointment.patientadditionalappointmentnotesimage || defaultimageplaceholder}/>                 
                          </div>
                           </div>
                          </div>





                           </div>

                         </div>
                      )}









                 </div>
                 </div>
      

      </div>

















      
        </section>



    </>
   )
  }
        
export default PatientDashboard