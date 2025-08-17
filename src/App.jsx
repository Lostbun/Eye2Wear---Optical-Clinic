import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const messagesCache = useRef({});
  const [, forceUpdate] = useState();
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const patientId = localStorage.getItem("patientid");
  const patientEmail = localStorage.getItem("patientemail");
  const patientName = localStorage.getItem("patientname");
  
  // Update patient name in localStorage if not set
  useEffect(() => {
    if (localStorage.getItem('role') === 'patient' && !localStorage.getItem('patientfirstname')) {
      const patientDetails = localStorage.getItem('patientdetails');
      if (patientDetails) {
        try {
          const patient = JSON.parse(patientDetails);
          localStorage.setItem("patientfirstname", patient.patientfirstname || '');
          localStorage.setItem("patientlastname", patient.patientlastname || '');
          localStorage.setItem("patientname", `${patient.patientfirstname || ''} ${patient.patientlastname || ''}`.trim());
        } catch (error) {
          console.error('Error parsing patient details:', error);
        }
      }
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const currentuserprofilepicture = localStorage.getItem(`${localStorage.getItem('role')}profilepicture`);
  const [activeambhermessageslist, setactiveambhermessageslist] = useState('allambhermessageslist');
  const [pendingMessageId, setPendingMessageId] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messagesByConversation, setMessagesByConversation] = useState({});
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [latestMessagesByConversation, setLatestMessagesByConversation] = useState({});
  const fetchConversationsRef = useRef(null);

  // Debounce utility function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

// Improved fetchConversations function
const fetchConversations = useCallback(async () => {
  try {
    // Check if we already have conversations in memory
    if (conversations.length > 0) {
      console.log('Using existing conversations from memory');
      setLoadingConversations(false); // Ensure loading is false when using cached data
      return;
    }

    if (loadingConversations) {
      console.log('Conversations already loading, skipping fetch');
      return;
    }

    // Only show loading state if we actually need to fetch
    if (conversations.length === 0) {
      setLoadingConversations(true);
    }
    const token = localStorage.getItem('token');
    if (!token) return;

    console.log('Fetching conversations...');
    const response = await fetch(`${apiUrl}/api/messages/conversations`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error(`Failed to fetch conversations: ${response.status} ${response.statusText}`);

    const conversationsData = await response.json();
    console.log('Fetched conversations:', conversationsData);
    
    // Sort conversations by last message timestamp (newest first)
    const sortedConversations = conversationsData.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1; // Put conversations without messages at the end
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
    });
    
    setConversations(sortedConversations);

    // Update latest messages state
    const latestMsgs = {};
    const newMessagesByConversation = {};
    
    // Process each conversation and pre-load messages
    for (const conv of sortedConversations) {
      if (conv.lastMessage) {
        latestMsgs[conv._id] = conv.lastMessage;
      }
      
      // Load messages for each conversation
      try {
        console.log(`Pre-loading messages for conversation ${conv._id}`);
        const messagesResponse = await fetch(`${apiUrl}/api/messages/${conv._id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json();
          newMessagesByConversation[conv._id] = messagesData;
          console.log(`Loaded ${messagesData.length} messages for conversation ${conv._id}`);
        }
      } catch (error) {
        console.error(`Error loading messages for conversation ${conv._id}:`, error);
      }
    }
    
    setLatestMessagesByConversation(latestMsgs);
    setMessagesByConversation(newMessagesByConversation);
    
  } catch (error) {
    console.error("Error fetching conversations:", error);
  } finally {
    setLoadingConversations(false);
  }
}, [apiUrl]);



useEffect(() => {
  const role = localStorage.getItem('role');
  
  // Fix missing ownerid by extracting from ownerdetails
  if (role === 'owner' && !localStorage.getItem('ownerid')) {
    const ownerdetails = localStorage.getItem('ownerdetails');
    if (ownerdetails) {
      try {
        const ownerData = JSON.parse(ownerdetails);
        const ownerId = ownerData._id || ownerData.id;
        if (ownerId) {
          localStorage.setItem('ownerid', ownerId);
          console.log('Fixed missing ownerid:', ownerId);
          forceUpdate({}); // Force re-render after fixing
        }
      } catch (error) {
        console.error('Error parsing ownerdetails:', error);
      }
    }
  }
  
  // Fix missing staffid by extracting from staffdetails
  if (role === 'staff' && !localStorage.getItem('staffid')) {
    const staffdetails = localStorage.getItem('staffdetails');
    if (staffdetails) {
      try {
        const staffData = JSON.parse(staffdetails);
        const staffId = staffData._id || staffData.id;
        if (staffId) {
          localStorage.setItem('staffid', staffId);
          console.log('Fixed missing staffid:', staffId);
          forceUpdate({}); // Force re-render after fixing
        }
      } catch (error) {
        console.error('Error parsing staffdetails:', error);
      }
    }
  }
}, [location.pathname]); // Add location.pathname as dependency to run on route changes





  // Initialize debounced fetchConversations
  useEffect(() => {
    fetchConversationsRef.current = debounce(fetchConversations, 1000);
  }, [fetchConversations]);

  // Add cleanup function for component unmount
  useEffect(() => {
    return () => {
      if (socket.current) {
        console.log('Component unmounting, disconnecting socket');
        socket.current.disconnect();
      }
    };
  }, []);

  // Initialize socket connection when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, skipping socket initialization');
      return;
    }

    // Check if socket is already connected
    if (socket.current && socket.current.connected) {
      console.log('Socket already connected');
      return;
    }

    console.log('Initializing socket connection...');
  }, []); // Empty dependency array to run only once

  // Socket.IO connection and event handlers
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Prevent multiple socket connections
    if (socket.current && socket.current.connected) {
      console.log('Socket already connected, skipping initialization');
      return;
    }

    console.log('Initializing Socket.IO connection...');
    
    socket.current = io(apiUrl, {
      auth: {
        token: token
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      forceNew: false // Changed to false to prevent multiple connections
    });

socket.current.on('connect', () => {
  console.log('Socket.IO connected successfully');
  const userId = localStorage.getItem('patientid') || 
                localStorage.getItem('staffid') || 
                localStorage.getItem('ownerid');
  const role = localStorage.getItem('role');
  const clinic = localStorage.getItem('staffclinic') || 
                localStorage.getItem('ownerclinic');

  if (userId && role) {
    console.log('Joining conversations for user:', { userId, role, clinic });
    socket.current.emit('joinConversations', userId, role, clinic);
    
    // Also join all existing conversations
    conversations.forEach(conv => {
      socket.current.emit('joinConversation', conv._id);
    });
    
    fetchConversationsRef.current();
  }
});

    socket.current.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    socket.current.on('disconnect', (reason) => {
      console.log('Socket.IO disconnected:', reason);
    });

    socket.current.on('reconnect', (attemptNumber) => {
      console.log('Socket.IO reconnected after', attemptNumber, 'attempts');
      const userId = localStorage.getItem('patientid') || 
                    localStorage.getItem('staffid') || 
                    localStorage.getItem('ownerid');
      const role = localStorage.getItem('role');
      const clinic = localStorage.getItem('staffclinic') || 
                    localStorage.getItem('ownerclinic');

      if (userId && role) {
        socket.current.emit('joinConversations', userId, role, clinic);
        // Re-join current conversation if exists
        if (conversationId) {
          console.log('Re-joining conversation after reconnect:', conversationId);
          socket.current.emit('joinConversation', conversationId);
        }
      }
    });

    // Handle new messages
// Handle new messages
socket.current.on('newMessage', (newMessage) => {
  console.log('Received new message:', newMessage);
  
  // Update messages if it belongs to the current conversation
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

  // Update messagesByConversation state (don't filter here)
  setMessagesByConversation(prev => {
    const conversationMessages = prev[newMessage.conversationId] || [];
    if (!conversationMessages.some(msg => msg._id === newMessage._id || msg.temporaryId === newMessage.temporaryId)) {
      const updatedMessages = [...conversationMessages, newMessage];
      return {
        ...prev,
        [newMessage.conversationId]: updatedMessages
      };
    }
    return prev;
  });

  // Immediately update UI without loading states
  // Update latest message for this conversation
  setLatestMessagesByConversation(prev => ({
    ...prev,
    [newMessage.conversationId]: newMessage
  }));

  // Update conversations list with latest message and re-sort
  setConversations(prev => {
    const updatedConversations = prev.map(conv => {
      if (conv._id === newMessage.conversationId) {
        return { ...conv, lastMessage: newMessage };
      }
      return conv;
    });
    
    return updatedConversations.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
    });
    
    // Don't trigger loading state for updates
    setLoadingConversations(false);
    return updatedConversations;
  });

  // Update unread messages state if the chat is not open
  if (!showpatientchatdashboard && newMessage.sender !== patientId) {
    setHasUnreadMessages(true);
  }
});

    return () => {
      // Only disconnect if component is unmounting, not on every dependency change
      if (socket.current && !socket.current.connected) {
        console.log('Socket already disconnected');
      }
    };
  }, [apiUrl]); // Removed dependencies that cause unnecessary reconnections

  // Join conversation when conversationId changes
  useEffect(() => {
    if (conversationId && socket.current && socket.current.connected) {
      console.log('Joining conversation via Socket.IO:', conversationId);
      socket.current.emit('joinConversation', conversationId);
    } else if (conversationId && socket.current && !socket.current.connected) {
      console.log('Socket not connected, will join conversation when socket connects');
      // The conversation will be joined when socket reconnects
    }
  }, [conversationId]);

  // Handle socket connection and join conversation if needed
  useEffect(() => {
    if (conversationId && socket.current && socket.current.connected) {
      console.log('Socket connected, joining conversation:', conversationId);
      socket.current.emit('joinConversation', conversationId);
    }
  }, [socket.current?.connected, conversationId]);

  // Start conversation when clinic selection changes
  useEffect(() => {
    if (showpatientambherConversation || showpatientbautistaConversation) {
      const clinic = showpatientambherConversation ? "Ambher Optical" : "Bautista Eye Center";
      startConversation(clinic);
    }
  }, [showpatientambherConversation, showpatientbautistaConversation]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);





// Improved loadMessages function
const loadMessages = useCallback(async (targetConversationId, skipStateUpdate = false) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    console.log('Fetching messages for conversation:', targetConversationId);
    const response = await fetch(`${apiUrl}/api/messages/${targetConversationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch messages:', response.status, errorText);
      throw new Error(`Failed to fetch messages: ${errorText}`);
    }

    const data = await response.json();
    console.log('Fetched messages:', data);
    
    // Always update messagesByConversation
    setMessagesByConversation(prev => ({
      ...prev,
      [targetConversationId]: data
    }));
    
    // Only update current messages if this is the active conversation and not skipping
    if (!skipStateUpdate) {
      setMessages(data);
    }
    
    return data;
  } catch (error) {
    console.error('Error loading messages:', error);
    if (!skipStateUpdate) {
      setMessages([]);
    }
    return [];
  }
}, [apiUrl]);







  // Improved startConversation function
// Improved startConversation function
// Add this debug function at the top of your PatientChatButton component
const debugLocalStorage = () => {
  console.log('LocalStorage debug:', {
    role: localStorage.getItem('role'),
    patientid: localStorage.getItem('patientid'),
    staffid: localStorage.getItem('staffid'),
    ownerid: localStorage.getItem('ownerid'),
    ownername: localStorage.getItem('ownername'),
    ownerclinic: localStorage.getItem('ownerclinic'),
    token: localStorage.getItem('token') ? 'exists' : 'missing'
  });
};

// Update the startConversation function to better handle userId retrieval
const startConversation = useCallback(async (clinic, patientId = null) => {
  try {
    setLoading(true);
    setMessages([]);
    setSelectedClinic(clinic);
    setSelectedPatient(patientId ? patients.find(p => p._id === patientId) : null);

    // Debug localStorage
    debugLocalStorage();

    const loadingTimeout = setTimeout(() => {
      console.warn('Conversation loading timeout, clearing loading state');
      setLoading(false);
    }, 10000);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setLoading(false);
      clearTimeout(loadingTimeout);
      return;
    }

    const role = localStorage.getItem('role');
    const userId = localStorage.getItem(`${role}id`) || 
                   localStorage.getItem('patientid') || 
                   localStorage.getItem('staffid') || 
                   localStorage.getItem('ownerid');
    const userClinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');

    if (!userId) {
      console.error('No userId found for role:', role);
      setLoading(false);
      clearTimeout(loadingTimeout);
      return;
    }

    console.log('User identification:', { role, userId, patientId, userClinic });

    // Find existing conversation based on the scenario
    let existingConversation = null;
    const isClinicToClinic = !patientId && (role === 'staff' || role === 'owner') && clinic !== userClinic;

    if (role === 'patient') {
      // Patient messaging a clinic
      existingConversation = conversations.find(conv => 
        conv.participants.some(p => 
          p.userId === userId && p.role === 'patient'
        ) && 
        conv.participants.some(p => 
          p.role === 'clinic' && p.clinic === clinic
        )
      );
      console.log('Patient conversation search:', { 
        clinic, 
        userId, 
        role, 
        found: !!existingConversation, 
        conversationId: existingConversation?._id 
      });
    } else if (patientId) {
      // Staff/owner messaging a patient
      existingConversation = conversations.find(conv => 
        conv.participants.some(p => 
          p.userId === patientId && p.role === 'patient'
        ) && 
        conv.participants.some(p => 
          (p.userId === userId && p.role === role) || 
          (p.role === 'clinic' && p.clinic === userClinic)
        )
      );
      console.log('Staff/owner patient conversation search:', { 
        clinic: userClinic, 
        patientId, 
        userId, 
        role, 
        found: !!existingConversation,
        conversationId: existingConversation?._id 
      });
    } else if (isClinicToClinic) {
      // Clinic-to-clinic conversation
      existingConversation = conversations.find(conv => 
        conv.participants.some(p => 
          p.role === 'clinic' && p.clinic === userClinic
        ) && 
        conv.participants.some(p => 
          p.role === 'clinic' && p.clinic === clinic
        )
      );
      console.log('Clinic-to-clinic conversation search:', { 
        userClinic, 
        targetClinic: clinic, 
        found: !!existingConversation,
        conversationId: existingConversation?._id 
      });
    }

    if (!existingConversation) {
      // Create new conversation with appropriate participants
      const participants = [];
      
      if (role === 'patient') {
        // Patient + clinic
        participants.push(
          { userId, role: 'patient' },
          { role: 'clinic', clinic }
        );
      } else if (patientId) {
        // Staff/owner + patient
        participants.push(
          { userId: patientId, role: 'patient' },
          { userId, role, clinic: userClinic }
        );
      } else if (isClinicToClinic) {
        // Clinic + clinic
        participants.push(
          { role: 'clinic', clinic: userClinic },
          { role: 'clinic', clinic }
        );
      }

      console.log('Creating new conversation with participants:', participants);

      const createResponse = await fetch(`${apiUrl}/api/messages/conversations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clinic: patientId ? userClinic : clinic,
          participants
        })
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error('Failed to create conversation:', createResponse.status, errorText);
        throw new Error(`Failed to create conversation: ${errorText}`);
      }

      existingConversation = await createResponse.json();
      console.log('Created new conversation:', existingConversation);
      
      // Add new conversation to local state
      setConversations(prev => [existingConversation, ...prev]);

      // Join conversation via socket if connected
      if (socket.current && socket.current.connected) {
        socket.current.emit('joinConversation', existingConversation._id);
      }
    }

    // Set the active conversation
    setConversationId(existingConversation._id);
    
    // Load messages for this conversation
    await loadMessages(existingConversation._id);
    
    clearTimeout(loadingTimeout);
    setLoading(false);
  } catch (error) {
    console.error("Error starting conversation:", error);
    setLoading(false);
    setConversationId(null);
    setMessages([]);
  }
}, [apiUrl, conversations, patients, loadMessages]);



  // Improved handleSendMessage function
  const handleSendMessage = useCallback(async () => {
    if (!message.trim() && !selectedFile) return;

    setIsSending(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const clinic = showpatientambherConversation ? "Ambher Optical" : "Bautista Eye Center";
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('patientid') || 
                    localStorage.getItem('staffid') || 
                    localStorage.getItem('ownerid');
      const userClinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');
      const targetClinic = userClinic === "Ambher Optical" ? "Bautista Eye Center" : "Ambher Optical";
      
      const temporaryId = Date.now().toString() + Math.random().toString(36).substr(2, 9);

      // Get the correct sender name based on role
      let senderName;
      if (role === 'patient') {
        // For patients, get the name from localStorage or use a fallback
        const patientFirstName = localStorage.getItem('patientfirstname');
        const patientLastName = localStorage.getItem('patientlastname');
        const patientFullName = localStorage.getItem('patientname');
        
        if (patientFirstName && patientLastName) {
          senderName = `${patientFirstName} ${patientLastName}`;
        } else if (patientFullName) {
          senderName = patientFullName;
        } else {
          senderName = patientName || 'Patient';
        }
      } else {
        // For staff/owner, use their stored names
        senderName = localStorage.getItem('staffname') || localStorage.getItem('ownername') || 'Staff';
      }
      
      console.log('Sender name being used:', { 
        role, 
        senderName, 
        patientFirstName: localStorage.getItem('patientfirstname'), 
        patientLastName: localStorage.getItem('patientlastname'),
        patientFullName: localStorage.getItem('patientname')
      });
      
      const optimisticMessage = {
        temporaryId,
        text: message.trim() || '',
        imageUrl: selectedFile?.isImage ? URL.createObjectURL(selectedFile.file) : null,
        documentUrl: selectedFile && !selectedFile.isImage ? selectedFile.name : null,
        senderId: userId,
        senderRole: role,
        senderName: senderName,
        senderClinic: role === 'patient' ? null : userClinic,
        sentToClinic: role === 'patient' || !selectedPatient ? clinic || targetClinic : null,
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
        formData.append('sentToClinic', clinic);
      } else if (!selectedPatient) {
        formData.append('targetClinic', targetClinic);
        formData.append('sentToClinic', targetClinic);
      }
      
      if (selectedPatient) {
        formData.append('patientId', selectedPatient._id);
      }
      
      if (selectedFile) {
        formData.append('file', selectedFile.file);
      }

      formData.append('senderId', userId);
      formData.append('senderRole', role);
      formData.append('senderName', senderName);

      console.log('Sending message:', { conversationId, clinic, patientId: selectedPatient?._id });
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
      console.log('Server response:', data);
      
      // Update messages in the current conversation
      setMessages(prev => prev.map(msg => 
        msg.temporaryId === temporaryId ? { ...msg, ...data, temporaryId: undefined } : msg
      ));

      const newConversationId = data.conversationId || conversationId;

      // Update or create conversation in the list
      setConversations(prev => {
        const existingConvIndex = prev.findIndex(conv => conv._id === newConversationId);
        
        if (existingConvIndex >= 0) {
          // Update existing conversation
          const updatedConvs = [...prev];
          updatedConvs[existingConvIndex] = {
            ...updatedConvs[existingConvIndex],
            lastMessage: data
          };
          return updatedConvs;
        } else {
          // Create new conversation
          const newConversation = {
            _id: newConversationId,
            clinic: selectedClinic || (showpatientambherConversation ? "Ambher Optical" : "Bautista Eye Center"),
            participants: [
              { userId: localStorage.getItem("staffid") || localStorage.getItem("ownerid"), 
                role: localStorage.getItem("role") },
              { userId: selectedPatient?._id, 
                role: 'patient' }
            ],
            lastMessage: data
          };
          return [newConversation, ...prev];
        }
      });
      
      // Update latest messages state
      setLatestMessagesByConversation(prev => ({
        ...prev,
        [newConversationId]: data
      }));

      // Update conversationId if a new conversation was created
      if (data.conversationId && data.conversationId !== conversationId) {
        setConversationId(data.conversationId);
        
        // Check if socket is connected before emitting
        if (socket.current && socket.current.connected) {
          socket.current.emit('joinConversation', data.conversationId);
        } else {
          console.warn('Socket not connected, will join conversation when socket connects');
        }
        
        // Add new conversation to the list
        setConversations(prev => {
          if (!prev.some(conv => conv._id === data.conversationId)) {
            const newConversation = {
              _id: data.conversationId, 
              clinic, 
              participants: [
                { userId, role },
                { userId: selectedPatient?._id, role: 'patient' }
              ],
              lastMessage: data
            };
            console.log('Adding new conversation to list:', newConversation);
            return [newConversation, ...prev]; // Add to beginning of list
          }
          return prev;
        });
        
        await loadMessages(data.conversationId);
      }
      
      setTimeout(scrollToBottom, 100);

      // Refresh conversations list for staff/owner
      if (localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner") {
        fetchConversationsRef.current();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.filter(msg => msg.temporaryId !== temporaryId));
      setPendingMessageId(null);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  }, [message, selectedFile, conversationId, selectedPatient, patientName, apiUrl, showpatientambherConversation, showpatientbautistaConversation, loadMessages, scrollToBottom]);

  // Improved fetchPatients function
  const fetchPatients = useCallback(async () => {
    try {
      // Prevent multiple simultaneous fetches
      if (patients.length > 0) {
        console.log('Patients already loaded, skipping fetch');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) return;

      console.log('Fetching patients...');
      const response = await fetch(`${apiUrl}/api/patientaccounts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }

      const patientsData = await response.json();
      
      // Sort patients alphabetically by first name
      const sortedPatients = patientsData.sort((a, b) => {
        const nameA = `${a.patientfirstname} ${a.patientlastname}`.toLowerCase();
        const nameB = `${b.patientfirstname} ${b.patientlastname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setPatients(sortedPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, [apiUrl]);

  // Fetch patients when chat dashboard opens for staff/owner
  useEffect(() => {
    if (showpatientchatdashboard && (localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner")) {
      fetchPatients();
      
      // Ensure socket is connected when chat dashboard opens
      if (socket.current && !socket.current.connected) {
        console.log('Reconnecting socket when chat dashboard opens');
        socket.current.connect();
      }
    }
  }, [showpatientchatdashboard]); // Removed fetchPatients dependency to prevent unnecessary re-renders

useEffect(() => {
  if (showpatientchatdashboard && localStorage.getItem("role") === "patient") {
    const clinic = showpatientambherConversation ? "Ambher Optical" : showpatientbautistaConversation ? "Bautista Eye Center" : null;
    if (clinic) {
      console.log('Starting patient conversation with clinic:', clinic);
      
      if (socket.current && !socket.current.connected) {
        console.log('Reconnecting socket when chat dashboard opens (patient)');
        socket.current.connect();
        
        setTimeout(() => {
          startConversation(clinic);
          fetchConversationsRef.current();
        }, 500);
      } else {
        startConversation(clinic);
        fetchConversationsRef.current();
      }
    }
  }
}, [showpatientchatdashboard, showpatientambherConversation, showpatientbautistaConversation]);

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
            src={`${msg.imageUrl}`} 
            alt="Uploaded content" 
            className="max-w-full max-h-60 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {
              setSelectedImageForModal(`${msg.imageUrl}`);
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
              href={`${msg.documentUrl}`} 
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

  const getLatestMessageForConversation = (conversationId) => {
    return latestMessagesByConversation[conversationId] || null;
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
  console.log('Selecting patient:', patient);
  
  // Debug current user info
  debugLocalStorage();
  
  setLoading(true);
  setMessages([]);
  setSelectedPatient(patient);
  setSelectedClinic(null);
  setConversationId(null);
  const clinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');
  console.log('Starting conversation with patient:', { patientId: patient._id, clinic });
  startConversation(clinic, patient._id);
};










  return (
    <>
      {modalOpen && (
        <div className="motion-preset-fade-md fixed inset-0 bg-[#040404e2] flex items-center justify-center z-[99999]">
          <img src={close} onClick={() => setModalOpen(false)} className=" w-7 h-7 absolute top-5 right-5"/>
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
                  {loadingConversations ? (
                    <div className="w-full flex justify-center items-center h-full text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#085f84]"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[20px] font-albertsans font-semibold text-gray-800">Chat with us</p>
                      <div className="flex gap-3">
                        <div 
                          onClick={() => {
                            console.log('Opening chat dashboard (Ambher)');
                            setshowpatientambherConversation(true);
                            
                            // Only fetch if we actually need to
                            if (conversations.length === 0) {
                              fetchConversationsRef.current();
                            }
                            
                            // Only reconnect socket if needed
                            if (socket.current && !socket.current.connected) {
                              console.log('Reconnecting socket when chat dashboard opens (Ambher)');
                              socket.current.connect();
                            }
                          }} 
                          className="hover:shadow-md hover:bg-[#d8fdf0] hover:scale-105 transition-all duration-300 ease-in-out gap-2 cursor-pointer flex flex-col justify-center items-center w-40 h-40 rounded-md border-1">
                          <img src={ambherlogo} className="w-23 px-2 py-1"/>
                          <p className="font-albertsans font-semibold text-[15px] text-[#0a774a]">Ambher Optical</p>
                        </div>
                        <div 
                          onClick={() => {
                            console.log('Opening chat dashboard (Bautista)');
                            setshowpatientbautistaConversation(true);
                            
                            // Only fetch if we actually need to
                            if (conversations.length === 0) {
                              fetchConversationsRef.current();
                            }
                            
                            // Only reconnect socket if needed
                            if (socket.current && !socket.current.connected) {
                              console.log('Reconnecting socket when chat dashboard opens (Bautista)');
                              socket.current.connect();
                            }
                          }} 
                          className="hover:shadow-md hover:bg-[#d8f1fd] hover:scale-105 transition-all duration-300 ease-in-out gap-2 cursor-pointer flex flex-col justify-center items-center w-40 h-40 rounded-md border-1">
                          <img src={bautistalogo} className="w-23 px-2 py-1"/>
                          <p className="font-albertsans font-semibold text-[15px] text-[#0a4277]">Bautista Eye Center</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {(showpatientambherConversation || showpatientbautistaConversation) && (
                <div className="flex flex-col items-end w-full h-[530px] rounded-b-2xl">
                  <div 
                    id="conversationmessages" 
                    className="px-3 pb-3 pt-10 overflow-y-auto w-full flex-grow relative" 
                    style={{ maxHeight: '430px' }}
                  >
                    {loading || loadingMessages[conversationId] ? (
                      <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1583b3] border-t-transparent mb-2"></div>
                        <p className="text-[#1583b3] font-medium">Loading messages...</p>
                      </div>
                    ) : messages.length > 0 ? (
                      messages.map((msg, index) => {
                        const isCurrentUser = msg.senderRole === localStorage.getItem('role') && 
                                             msg.senderId === localStorage.getItem('patientid');
                        
                        const isSameSenderAsPrevious = index > 0 && 
                          messages[index - 1].senderId === msg.senderId;
                        const isSameSenderAsNext = index < messages.length - 1 && 
                          messages[index + 1].senderId === msg.senderId;
                        
                        const isDifferentSenderFromPrevious = index > 0 && 
                          messages[index - 1].senderId !== msg.senderId;

                        let borderRadiusClasses = '';
                        if (isCurrentUser) {
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
                        const profilePicture = isCurrentUser 
                          ? (currentuserprofilepicture || profileuser)
                          : (msg.senderClinic === "Ambher Optical" ? ambherlogo : bautistalogo);

                        return (
                          <div 
                            key={msg._id || msg.temporaryId}
                            className={`w-full flex ${isCurrentUser ? 'justify-end' : 'justify-start'} ${
                              isDifferentSenderFromPrevious ? 'mt-4' : ''
                            }`}
                          >
                            <div className={`flex-shrink-0 ${isCurrentUser ? 'order-1 ml-2' : 'order-0 mr-2'} ${isLastInSequence ? 'visible' : 'invisible'}`}>
                              {!isCurrentUser && (
                                <img 
                                  src={profilePicture} 
                                  alt="Profile picture"
                                  className="w-8 h-8 self-end rounded-full object-cover"
                                  onError={(e) => { e.target.src = profileuser }}
                                />
                              )}
                            </div>

                            <div className={`max-w-[80%] ${isCurrentUser ? 'order-0' : 'order-1'}`}>
                              {!isSameSenderAsPrevious && !isCurrentUser && (
                                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                  <p className="text-xs font-semibold text-gray-600 mb-1">
                                    {msg.senderName}
                                  </p>
                                </div>
                              )}
                              {isImageOnly ? (
                                renderMessageContent(msg, isCurrentUser)
                              ) : (
                                <div 
                                  className={`flex flex-col px-5 py-2 ${
                                    isCurrentUser ? (showpatientbautistaConversation ? 'bg-[#d8f1fd]' : 'bg-[#c0eed6]') : 'bg-[#e0e0e0]'
                                  } ${borderRadiusClasses} relative group`}
                                  style={{
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    whiteSpace: 'pre-wrap'
                                  }}
                                >
                                  {renderMessageContent(msg, isCurrentUser)}
                                </div>
                              )}
                              {index === messages.length - 1 && (
                                <div className={`mt-1 w-full flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
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
                        {selectedPatient ? `Start a conversation with ${selectedPatient.patientfirstname} ${selectedPatient.patientlastname}!` : ' No messages'}
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
                            className="absolute -top-2 -right-2 h-5 w-5 cursor-pointer hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out bg-white rounded-full p-0.5 shadow-sm"
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

                      {isSending ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white flex-shrink-0"></div>
                      ) : (
                        <img 
                          src={showpatientambherConversation ? sendchatambher : sendchatbautista} 
                          alt="send" 
                          className="hover:scale-105 transition-all duration-300 ease-in-out h-10 w-10 p-2 cursor-pointer flex-shrink-0" 
                          onClick={handleSendMessage}
                        />
                      )}
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
                  // Just hide the UI elements without clearing data
                  setshowpatientbautistaConversation(false);
                  setshowpatientambherConversation(false);
                  setshowpatientchatdashboard(false);
                  setSelectedClinic(null);
                  setSelectedPatient(null);
                  // Only clear the active message box
                  setMessage("");
                  setSelectedFile(null);
                  // Don't clear conversations or refetch
                }} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#1583b3]"
              >
                <img src={close} alt="logo" className="select-none motion-preset-shake w-10 h-10 p-2" />
              </div>
            ) : (
              <div 
                onClick={() => {
                  console.log('Opening chat dashboard');
                  setshowpatientchatdashboard(true);
                  setLoadingConversations(true);
                  
                  // Ensure socket is connected when chat dashboard opens
                  if (socket.current && !socket.current.connected) {
                    console.log('Reconnecting socket when chat dashboard opens');
                    socket.current.connect();
                    
                    // Wait for socket to connect before fetching conversations
                    setTimeout(() => {
                      fetchConversationsRef.current();
                    }, 500);
                  } else {
                    fetchConversationsRef.current();
                  }
                }} 
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

                  <div className="pt-3 gap-1 px-2 flex flex-col rounded-2xl min-h-[72%] w-full max-h-[72%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    {loadingConversations ? (
                      <div className="w-full flex justify-center items-center h-full text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39715f]"></div>
                      </div>
                    ) : (
                      <>
                        <div 
                          className="p-2 flex items-center justify-start w-full h-15 border-1 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 rounded-2xl"
                          onClick={() => {
                            console.log('Starting clinic-to-clinic conversation with Bautista Eye Center');
                            setLoading(true);
                            setSelectedPatient(null);
                            startConversation("Bautista Eye Center");
                          }}
                        >
                          <img src={bautistalogo} className="w-13 h-13"/>
                          <div className="w-[76%] flex flex-col justify-center items-start ml-3">
                            <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a] truncate overflow-hidden whitespace-nowrap w-full">Bautista Eye Center</p>
<p className="font-albertsans font-medium text-[13px] text-[#555555] truncate overflow-hidden whitespace-nowrap w-full">
  {(() => {
    // Find clinic-to-clinic conversation involving both Ambher Optical and Bautista Eye Center
    const clinicConversation = conversations.find(conv => 
      conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") &&
      conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center")
    );
    const latestMessage = clinicConversation ? getLatestMessageForConversation(clinicConversation._id) : null;
    console.log('Clinic conversation for Bautista:', { clinicConversation, latestMessage }); // Debug log
    return getLatestMessageDisplay({ patientfirstname: "Ambher Optical" }, latestMessage ? [latestMessage] : []);
  })()}
</p>
                          </div>
                        </div>
{patients
  .map(patient => {
    // Find the conversation with this patient
    const patientConversation = conversations.find(conv => 
      conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
    );
    
    return {
      patient,
      lastMessageTime: patientConversation?.lastMessage?.createdAt 
        ? new Date(patientConversation.lastMessage.createdAt).getTime() 
        : 0
    };
  })
  .sort((a, b) => b.lastMessageTime - a.lastMessageTime) // Sort by latest message time (newest first)
  .map(({ patient }) => (
    <div 
      key={patient._id}
      className={`p-2 flex items-center justify-start w-full h-19 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer rounded-2xl ${
        selectedPatient?._id === patient._id ? 'bg-blue-50 border-blue-200' : ''
      }`}
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
          {(() => {
            // Find the conversation with this patient
            const patientConversation = conversations.find(conv => 
              conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
            );
            const latestMessage = patientConversation ? getLatestMessageForConversation(patientConversation._id) : null;
            return getLatestMessageDisplay(patient, latestMessage ? [latestMessage] : []);
          })()}
        </p>
      </div>
    </div>
  ))
}
                      </>
                    )}
                  </div>
                </div>
{selectedPatient === null && selectedClinic === null ? (
           <div className="flex  flex-col rounded-2xl h-full w-[70%] border-1">
          </div>
):(                <div className="flex  flex-col rounded-2xl h-full w-[70%] border-1">
                  <div className="shadow-md pt-0.5 pb-0.5 pl-3 rounded-t-2xl border-1 h-[11%] w-full flex item-center justify-start">
                    <div className="flex items-center justify-center">
                      <img 
                        src={
                          selectedPatient 
                            ? (selectedPatient.patientprofilepicture || profileuser) 
                            : selectedClinic === "Ambher Optical" 
                              ? ambherlogo
                              : bautistalogo
                        } 
                        className="w-12 h-12 rounded-full"
                        onError={(e) => { e.target.src = profileuser }}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start ml-3">
                      <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a]">
                        {selectedPatient 
                          ? `${selectedPatient.patientfirstname} ${selectedPatient.patientlastname}`
                          : selectedClinic || "Select a conversation"}
                      </p>
                    </div>
                  </div>
                  <div className="pb-2 h-full w-full overflow-y-auto" style={{ maxHeight: '400px' }}>
                    <div className="px-3 pt-10 h-[100%] w-full overflow-y-auto relative" style={{ maxHeight: '400px' }}>
                      {(loading || loadingMessages[conversationId]) ? (
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 z-10">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#39715f] border-t-transparent mb-2"></div>
                          <p className="text-[#39715f] font-medium">Loading messages...</p>
                        </div>
                      ) : messages.length > 0 ? (
                        messages.map((msg, index) => {
                          const isCurrentClinic = (msg.senderClinic === "Ambher Optical" && (localStorage.getItem("staffclinic") === "Ambher Optical" || localStorage.getItem("ownerclinic") === "Ambher Optical")) || 
                                                (msg.senderClinic === "Bautista Eye Center" && (localStorage.getItem("staffclinic") === "Bautista Eye Center" || localStorage.getItem("ownerclinic") === "Bautista Eye Center"));
                          
                          const isSameSenderAsPrevious = index > 0 && 
                            messages[index - 1].senderId === msg.senderId;
                          const isSameSenderAsNext = index < messages.length - 1 && 
                            messages[index + 1].senderId === msg.senderId;
                          
                          const isDifferentSenderFromPrevious = index > 0 && 
                            messages[index - 1].senderId !== msg.senderId;

                          let borderRadiusClasses = '';
                          if (isCurrentClinic) {
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
                          const profilePicture = msg.senderRole === 'clinic' 
                            ? (msg.senderClinic === "Ambher Optical" ? ambherlogo : bautistalogo)
                            : (selectedPatient?.patientprofilepicture || profileuser);

                          return (
                            <div 
                              key={msg._id || msg.temporaryId}
                              className={`w-full flex ${isCurrentClinic ? 'justify-end' : 'justify-start'} ${
                                isDifferentSenderFromPrevious ? 'mt-4' : ''
                              }`}
                            >
                              <div className={`flex-shrink-0 ${isCurrentClinic ? 'order-1 ml-2' : 'order-0 mr-2'} ${isLastInSequence ? 'visible' : 'invisible'}`}>
                                {!isCurrentClinic && (
                                  <img 
                                    src={profilePicture} 
                                    alt="Profile picture"
                                    className="w-8 h-8 self-end rounded-full object-cover"
                                  />
                                )}
                              </div>

                              <div className={`max-w-[80%] ${isCurrentClinic ? 'order-0' : 'order-1'}`}>
                                {!isSameSenderAsPrevious && !isCurrentClinic && (
                                  <div className={`flex ${isCurrentClinic ? 'justify-end' : 'justify-start'}`}>
                                    <p className="text-xs font-semibold text-gray-600 mb-1">
                                      {msg.senderName}
                                    </p>
                                  </div>
                                )}
                                {isImageOnly ? (
                                  renderMessageContent(msg, isCurrentClinic)
                                ) : (
                                  <div 
                                    className={`flex flex-col px-5 py-2 ${
                                      isCurrentClinic ? (localStorage.getItem("staffclinic") === "Ambher Optical" || localStorage.getItem("ownerclinic") === "Ambher Optical" ? 'bg-[#c0eed6]' : 'bg-[#d8f1fd]') : 'bg-[#e0e0e0]'
                                    } ${borderRadiusClasses} relative group`}
                                    style={{
                                      wordWrap: 'break-word',
                                      overflowWrap: 'break-word',
                                      whiteSpace: 'pre-wrap'
                                    }}
                                  >
                                    {renderMessageContent(msg, isCurrentClinic)}
                                  </div>
                                )}
                                {index === messages.length - 1 && (
                                  <div className={`mt-1 w-full flex ${isCurrentClinic ? 'justify-end' : 'justify-start'}`}>
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
                          {selectedPatient ? `Start a conversation with ${selectedPatient.patientfirstname} ${selectedPatient.patientlastname}!` : ' No messages'}
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <div className="px-2 pb-2 flex flex-col w-full rounded-2xl">
                    {selectedClinic === null && selectedPatient === null ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Select a conversation to start chatting.</p>
                      </div>
                    ) : (
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
                              className="absolute -top-2 -right-2 h-5 w-5 cursor-pointer hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out bg-white rounded-full p-0.5 shadow-sm"
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
                        {isSending ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white flex-shrink-0"></div>
                        ) : (
                          <img 
                            src={sendchatambher}
                            alt="send" 
                            className="hover:scale-105 transition-all duration-300 ease-in-out h-10 w-10 p-2 cursor-pointer flex-shrink-0" 
                            onClick={handleSendMessage}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>)}

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
                  setSelectedClinic(null);
                  setSelectedPatient(null);
                  setMessages([]);
                  setConversationId(null);
                  fetchConversationsRef.current();
                }} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#39715f]"
              >
                <img src={close} alt="logo" className="select-none motion-preset-shake w-10 h-10 p-2" />
              </div>
            ) : (
              <div 
                onClick={() => {
                  console.log('Opening chat dashboard (Ambher)');
                  setshowpatientchatdashboard(true);
                  
                  // Only fetch conversations if we don't have any
                  if (conversations.length === 0) {
                    setLoadingConversations(true);
                    fetchConversationsRef.current();
                  }
                  
                  // Only reconnect socket if needed
                  if (socket.current && !socket.current.connected) {
                    console.log('Reconnecting socket when chat dashboard opens (Ambher)');
                    socket.current.connect();
                  }
                }} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#39715f]"
              >
                <img src={chat} alt="logo" className="select-none motion-preset-seesaw w-10 h-10 p-2" />
              </div>
            )}
          </div>
        </div>
      )}

      {(localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner") && (localStorage.getItem("staffclinic") === "Bautista Eye Center" || localStorage.getItem("ownerclinic") === "Bautista Eye Center") && (
        <div className="fixed bottom-5 right-5 z-[99] flex flex-col items-start gap-2">
          {showpatientchatdashboard && (
            <div className="mb-6 motion-preset-slide-down w-250 h-150 shadow-2xl z-[9999] flex flex-col rounded-2xl bg-white">
              <div className="min-h-12 max-h-12 w-full h-14 rounded-t-2xl flex justify-center items-center bg-[#0a4277]">
                <div className="flex px-2 w-full items-center">
                  <img src={bautistalogo} className="w-15 px-2 py-1"/>
                  <p className="font-albertsans font-semibold text-[17px] text-[#ffffff]">Bautista Eye Center</p>
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
                      className={`cursor-pointer h-[90%] w-[90%] mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl text-center flex justify-center items-center ${activeambhermessageslist ==='allambhermessageslist' ? 'bg-[#457ab7] rounded-2xl' : ''}`}
                    >
                      <h1 className={`font-albertsans font-semibold text-[#5d5d5d] ${activeambhermessageslist ==='allambhermessageslist' ? 'text-white' : ''}`}>All</h1>
                    </div>
                    <div 
                      onClick={() => showambhermessageslist('unreadambhermessageslist')} 
                      className={`cursor-pointer ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl h-[90%] w-[90%] text-center flex justify-center items-center ${activeambhermessageslist ==='unreadambhermessageslist' ? 'bg-[#457ab7] rounded-2xl' : ''}`}
                    >
                      <h1 className={`font-albertsans font-semibold text-[#5d5d5d] ${activeambhermessageslist ==='unreadambhermessageslist' ? 'text-white' : ''}`}>Unread</h1>
                    </div>
                  </div>

                  <div className="pt-3 gap-1 px-2 flex flex-col rounded-2xl min-h-[72%] w-full max-h-[72%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    {loadingConversations ? (
                      <div className="w-full flex justify-center items-center h-full text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0a4277]"></div>
                      </div>
                    ) : (
                      <>
<div 
  className="p-2 flex items-center justify-start w-full h-15 border-1 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 rounded-2xl"
  onClick={() => {
    console.log('Starting clinic-to-clinic conversation with Ambher Optical');
    setLoading(true);
    setSelectedPatient(null);
    startConversation("Ambher Optical");
  }}
>
  <img src={ambherlogo} className="w-13 h-7"/>
  <div className="w-[76%] flex flex-col justify-center items-start ml-3">
    <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a] truncate overflow-hidden whitespace-nowrap w-full">Ambher Optical</p>
    <p className="font-albertsans font-medium text-[13px] text-[#555555] truncate overflow-hidden whitespace-nowrap w-full">
      {(() => {
        // Find clinic-to-clinic conversation
        const clinicConversation = conversations.find(conv => 
          conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") &&
          conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center")
        );
        
        if (!clinicConversation) return "No messages yet";
        
        const latestMessage = latestMessagesByConversation[clinicConversation._id];
        if (!latestMessage) return "No messages yet";
        
        if (latestMessage.imageUrl) {
          return `${latestMessage.senderName || latestMessage.senderClinic} sent a photo`;
        }
        if (latestMessage.documentUrl) {
          return `${latestMessage.senderName || latestMessage.senderClinic} sent a document`;
        }
        return latestMessage.text || "No messages yet";
      })()}
    </p>
  </div>
</div>
{patients
  .map(patient => {
    // Find the conversation with this patient
    const patientConversation = conversations.find(conv => 
      conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
    );
    
    return {
      patient,
      lastMessageTime: patientConversation?.lastMessage?.createdAt 
        ? new Date(patientConversation.lastMessage.createdAt).getTime() 
        : 0
    };
  })
  .sort((a, b) => b.lastMessageTime - a.lastMessageTime) // Sort by latest message time (newest first)
  .map(({ patient }) => (
    <div 
      key={patient._id}
      className={`p-2 flex items-center justify-start w-full h-19 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer rounded-2xl ${
        selectedPatient?._id === patient._id ? 'bg-blue-50 border-blue-200' : ''
      }`}
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
          {(() => {
            // Find the conversation with this patient
            const patientConversation = conversations.find(conv => 
              conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
            );
            const latestMessage = patientConversation ? getLatestMessageForConversation(patientConversation._id) : null;
            return getLatestMessageDisplay(patient, latestMessage ? [latestMessage] : []);
          })()}
        </p>
      </div>
    </div>
  ))
}
                      </>
                    )}
                  </div>
                </div>
{selectedPatient === null && selectedClinic === null ? (
           <div className="flex  flex-col rounded-2xl h-full w-[70%] border-1">
          </div>
):(   
                <div className="flex flex-col rounded-2xl h-full w-[70%] border-1">
                  <div className="shadow-md pt-0.5 pb-0.5 pl-3 rounded-t-2xl border-1 h-[11%] w-full flex item-center justify-start">
                    <div className="flex items-center justify-center">
                      <img 
                        src={
                          selectedPatient 
                            ? (selectedPatient.patientprofilepicture || profileuser) 
                            : selectedClinic === "Bautista Eye Center" 
                              ? bautistalogo 
                              : ambherlogo
                        } 
                        className="w-12 h-12 rounded-full"
                        onError={(e) => { e.target.src = profileuser }}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start ml-3">
                      <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a]">
                        {selectedPatient 
                          ? `${selectedPatient.patientfirstname} ${selectedPatient.patientlastname}`
                          : selectedClinic || "Select a conversation"}
                      </p>
                    </div>
                  </div>
                  <div className="pb-2 h-full w-full overflow-y-auto" style={{ maxHeight: '400px' }}>
                    <div className="px-3 pt-10 h-[100%] w-full overflow-y-auto relative" style={{ maxHeight: '400px' }}>
                      {(loading || loadingMessages[conversationId]) ? (
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 z-10">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0a4277] border-t-transparent mb-2"></div>
                          <p className="text-[#0a4277] font-medium">Loading messages...</p>
                        </div>
                      ) : messages.length > 0 ? (
                        messages.map((msg, index) => {
                          const isCurrentClinic = (msg.senderClinic === "Ambher Optical" && (localStorage.getItem("staffclinic") === "Ambher Optical" || localStorage.getItem("ownerclinic") === "Ambher Optical")) || 
                                                (msg.senderClinic === "Bautista Eye Center" && (localStorage.getItem("staffclinic") === "Bautista Eye Center" || localStorage.getItem("ownerclinic") === "Bautista Eye Center"));
                          
                          const isSameSenderAsPrevious = index > 0 && 
                            messages[index - 1].senderId === msg.senderId;
                          const isSameSenderAsNext = index < messages.length - 1 && 
                            messages[index + 1].senderId === msg.senderId;
                          
                          const isDifferentSenderFromPrevious = index > 0 && 
                            messages[index - 1].senderId !== msg.senderId;

                          let borderRadiusClasses = '';
                          if (isCurrentClinic) {
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
                          const profilePicture = msg.senderRole === 'clinic' 
                            ? (msg.senderClinic === "Ambher Optical" ? ambherlogo : bautistalogo)
                            : (selectedPatient?.patientprofilepicture || profileuser);

                          return (
                            <div 
                              key={msg._id || msg.temporaryId}
                              className={`w-full flex ${isCurrentClinic ? 'justify-end' : 'justify-start'} ${
                                isDifferentSenderFromPrevious ? 'mt-4' : ''
                              }`}
                            >
                              <div className={`flex-shrink-0 ${isCurrentClinic ? 'order-1 ml-2' : 'order-0 mr-2'} ${isLastInSequence ? 'visible' : 'invisible'}`}>
                                {!isCurrentClinic && (
                                  <img 
                                    src={profilePicture} 
                                    alt="Profile picture"
                                    className="w-8 h-8 self-end rounded-full object-cover"
                                  />
                                )}
                              </div>

                              <div className={`max-w-[80%] ${isCurrentClinic ? 'order-0' : 'order-1'}`}>
                                {!isSameSenderAsPrevious && !isCurrentClinic && (
                                  <div className={`flex ${isCurrentClinic ? 'justify-end' : 'justify-start'}`}>
                                    <p className="text-xs font-semibold text-gray-600 mb-1">
                                      {msg.senderName}
                                    </p>
                                  </div>
                                )}
                                {isImageOnly ? (
                                  renderMessageContent(msg, isCurrentClinic)
                                ) : (
                                  <div 
                                    className={`flex flex-col px-5 py-2 ${
                                      isCurrentClinic ? (localStorage.getItem("staffclinic") === "Ambher Optical" || localStorage.getItem("ownerclinic") === "Ambher Optical" ? 'bg-[#c0eed6]' : 'bg-[#d8f1fd]') : 'bg-[#e0e0e0]'
                                    } ${borderRadiusClasses} relative group`}
                                    style={{
                                      wordWrap: 'break-word',
                                      overflowWrap: 'break-word',
                                      whiteSpace: 'pre-wrap'
                                    }}
                                  >
                                    {renderMessageContent(msg, isCurrentClinic)}
                                  </div>
                                )}
                                {index === messages.length - 1 && (
                                  <div className={`mt-1 w-full flex ${isCurrentClinic ? 'justify-end' : 'justify-start'}`}>
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
                          {selectedPatient ? `Start a conversation with ${selectedPatient.patientfirstname} ${selectedPatient.patientlastname}!` : ' No messages'}
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <div className="px-2 pb-2 flex flex-col w-full rounded-2xl">
                    {selectedClinic === null && selectedPatient === null ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Select a conversation to start chatting.</p>
                      </div>
                    ) : (
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
                              className="absolute -top-2 -right-2 h-5 w-5 cursor-pointer hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out bg-white rounded-full p-0.5 shadow-sm"
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
                              className="ml-2 h-4 w-4 cursor-pointer hover:scale-110 transition-all5.4splease continueHere is the continuation and completion of the updated React component code, picking up from where it was cut off. This includes the remaining JSX for the chat interface for staff/owner roles at Bautista Eye Center, ensuring all functionality (conversation fetching, message sending, and UI rendering) is fully implemented with the fixes for the issue of conversations not being fetched correctly.
jsxtransition-all duration-300 ease-in-out flex-shrink-0"
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
                        {isSending ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white flex-shrink-0"></div>
                        ) : (
                          <img 
                            src={sendchatbautista}
                            alt="send" 
                            className="hover:scale-105 transition-all duration-300 ease-in-out h-10 w-10 p-2 cursor-pointer flex-shrink-0" 
                            onClick={handleSendMessage}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>)}
              </div>
            </div>
          )}

          <div className="w-full justify-end flex items-end">
            {showpatientchatdashboard ? (
              <div 
                onClick={() => {
                  // Just hide the UI elements without clearing data
                  setshowpatientbautistaConversation(false);
                  setshowpatientambherConversation(false);
                  setshowpatientchatdashboard(false);
                  setSelectedClinic(null);
                  setSelectedPatient(null);
                  setMessages([]);
                  setConversationId(null);
                  fetchConversationsRef.current();
                }} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#0a4277]"
              >
                <img src={close} alt="logo" className="select-none motion-preset-shake w-10 h-10 p-2" />
              </div>
            ) : (
              <div 
                onClick={() => {
                  console.log('Opening chat dashboard (Bautista)');
                  setshowpatientchatdashboard(true);
                  setHasUnreadMessages(false); // Clear unread messages indicator when opening chat
                  
                  // Only fetch conversations if we don't have any
                  if (conversations.length === 0) {
                    setLoadingConversations(true);
                    fetchConversationsRef.current();
                  }
                  
                  // Only reconnect socket if needed
                  if (socket.current && !socket.current.connected) {
                    console.log('Reconnecting socket when chat dashboard opens (Bautista)');
                    socket.current.connect();
                  }
                }} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#0a4277] relative"
              >
                <img src={chat} alt="logo" className="select-none motion-preset-seesaw w-10 h-10 p-2" />
                {hasUnreadMessages && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                )}
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