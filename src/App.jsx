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
import closeimage from "./assets/images/cancelimage.png";
import addimage from "./assets/images/addimage.png";
import documenticon from "./assets/images/documenticon.png";
import filesent from "./assets/images/filesent.png";
import leftarrow from "./assets/images/left-arrow.png";











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
  const fileInputRef = useRef(null);
  const [, forceUpdate] = useState(); // For forcing re-render when file is selected
  const patientId = localStorage.getItem("patientid");
  const patientEmail = localStorage.getItem("patientemail");
  const patientName = localStorage.getItem("patientname");
  const [loading, setLoadingMessages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);





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

    socket.current.on('newMessage', (newMessage) => {
      if (newMessage.conversationId === conversationId) {
        setMessages(prev => [...prev, newMessage]);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
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
      const existingConversation = conversations.find(conv => 
        conv.clinic.toLowerCase() === clinic.toLowerCase()
      );

      if (existingConversation) {
        setConversationId(existingConversation._id);
        socket.current.emit('joinConversation', existingConversation._id);
        await loadMessages(existingConversation._id);
      } else {
        setConversationId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const loadMessages = async (convId) => {
    try {
      setLoadingMessages(true);
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
      setLoadingMessages(false);
    }
  };

const handleSendMessage = async () => {
  if (!message.trim() && !selectedFile) return;

  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const clinic = showpatientambherConversation ? "Ambher Optical" : "Bautista Eye Center";
    
    const formData = new FormData();
    if (conversationId) formData.append('conversationId', conversationId);
    if (message.trim()) formData.append('text', message);
    formData.append('clinic', clinic);
    
    // Always use 'file' as the field name
    if (selectedFile) {
      formData.append('file', selectedFile.file);
    }

    const response = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${token}` 
        // Let browser set Content-Type automatically
      },
      body: formData
    });

    // Handle response properly
    const responseText = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || 'Failed to send message');
      } catch {
        throw new Error(responseText || 'Failed to send message');
      }
    }

    const data = JSON.parse(responseText);
    setMessage("");
    setSelectedFile(null);
    
    // Handle successful response
  } catch (error) {
    console.error("Error sending message:", error);
    // Show error to user
    alert(`Error: ${error.message}`);
  }
};
// Update your Socket.IO effect
useEffect(() => {
  if (!socket.current) return;

  const handleNewMessage = (newMessage) => {
    // Check if this is a new message for the current conversation
    if (newMessage.conversationId === conversationId) {
      setMessages(prev => {
        // Prevent duplicates by checking if message already exists
        if (!prev.some(msg => msg._id === newMessage._id)) {
          return [...prev, newMessage];
        }
        return prev;
      });
    }
  };

  socket.current.on('newMessage', handleNewMessage);
  
  return () => {
    socket.current.off('newMessage', handleNewMessage);
  };
}, [conversationId]); // Only recreate when conversationId changes


useEffect(() => {
  return () => {
    if (selectedImage?.preview) {
      URL.revokeObjectURL(selectedImage.preview);
    }
  };
}, [selectedImage]);

// Update the renderMessageContent function
const renderMessageContent = (msg) => {
  return (
    <>
      {msg.text && (
        <p className="text-[15px] font-albertsans font-semibold text-[#555555] whitespace-pre-wrap break-words">
          {msg.text}
        </p>
      )}
      {msg.imageUrl && (
        <div className="mt-2">
          <img 
            src={`http://localhost:3000${msg.imageUrl}`} 
            alt="Uploaded content" 
            className="max-w-full max-h-60 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {
              setSelectedImageForModal(`http://localhost:3000${msg.imageUrl}`);
              setModalOpen(true);
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/path-to-placeholder-image.png';
            }}
          />
        </div>
      )}
      {msg.documentUrl && (
        <div className="mt-2 p-2 bg-gray-100 rounded-lg flex items-center w-full">
          <img src={filesent} className="w-6 h-6 mr-2 flex-shrink-0" />
          <a 
            href={`http://localhost:3000${msg.documentUrl}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
            download={msg.documentName || msg.documentUrl.split('/').pop()}
          >
            {msg.documentName || msg.documentUrl.split('/').pop()}
          </a>
        </div>
      )}
    </>
  );
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  


const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const isImage = file.type.startsWith('image/');
    
    setSelectedFile({
      file: file,
      preview: isImage ? URL.createObjectURL(file) : null,
      isImage: isImage,
      name: file.name
    });
  }
};


const shortenFileName = (name) => {
  if (name.length <= 20) return name;
  return `${name.substring(0, 10)}...${name.substring(name.length - 7)}`;
};


const cancelImage = () => {
  setSelectedImage(null);
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};


useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && modalOpen) {
      setModalOpen(false);
    }
  };

  // Add event listener when modal is open
  if (modalOpen) {
    window.addEventListener('keydown', handleKeyDown);
  }

  // Clean up the event listener
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [modalOpen]);





const cancelFile = () => {
  if (selectedFile?.preview) {
    URL.revokeObjectURL(selectedFile.preview);
  }
  setSelectedFile(null);
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
  forceUpdate(); 
};



















  return (
        <>

{modalOpen && (
  <div className="motion-preset-fade-md fixed inset-0 bg-[#040404e2] flex items-center justify-center z-[99999]">
    <img src={close} onClick={() => setModalOpen(false)} className="w-7 h-7 absolute top-5 right-5"/>
    <div className="relative max-w-4xl max-h-[90vh]">
      <img 
        src={selectedImageForModal} 
        alt="Full size preview" 
        className="max-w-full max-h-[90vh] object-contain"
      />

    </div>
  </div>
)}


      <div className="fixed bottom-5 right-5 z-[99] flex flex-col items-start gap-2">
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
                  <img src={leftarrow} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out w-5 h-5 mr-2" onClick={()=> {setMessages([]); setSelectedImage(null); setSelectedFile(null);setshowpatientambherConversation(false);}}/>
                  <img src={ambherlogo} className="w-15 px-2 py-1"/>
                  <p className="font-albertsans font-semibold text-[17px] text-[#ffffff]">Ambher Optical</p>
                </div>
              ) : showpatientbautistaConversation ? (
                <div className="flex px-2 w-full items-center">
                  <img src={leftarrow} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out w-5 h-5 mr-2" onClick={()=> {setMessages([]); setSelectedImage(null); setSelectedFile(null); setshowpatientbautistaConversation(false);}}/>
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
              <div className="flex flex-col items-end w-full h-[530px] rounded-b-2xl">
                {/* Messages Container */}
                <div 
                  id="conversationmessages" 
                  className="px-3 pb-3 pt-10 overflow-y-auto w-full flex-grow" 
                  style={{ maxHeight: '430px' }}
                >
                  {loading ? (
                    <div className="w-full flex justify-center items-center h-full text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1583b3]"></div>
                    </div>
                  ) : messages.length > 0 ? (
                    messages.map((msg, index) => {
                      const isSameSenderAsPrevious = index > 0 && 
                        messages[index - 1].senderId === msg.senderId;
                      const isSameSenderAsNext = index < messages.length - 1 && 
                        messages[index + 1].senderId === msg.senderId;
                      
                      let borderRadiusClasses = '';
                      if (msg.senderId === patientId) {
                        if (!isSameSenderAsPrevious && !isSameSenderAsNext) {
                          borderRadiusClasses = 'rounded-2xl';
                        } else if (!isSameSenderAsPrevious && isSameSenderAsNext) {
                          borderRadiusClasses = 'rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl';
                        } else if (isSameSenderAsPrevious && !isSameSenderAsNext) {
                          borderRadiusClasses = 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl';
                        } else {
                          borderRadiusClasses = 'rounded-tl-2xl rounded-bl-2xl';
                        }
                      } else {
                        if (!isSameSenderAsPrevious && !isSameSenderAsNext) {
                          borderRadiusClasses = 'rounded-2xl';
                        } else if (!isSameSenderAsPrevious && isSameSenderAsNext) {
                          borderRadiusClasses = 'rounded-tr-2xl rounded-br-2xl rounded-tl-2xl';
                        } else if (isSameSenderAsPrevious && !isSameSenderAsNext) {
                          borderRadiusClasses = 'rounded-tr-2xl rounded-br-2xl rounded-bl-2xl';
                        } else {
                          borderRadiusClasses = 'rounded-tr-2xl rounded-br-2xl';
                        }
                      }

                      return (
                        <div 
                          key={index}
                          className={`min-w-auto w-full flex cursor-pointer ${
                            msg.senderId === patientId ? 'justify-end' : 'justify-start'
                          } ${index === messages.length - 1 ? '' : 'pb-0'}`}
                        >
<div 
  className={`max-w-[80%] flex flex-col px-5 py-2 ${
    msg.senderId === patientId ? 'bg-[#e0e0e0]' : 'bg-[#c0eed6]'
  } ${borderRadiusClasses} relative group`}
  style={{
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap'
  }}
>
  {renderMessageContent(msg)}
                            <div className="motion-preset-slide-up rounded-2xl absolute bottom-full right-0 mb-1 hidden group-hover:block bg-black bg-opacity-75 text-white text-xs px-2 py-1 whitespace-nowrap">
                              {formatDate(msg.createdAt)} at {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            
                            {index === messages.length - 1 && (
                              <div className="mt-1 w-full flex justify-end">
                                <p className="text-[12px] text-[#565656]">
                                  {formatDate(msg.createdAt)} at {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full text-center text-gray-500 h-full flex items-center justify-center">
                      No messages yet. Start the conversation!
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

{/* Message Input */}
<div className="px-2 pb-2 flex flex-col w-full rounded-2xl mt-auto">
  <div className="bg-gray-200 rounded-2xl p-3 pb-3 flex items-center w-full h-16">
    {/* File upload button (only shown when no file is selected) */}
    {!selectedFile && (
      <label className="cursor-pointer p-2 mr-2">
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
          className="hidden"
          onChange={handleFileChange}
        />
        <img src={documenticon} className="w-7 h-7"/>
      </label>
    )}

    {/* Image preview (if image is selected) */}
    {selectedFile?.isImage && (
      <div className="flex-shrink-0 relative mr-2">
        <img 
          src={selectedFile.preview} 
          alt="Preview" 
          className="w-8 h-8 object-cover rounded cursor-pointer"
          onClick={() => {
            setSelectedImageForModal(selectedFile.preview);
            setModalOpen(true);
          }}
        />
        <img 
          onClick={cancelFile}
          src={closeimage} 
          alt="cancel" 
          className="absolute -top-2 -right-2 h-5 w-5 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out bg-white rounded-full p-0.5 shadow-sm"
        />
      </div>
    )}

    {/* Document preview (if document is selected) */}
    {selectedFile && !selectedFile.isImage && (
      <div className="flex items-center bg-gray-100 px-2 py-1 rounded mr-2 max-w-[100px]">
        <img src={filesent} className="w-5 h-5 mr-2 flex-shrink-0" />
        <span className="text-sm truncate">
          {selectedFile.name}
        </span>
        <img 
          onClick={cancelFile} 
          src={closeimage} 
          alt="cancel" 
          className="ml-2 h-4 w-4 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out flex-shrink-0"
        />
      </div>
    )}

    {/* Text input area */}
    <div className="flex-grow flex items-center">
      <textarea 
        className="w-full h-full p-2 outline-none resize-none bg-transparent" 
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
    </div>

    {/* Send button */}
    <img 
      src={showpatientambherConversation ? sendchatambher : sendchatbautista} 
      alt="send" 
      className="hover:scale-105 transition-all duration-300 ease-in-out h-10 w-10 p-2 cursor-pointer flex-shrink-0" 
      onClick={handleSendMessage}
    />
  </div>
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
                setSelectedImage(null); 
                setSelectedFile(null);
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




