import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import chat from "../src/assets/images/chat.png";
import close from "../src/assets/images/close.png";
import PatientRegistration from "./PatientRegistration";
import UserLogin from "./UserLogin";
import PatientLandingpage from "./PatientLandingpage";
import PatientInformation from "./PatientInformation";
import AdminDashboard from "./AdminDashboard";
import ResetPassword from "./ResetPassword";
import PatientDashboard from "./PatientDashboard";
import PatientProducts from "./PatientProducts";
import PatientWishlist from "./PatientWishlist";
import PatientOrders from "./PatientOrders";



function PatientChatButton() {



  const location = useLocation();
  const [ispatientloggedIn, setispatientloggedIn] = useState(false);
  const allowedRoutes = [
    "/patientlandingpage",
    "/patientinformation",
    "/patientdashboard",
    "/patientproducts",
    "/patientwishlist",
    "/patientorders",
  ];
  const [showpatientchatdashboard, setshowpatientchatdashboard] = useState(false);













  useEffect(() => {


    const checkAuth = () => {
      const patientemail = localStorage.getItem("patientemail");
      const patienttoken = localStorage.getItem("patienttoken");
      setispatientloggedIn(!!(patientemail && patienttoken));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    const interval = setInterval(checkAuth, 500);



    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);


  if (!ispatientloggedIn || !allowedRoutes.includes(location.pathname)) {
    return null;
  }


  return (
    <>
    <div className="fixed bottom-5  right-5 z-[9999] flex flex-col gap-2">
       {showpatientchatdashboard && (
       <div className="  w-90 h-140 shadow-2xl z-[9999] motion-preset-slide-down   flex justify-center   rounded-2xl bg-white"         >

          <div className="w-full h-13 bg-[#1583b3] rounded-t-2xl flex justify-center items-center">

          </div>


        </div>
      )}
    
    <div className="w-full justify-end flex items-end">
     {showpatientchatdashboard === true ? (
         <div  onClick={() => setshowpatientchatdashboard(false)}  className={`  motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#1583b3]`}  >
          <img src={close} alt="logo" className="select-none motion-preset-shake    w-10 h-10 p-2" /></div>
        ):(
         <div  onClick={() => setshowpatientchatdashboard(true)}  className={`  motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#1583b3]`}  >
          <img src={chat} alt="logo" className="select-none motion-preset-seesaw  w-10 h-10 p-2" /></div>
        )}

      </div>




</div>




    </>
  );
}










export default function App() {
  return (
    <BrowserRouter>
      <PatientChatButton/>
      
      <Routes>
        <Route path="/patientregistration" element={<PatientRegistration />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/patientlandingpage" element={<PatientLandingpage />} />
        <Route path="/patientinformation" element={<PatientInformation />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/patientproducts" element={<PatientProducts />} />
        <Route path="/patientwishlist" element={<PatientWishlist />} />
        <Route path="/patientorders" element={<PatientOrders />} />
      </Routes>
    </BrowserRouter>
  );
}












{/*}

import './index.css'
import PatientRegistration from './PatientRegistration'
import UserLogin  from './UserLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PatientLandingpage from './PatientLandingpage'
import PatientInformation from './PatientInformation'
import AdminDashboard from './AdminDashboard'
import ResetPassword from './ResetPassword'
import PatientDashboard from './PatientDashboard'
import PatientProducts from './PatientProducts'
import PatientWishlist from './PatientWishlist'
import PatientOrders from './PatientOrders'

function App() {


  return (


        <BrowserRouter>
          <Routes>
            <Route path='/patientregistration' element={<PatientRegistration/>}> </Route>
            <Route path='/userlogin' element={<UserLogin/>}> </Route>
            <Route path='/patientlandingpage' element={<PatientLandingpage/>}></Route>
            <Route path='/patientinformation' element={<PatientInformation/>}></Route>
            <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
            <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
            <Route path='/patientdashboard' element={<PatientDashboard/>}></Route>
            <Route path='/patientproducts' element={<PatientProducts/>}></Route>
            <Route path='/patientwishlist' element={<PatientWishlist/>}></Route>
            <Route path='/patientorders' element={<PatientOrders/>}></Route>
          </Routes>
        </BrowserRouter>

  )
}

export default App


*/}




