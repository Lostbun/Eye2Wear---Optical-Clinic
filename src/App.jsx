import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
import { io } from "socket.io-client";



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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const patientId = localStorage.getItem("patientid");
  const patientEmail = localStorage.getItem("patientemail");
  const patientName = localStorage.getItem("patientname");
  const [loadingMessages, setLoadingMessages] = useState(false);


  



useEffect(() => {
  // Initialize socket connection
  socket.current = io("http://localhost:3000", {
    auth: {
      token: localStorage.getItem('token')
    }
  });

  socket.current.on('connect', () => {
    const userId = localStorage.getItem('patientid') || 
                  localStorage.getItem('staffid') || 
                  localStorage.getItem('ownerid');
    const role = localStorage.getItem('role');
    const clinic = localStorage.getItem('staffclinic') || 
                  localStorage.getItem('ownerclinic');

    if (userId && role) {
      socket.current.emit('joinConversations', userId, role, clinic);
    }
  });

  // ... rest of the code
}, [conversationId]);

  useEffect(() => {
    if (showpatientambherConversation || showpatientbautistaConversation) {
      const clinic = showpatientambherConversation ? "Ambher Optical" : "Bautista Eye Center";
      startConversation(clinic);
    }
  }, [showpatientambherConversation, showpatientbautistaConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

const startConversation = async (clinic) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch(`http://localhost:3000/api/messages/conversations`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch conversations:', response.status, response.statusText);
      return;
    }

    const conversations = await response.json();
    console.log('Conversations:', conversations); // Debug log

    // Add case-insensitive comparison here (solution #6)
    const existingConversation = conversations.find(conv => 
      conv.clinic.toLowerCase() === clinic.toLowerCase()
    );

    if (existingConversation) {
      console.log('Found conversation:', existingConversation); // Debug log
      setConversationId(existingConversation._id);
      socket.current.emit('joinConversation', existingConversation._id);
      await loadMessages(existingConversation._id);
    } else {
      console.log('No existing conversation found for clinic:', clinic); // Debug log
      setConversationId(null);
      setMessages([]);
    }
  } catch (error) {
    console.error("Error starting conversation:", error);
  }
};



const loadMessages = async (convId) => {
  try {
    setLoadingMessages(true); // Start loading

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setLoadingMessages(false);
      return;
    }

    const response = await fetch(`http://localhost:3000/api/messages/${convId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Session expired - please login again');
        setLoadingMessages(false);
        return;
      }
      throw new Error('Failed to load messages');
    }

    const loadedMessages = await response.json();
    setMessages(loadedMessages);
  } catch (error) {
    console.error("Error loading messages:", error);
  } finally {
    setLoadingMessages(false); // End loading
  }
};


const handleSendMessage = async () => {
  if (!message.trim()) return;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const clinic = showpatientambherConversation ? "Ambher Optical" : "Bautista Eye Center";
    const payload = conversationId 
      ? { conversationId, text: message }
      : { text: message, clinic };

    const response = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send message:', errorData.message);
      return;
    }

    const newMessage = await response.json();
    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    
    // If this was a new conversation, set the conversationId
    if (!conversationId && newMessage.conversationId) {
      setConversationId(newMessage.conversationId);
      socket.current.emit('joinConversation', newMessage.conversationId);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);




  return (
    <>
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-start gap-2">
        {showpatientchatdashboard && (
          <div className="mb-6 motion-preset-slide-down w-90 h-140 shadow-2xl z-[9999] flex flex-col items-center justify-center rounded-2xl bg-white">
            {/* Header */}
            <div className={`min-h-12 max-h-12 w-full h-14 rounded-t-2xl flex justify-center items-center ${
              showpatientambherConversation ? "bg-[#39715f]" : 
              showpatientbautistaConversation ? "bg-[#0a4277]" : 
              "bg-[#085f84]"
            }`}>
              {showpatientambherConversation ? (
                <div className="flex px-2 w-full items-center">
                  <img src={ambherlogo} className="w-15 px-2 py-1"/>
                  <p className="font-albertsans font-semibold text-[17px] text-[#ffffff]">Ambher Optical</p>
                </div>
              ) : showpatientbautistaConversation ? (
                <div className="flex px-2 w-full items-center">
                  <img src={bautistalogo} className="w-15 px-2 py-1"/>
                  <p className="font-albertsans font-semibold text-[17px] text-[#ffffff]">Bautista Eye Center</p>
                </div>
              ) : (
                <img src={landinglogo} className="w-40 px-2 py-1"/>
              )}
            </div>




            {/* Chat Selection */}
            {!(showpatientambherConversation || showpatientbautistaConversation) && (
              <div className="gap-3 flex flex-col justify-center items-center w-full h-full p-4">  
                <p className="text-[20px] font-albertsans font-semibold text-gray-800">Chat with us</p>
                <div className="flex gap-3">
                  <div 
                    onClick={() => setshowpatientambherConversation(true)} 
                    className="hover:shadow-md hover:bg-[#d8fdf0] hover:scale-105 transition-all duration-300 ease-in-out gap-2 cursor-pointer flex flex-col justify-center items-center w-40 h-40 rounded-md border-1">
                    <img src={ambherlogo} className="w-23 px-2 py-1"/>
                    <p className="font-albertsans font-semibold text-[15px] text-[#0a774a]">Ambher Optical</p>
                  </div>
                  <div 
                    onClick={() => setshowpatientbautistaConversation(true)} 
                    className="hover:shadow-md hover:bg-[#d8f1fd] hover:scale-105 transition-all duration-300 ease-in-out gap-2 cursor-pointer flex flex-col justify-center items-center w-40 h-40 rounded-md border-1">
                    <img src={bautistalogo} className="w-30 px-2 py-1"/>
                    <p className="font-albertsans font-semibold text-[15px] text-[#0a4277]">Bautista Eye Center</p>
                  </div>
                </div>
              </div>
            )}




            {/* Conversation Area */}
{(showpatientambherConversation || showpatientbautistaConversation) && (
  <div className="pb-3 gap-3 flex flex-col items-start w-full h-full rounded-b-2xl">
    <div className="w-full h-[450px] flex flex-col justify-between items-center">
      <div id="conversationmessages" className="p-3 overflow-y-auto flex flex-col-reverse justify-end w-full h-[450px]">
        {loadingMessages ? (
          <LoadingSpinner />
        ) : messages.length > 0 ? (
          [...messages]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((msg, index) => (
              <div 
                key={index}
                className={`w-full flex ${msg.senderId === patientId ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div 
                  className={`max-w-[70%] flex flex-col px-5 py-2 rounded-2xl ${
                    msg.senderId === patientId ? 'bg-[#c0eed6] text-right' : 'bg-[#e0e0e0] text-left'
                  }`}
                >
                  {msg.senderId !== patientId && (
                    <p className="text-[14px] font-bold text-[#333]">
                      {msg.senderName || (msg.senderClinic === 'Ambher Optical' ? 'Ambher Optical' : 'Bautista Eye Center')}
                    </p>
                  )}
                  <p className="text-[15px] font-albertsans font-semibold text-[#555555]">
                    {msg.text}
                  </p>
                  <div className="mt-1 w-full flex justify-end">
                    <p className="text-[12px] text-[#565656]">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="w-full text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
    
    {/* Message Input */}
    <div className="flex items-center w-full min-h-[12%] rounded-2xl bg-gray-200">
      <textarea 
        className="w-full h-full p-2 rounded-2xl outline-none resize-none bg-gray-200" 
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <img 
        src={showpatientambherConversation ? sendchatambher : sendchatbautista} 
        alt="send" 
        className="hover:scale-105 transition-all duration-300 ease-in-out h-10 w-10 p-2 cursor-pointer" 
        onClick={handleSendMessage}
      />
    </div>
  </div>
)}
          </div>
        )}

        {/* Chat Toggle Button */}
        <div className="w-full justify-end flex items-end">
          {showpatientchatdashboard ? (
            <div 
              onClick={() => {
                setshowpatientbautistaConversation(false);
                setshowpatientambherConversation(false);
                setshowpatientchatdashboard(false);
                setMessages([]);
              }} 
              className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#1583b3]"
            >
              <img src={close} alt="logo" className="select-none motion-preset-shake w-10 h-10 p-2" />
            </div>
          ) : (
            <div 
              onClick={() => setshowpatientchatdashboard(true)} 
              className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#1583b3]"
            >
              <img src={chat} alt="logo" className="select-none motion-preset-seesaw w-10 h-10 p-2" />
            </div>
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




