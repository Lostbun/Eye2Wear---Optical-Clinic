import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import navlogo from  "../src/assets/images/navlogo.png";

import { useAuth } from "./hooks/patientuseAuth";

import profileuser from "../src/assets/images/profile-user.png";
import logout from "../src/assets/images/logout.png";



import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';






















function PatientOrders(){




  
  const [patientfirstname, setpatientfirstname] = useState('');
  const [patientlastname, setpatientlastname] = useState('');
  const [patientmiddlename, setpatientmiddlename] = useState('');
  const [patientemail, setpatientemail] = useState('');
  const [patientprofilepicture, setpatientprofilepicture] = useState('');
  const [showlogoutbtn, setshowlogoutbtn] = useState(false);
  const showlogout = () => {
    setshowlogoutbtn(!showlogoutbtn);
  }



 const {handlelogout, fetchpatientdetails} = useAuth();

  //Retrieveing Data from useAuth Hook
  useEffect(() => {
    const loadpatient = async () => {

      try{

      const data = await fetchpatientdetails();
      if(data){
        setpatientfirstname(data.patientfirstname || '');
        setpatientmiddlename(data.patientmiddlename || '');
        setpatientlastname(data.patientlastname || '');
        setpatientemail(data.patientemail || '');
        setpatientprofilepicture(data.patientprofilepicture || '');
        localStorage.setItem("patientemail", data.patientemail);
      }
    }catch(error){

        console.error("Error fetching patient details", error);

    }
   }; loadpatient();
  }, [fetchpatientdetails]);






















 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
 //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT

const [activeorderstable, setactiveorderstable] = useState('ambherorderstable');
const showorderstable = (orderstableid) => {
      setactiveorderstable(orderstableid);
};

          
     
          
          


















  



          
          
        




















































































  return (
    <>

     {/* NavBar */}
<div className="bg-white w-[100vw] relative z-10">
  <header id="header" className="top-0 absolute flex justify-between items-center text-black md:px-32 bg-white w-full drop-shadow-md z-50">
        <a id:logocontain href="#">
          <img src={navlogo} alt="" className="w-33  hover:scale-105 transition-all"></img>
        </a>

        <ul id:listcontain  className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <Link to="/patientlandingpage" className="text-[#000000] hover:text-white no-underline"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white text-black  rounded-md transition-all cursor-pointer">Home</li></Link>
        <Link to="/patientdashboard"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Appointments</li></Link>
        <Link to="/patientproducts"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Store</li></Link>
         <Link to="/patientwishlist"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Wishlist</li></Link>
        <Link to="/patientOrders"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Orders</li></Link>





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
    <section className="bg-cover bg-center min-h-[100vh] h-auto w-[100vw] flex justify-center align-center" >
    <div className="bg-cover bg-center h-auto w-full flex items-center justify-center " >

      <div className="w-full h-auto flex flex-col justify-start items-start pt-3 p-3">






              <div id="patientordersmanagement  " className="pl-5 pr-5 pb-4 pt-4  transition-all duration-300  ease-in-out  w-[100%] h-full bg-white " >   

              <div className=" flex items-center mt-8"><i className="bx bxs-package text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">My Orders</h1></div>

  <div className="flex justify-start items-center mt-3 h-[60px]">
  <div onClick={() => showorderstable('ambherorderstable')}  className={`mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeorderstable ==='ambherorderstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeorderstable ==='ambherorderstable' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
  <div onClick={() => showorderstable('bautistaorderstable')}  className={`ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeorderstable ==='bautistaorderstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeorderstable ==='bautistaorderstable' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
  
  </div>


                




          { activeorderstable === 'ambherorderstable' && ( <div id="ambherorderstable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] min-h-[80] h-auto rounded-2xl mt-5" >
                <div className="p-3  rounded-2xl w-[20%] h-auto  mr-2 overflow-y-auto overflow-x-hidden">
                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by status</h1></div>

                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">All</h1></div>
                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">Pending</h1></div>
                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl  py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">Ready for Pickup</h1></div>
                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl  py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">Completed</h1></div>
                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl  py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">Cancelled</h1></div>


          </div>
          <div className=" flex flex-col justify-start items-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">
              <div className="ml-2 flex justify-center items-center"><h2 className="font-albertsans font-bold text-[18px] text-[#383838] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input  type="text" placeholder="Enter product name here..."   className="transition-all duration-300 ease-in-out py-2 pl-10 w-250 rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
              <div className="mt-5 w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 pr-30">


                  <div className="shadow-md rounded-2xl py-3.25 px-3.25 flex items-center motion-preset-slide-up w-full h-40 ">
                    <img src={patientprofilepicture} className="w-35 h-35 rounded-2xl"/>
                    <div className="h-full w-full flex flex-col items-start">
                        <h1 className="">Tom Ford TF5841-B 028 Eyeglasses</h1>

                    </div>
                  </div>

                  
              

              </div>
          </div>

          </div>

          )}


          { activeorderstable === 'bautistaorderstable' && ( <div id="bautistaorderstable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] h-[83%] rounded-2xl mt-5" >

                          <div className="p-3  rounded-2xl w-[20%] h-auto  mr-2 overflow-y-auto overflow-x-hidden">
                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by status</h1></div>

                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">All</h1></div>
                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">Pending</h1></div>
                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl  py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">Ready for Pickup</h1></div>
                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl  py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">Completed</h1></div>
                <div   className="mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl  py-2 text-center flex justify-center items-center "><h1 className= "font-albertsans font-semibold text-[#1f1f1f] ">Cancelled</h1></div>


          </div>
          <div className=" flex flex-col justify-start items-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">
              <div className="ml-6 flex justify-center items-center"><h2 className="font-albertsans font-bold text-[18px] text-[#383838] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input  type="text" placeholder="Enter product name here..."   className="transition-all duration-300 ease-in-out py-2 pl-10 w-250 rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
              <div className=" w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 ">


              
              

              </div>
          </div>


          </div>)}







              </div> 

       </div>
      

      </div>

















      
        </section>



    </>
   )
  }
        
export default PatientOrders