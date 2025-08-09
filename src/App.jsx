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
import landinglogo from "./assets/images/landinglogo.png";
import ambherlogo from "./assets/images/ambherlogo.png";
import bautistalogo from "./assets/images/bautistalogo.png";
import sendchatambher from "./assets/images/sendchatambher.png";
import sendchatbautista from "./assets/images/sendchatbautista.png";


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
  const [showpatientambherConversation, setshowpatientambherConversation] = useState(false);
  const [showpatientbautistaConversation, setshowpatientbautistaConversation] = useState(false);













  useEffect(() => {


    const checkpatientAuth = () => {
      const patientemail = localStorage.getItem("patientemail");
      const patienttoken = localStorage.getItem("patienttoken");
      setispatientloggedIn(!!(patientemail && patienttoken));
    };

    checkpatientAuth();
    window.addEventListener("storage", checkpatientAuth);
    const interval = setInterval(checkpatientAuth, 500);



    return () => {
      window.removeEventListener("storage", checkpatientAuth);
      clearInterval(interval);
    };
  }, []);


  if (!ispatientloggedIn || !allowedRoutes.includes(location.pathname)) {
    return null;
  }


  return (
    <>
    <div className="fixed bottom-5  right-5 z-[9999] flex flex-col items-start  gap-2">
       {showpatientchatdashboard && (
       <div className="mb-6 motion-preset-slide-down  w-90 h-140 shadow-2xl z-[9999]    flex flex-col items-center justify-center   rounded-2xl bg-white">
        



        <div className={`min-h-12  max-h-12 w-full h-14 rounded-t-2xl flex justify-center items-center ${showpatientambherConversation ? "bg-[#39715f]" : 
                                                                                      showpatientbautistaConversation ? "bg-[#0a4277]"
                                                                                      : "bg-[#085f84]" }`} >
        
        {showpatientambherConversation ? <div className="flex px-2 w-full items-center"><img src={ambherlogo} className="w-15  px-2 py-1  "/><p className=" font-albertsans font-semibold  text-[17px] text-[#ffffff]">Ambher Optical</p></div> : 
         showpatientambherConversation ? <div className="flex px-2 w-full items-center"><img src={bautistalogo} className="w-15  px-2 py-1  "/><p className=" font-albertsans font-semibold  text-[17px] text-[#ffffff]">Bautista Eye Center</p></div> :
         <img src={landinglogo} className="w-40  px-2 py-1  "/>}

        </div>



   

        {showpatientambherConversation === true || showpatientbautistaConversation === true ? (

          null
        ):(
           <div className="gap-3 flex flex-col justify-center items-center w-full h-full  p-4">  
            <p className="text-[20px] font-albertsans font-semibold text-gray-800">Chat with us</p>
            <div className="flex  gap-3">

                <div onClick={() => setshowpatientambherConversation(true)}  className="hover:shadow-md hover:bg-[#d8fdf0] hover:scale-105 transition-all duration-300 ease-in-out gap-2 cursor-pointer  flex flex-col justify-center items-center w-40 h-40 rounded-md border-1 "><div><img src={ambherlogo} className="w-23  px-2 py-1  "/></div> <p className=" font-albertsans font-semibold  text-[15px] text-[#0a774a]">Ambher Optical</p> </div>
                <div onClick={() => setshowpatientbautistaConversation(true)}  className="hover:shadow-md hover:bg-[#d8f1fd] hover:scale-105 transition-all duration-300 ease-in-out gap-2 cursor-pointer flex flex-col justify-center items-center w-40 h-40 rounded-md border-1 " ><div><img src={bautistalogo} className="w-30  px-2 py-1  "/></div> <p className="font-albertsans font-semibold text-[15px] text-[#0a4277]">Bautista Eye Center</p> </div>

            </div>
          </div>
        )}


        {showpatientambherConversation && (

            <div className="pb-3 motion-scale-in-[0.51] motion-translate-x-in-[-17%] motion-translate-y-in-[2%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate gap-3 flex flex-col  items-start  w-full h-full  rounded-b-2xl ">
            <div id="conversationmessages" className="p-3 overflow-y-auto flex flex-col-reverse items-end  justify-start  w-full min-h-[88%]  ">
                


           
              <div id="patientmessage" className="  min-w-auto max-w-70 rounded-2xl break-all">
                  <div className="flex flex-col bg-[#c0eed6] items-center justify-end px-5 py-2 rounded-2xl">
                   <p className="text-[15px] font-albertsans font-semibold text-[#555555]">Hi I have concern</p>
                  </div>
                    <div className="mt-1  w-full flex justify-end items-end">
                    <p className="text-[12px] text-[#565656] mr-2" >Sent 16h ago</p>
                   </div>
                </div>

                   
             
                
              


               <div id="dateofconversation" className="mb-2 flex w-full  items-center justify-center px-5 py-2  rounded-2xl break-all">
                  <p className="text-[12px] font-albertsans font-semibold text-[#676767]">Wed 6:55 AM</p>

                </div>
     
   




            </div>
            <div className=" flex items-center w-full min-h-[12%] rounded-2xl bg-gray-200">
              <textarea className="w-full h-full p-2 rounded-2xl outline-none resize-none bg-gray-200" placeholder="Type your message..."></textarea>
              <img src={sendchatambher} alt="send" className="hover:scale-105 transition-all duration-300 ease-in-out h-10 w-10  p-2 cursor-pointer" />
            </div>
            </div> 

         
        )}




        </div>
      )}
    
    <div className="w-full justify-end flex items-end">
     {showpatientchatdashboard === true ? (
         <div  onClick={() => {setshowpatientbautistaConversation(false); setshowpatientambherConversation(false); setshowpatientchatdashboard(false);}}  className={`  motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#1583b3]`}  >
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




