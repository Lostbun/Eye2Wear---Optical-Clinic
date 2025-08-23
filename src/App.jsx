import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { unstable_batchedUpdates } from "react-dom";
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
  const patientId = localStorage.getItem("patientid");
  const patientEmail = localStorage.getItem("patientemail");
  const patientName = localStorage.getItem("patientname");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const currentuserprofilepicture = localStorage.getItem(`${localStorage.getItem('role')}profilepicture`);
  const [activeambhermessageslist, setactiveambhermessageslist] = useState('allambhermessageslist');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [pendingMessageId, setPendingMessageId] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messagesByConversation, setMessagesByConversation] = useState({});
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [latestMessagesByConversation, setLatestMessagesByConversation] = useState({});
  const [imageLoadingStates, setImageLoadingStates] = useState({});
  const fetchConversationsRef = useRef(null);
  const [unreadMessagesByConversation, setUnreadMessagesByConversation] = useState({});
  const [hasGlobalUnreadMessages, setHasGlobalUnreadMessages] = useState(false);
  const isInitializedRef = useRef(false);
  const conversationsFetchedRef = useRef(false);
  const previousConversationIdRef = useRef(null);
  const lastFetchTimeRef = useRef(0);
  const FETCH_COOLDOWN = 5000; // 5 seconds cooldown between fetches


const conversationIdRef = useRef(conversationId);
useEffect(() => {
  console.log('Updating conversationIdRef from', conversationIdRef.current, 'to', conversationId);
  conversationIdRef.current = conversationId;
  
  // Also join the conversation via socket when conversation changes
  if (conversationId && socket.current && socket.current.connected) {
    console.log('Joining conversation via Socket.IO:', conversationId);
    socket.current.emit('joinConversation', conversationId);
  }
}, [conversationId]);






  // 1. UTILITY FUNCTIONS (No dependencies)
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const shortenFileName = (name) => {
    if (name.length <= 20) return name;
    return `${name.substring(0, 10)}...${name.substring(name.length - 7)}`;
  };

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

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // 2. CORE CHECKING FUNCTIONS (with dependencies)
  const hasUnreadMessages = useCallback((conversationId) => {
    if (!conversationId) return false;
    
    // First check the unreadMessagesByConversation state
    if (unreadMessagesByConversation.hasOwnProperty(conversationId)) {
      return unreadMessagesByConversation[conversationId];
    }
    
    // Fallback: check the conversation's last message if messages aren't loaded
    const conversation = conversations.find(conv => conv._id === conversationId);
    if (conversation && conversation.lastMessage) {
      const currentUserId = localStorage.getItem('patientid') || 
                           localStorage.getItem('staffid') || 
                           localStorage.getItem('ownerid');
      const currentRole = localStorage.getItem('role');
      
      const lastMsg = conversation.lastMessage;
      const isFromCurrentUser = lastMsg.senderId === currentUserId;
      
      if (!isFromCurrentUser) {
        const isRead = lastMsg.readBy && Array.isArray(lastMsg.readBy) && 
                      lastMsg.readBy.some(read => read.userId === currentUserId && read.role === currentRole);
        return !isRead;
      }
    }
    
    return false;
  }, [messagesByConversation, conversations, unreadMessagesByConversation]);


  const checkGlobalUnreadMessages = useCallback(() => {
  // Check unreadMessagesByConversation first
  const hasUnreadInState = Object.values(unreadMessagesByConversation).some(isUnread => isUnread);
  if (hasUnreadInState) return true;

  // Fallback: check conversations
  const currentUserId = localStorage.getItem('patientid') || 
                       localStorage.getItem('staffid') || 
                       localStorage.getItem('ownerid');
  const currentRole = localStorage.getItem('role');
  
  return conversations.some(conv => {
    if (conv.lastMessage) {
      const lastMsg = conv.lastMessage;
      const isFromCurrentUser = lastMsg.senderId === currentUserId;
      
      if (!isFromCurrentUser) {
        const isRead = lastMsg.readBy && Array.isArray(lastMsg.readBy) && 
                      lastMsg.readBy.some(read => read.userId === currentUserId && read.role === currentRole);
        return !isRead;
      }
    }
    return false;
  });
}, [conversations, unreadMessagesByConversation]);




  // 3. CONVERSATION MANAGEMENT FUNCTIONS
const markConversationAsRead = useCallback(async (conversationId) => {
  try {
    console.log('🔴 Marking conversation as read locally:', conversationId);
    
    // IMMEDIATELY and SYNCHRONOUSLY update both states
    setUnreadMessagesByConversation(prev => {
      const updated = { ...prev, [conversationId]: false };
      
      // Calculate and set global unread state immediately
      const hasOtherUnread = Object.values(updated).some(isUnread => isUnread);
      
      // Use a microtask to ensure this happens after the current render
      Promise.resolve().then(() => {
        setHasGlobalUnreadMessages(hasOtherUnread);
      });
      
      console.log('✅ Updated unread state:', { 
        conversationId, 
        hasOtherUnread,
        updated: updated[conversationId] 
      });
      
      return updated;
    });
    
  } catch (error) {
    console.error("Error marking conversation as read:", error);
  }
}, []);


  
const fetchConversations = useCallback(async (forceRefresh = false) => {
  try {
    // Don't prevent fetches when we need to check for notifications
    if (loadingConversations && !forceRefresh) {
      console.log('Conversations already loading, skipping fetch');
      return;
    }

    // Add cooldown check to prevent rapid successive fetches
    const now = Date.now();
    if (!forceRefresh && (now - lastFetchTimeRef.current) < FETCH_COOLDOWN) {
      console.log(`Fetch cooldown active, skipping fetch. Next allowed in ${Math.ceil((FETCH_COOLDOWN - (now - lastFetchTimeRef.current)) / 1000)}s`);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingConversations(false);
      return;
    }

    // Get current conversations length without depending on state
    const currentConversationsLength = conversations.length;
    
    // NEVER show loading spinner when toggling dashboard if we already have conversations
    // Only show loading when dashboard is open AND we truly have no data
    const shouldShowLoading = showpatientchatdashboard && currentConversationsLength === 0;
    if (shouldShowLoading) {
      setLoadingConversations(true);
    }

    const role = localStorage.getItem('role');
    const currentUserId = localStorage.getItem('patientid') || 
                         localStorage.getItem('staffid') || 
                         localStorage.getItem('ownerid');
    
    const isBackgroundFetch = !shouldShowLoading;
    console.log(`Fetching conversations for ${role}...${isBackgroundFetch ? ' (background)' : ''}`);
    
    const response = await fetch(`${apiUrl}/api/messages/conversations`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch conversations: ${response.status} ${response.statusText}`);
    }

    const conversationsData = await response.json();
    console.log(`Fetched ${conversationsData.length} conversations for ${role}:`, conversationsData);
    
    // Sort conversations by last message timestamp (newest first)
    const sortedConversations = conversationsData.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
    });
    
    setConversations(sortedConversations);

    // Update latest messages state and check for unread messages
    const latestMsgs = {};
    const newMessagesByConversation = {};
    const unreadByConversation = {};
    let hasGlobalUnread = false;
    
    // Process each conversation
    for (const conv of sortedConversations) {
      if (conv.lastMessage) {
        latestMsgs[conv._id] = conv.lastMessage;
        
        // ENHANCED: Check if the last message is unread FOR THIS SPECIFIC CLINIC
        const lastMsg = conv.lastMessage;
        const isFromCurrentUser = lastMsg.senderId === currentUserId;
        
        if (!isFromCurrentUser) {
          // CRITICAL: For staff/owner, only mark as unread if the message is RELEVANT to their clinic
          let shouldBeUnread = false;
          
          if (role === 'staff' || role === 'owner') {
            const currentClinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');
            
            // Check if this message is relevant to the current clinic
            const isRelevantToCurrentClinic = 
              lastMsg.sentToClinic === currentClinic ||
              lastMsg.senderClinic === currentClinic ||
              (lastMsg.senderRole === 'patient' && lastMsg.sentToClinic === currentClinic) ||
              conv.participants.some(p => 
                (p.role === 'clinic' && p.clinic === currentClinic) ||
                (p.userId === currentUserId && (p.role === 'staff' || p.role === 'owner'))
              );
            
            if (isRelevantToCurrentClinic) {
              const isRead = lastMsg.readBy && Array.isArray(lastMsg.readBy) && 
                            lastMsg.readBy.some(read => read.userId === currentUserId && read.role === role);
              shouldBeUnread = !isRead;
              
              console.log(`🔍 Clinic relevance check for ${currentClinic}:`, {
                conversationId: conv._id,
                lastMessageFrom: lastMsg.senderName || lastMsg.senderClinic,
                sentToClinic: lastMsg.sentToClinic,
                senderClinic: lastMsg.senderClinic,
                senderRole: lastMsg.senderRole,
                isRelevant: isRelevantToCurrentClinic,
                isRead: !shouldBeUnread,
                shouldBeUnread
              });
            } else {
              console.log(`❌ Message not relevant to ${currentClinic}:`, {
                conversationId: conv._id,
                lastMessageFrom: lastMsg.senderName || lastMsg.senderClinic,
                sentToClinic: lastMsg.sentToClinic,
                senderClinic: lastMsg.senderClinic
              });
            }
          } else {
            // For patients: use existing logic
            const isRead = lastMsg.readBy && Array.isArray(lastMsg.readBy) && 
                          lastMsg.readBy.some(read => read.userId === currentUserId && read.role === role);
            shouldBeUnread = !isRead;
          }
          
          if (shouldBeUnread) {
            unreadByConversation[conv._id] = true;
            hasGlobalUnread = true;
            console.log(`🔴 Found unread conversation ${conv._id} for ${role} - last message from ${lastMsg.senderName || lastMsg.senderClinic}`);
          } else {
            unreadByConversation[conv._id] = false;
            console.log(`✅ Conversation ${conv._id} is read or not relevant for ${role}`);
          }
        } else {
          unreadByConversation[conv._id] = false;
        }
      } else {
        unreadByConversation[conv._id] = false;
      }
      
      // Only pre-load messages if dashboard is open (not for background fetches)
      if (showpatientchatdashboard && !isBackgroundFetch) {
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
    }
    
    setLatestMessagesByConversation(latestMsgs);
    if (showpatientchatdashboard && !isBackgroundFetch) {
      setMessagesByConversation(newMessagesByConversation);
    }
    
    // FIXED: Immediate synchronous update instead of setTimeout
    setUnreadMessagesByConversation(prev => {
      const updated = { ...prev };
      
      // Only update unread status if not manually marked as read
      for (const [convId, isUnread] of Object.entries(unreadByConversation)) {
        // If conversation was manually marked as read, don't override it
        if (prev[convId] !== false) {
          updated[convId] = isUnread;
        }
      }
      
      // Update global unread status immediately and synchronously
      const hasUnread = Object.values(updated).some(isUnread => isUnread);
      setHasGlobalUnreadMessages(hasUnread);
      
      console.log(`Updated unread status for ${role}:`, { 
        unreadByConversation: updated, 
        hasGlobalUnread: hasUnread,
        conversationCount: sortedConversations.length 
      });
      
      return updated;
    });
    
    // ENHANCED: Force join ALL conversations for staff/owner after fetch
    if ((role === 'staff' || role === 'owner') && socket.current && socket.current.connected) {
      const userId = localStorage.getItem('staffid') || localStorage.getItem('ownerid');
      const userClinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');
      
      if (userId && userClinic) {
        console.log(`🚀 ENHANCED joining ALL conversations after fetch for ${role} (${userClinic})`);
        
        // Join general conversations
        socket.current.emit('joinConversations', userId, role, userClinic);
        
        // CRITICAL: Force join EVERY conversation with MULTIPLE room patterns
        sortedConversations.forEach(conv => {
          console.log(`🚀 ${role} (${userClinic}) ENHANCED joining conversation ${conv._id} after fetch`);
          
          // Multiple join patterns to ensure coverage
          socket.current.emit('joinConversation', conv._id);
          socket.current.emit('joinRoom', `conversation-${conv._id}`);
          socket.current.emit('joinRoom', `clinic-${userClinic}-conversation-${conv._id}`);
          socket.current.emit('joinRoom', `patient-conversation-${conv._id}`);
          socket.current.emit('joinRoom', `global-conversation-${conv._id}`);
          socket.current.emit('joinRoom', `room-${conv._id}`);
          socket.current.emit('joinRoom', `msg-${conv._id}`);
          socket.current.emit('joinRoom', `all-${conv._id}`);
        });
        
        // Join clinic-specific rooms with multiple patterns
        socket.current.emit('joinRoom', `clinic-${userClinic}`);
        socket.current.emit('joinRoom', `clinic-${userClinic}-all`);
        socket.current.emit('joinRoom', `clinic-${userClinic}-patients`);
        socket.current.emit('joinRoom', `all-conversations`);
        socket.current.emit('joinRoom', `global-messages`);
        
        console.log(`🚀 ${role} (${userClinic}) ENHANCED joined ${sortedConversations.length} conversations after fetch`);
      }
    }
    
    // Update timestamp after successful fetch
    lastFetchTimeRef.current = Date.now();
    
    // Reset the fetch flag only for successful fetches
    conversationsFetchedRef.current = false;
    
  } catch (error) {
    console.error("Error fetching conversations:", error);
    conversationsFetchedRef.current = false; // Allow retry on error
  } finally {
    // Always clear loading state
    setLoadingConversations(false);
  }
}, [apiUrl, showpatientchatdashboard, loadingConversations]);


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
    if (!skipStateUpdate && targetConversationId === conversationId) {
      console.log('Setting active messages for current conversation');
      setMessages(data);
    }
    
    return data;
  } catch (error) {
    console.error('Error loading messages:', error);
    if (!skipStateUpdate && targetConversationId === conversationId) {
      setMessages([]);
    }
    return [];
  }
}, [apiUrl, conversationId]);

  const startConversation = useCallback(async (clinic, patientId = null) => {
    try {
      setLoading(true);
      setMessages([]);
      setSelectedClinic(clinic);
      setSelectedPatient(patientId ? patients.find(p => p._id === patientId) : null);

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
          participants.push(
            { userId, role: 'patient' },
            { role: 'clinic', clinic }
          );
        } else if (patientId) {
          participants.push(
            { userId: patientId, role: 'patient' },
            { userId, role, clinic: userClinic }
          );
        } else if (isClinicToClinic) {
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
        
        setConversations(prev => [existingConversation, ...prev]);

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

const fetchPatients = useCallback(async () => {
  try {
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
    
    const sortedPatients = patientsData.sort((a, b) => {
      const nameA = `${a.patientfirstname} ${a.patientlastname}`.toLowerCase();
      const nameB = `${b.patientfirstname} ${b.patientlastname}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    setPatients(sortedPatients);
    console.log(`Loaded ${sortedPatients.length} patients`);
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
}, [apiUrl]);

const handlePatientSelect = (patient) => {
  console.log('👤 Selecting patient:', patient);
  
  debugLocalStorage();
  
  setLoading(true);
  setMessages([]);
  setSelectedPatient(patient);
  setSelectedClinic(null);
  setConversationId(null);
  conversationIdRef.current = null;
  
  const clinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');
  const userId = localStorage.getItem('staffid') || localStorage.getItem('ownerid');
  const role = localStorage.getItem('role');
  
  console.log('🏥 Starting conversation with patient:', { patientId: patient._id, clinic });
  
  // Find existing conversation
  const patientConversation = conversations.find(conv => 
    conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
  );
  
  if (patientConversation) {
    console.log('📞 Found existing conversation:', patientConversation._id);
    
    // Immediately set conversation ID and join room
    setConversationId(patientConversation._id);
    conversationIdRef.current = patientConversation._id;
    
    // Mark conversation as read
    markConversationAsRead(patientConversation._id);
    
    // IMMEDIATELY join this specific conversation via multiple methods
    if (socket.current && socket.current.connected) {
      console.log('🔌 Staff/Owner immediately joining patient conversation:', patientConversation._id);
      socket.current.emit('joinConversation', patientConversation._id);
      socket.current.emit('joinRoom', `conversation-${patientConversation._id}`);
      socket.current.emit('joinRoom', `clinic-${clinic}-conversation-${patientConversation._id}`);
      socket.current.emit('joinConversations', userId, role, clinic);
    }
    
    // Load messages from cache if available, otherwise fetch
    if (messagesByConversation[patientConversation._id]) {
      console.log('💾 Setting messages from cache for staff/owner');
      setMessages(messagesByConversation[patientConversation._id]);
      setLoading(false);
    } else {
      console.log('🔄 Loading messages from server');
      loadMessages(patientConversation._id).then(() => {
        setLoading(false);
      });
    }
  } else {
    console.log('🆕 No existing conversation found, creating new one');
    startConversation(clinic, patient._id);
  }
};

  // 4. MESSAGE HANDLING FUNCTIONS
  const handleSendMessage = useCallback(async () => {
    if (!message.trim() && !selectedFile) return;

    let temporaryId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
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
      
      // temporaryId is already defined above

      let senderName;
      if (role === 'patient') {
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
      
      setMessages(prev => prev.map(msg => 
        msg.temporaryId === temporaryId ? { ...msg, ...data, temporaryId: undefined } : msg
      ));

      const newConversationId = data.conversationId || conversationId;

      setConversations(prev => {
        const existingConvIndex = prev.findIndex(conv => conv._id === newConversationId);
        
        if (existingConvIndex >= 0) {
          const updatedConvs = [...prev];
          const updatedConv = {
            ...updatedConvs[existingConvIndex],
            lastMessage: data
          };
          
          updatedConvs.splice(existingConvIndex, 1);
          updatedConvs.unshift(updatedConv);
          
          return updatedConvs;
        } else {
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
      
      setLatestMessagesByConversation(prev => ({
        ...prev,
        [newConversationId]: data
      }));

      setMessagesByConversation(prev => {
        const conversationMessages = prev[newConversationId] || [];
        const updatedMessages = conversationMessages.map(msg => 
          msg.temporaryId === temporaryId ? { ...msg, ...data, temporaryId: undefined } : msg
        );
        
        if (!updatedMessages.some(msg => msg._id === data._id)) {
          updatedMessages.push(data);
        }
        
        return {
          ...prev,
          [newConversationId]: updatedMessages
        };
      });

      if (data.conversationId && data.conversationId !== conversationId) {
        setConversationId(data.conversationId);
        
        if (socket.current && socket.current.connected) {
          socket.current.emit('joinConversation', data.conversationId);
        } else {
          console.warn('Socket not connected, will join conversation when socket connects');
        }
        
        await loadMessages(data.conversationId);
      }
      
      setTimeout(scrollToBottom, 100);
      
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.filter(msg => msg.temporaryId !== temporaryId));
      setPendingMessageId(null);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  }, [message, selectedFile, conversationId, selectedPatient, patientName, apiUrl, showpatientambherConversation, showpatientbautistaConversation, loadMessages, scrollToBottom]);





  // 5. UI HELPER FUNCTIONS
const renderMessageContent = (msg, isCurrentUser) => {
  // Handle different message types
  const isImage = msg.imageUrl && !msg.text && !msg.documentUrl;
  const isDocument = msg.documentUrl && !msg.imageUrl;
  const isText = msg.text && !msg.imageUrl && !msg.documentUrl;
  const isMixed = msg.text && (msg.imageUrl || msg.documentUrl);

  // Construct proper URLs
  const imageUrl = msg.imageUrl ? (msg.imageUrl.startsWith('http') ? msg.imageUrl : `${apiUrl}${msg.imageUrl.startsWith('/') ? '' : '/'}${msg.imageUrl}`) : null;
  const documentUrl = msg.documentUrl ? (msg.documentUrl.startsWith('http') ? msg.documentUrl : `${apiUrl}${msg.documentUrl.startsWith('/') ? '' : '/'}${msg.documentUrl}`) : null;
  
  // Debug logging
  if (msg.imageUrl) {
    console.log('Original imageUrl from DB:', msg.imageUrl);
    console.log('Constructed imageUrl:', imageUrl);
    console.log('API URL:', apiUrl);
  }

  return (
    <>
      {(isText || isMixed) && msg.text && (
        <p className="text-[15px] font-albertsans font-semibold text-[#555555] whitespace-pre-wrap break-words mb-2">
          {msg.text}
        </p>
      )}
      
      {(isImage || isMixed) && msg.imageUrl && (
        <div className="mt-2 relative">
          {/* Loading state for image */}
          {imageLoadingStates[msg._id || msg.temporaryId] !== false && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-600">Loading image...</span>
              </div>
            </div>
          )}
          <img 
            src={imageUrl} 
            alt={msg.temporaryId ? "Sending image..." : (isCurrentUser ? "Sent image" : "Received image")} 
            className={`max-w-full max-h-60 rounded-lg cursor-pointer hover:opacity-90 transition-opacity ${
              imageLoadingStates[msg._id || msg.temporaryId] === false ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => {
              if (imageLoadingStates[msg._id || msg.temporaryId] === false) {
                setSelectedImageForModal(imageUrl);
                setModalOpen(true);
              }
            }}
            onLoad={() => {
              // Set image as loaded
              setImageLoadingStates(prev => ({
                ...prev,
                [msg._id || msg.temporaryId]: false
              }));
              
              // Remove any error messages when image loads successfully
              const errorDiv = document.querySelector(`[data-error-for="${msg._id || msg.temporaryId}"]`);
              if (errorDiv) errorDiv.remove();
            }}
            onError={(e) => {
              console.error('Failed to load image:', imageUrl);
              
              // Set image as failed to load
              setImageLoadingStates(prev => ({
                ...prev,
                [msg._id || msg.temporaryId]: false
              }));
              
              // Don't show error for temporary messages (they're still uploading)
              if (msg.temporaryId) {
                return;
              }
              
              // Retry loading the image once after a short delay
              if (!e.target.hasAttribute('data-retry-attempted')) {
                e.target.setAttribute('data-retry-attempted', 'true');
                setTimeout(() => {
                  e.target.src = imageUrl;
                }, 1000);
                return;
              }
              
              // Only show error after retry fails
              e.target.style.display = 'none';
              
              // Check if error message already exists
              const existingError = document.querySelector(`[data-error-for="${msg._id || msg.temporaryId}"]`);
              if (!existingError) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center';
                errorDiv.innerHTML = `
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Image no longer available</span>
                `;
                errorDiv.setAttribute('data-error-for', msg._id || msg.temporaryId);
                e.target.parentNode.appendChild(errorDiv);
              }
            }}
          />
        </div>
      )}
      
      {(isDocument || isMixed) && msg.documentUrl && (
        <div className="mt-2 p-2 bg-gray-100 rounded-lg flex items-center w-full">
          <img src={filesent} className="w-6 h-6 mr-2 flex-shrink-0" alt="Document icon" />
          <a 
            href={documentUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all flex-1"
            download={msg.documentName || msg.documentUrl?.split('/').pop()}
            onClick={(e) => {
              // Log for debugging
              console.log('Downloading document:', {
                originalUrl: msg.documentUrl,
                fullUrl: documentUrl,
                documentName: msg.documentName
              });
            }}
          >
            {msg.documentName || msg.documentUrl?.split('/').pop() || 'Download File'}
          </a>
        </div>
      )}
      
      {!isImage && (
        <div className={`motion-preset-slide-up rounded-2xl absolute bottom-full mb-1 hidden group-hover:block bg-black bg-opacity-75 text-white text-xs px-2 py-1 whitespace-nowrap z-10 ${isCurrentUser ? 'right-0' : 'left-0'}`}>
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

  // Debounced search function
  const debouncedSearch = useCallback(
    (query) => {
      if (!query.trim()) {
        setFilteredPatients([]);
        return;
      }
      
      const filtered = patients.filter(patient => {
        const fullName = `${patient.patientfirstname} ${patient.patientlastname}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });
      
      setFilteredPatients(filtered);
    },
    [patients]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Filter patients based on All/Unread selection
  const getFilteredPatientsForDisplay = () => {
    const patientsToFilter = searchQuery.trim() ? filteredPatients : patients;
    
    if (activeambhermessageslist === 'unreadambhermessageslist') {
      return patientsToFilter.filter(patient => {
        const conversation = conversations.find(conv => 
          conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
        );
        return conversation && hasUnreadMessages(conversation._id);
      });
    }
    
    return patientsToFilter;
  };

  // 6. INITIALIZATION EFFECTS (in order of dependency)
  
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

  // Fix missing IDs
  useEffect(() => {
    const role = localStorage.getItem('role');
    
    if (role === 'owner' && !localStorage.getItem('ownerid')) {
      const ownerdetails = localStorage.getItem('ownerdetails');
      if (ownerdetails) {
        try {
          const ownerData = JSON.parse(ownerdetails);
          const ownerId = ownerData._id || ownerData.id;
          if (ownerId) {
            localStorage.setItem('ownerid', ownerId);
            console.log('Fixed missing ownerid:', ownerId);
            forceUpdate({});
          }
        } catch (error) {
          console.error('Error parsing ownerdetails:', error);
        }
      }
    }
    
    if (role === 'staff' && !localStorage.getItem('staffid')) {
      const staffdetails = localStorage.getItem('staffdetails');
      if (staffdetails) {
        try {
          const staffData = JSON.parse(staffdetails);
          const staffId = staffData._id || staffData.id;
          if (staffId) {
            localStorage.setItem('staffid', staffId);
            console.log('Fixed missing staffid:', staffId);
            forceUpdate({});
          }
        } catch (error) {
          console.error('Error parsing staffdetails:', error);
        }
      }
    }
  }, [location.pathname]);

  // User change detection and data clearing
useEffect(() => {
  const currentRole = localStorage.getItem('role');
  const currentUserId = localStorage.getItem('patientid') || 
                       localStorage.getItem('staffid') || 
                       localStorage.getItem('ownerid');
  const currentClinic = localStorage.getItem('staffclinic') || 
                       localStorage.getItem('ownerclinic');

  // Create a unique user identifier
  const currentUser = `${currentRole}-${currentUserId}-${currentClinic}`;
  const lastUser = sessionStorage.getItem('lastChatUser');

  // If user has changed, clear all chat data
  if (lastUser && lastUser !== currentUser) {
    console.log('User changed, clearing chat data:', { lastUser, currentUser });
    
    // Clear all chat-related state
    setConversations([]);
    setMessages([]);
    setMessagesByConversation({});
    setLatestMessagesByConversation({});
    setUnreadMessagesByConversation({});
    setHasGlobalUnreadMessages(false);
    setConversationId(null);
    setSelectedPatient(null);
    setSelectedClinic(null);
    setPatients([]); // Clear the patient list
    setshowpatientchatdashboard(false);
    setshowpatientambherConversation(false);
    setshowpatientbautistaConversation(false);
    setLoadingConversations(false);
    
    messagesCache.current = {};
    isInitializedRef.current = false;
    conversationsFetchedRef.current = false;
    
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
    }
  }

  if (currentUser) {
    sessionStorage.setItem('lastChatUser', currentUser);
  }
}, [location.pathname]);


// Replace the socket initialization useEffect with this enhanced version:

useEffect(() => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const needsInit = localStorage.getItem('needsSocketInit');
  
  if (!token || !role) {
    console.log('No token or role found, skipping socket initialization');
    return;
  }

  // Force reinitialization after login
  if (needsInit === 'true') {
    console.log('🔄 FORCE socket reinitialization after login');
    localStorage.removeItem('needsSocketInit');
    isInitializedRef.current = false;
    
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
    }
  }

  // Prevent multiple socket connections
  if (socket.current && socket.current.connected && !needsInit) {
    console.log('Socket already connected');
    return;
  }

  // Only initialize once per user session (unless forced)
  if (isInitializedRef.current && !needsInit) {
    console.log('Socket already initialized for this session');
    return;
  }

  console.log(`🚀 Initializing socket connection for ${role} (force: ${needsInit === 'true'})...`);
  isInitializedRef.current = true;
  
  if (!socket.current) {
    socket.current = io(apiUrl, {
      auth: { token: token },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      forceNew: true // CRITICAL: Force new connection after login
    });

    socket.current.on('connect', () => {
      console.log('🔌 Socket.IO connected successfully for', role);
      const userId = localStorage.getItem('patientid') || 
                    localStorage.getItem('staffid') || 
                    localStorage.getItem('ownerid');
      const userRole = localStorage.getItem('role');
      const clinic = localStorage.getItem('staffclinic') || 
                    localStorage.getItem('ownerclinic');

      if (userId && userRole) {
        console.log('🏠 Joining conversations for user:', { userId, userRole, clinic });
        socket.current.emit('joinConversations', userId, userRole, clinic);
        
        // Join current conversation if active
        if (conversationIdRef.current) {
          console.log('🔄 Re-joining current conversation:', conversationIdRef.current);
          socket.current.emit('joinConversation', conversationIdRef.current);
          socket.current.emit('joinRoom', `conversation-${conversationIdRef.current}`);
          if (clinic) {
            socket.current.emit('joinRoom', `clinic-${clinic}-conversation-${conversationIdRef.current}`);
          }
        }
        
        // IMMEDIATE conversation fetch for fresh login
        console.log('🔄 IMMEDIATE conversation fetch after socket connect');
        setTimeout(() => {
          fetchConversations(true);
        }, 500);
        
        // ENHANCED: For staff/owner, join ALL conversation rooms immediately
        if ((userRole === 'staff' || userRole === 'owner') && clinic) {
          console.log(`🏥 ${userRole} from ${clinic} ENHANCED joining ALL rooms on socket connect`);
          
          // Join general clinic rooms
          socket.current.emit('joinRoom', `clinic-${clinic}`);
          socket.current.emit('joinRoom', `clinic-${clinic}-all`);
          socket.current.emit('joinRoom', `clinic-${clinic}-patients`);
          socket.current.emit('joinRoom', `all-conversations`);
          socket.current.emit('joinRoom', `global-messages`);
          
          // CRITICAL: Fetch conversations THEN join all rooms
          setTimeout(() => {
            console.log('⚡ Post-login: Fetching conversations to join all existing rooms');
            fetchConversations(true).then(() => {
              console.log('⚡ Post-login: After fetch, joining ALL conversation rooms for', clinic);
              
              // Additional delay to ensure conversations state is updated
              setTimeout(() => {
                if (conversations.length > 0) {
                  conversations.forEach(conv => {
                    console.log(`⚡ ${userRole} (${clinic}) post-login joining conversation ${conv._id}`);
                    socket.current.emit('joinConversation', conv._id);
                    socket.current.emit('joinRoom', `conversation-${conv._id}`);
                    socket.current.emit('joinRoom', `clinic-${clinic}-conversation-${conv._id}`);
                    socket.current.emit('joinRoom', `patient-conversation-${conv._id}`);
                    socket.current.emit('joinRoom', `global-conversation-${conv._id}`);
                    socket.current.emit('joinRoom', `room-${conv._id}`);
                    socket.current.emit('joinRoom', `msg-${conv._id}`);
                  });
                }
              }, 1000);
            });
          }, 1000);
        }
      }
    });

    // Rest of your socket event handlers remain the same...
    socket.current.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    socket.current.on('disconnect', (reason) => {
      console.log('Socket.IO disconnected:', reason);
      isInitializedRef.current = false;
    });

    socket.current.on('reconnect', (attemptNumber) => {
      console.log('Socket.IO reconnected after', attemptNumber, 'attempts');
      isInitializedRef.current = true;
      const userId = localStorage.getItem('patientid') || 
                    localStorage.getItem('staffid') || 
                    localStorage.getItem('ownerid');
      const userRole = localStorage.getItem('role');
      const clinic = localStorage.getItem('staffclinic') || 
                    localStorage.getItem('ownerclinic');

      if (userId && userRole) {
        socket.current.emit('joinConversations', userId, userRole, clinic);
        if (conversationIdRef.current) {
          console.log('Re-joining conversation after reconnect:', conversationIdRef.current);
          socket.current.emit('joinConversation', conversationIdRef.current);
        }
        
        // Re-fetch conversations after reconnect
        fetchConversations(true);
      }
    });

    // Your existing newMessage handler...
    socket.current.on('newMessage', (newMessage) => {
      console.log('📨 NEW MESSAGE RECEIVED:', newMessage);
      console.log('🎯 Current conversation ID (ref):', conversationIdRef.current);

      const currentUserId = localStorage.getItem('patientid') ||
                           localStorage.getItem('staffid') ||
                           localStorage.getItem('ownerid');
      const currentRole = localStorage.getItem('role');
      const currentClinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');

      // Use batched updates to ensure all state changes happen together
      unstable_batchedUpdates(() => {
        // Check if this message is for the currently active conversation
        const isForActiveConversation = newMessage.conversationId === conversationIdRef.current;
        console.log('✅ Is message for active conversation?', isForActiveConversation);

        // CRITICAL FIX: Update the messages state for the active conversation
        if (isForActiveConversation) {
          console.log('🔄 UPDATING ACTIVE MESSAGES for current conversation - Role:', currentRole);
          
          // Update the main messages state that the chat interface uses
          setMessages(prev => {
            // Check if message already exists to prevent duplicates
            const messageExists = prev.some(msg => 
              msg._id === newMessage._id || 
              (msg.temporaryId && msg.temporaryId === newMessage.temporaryId)
            );
            
            if (!messageExists) {
              console.log('✨ ADDING NEW MESSAGE TO ACTIVE CHAT for', currentRole, '- Message:', newMessage.text);
              const updatedMessages = [...prev, newMessage];
              
              // Force scroll to bottom after a short delay
              setTimeout(() => {
                console.log('📜 Scrolling to bottom after new message');
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 100);
              
              return updatedMessages;
            }
            
            console.log('⚠️ Message already exists in active conversation');
            return prev;
          });
        }

        // ALWAYS update messagesByConversation
        setMessagesByConversation(prev => {
          const conversationMessages = prev[newMessage.conversationId] || [];
          const messageExists = conversationMessages.some(msg => 
            msg._id === newMessage._id || 
            (msg.temporaryId && msg.temporaryId === newMessage.temporaryId)
          );
          
          if (!messageExists) {
            console.log('💾 Adding message to messagesByConversation cache:', newMessage.conversationId);
            const updatedMessages = [...conversationMessages, newMessage];
            return {
              ...prev,
              [newMessage.conversationId]: updatedMessages
            };
          }
          return prev;
        });

        // Update latest message for the conversation list
        setLatestMessagesByConversation(prev => ({
          ...prev,
          [newMessage.conversationId]: newMessage
        }));

        // Update conversations list with the new message
        setConversations(prev => {
          let conversationUpdated = false;
          const updatedConversations = prev.map(conv => {
            if (conv._id === newMessage.conversationId) {
              conversationUpdated = true;
              return { ...conv, lastMessage: newMessage };
            }
            return conv;
          });

          // If conversation not found, fetch all conversations
          if (!conversationUpdated) {
            console.log('🆕 New conversation detected, fetching all conversations');
            fetchConversations(true);
          }

          // Sort conversations by last message timestamp (newest first)
          return updatedConversations.sort((a, b) => {
            if (!a.lastMessage && !b.lastMessage) return 0;
            if (!a.lastMessage) return 1;
            if (!b.lastMessage) return -1;
            return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
          });
        });

        // ENHANCED UNREAD MESSAGE DETECTION
        if (newMessage.senderId !== currentUserId) {
          console.log('🔔 Checking unread status for conversation:', newMessage.conversationId);
          
          let shouldMarkUnread = false;
          
          if (currentRole === 'patient') {
            const isDashboardOpen = showpatientchatdashboard;
            const isSpecificClinicOpen = (newMessage.senderClinic === "Ambher Optical" && showpatientambherConversation) ||
                                        (newMessage.senderClinic === "Bautista Eye Center" && showpatientbautistaConversation);
            
            shouldMarkUnread = !isForActiveConversation || !isDashboardOpen || !isSpecificClinicOpen;
            
            console.log('👤 Patient unread check:', {
              senderClinic: newMessage.senderClinic,
              isDashboardOpen,
              isSpecificClinicOpen,
              isForActiveConversation,
              shouldMarkUnread
            });
          } else if (currentRole === 'staff' || currentRole === 'owner') {
            const isRelevantToCurrentClinic = 
              newMessage.sentToClinic === currentClinic ||
              newMessage.senderClinic === currentClinic ||
              (newMessage.senderRole === 'patient' && newMessage.sentToClinic === currentClinic);
            
            shouldMarkUnread = isRelevantToCurrentClinic && !isForActiveConversation;
            
            console.log('🏥 Clinic unread check:', {
              currentClinic,
              senderClinic: newMessage.senderClinic,
              sentToClinic: newMessage.sentToClinic,
              senderRole: newMessage.senderRole,
              isRelevantToCurrentClinic,
              isForActiveConversation,
              shouldMarkUnread
            });
          }
          
          setUnreadMessagesByConversation(prev => ({
            ...prev,
            [newMessage.conversationId]: shouldMarkUnread
          }));
          
          if (shouldMarkUnread) {
            setHasGlobalUnreadMessages(true);
            console.log('🔴 Set global unread to true for', currentRole, currentClinic);
          } else {
            setTimeout(() => {
              const hasOtherUnread = Object.values(unreadMessagesByConversation).some(isUnread => isUnread);
              if (!hasOtherUnread) {
                setHasGlobalUnreadMessages(false);
                console.log('✅ No other unread messages, clearing global unread for', currentRole, currentClinic);
              }
            }, 100);
          }
        }
      });
    });
  }
}, [apiUrl, fetchConversations, conversations]); // Add conversations as dependency





// KEEP THIS ONE - Enhanced Staff/Owner Socket Room Management
useEffect(() => {
  const role = localStorage.getItem('role');
  
  // For staff/owner: ensure they stay connected to all relevant conversations
  if ((role === 'staff' || role === 'owner') && socket.current && socket.current.connected && conversations.length > 0) {
    console.log('🔥 Staff/Owner FORCE joining ALL conversations for real-time updates');
    
    const userId = localStorage.getItem('staffid') || localStorage.getItem('ownerid');
    const userClinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');
    
    if (userId && userClinic) {
      // Join general conversations for this clinic
      socket.current.emit('joinConversations', userId, role, userClinic);
      
      // CRITICAL: Join EVERY SINGLE conversation regardless of participants
      conversations.forEach(conv => {
        console.log(`🎯 ${role} (${userClinic}) FORCE joining conversation ${conv._id} for real-time updates`);
        
        // Multiple join patterns to ensure coverage
        socket.current.emit('joinConversation', conv._id);
        socket.current.emit('joinRoom', `conversation-${conv._id}`);
        socket.current.emit('joinRoom', `clinic-${userClinic}-conversation-${conv._id}`);
        socket.current.emit('joinRoom', `patient-conversation-${conv._id}`);
        socket.current.emit('joinRoom', `global-conversation-${conv._id}`);
      });
      
      // Join general clinic rooms with multiple patterns
      socket.current.emit('joinRoom', `clinic-${userClinic}`);
      socket.current.emit('joinRoom', `clinic-${userClinic}-all`);
      socket.current.emit('joinRoom', `clinic-${userClinic}-patients`);
      socket.current.emit('joinRoom', `all-conversations`);
      
      console.log(`🚀 ${role} from ${userClinic} FORCE joined ${conversations.length} conversations with multiple room patterns`);
    }
  }
}, [conversations, socket.current?.connected]);










  // 8. OTHER EFFECTS (in order of importance)

  // Initialize debounced fetchConversations
  useEffect(() => {
    fetchConversationsRef.current = debounce((forceRefresh = false) => fetchConversations(forceRefresh), 1000);
  }, [fetchConversations]);

  // Escape key handler
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showpatientchatdashboard) {
        console.log('Escape key pressed, closing chat dashboard');
        setshowpatientbautistaConversation(false);
        setshowpatientambherConversation(false);
        setshowpatientchatdashboard(false);
        setSelectedClinic(null);
        setSelectedPatient(null);
        setMessages([]);
        setConversationId(null);
      }
    };

    if (showpatientchatdashboard) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showpatientchatdashboard]);




// Replace the conversation joining effect (around line 850)
useEffect(() => {
  if (conversationId && socket.current && socket.current.connected) {
    console.log('Joining conversation via Socket.IO:', conversationId);
    socket.current.emit('joinConversation', conversationId);
    
    // Also ensure we're listening for messages in this conversation
    const currentUserId = localStorage.getItem('patientid') || 
                         localStorage.getItem('staffid') || 
                         localStorage.getItem('ownerid');
    const role = localStorage.getItem('role');
    
    if (currentUserId && role) {
      socket.current.emit('joinConversations', currentUserId, role);
    }
  } else if (conversationId && socket.current && !socket.current.connected) {
    console.log('Socket not connected, will join conversation when socket connects');
  }
}, [conversationId]);





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

  // Initialize loading states for images in messages
  useEffect(() => {
    if (messages.length > 0) {
      const newLoadingStates = {};
      messages.forEach(msg => {
        if (msg.imageUrl && imageLoadingStates[msg._id || msg.temporaryId] === undefined) {
          newLoadingStates[msg._id || msg.temporaryId] = true; // Set as loading initially
        }
      });
      
      if (Object.keys(newLoadingStates).length > 0) {
        setImageLoadingStates(prev => ({ ...prev, ...newLoadingStates }));
      }
    }
  }, [messages, imageLoadingStates]);




  // Fetch patients when chat dashboard opens for staff/owner
  useEffect(() => {
    if (showpatientchatdashboard && (localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner")) {
      fetchPatients();
      
      if (socket.current && !socket.current.connected) {
        console.log('Reconnecting socket when chat dashboard opens');
        socket.current.connect();
      }
    }
  }, [showpatientchatdashboard]);

  // Handle patient conversations
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket.current) {
        console.log('Component unmounting, disconnecting socket');
        socket.current.disconnect();
      }
    };
  }, []);





useEffect(() => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  
  // Auto-fetch conversations when user logs in or changes routes
  if (role && token) {
    console.log(`Auto-fetching conversations for ${role} on route change`);
    
    // Longer delay for route changes to ensure everything is loaded
    const timer = setTimeout(() => {
      fetchConversations(true);
      
      // Also fetch patients for staff/owner
      if (role === 'staff' || role === 'owner') {
        fetchPatients();
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }
}, [location.pathname, fetchConversations, fetchPatients]);






useEffect(() => {
  console.log('Messages state changed:', {
    messagesCount: messages.length,
    conversationId,
    conversationIdRef: conversationIdRef.current,
    lastMessage: messages[messages.length - 1]?.text || 'No messages'
  });
}, [messages, conversationId]);

useEffect(() => {
  console.log('ConversationId state changed:', {
    oldId: 'previous',
    newId: conversationId,
    refValue: conversationIdRef.current
  });
}, [conversationId]);






useEffect(() => {
  console.log('Messages state updated:', {
    messagesCount: messages.length,
    conversationId,
    conversationIdRef: conversationIdRef.current,
    role: localStorage.getItem('role'),
    lastMessage: messages[messages.length - 1]?.text || 'No messages',
    lastMessageSender: messages[messages.length - 1]?.senderName || 'Unknown'
  });
}, [messages]);







// Add this new effect for periodic room re-joining - Add around line 1650
useEffect(() => {
  const role = localStorage.getItem('role');
  
  // For staff/owner: periodically ensure they're in all conversation rooms
  if ((role === 'staff' || role === 'owner') && showpatientchatdashboard) {
    const interval = setInterval(() => {
      if (socket.current && socket.current.connected && conversations.length > 0) {
        const userId = localStorage.getItem('staffid') || localStorage.getItem('ownerid');
        const userClinic = localStorage.getItem('staffclinic') || localStorage.getItem('ownerclinic');
        
        if (userId && userClinic) {
          console.log(`🔄 Periodic ENHANCED room re-join for ${role} (${userClinic})`);
          
          // Re-join all conversations with multiple patterns
          conversations.forEach(conv => {
            socket.current.emit('joinConversation', conv._id);
            socket.current.emit('joinRoom', `conversation-${conv._id}`);
            socket.current.emit('joinRoom', `clinic-${userClinic}-conversation-${conv._id}`);
            socket.current.emit('joinRoom', `patient-conversation-${conv._id}`);
            socket.current.emit('joinRoom', `global-conversation-${conv._id}`);
            socket.current.emit('joinRoom', `room-${conv._id}`);
            socket.current.emit('joinRoom', `msg-${conv._id}`);
          });
          
          // Re-join general rooms
          socket.current.emit('joinConversations', userId, role, userClinic);
          socket.current.emit('joinRoom', `clinic-${userClinic}`);
          socket.current.emit('joinRoom', `clinic-${userClinic}-all`);
          socket.current.emit('joinRoom', `all-conversations`);
          socket.current.emit('joinRoom', `global-messages`);
        }
      }
    }, 15000); // Every 15 seconds
    
    return () => clearInterval(interval);
  }
}, [showpatientchatdashboard, conversations.length]);


useEffect(() => {
  console.log('Messages state changed:', {
    messagesCount: messages.length,
    conversationId,
    conversationIdRef: conversationIdRef.current,
    lastMessage: messages[messages.length - 1]?.text || 'No messages'
  });
}, [messages, conversationId]);

useEffect(() => {
  console.log('ConversationId state changed:', {
    oldId: 'previous',
    newId: conversationId,
    refValue: conversationIdRef.current
  });
}, [conversationId]);


useEffect(() => {

  if (conversationId) {
    console.log('Conversation changed, loading messages:', conversationId);
    

    if (messagesByConversation[conversationId]) {
      console.log('Loading messages from cache for conversation:', conversationId);
      setMessages(messagesByConversation[conversationId]);
    } else {

      console.log('Fetching messages from server for conversation:', conversationId);
      loadMessages(conversationId);
    }
    

    markConversationAsRead(conversationId);
  } else {

    setMessages([]);
  }
}, [conversationId, messagesByConversation]);



// Add this new useEffect to handle post-login initialization:

// Single consolidated initialization handler - no more duplicates



























































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
  onClick={async () => {
    console.log('Switching to Ambher Optical conversation');
    // Reset states for clinic switch
    setshowpatientambherConversation(true);
    setshowpatientbautistaConversation(false);
    setMessages([]);
    setConversationId(null);
    conversationIdRef.current = null;

    try {
      // Find Ambher conversation
      const ambherConv = conversations.find(conv =>
        conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") ||
        conv.clinic === "Ambher Optical"
      );

      if (ambherConv) {
        // Set conversation ID
        setConversationId(ambherConv._id);
        conversationIdRef.current = ambherConv._id;

        // IMMEDIATELY mark as read to clear notification
        setUnreadMessagesByConversation(prev => ({
          ...prev,
          [ambherConv._id]: false
        }));

        // Check if there are still other unread conversations
        setTimeout(() => {
          const hasOtherUnread = Object.entries(unreadMessagesByConversation).some(([convId, isUnread]) => 
            convId !== ambherConv._id && isUnread
          );
          setHasGlobalUnreadMessages(hasOtherUnread);
        }, 100);

        // Join conversation via socket
        if (socket.current && socket.current.connected) {
          console.log('Joining Ambher conversation:', ambherConv._id);
          socket.current.emit('joinConversation', ambherConv._id);
          const patientId = localStorage.getItem('patientid');
          if (patientId) {
            socket.current.emit('joinConversations', patientId, 'patient', null);
          }
        }

        // Load messages
        if (messagesByConversation[ambherConv._id]) {
          console.log('Loading Ambher messages from cache:', messagesByConversation[ambherConv._id].length);
          setMessages(messagesByConversation[ambherConv._id]);
        } else {
          console.log('Fetching Ambher messages from server');
          await loadMessages(ambherConv._id);
        }
      } else {
        console.log('No Ambher conversation found, starting new one');
        await startConversation("Ambher Optical");
      }
    } catch (error) {
      console.error('Error switching to Ambher Optical:', error);
    }
  }}
  className="hover:shadow-md hover:bg-[#d8f1fd] hover:scale-105 transition-all duration-300 ease-in-out gap-2 cursor-pointer flex flex-col justify-center items-center w-40 h-40 rounded-md border-1 relative"
>
  {/* Red notification dot for Ambher Optical */}
  {(() => {
    const ambherConv = conversations.find(conv =>
      conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") ||
      conv.clinic === "Ambher Optical"
    );
    return ambherConv && hasUnreadMessages(ambherConv._id) ? (
      <div className="absolute top-2 right-2 flex justify-center items-center bg-[#e93f3f] rounded-full w-4 h-4"></div>
    ) : null;
  })()}
  
  {/* Ambher Optical Logo */}
  <img 
    src={ambherlogo} 
    alt="Ambher Optical Logo" 
    className="w-20 h-20 object-contain mb-2"
  />
  
  {/* Ambher Optical Name */}
  <p className="font-albertsans font-semibold text-[16px] text-[#39715f] text-center">
    Ambher Optical
  </p>
</div>



<div
  onClick={async () => {
    console.log('Switching to Bautista Eye Center conversation');
    // Reset states for clinic switch
    setshowpatientbautistaConversation(true);
    setshowpatientambherConversation(false);
    setMessages([]);
    setConversationId(null);
    conversationIdRef.current = null;

    try {
      // Find Bautista conversation
      const bautistaConv = conversations.find(conv =>
        conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center") ||
        conv.clinic === "Bautista Eye Center"
      );

      if (bautistaConv) {
        // Set conversation ID
        setConversationId(bautistaConv._id);
        conversationIdRef.current = bautistaConv._id;

        // IMMEDIATELY mark as read to clear notification
        setUnreadMessagesByConversation(prev => ({
          ...prev,
          [bautistaConv._id]: false
        }));

        // Check if there are still other unread conversations
        setTimeout(() => {
          const hasOtherUnread = Object.entries(unreadMessagesByConversation).some(([convId, isUnread]) => 
            convId !== bautistaConv._id && isUnread
          );
          setHasGlobalUnreadMessages(hasOtherUnread);
        }, 100);

        // Join conversation via socket
        if (socket.current && socket.current.connected) {
          console.log('Joining Bautista conversation:', bautistaConv._id);
          socket.current.emit('joinConversation', bautistaConv._id);
          const patientId = localStorage.getItem('patientid');
          if (patientId) {
            socket.current.emit('joinConversations', patientId, 'patient', null);
          }
        }

        // Load messages
        if (messagesByConversation[bautistaConv._id]) {
          console.log('Loading Bautista messages from cache:', messagesByConversation[bautistaConv._id].length);
          setMessages(messagesByConversation[bautistaConv._id]);
        } else {
          console.log('Fetching Bautista messages from server');
          await loadMessages(bautistaConv._id);
        }
      } else {
        console.log('No Bautista conversation found, starting new one');
        await startConversation("Bautista Eye Center");
      }
    } catch (error) {
      console.error('Error switching to Bautista Eye Center:', error);
    }
  }}
  className="hover:shadow-md hover:bg-[#d8f1fd] hover:scale-105 transition-all duration-300 ease-in-out gap-2 cursor-pointer flex flex-col justify-center items-center w-40 h-40 rounded-md border-1 relative"
>
  {/* Red notification dot for Bautista Eye Center */}
  {(() => {
    const bautistaConv = conversations.find(conv =>
      conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center") ||
      conv.clinic === "Bautista Eye Center"
    );
    return bautistaConv && hasUnreadMessages(bautistaConv._id) ? (
      <div className="absolute top-2 right-2 flex justify-center items-center bg-[#e93f3f] rounded-full w-4 h-4"></div>
    ) : null;
  })()}
  
  {/* Bautista Eye Center Logo */}
  <img 
    src={bautistalogo} 
    alt="Bautista Eye Center Logo" 
    className="w-20 h-20 object-contain mb-2"
  />
  
  {/* Bautista Eye Center Name */}
  <p className="font-albertsans font-semibold text-[16px] text-[#0a4277] text-center">
    Bautista Eye Center
  </p>
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
  const isCurrentUser = (() => {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('patientid') || 
                  localStorage.getItem('staffid') || 
                  localStorage.getItem('ownerid');
    
    // For patients: check both role and ID
    if (role === 'patient') {
      return msg.senderRole === 'patient' && msg.senderId === userId;
    }
    
    // For staff/owner: check role and ID
    if (role === 'staff' || role === 'owner') {
      return msg.senderRole === role && msg.senderId === userId;
    }
    
    return false;
  })();
  
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
    
    // Always fetch conversations when opening dashboard to ensure we have the latest data
    fetchConversations(true);
    
    if (socket.current && !socket.current.connected) {
      console.log('Reconnecting socket when chat dashboard opens');
      socket.current.connect();
      setTimeout(() => {
        fetchConversations(true);
      }, 500);
    }
  }} 
  className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#1583b3]">
  {hasGlobalUnreadMessages && (
    <div className="flex justify-center items-center absolute top-0 right-0 bg-[#e93f3f] rounded-full w-4.5 h-4.5"></div>
  )}
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
                        value={searchQuery}
                        onChange={handleSearchChange}
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
  className="relative p-2 flex items-center justify-start w-full h-15 border-1 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 rounded-2xl"
  onClick={() => {
  console.log('Starting clinic-to-clinic conversation with Bautista Eye Center');
  setLoading(true);
  setSelectedPatient(null);
  
  // Mark this clinic conversation as read in database
  const clinicConversation = conversations.find(conv => 
    conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") &&
    conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center")
  );
  if (clinicConversation) {
    markConversationAsRead(clinicConversation._id);
  }
  
  startConversation("Bautista Eye Center");
}}
>
  {(() => {
    const clinicConversation = conversations.find(conv => 
      conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") &&
      conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center")
    );
    return clinicConversation && hasUnreadMessages(clinicConversation._id) ? (
      <div className="absolute top-0 right-0 flex justify-center items-center bg-[#f15b5b] rounded-full w-4 h-4"></div>
    ) : null;
  })()}
  <img src={bautistalogo} className="w-13 h-13"/>
  <div className="w-[76%] flex flex-col justify-center items-start ml-3">
    <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a] truncate overflow-hidden whitespace-nowrap w-full">Bautista Eye Center</p>
    <p className="font-albertsans font-medium text-[13px] text-[#555555] truncate overflow-hidden whitespace-nowrap w-full">
      {(() => {
        const clinicConversation = conversations.find(conv => 
          conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") &&
          conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center")
        );
        const latestMessage = clinicConversation ? getLatestMessageForConversation(clinicConversation._id) : null;
        return getLatestMessageDisplay({ patientfirstname: "Ambher Optical" }, latestMessage ? [latestMessage] : []);
      })()}
    </p>
  </div>
</div>


{getFilteredPatientsForDisplay()
  .map(patient => {
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
  .sort((a, b) => b.lastMessageTime - a.lastMessageTime)
  .map(({ patient }) => (
    <div 
      key={patient._id}
      className={`p-2 flex items-center justify-start w-full h-19 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer rounded-2xl relative ${
        selectedPatient?._id === patient._id ? 'bg-green-50 border-blue-200' : ''
      }`}
      onClick={() => {
        handlePatientSelect(patient);
        // Mark conversation as read when selected
        const patientConversation = conversations.find(conv => 
          conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
        );
        if (patientConversation) {
          setUnreadMessagesByConversation(prev => ({
            ...prev,
            [patientConversation._id]: false
          }));
        }
      }}
    >
      {(() => {
        const patientConversation = conversations.find(conv => 
          conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
        );
        return patientConversation && hasUnreadMessages(patientConversation._id) ? (
          <div className="absolute top-0 right-0 flex justify-center items-center bg-[#f15b5b] rounded-full w-4 h-4"></div>
        ) : null;
      })()}
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
  }} 
  className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#39715f]"  >
  <img src={close} alt="logo" className="select-none motion-preset-shake w-10 h-10 p-2" />
</div>
            ) : (
// For Ambher Optical staff/owner
// Enhanced Ambher Optical dashboard opening - Replace around line 2850
<div 
  onClick={() => {
    console.log('🏥 Opening Ambher Optical chat dashboard');
    setshowpatientchatdashboard(true);
    
    // FORCE socket connection and room joining
    const userId = localStorage.getItem('staffid') || localStorage.getItem('ownerid');
    const role = localStorage.getItem('role');
    const clinic = 'Ambher Optical';
    
    // Immediate room joining for existing conversations
    if (socket.current && socket.current.connected) {
      console.log(`🚀 ${role} from ${clinic} IMMEDIATE joining on dashboard open`);
      
      // Join general conversations and rooms
      socket.current.emit('joinConversations', userId, role, clinic);
      socket.current.emit('joinRoom', `clinic-${clinic}`);
      socket.current.emit('joinRoom', `clinic-${clinic}-all`);
      socket.current.emit('joinRoom', `clinic-${clinic}-patients`);
      socket.current.emit('joinRoom', `all-conversations`);
      socket.current.emit('joinRoom', `global-messages`);
      
      // IMMEDIATE join of existing conversations
      conversations.forEach(conv => {
        console.log(`🚀 ${role} (${clinic}) IMMEDIATE joining conversation ${conv._id}`);
        socket.current.emit('joinConversation', conv._id);
        socket.current.emit('joinRoom', `conversation-${conv._id}`);
        socket.current.emit('joinRoom', `clinic-${clinic}-conversation-${conv._id}`);
        socket.current.emit('joinRoom', `patient-conversation-${conv._id}`);
        socket.current.emit('joinRoom', `global-conversation-${conv._id}`);
        socket.current.emit('joinRoom', `room-${conv._id}`);
        socket.current.emit('joinRoom', `msg-${conv._id}`);
      });
      
      // Fetch and join any new conversations
      setTimeout(() => {
        fetchConversations(true).then(() => {
          setTimeout(() => {
            conversations.forEach(conv => {
              console.log(`🚀 ${role} (${clinic}) joining new conversation ${conv._id} after fetch`);
              socket.current.emit('joinConversation', conv._id);
              socket.current.emit('joinRoom', `conversation-${conv._id}`);
              socket.current.emit('joinRoom', `clinic-${clinic}-conversation-${conv._id}`);
              socket.current.emit('joinRoom', `patient-conversation-${conv._id}`);
              socket.current.emit('joinRoom', `global-conversation-${conv._id}`);
            });
          }, 500);
        });
      }, 500);
    } else {
      console.log('🔌 Socket not connected, reconnecting for', clinic);
      socket.current?.connect();
      
      setTimeout(() => {
        if (socket.current?.connected) {
          socket.current.emit('joinConversations', userId, role, clinic);
          socket.current.emit('joinRoom', `clinic-${clinic}`);
          socket.current.emit('joinRoom', `clinic-${clinic}-all`);
          socket.current.emit('joinRoom', `all-conversations`);
          socket.current.emit('joinRoom', `global-messages`);
        }
        fetchConversations(true);
      }, 1000);
    }
    
    // Fetch patients if needed
    if (patients.length === 0) {
      fetchPatients();
    }
  }} 
  className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#39715f]">
  {hasGlobalUnreadMessages && (
    <div id="rednotificationofambher" className="flex justify-center items-center absolute top-0 right-0 bg-[#e93f3f] rounded-full w-4.5 h-4.5"></div>
  )}
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
                        value={searchQuery}
                        onChange={handleSearchChange}
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
  className="relative p-2 flex items-center justify-start w-full h-15 border-1 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 rounded-2xl"
  onClick={() => {
  console.log('Starting clinic-to-clinic conversation with Ambher Optical');
  setLoading(true);
  setSelectedPatient(null);
  
  // Mark this clinic conversation as read in database
  const clinicConversation = conversations.find(conv => 
    conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") &&
    conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center")
  );
  if (clinicConversation) {
    markConversationAsRead(clinicConversation._id);
  }
  
  startConversation("Ambher Optical");
}}
>
  {(() => {
    const clinicConversation = conversations.find(conv => 
      conv.participants.some(p => p.role === 'clinic' && p.clinic === "Ambher Optical") &&
      conv.participants.some(p => p.role === 'clinic' && p.clinic === "Bautista Eye Center")
    );
    return clinicConversation && hasUnreadMessages(clinicConversation._id) ? (
      <div className="absolute top-0 right-0 flex justify-center items-center bg-[#f15b5b] rounded-full w-4 h-4"></div>
    ) : null;
  })()}
  <img src={ambherlogo} className="w-13 h-13"/>
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


{getFilteredPatientsForDisplay()
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
      className={`p-2 flex items-center justify-start w-full h-19 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer rounded-2xl relative ${
        selectedPatient?._id === patient._id ? 'bg-blue-50 border-blue-200' : ''
      }`}
      onClick={() => {
        handlePatientSelect(patient);
        // Mark conversation as read when selected
        const patientConversation = conversations.find(conv => 
          conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
        );
        if (patientConversation) {
          setUnreadMessagesByConversation(prev => ({
            ...prev,
            [patientConversation._id]: false
          }));
        }
      }}
    >
      {(() => {
        const patientConversation = conversations.find(conv => 
          conv.participants.some(p => p.userId === patient._id && p.role === 'patient')
        );
        return patientConversation && hasUnreadMessages(patientConversation._id) ? (
          <div className="absolute top-0 right-0 flex justify-center items-center bg-[#f15b5b] rounded-full w-4 h-4"></div>
        ) : null;
      })()}
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
    setshowpatientbautistaConversation(false);
    setshowpatientambherConversation(false);
    setshowpatientchatdashboard(false);
    setSelectedClinic(null);
    setSelectedPatient(null);
    setMessages([]);
    setConversationId(null);
  }} 
  className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#0a4277]"
>
  <img src={close} alt="logo" className="select-none motion-preset-shake w-10 h-10 p-2" />
</div>
            ) : (
// Enhanced Bautista Eye Center dashboard opening - Replace around line 3350
<div 
  onClick={() => {
    console.log('🏥 Opening Bautista Eye Center chat dashboard');
    setshowpatientchatdashboard(true);
    
    // FORCE socket connection and room joining
    const userId = localStorage.getItem('staffid') || localStorage.getItem('ownerid');
    const role = localStorage.getItem('role');
    const clinic = 'Bautista Eye Center';
    
    // Immediate room joining for existing conversations
    if (socket.current && socket.current.connected) {
      console.log(`🚀 ${role} from ${clinic} IMMEDIATE joining on dashboard open`);
      
      // Join general conversations and rooms
      socket.current.emit('joinConversations', userId, role, clinic);
      socket.current.emit('joinRoom', `clinic-${clinic}`);
      socket.current.emit('joinRoom', `clinic-${clinic}-all`);
      socket.current.emit('joinRoom', `clinic-${clinic}-patients`);
      socket.current.emit('joinRoom', `all-conversations`);
      socket.current.emit('joinRoom', `global-messages`);
      
      // IMMEDIATE join of existing conversations
      conversations.forEach(conv => {
        console.log(`🚀 ${role} (${clinic}) IMMEDIATE joining conversation ${conv._id}`);
        socket.current.emit('joinConversation', conv._id);
        socket.current.emit('joinRoom', `conversation-${conv._id}`);
        socket.current.emit('joinRoom', `clinic-${clinic}-conversation-${conv._id}`);
        socket.current.emit('joinRoom', `patient-conversation-${conv._id}`);
        socket.current.emit('joinRoom', `global-conversation-${conv._id}`);
        socket.current.emit('joinRoom', `room-${conv._id}`);
        socket.current.emit('joinRoom', `msg-${conv._id}`);
      });
      
      // Fetch and join any new conversations
      setTimeout(() => {
        fetchConversations(true).then(() => {
          setTimeout(() => {
            conversations.forEach(conv => {
              console.log(`🚀 ${role} (${clinic}) joining new conversation ${conv._id} after fetch`);
              socket.current.emit('joinConversation', conv._id);
              socket.current.emit('joinRoom', `conversation-${conv._id}`);
              socket.current.emit('joinRoom', `clinic-${clinic}-conversation-${conv._id}`);
              socket.current.emit('joinRoom', `patient-conversation-${conv._id}`);
              socket.current.emit('joinRoom', `global-conversation-${conv._id}`);
            });
          }, 500);
        });
      }, 500);
    } else {
      console.log('🔌 Socket not connected, reconnecting for', clinic);
      socket.current?.connect();
      
      setTimeout(() => {
        if (socket.current?.connected) {
          socket.current.emit('joinConversations', userId, role, clinic);
          socket.current.emit('joinRoom', `clinic-${clinic}`);
          socket.current.emit('joinRoom', `clinic-${clinic}-all`);
          socket.current.emit('joinRoom', `all-conversations`);
          socket.current.emit('joinRoom', `global-messages`);
        }
        fetchConversations(true);
      }, 1000);
    }
    
    // Fetch patients if needed
    if (patients.length === 0) {
      fetchPatients();
    }
  }} 
  className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#0a4277]">
  {hasGlobalUnreadMessages && (
    <div id="rednotificationofbautista" className="flex justify-center items-center absolute top-0 right-0 bg-[#e93f3f] rounded-full w-4.5 h-4.5"></div>
  )}
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
