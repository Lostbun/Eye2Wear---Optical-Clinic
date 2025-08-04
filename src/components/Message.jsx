import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';

const Message = ({ conversationId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();
  const messagesEndRef = useRef(null);

  // Load message history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${conversationId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
  }, [conversationId]);

  // Socket.io listeners
  useEffect(() => {
    if (!socket) return;

    socket.emit('joinConversation', { 
      conversationId, 
      userId: currentUser._id 
    });

    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [socket, conversationId, currentUser]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId,
      message: newMessage,
      senderId: currentUser._id,
      senderModel: currentUser.role // e.g., 'Patient', 'Staff', etc.
    };

    try {
      // Save to database
      const response = await axios.post('/api/messages', messageData);
      
      // Send via socket.io for real-time
      socket.emit('sendMessage', {
        conversationId,
        message: newMessage,
        sender: currentUser
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`message ${msg.sender._id === currentUser._id ? 'sent' : 'received'}`}
          >
            <p>{msg.message}</p>
            <small>
              {msg.sender.name} • {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Message;