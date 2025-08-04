import { useState, useEffect, useRef } from 'react';
import { useSocket } from './SocketContext';
import axios from 'axios';

const Chat = ({ conversationId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();
  const messagesEndRef = useRef(null);

  // Load message history
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${conversationId}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    };
    
    loadMessages();
  }, [conversationId]);

  // Socket.io listeners
  useEffect(() => {
    if (!socket) return;

    // Join conversation
    socket.emit('joinConversation', { 
      conversationId, 
      userId: currentUser._id 
    });

    // Listen for new messages
    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Error handling
    socket.on('messageError', (error) => {
      console.error('Message error:', error);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('messageError');
    };
  }, [socket, conversationId, currentUser]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Optimistic UI update
      const tempId = Date.now().toString();
      setMessages(prev => [...prev, {
        _id: tempId,
        content: newMessage,
        sender: currentUser,
        createdAt: new Date()
      }]);

      // Send via Socket.io
      socket.emit('sendMessage', {
        conversationId,
        message: newMessage,
        sender: currentUser
      });

      // Clear input
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
      // Remove optimistic update if failed
      setMessages(prev => prev.filter(msg => msg._id !== tempId));
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div 
            key={msg._id}
            className={`message ${msg.sender._id === currentUser._id ? 'sent' : 'received'}`}
          >
            <div className="message-sender">
              {msg.sender.avatar && (
                <img src={msg.sender.avatar} alt={msg.sender.name} />
              )}
              <span>{msg.sender.name}</span>
            </div>
            <p>{msg.content}</p>
            <small>
              {new Date(msg.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage}>
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