import { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';
import ChatbotButton from './ChatbotButton';
import ChatbotWindow from './ChatbotWindow';
import ChatbotHeader from './ChatbotHeader';
import ChatbotMessageList from './ChatbotMessageList';
import ChatbotInput from './ChatbotInput';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm Terra Bot. How can I help you today?", 
      sender: 'bot',
      timestamp: new Date() 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setLoading(true);
    
    // API call
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `I received your message: "${text}". In the future, I'll provide a more helpful response based on our API.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  // Auto-scroll to bottom 
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.chatbotContainer}>
      <ChatbotButton onClick={toggleChat} isOpen={isOpen} />
      
      {isOpen && (
        <ChatbotWindow>
          <ChatbotHeader onClose={toggleChat} />
          <ChatbotMessageList 
            messages={messages} 
            loading={loading}
            messagesEndRef={messagesEndRef}
          />
          <ChatbotInput onSendMessage={handleSendMessage} />
        </ChatbotWindow>
      )}
    </div>
  );
};

export default Chatbot;