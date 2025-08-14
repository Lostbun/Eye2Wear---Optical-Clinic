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
import documenticon from "./assets/images/documenticon.png";
import filesent from "./assets/images/filesent.png";
import leftarrow from "./assets/images/left-arrow.png";
import profileuser from "./assets/images/profile-user.png";

function PatientChatButton() {
  const apiUrl = import.meta.env.VITE_API_URL;
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
  const [, forceUpdate] = useState();
  const patientId = localStorage.getItem("patientid");
  const patientEmail = localStorage.getItem("patientemail");
  const patientName = localStorage.getItem("patientname");
  const [loading, setLoadingMessages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const currentuserprofilepicture = localStorage.getItem(`${localStorage.getItem('role')}profilepicture`);
  const [activeambhermessageslist, setactiveambhermessageslist] = useState('allambhermessageslist');
  const [pendingMessageId, setPendingMessageId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    socket.current = io(`${apiUrl}`, {
      auth: {
        token: token
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
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
        setMessages(prev => {
          if (!prev.some(msg => msg._id === newMessage._id || msg.temporaryId === newMessage.temporaryId)) {
            if (pendingMessageId && newMessage.temporaryId === pendingMessageId) {
              return prev.map(msg => 
                msg.temporaryId === pendingMessageId ? { ...msg, ...newMessage, temporaryId: undefined } : msg
              );
            }
            return [...prev, newMessage];
          }
          return prev;
        });
        setPendingMessageId(null);
      }
      if (localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner") {
        setPatients(prevPatients => {
          const updatedPatients = prevPatients.map(patient => {
            if (patient._id === newMessage.senderId || (selectedPatient && patient._id === selectedPatient._id)) {
              return { ...patient, latestMessage: newMessage };
            }
            return patient;
          });
          return updatedPatients.sort((a, b) => {
            if (!a.latestMessage && !b.latestMessage) return 0;
            if (!a.latestMessage) return 1;
            if (!b.latestMessage) return -1;
            return new Date(b.latestMessage.createdAt) - new Date(a.latestMessage.createdAt);
          });
        });
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [conversationId, selectedPatient]);

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

  const startConversation = async (clinic, patientId = null) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const userId = localStorage.getItem('patientid') || 
                    localStorage.getItem('staffid') || 
                    localStorage.getItem('ownerid');
      const role = localStorage.getItem('role');

      const response = await fetch(`${apiUrl}/api/messages/conversations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch conversations:', response.status, response.statusText);
        return;
      }

      const conversations = await response.json();
      let existingConversation;

      if (role === 'staff' || role === 'owner') {
        existingConversation = conversations.find(conv => 
          conv.clinic === clinic &&
          (patientId 
            ? conv.participants.some(p => p.userId === patientId && p.role === 'patient')
            : conv.participants.some(p => p.role === 'clinic' && p.clinic === clinic)
          )
        );
      } else {
        existingConversation = conversations.find(conv => 
          conv.clinic === clinic &&
          conv.participants.some(p => p.userId === userId && p.role === role)
        );
      }

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

      const response = await fetch(`${apiUrl}/api/messages/${convId}`, {
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
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('patientid') || 
                    localStorage.getItem('staffid') || 
                    localStorage.getItem('ownerid');
      
      const temporaryId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      const optimisticMessage = {
        temporaryId,
        text: message.trim() || '',
        imageUrl: selectedFile?.isImage ? URL.createObjectURL(selectedFile.file) : null,
        documentUrl: selectedFile && !selectedFile.isImage ? selectedFile.name : null,
        senderId: userId,
        senderRole: role,
        senderName: patientName || 'You',
        createdAt: new Date().toISOString(),
        conversationId
      };
      
      setMessages(prev => [...prev, optimisticMessage]);
      setPendingMessageId(temporaryId);
      setMessage("");
      setSelectedFile(null);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      const formData = new FormData();
      if (conversationId) formData.append('conversationId', conversationId);
      if (message.trim()) formData.append('text', message);
      formData.append('temporaryId', temporaryId);
      
      if (role === 'patient') {
        formData.append('clinic', clinic);
      }
      
      if (selectedPatient) {
        formData.append('patientId', selectedPatient._id);
      }
      
      if (selectedFile) {
        formData.append('file', selectedFile.file);
      }

      formData.append('senderId', userId);
      formData.append('senderRole', role);

      const response = await fetch(`${apiUrl}/api/messages`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}` 
        },
        body: formData
      });

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
      
      setMessages(prev => prev.map(msg => 
        msg.temporaryId === temporaryId ? { ...msg, ...data, temporaryId: undefined } : msg
      ));
      
      setTimeout(scrollToBottom, 100);

      if (localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner") {
        setPatients(prevPatients => {
          const updatedPatients = prevPatients.map(patient => {
            if (patient._id === selectedPatient?._id) {
              return { ...patient, latestMessage: data };
            }
            return patient;
          });
          return updatedPatients.sort((a, b) => {
            if (!a.latestMessage && !b.latestMessage) return 0;
            if (!a.latestMessage) return 1;
            if (!b.latestMessage) return -1;
            return new Date(b.latestMessage.createdAt) - new Date(a.latestMessage.createdAt);
          });
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.filter(msg => msg.temporaryId !== temporaryId));
      setPendingMessageId(null);
      alert(`Error: ${error.message}`);
    }
  };



  useEffect(() => {
    if (showpatientchatdashboard && (localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner")) {
      fetchPatients();
    }
  }, [showpatientchatdashboard]);

  const renderMessageContent = (msg, isCurrentUser) => {
    return (
      <>
        {msg.text && (
          <p className="text-[15px] font-albertsans font-semibold text-[#555555] whitespace-pre-wrap break-words">
            {msg.text}
          </p>
        )}
        {msg.imageUrl && (
          <img 
            src={`${apiUrl}${msg.imageUrl}`} 
            alt="Uploaded content" 
            className="max-w-full max-h-60 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {
              setSelectedImageForModal(`${apiUrl}${msg.imageUrl}`);
              setModalOpen(true);
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/path-to-placeholder-image.png';
            }}
          />
        )}
        {msg.documentUrl && (
          <div className="mt-2 p-2 bg-gray-100 rounded-lg flex items-center w-full">
            <img src={filesent} className="w-6 h-6 mr-2 flex-shrink-0" />
            <a 
              href={`${apiUrl}${msg.documentUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
              download={msg.documentName || msg.documentUrl.split('/').pop()}
            >
              {msg.documentName || msg.documentUrl.split('/').pop()}
            </a>
          </div>
        )}
        {!msg.imageUrl && (
          <div className={`motion-preset-slide-up rounded-2xl absolute bottom-full mb-1 hidden group-hover:block bg-black bg-opacity-75 text-white text-xs px-2 py-1 whitespace-nowrap ${isCurrentUser ? 'right-0' : 'left-0'}`}>
            {formatDate(msg.createdAt)} at {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        )}
      </>
    );
  };

  const getLatestMessageDisplay = (patient, messages) => {
    if (!messages || messages.length === 0) return "No messages yet";
    
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.imageUrl) {
      return `${latestMessage.senderName || patient.patientfirstname} sent a photo`;
    }
    if (latestMessage.documentUrl) {
      return `${latestMessage.senderName || patient.patientfirstname} sent a document`;
    }
    return latestMessage.text || "No messages yet";
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

  const showambhermessageslist = (ambhermessageslistid) => {
    setactiveambhermessageslist(ambhermessageslistid);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    startConversation("Ambher Optical", patient._id); 
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

      {localStorage.getItem("role") === "patient" && (
        <div className="fixed bottom-5 right-5 z-[99] flex flex-col items-start gap-2">
          {showpatientchatdashboard && (
            <div className="mb-6 motion-preset-slide-down w-90 h-140 shadow-2xl z-[9999] flex flex-col items-center justify-center rounded-2xl bg-white">
              <div className={`min-h-12 max-h-12 w-full h-14 rounded-t-2xl flex justify-center items-center ${
                showpatientambherConversation ? "bg-[#39715f]" : 
                showpatientbautistaConversation ? "bg-[#0a4277]" : 
                "bg-[#085f84]"
              }`}>
                {showpatientambherConversation ? (
                  <div className="flex px-2 w-full items-center">
                    <img src={leftarrow} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out w-5 h-5 mr-2" onClick={() => {setMessages([]); setSelectedImage(null); setSelectedFile(null); setshowpatientambherConversation(false);}}/>
                    <img src={ambherlogo} className="w-15 px-2 py-1"/>
                    <p className="font-albertsans font-semibold text-[17px] text-[#ffffff]">Ambher Optical</p>
                  </div>
                ) : showpatientbautistaConversation ? (
                  <div className="flex px-2 w-full items-center">
                    <img src={leftarrow} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out w-5 h-5 mr-2" onClick={() => {setMessages([]); setSelectedImage(null); setSelectedFile(null); setshowpatientbautistaConversation(false);}}/>
                    <img src={bautistalogo} className="w-15 px-2 py-1"/>
                    <p className="font-albertsans font-semibold text-[17px] text-[#ffffff]">Bautista Eye Center</p>
                  </div>
                ) : (
                  <img src={landinglogo} className="w-40 px-2 py-1"/>
                )}
              </div>

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

              {(showpatientambherConversation || showpatientbautistaConversation) && (
                <div className="flex flex-col items-end w-full h-[530px] rounded-b-2xl">
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
  const isStaffOrOwner = msg.senderRole === 'staff' || msg.senderRole === 'owner';
  const isSameSenderAsPrevious = index > 0 && 
    messages[index - 1].senderId === msg.senderId;
  const isSameSenderAsNext = index < messages.length - 1 && 
    messages[index + 1].senderId === msg.senderId;
  
  let borderRadiusClasses = '';
  if (isStaffOrOwner) {
    borderRadiusClasses = !isSameSenderAsPrevious && !isSameSenderAsNext ? 'rounded-2xl' :
      !isSameSenderAsPrevious ? 'rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl' :
      !isSameSenderAsNext ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl' :
      'rounded-tl-2xl rounded-bl-2xl';
  } else {
    borderRadiusClasses = !isSameSenderAsPrevious && !isSameSenderAsNext ? 'rounded-2xl' :
      !isSameSenderAsPrevious ? 'rounded-tr-2xl rounded-br-2xl rounded-tl-2xl' :
      !isSameSenderAsNext ? 'rounded-tr-2xl rounded-br-2xl rounded-bl-2xl' :
      'rounded-tr-2xl rounded-br-2xl';
  }

  const isImageOnly = msg.imageUrl && !msg.text && !msg.documentUrl;
  const isLastInSequence = !isSameSenderAsNext;
  const profilePicture = selectedPatient && !isStaffOrOwner 
    ? (selectedPatient.patientprofilepicture || profileuser) 
    : (msg.clinic === "Ambher Optical" ? ambherlogo : bautistalogo);

  return (
    <div 
      key={msg._id || msg.temporaryId}
      className={`w-full flex ${isStaffOrOwner ? 'justify-end' : 'justify-start'} ${index === messages.length - 1 ? '' : 'mb-2'}`}
    >
      <div className={`flex-shrink-0 ${isStaffOrOwner ? 'order-1 ml-2' : 'order-0 mr-2'} ${isLastInSequence ? 'visible' : 'invisible'}`}>
        {!isStaffOrOwner && (
          <img 
            src={profilePicture} 
            alt="Profile picture"
            className="w-8 h-8 self-end rounded-full"
            onError={(e) => { e.target.src = profileuser }}
          />
        )}
      </div>

      {/* Message content */}
      <div className={`max-w-[80%] ${isStaffOrOwner ? 'order-0' : 'order-1'}`}>
        {isImageOnly ? (
          renderMessageContent(msg, isStaffOrOwner)
        ) : (
          <div 
            className={`flex flex-col px-5 py-2 ${
              isStaffOrOwner ? 'bg-[#c0eed6]' : 'bg-[#e0e0e0]'
            } ${borderRadiusClasses} relative group`}
            style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap'
            }}
          >
            {!isSameSenderAsPrevious && (
              <p className="text-xs font-semibold text-gray-600 mb-1">
                {msg.senderName}
              </p>
            )}
            
            {renderMessageContent(msg, isStaffOrOwner)}
            
            {index === messages.length - 1 && (
              <div className="mt-1 w-full flex justify-end">
                <p className="text-[12px] text-[#565656]">
                  {formatDate(msg.createdAt)} at {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            )}
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

                  <div className="px-2 pb-2 flex flex-col w-full rounded-2xl mt-auto">
                    <div className="bg-gray-200 rounded-2xl p-3 pb-3 flex items-center w-full h-16">
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
      )}

      {(localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner") && (localStorage.getItem("staffclinic") === "Ambher Optical" || localStorage.getItem("ownerclinic") === "Ambher Optical") && (
        <div className="fixed bottom-5 right-5 z-[99] flex flex-col items-start gap-2">
          {showpatientchatdashboard && (
            <div className="mb-6 motion-preset-slide-down w-250 h-150 shadow-2xl z-[9999] flex flex-col rounded-2xl bg-white">
              <div className="min-h-12 max-h-12 w-full h-14 rounded-t-2xl flex justify-center items-center bg-[#39715f]">
                <div className="flex px-2 w-full items-center">
                  <img src={ambherlogo} className="w-15 px-2 py-1"/>
                  <p className="font-albertsans font-semibold text-[17px] text-[#ffffff]">Ambher Optical</p>
                </div>
              </div>

              <div className="p-2 gap-2 w-full h-full rounded-b-2xl flex items-center justify-center">
                <div className="rounded-2xl h-full w-[30%] flex flex-col items-start">
                  <div className="rounded-2xl h-[10%] w-full flex justify-center items-center">
                    <div className="flex items-center justify-center w-full h-full">
                      <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        className="transition-all duration-300 ease-in-out py-3 pl-10 w-250 rounded-2xl bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"
                      />
                    </div>
                  </div>

                  <div className="gap-3 flex items-center rounded-2xl h-[9%] w-full">
                    <div 
                      onClick={() => showambhermessageslist('allambhermessageslist')} 
                      className={`cursor-pointer h-[90%] w-[90%] mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl text-center flex justify-center items-center ${activeambhermessageslist ==='allambhermessageslist' ? 'bg-[#7E996D] rounded-2xl' : ''}`}
                    >
                      <h1 className={`font-albertsans font-semibold text-[#5d5d5d] ${activeambhermessageslist ==='allambhermessageslist' ? 'text-white' : ''}`}>All</h1>
                    </div>
                    <div 
                      onClick={() => showambhermessageslist('unreadambhermessageslist')} 
                      className={`cursor-pointer ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl h-[90%] w-[90%] text-center flex justify-center items-center ${activeambhermessageslist ==='unreadambhermessageslist' ? 'bg-[#7E996D] rounded-2xl' : ''}`}
                    >
                      <h1 className={`font-albertsans font-semibold text-[#5d5d5d] ${activeambhermessageslist ==='unreadambhermessageslist' ? 'text-white' : ''}`}>Unread</h1>
                    </div>
                  </div>

                  <div className="pt-3  gap-1 px-2 flex flex-col rounded-2xl min-h-[72%] w-full max-h-[72%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    <div 
                      className="p-2 flex items-center justify-start w-full h-15 border-1 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 rounded-2xl"
                      onClick={() => startConversation("Bautista Eye Center")}
                    >
                      <img src={bautistalogo} className="w-13 h-7"/>
                      <div className="w-[76%] flex flex-col justify-center items-start ml-3">
                        <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a] truncate overflow-hidden whitespace-nowrap w-full">Bautista Eye Center</p>
                        <p className="font-albertsans font-medium text-[13px] text-[#555555] truncate overflow-hidden whitespace-nowrap w-full">
                          {getLatestMessageDisplay({ patientfirstname: "Bautista" }, messages)}
                        </p>
                      </div>
                    </div>
                    {patients.map((patient) => (
                      <div 
                        key={patient._id}
                        className="p-2 flex items-center justify-start w-full h-19 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer rounded-2xl"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <img 
                          src={patient.patientprofilepicture || profileuser} 
                          className="w-13 h-13 rounded-full"
                          onError={(e) => { e.target.src = profileuser }}
                        />
                        <div className="w-[76%] flex flex-col justify-center items-start ml-3">
                          <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a] truncate overflow-hidden whitespace-nowrap w-full">
                            {`${patient.patientfirstname} ${patient.patientlastname}`}
                          </p>
                          <p className="font-albertsans font-medium text-[13px] text-[#555555] truncate overflow-hidden whitespace-nowrap w-full">
                            {getLatestMessageDisplay(patient, patient.latestMessage ? [patient.latestMessage] : [])}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col rounded-2xl h-full w-[70%] border-1">
                  <div className="shadow-md pt-0.5 pb-0.5 pl-3 rounded-t-2xl border-1 h-[11%] w-full flex item-center justify-start">
                    <div className="flex items-center justify-center">
                      <img 
                        src={selectedPatient ? (selectedPatient.patientprofilepicture || profileuser) : profileuser} 
                        className="w-12 h-12 rounded-full"
                        onError={(e) => { e.target.src = profileuser }}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start ml-3">
                      <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a]">
                        {selectedPatient ? `${selectedPatient.patientfirstname} ${selectedPatient.patientlastname}` : "Select a patient"}
                      </p>
                    </div>
                  </div>
                  <div className="pb-2  h-full w-full overflow-y-auto" style={{ maxHeight: '400px' }}>
                    <div  className=" px-3  h-[100%] w-full overflow-y-auto" style={{ maxHeight: '400px' }}>
                    {loading ? (
                      <div className="w-full flex justify-center items-center h-full text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39715f]"></div>
                      </div>
                    ) : messages.length > 0 ? (messages.map((msg, index) => {
  const isStaffOrOwner = msg.senderRole === 'staff' || msg.senderRole === 'owner';
  const isSameSenderAsPrevious = index > 0 && 
    messages[index - 1].senderId === msg.senderId;
  const isSameSenderAsNext = index < messages.length - 1 && 
    messages[index + 1].senderId === msg.senderId;
  
  let borderRadiusClasses = '';
  if (isStaffOrOwner) {
    borderRadiusClasses = !isSameSenderAsPrevious && !isSameSenderAsNext ? 'rounded-2xl' :
      !isSameSenderAsPrevious ? 'rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl' :
      !isSameSenderAsNext ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl' :
      'rounded-tl-2xl rounded-bl-2xl';
  } else {
    borderRadiusClasses = !isSameSenderAsPrevious && !isSameSenderAsNext ? 'rounded-2xl' :
      !isSameSenderAsPrevious ? 'rounded-tr-2xl rounded-br-2xl rounded-tl-2xl' :
      !isSameSenderAsNext ? 'rounded-tr-2xl rounded-br-2xl rounded-bl-2xl' :
      'rounded-tr-2xl rounded-br-2xl';
  }

  const isImageOnly = msg.imageUrl && !msg.text && !msg.documentUrl;
  const isLastInSequence = !isSameSenderAsNext;
  const profilePicture = selectedPatient && !isStaffOrOwner 
    ? (selectedPatient.patientprofilepicture || profileuser) 
    : (msg.clinic === "Ambher Optical" ? ambherlogo : bautistalogo);

  return (
    <div 
      key={msg._id || msg.temporaryId}
      className={`w-full flex ${isStaffOrOwner ? 'justify-end' : 'justify-start'} ${index === messages.length - 1 ? '' : ''}`}
    >
      {/* Profile picture container - always rendered but hidden if not last in sequence */}
      <div className={`flex-shrink-0 ${isStaffOrOwner ? 'order-1 ml-2' : 'order-0 mr-2'} ${isLastInSequence ? 'visible' : 'invisible'}`}>
        {!isStaffOrOwner && (
          <img 
            src={profilePicture} 
            alt="Profile picture"
            className="w-8 h-8 self-end rounded-full"
            onError={(e) => { e.target.src = profileuser }}
          />
        )}
      </div>

      {/* Message content */}
      <div className={`max-w-[80%] ${isStaffOrOwner ? 'order-0' : 'order-1'}`}>
        {isImageOnly ? (
          renderMessageContent(msg, isStaffOrOwner)
        ) : (
          <div 
            className={`flex flex-col px-5 py-2 ${
              isStaffOrOwner ? 'bg-[#c0eed6]' : 'bg-[#e0e0e0]'
            } ${borderRadiusClasses} relative group`}
            style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap'
            }}
          >
            {!isSameSenderAsPrevious && (
              <p className="text-xs font-semibold text-gray-600 mb-1">
                {msg.senderName}
              </p>
            )}
            
            {renderMessageContent(msg, isStaffOrOwner)}
            
            {index === messages.length - 1 && (
              <div className="mt-1 w-full flex justify-end">
                <p className="text-[12px] text-[#565656]">
                  {formatDate(msg.createdAt)} at {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            )}
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
   </div>
                  <div className=" px-2 pb-2 flex flex-col w-full rounded-2xl">
                    <div className="bg-gray-200 rounded-2xl p-3 pb-3 flex items-center w-full h-16">
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

                      {selectedFile?.isImage && (
                        <div className="flex-shrink-0 relative mr-2">
                          <img 
                            src={selectedFile.preview} 
                            alt="Preview" 
                            className="w-11 h-11 object-cover rounded cursor-pointer"
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

                      <img 
                        src={sendchatambher}
                        alt="send" 
                        className="hover:scale-105 transition-all duration-300 ease-in-out h-10 w-10 p-2 cursor-pointer flex-shrink-0" 
                        onClick={handleSendMessage}
                      />
                    </div>
                  </div>
             
                </div>
              </div>
            </div>
          )}

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
                  setSelectedPatient(null);
                }} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#39715f]"
              >
                <img src={close} alt="logo" className="select-none motion-preset-shake w-10 h-10 p-2" />
              </div>
            ) : (
              <div 
                onClick={() => setshowpatientchatdashboard(true)} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#39715f]"
              >
                <img src={chat} alt="logo" className="select-none motion-preset-seesaw w-10 h-10 p-2" />
              </div>
            )}
          </div>
        </div>
      )}
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