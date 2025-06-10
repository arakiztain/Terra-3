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
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef(null);
  
  const predefinedResponses = [
    "1. Esta es mi primera respuesta. Te estoy ayudando con el login de Terra Ripple.",
    "2. Esta es mi segunda respuesta. Para iniciar sesión, debes introducir tu nombre de usuario y contraseña, y luego hacer clic en 'Log in!'.",
    "3. Esta es mi tercera respuesta. Si tienes problemas para iniciar sesión, asegúrate de que tus credenciales sean correctas o contacta con soporte.",
    "4. Esta es mi cuarta respuesta. También puedes revisar la guía de usuario para más información sobre cómo usar la plataforma.",
    "5. Esta es mi quinta respuesta. ¿Hay algo más en lo que pueda ayudarte hoy?",
    "6. Ya he respondido varias preguntas, pero estoy aquí para seguir ayudándote. ¿Necesitas algo más?"
  ];

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
    
    setTimeout(() => {
      const responseText = predefinedResponses[responseIndex % predefinedResponses.length];
      
      const botResponse = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      setResponseIndex(prevIndex => prevIndex + 1);
      
      setLoading(false);
    }, 1000);
  };

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