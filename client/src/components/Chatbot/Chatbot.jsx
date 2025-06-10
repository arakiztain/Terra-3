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
      text: "Hola! Soy TerraBot, ¿Cómo puedo ayudarte hoy?", 
      sender: 'bot',
      timestamp: new Date() 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef(null);
  
  const predefinedResponses = [
    "Para que las imágenes sean responsivas en una página de noticias, es importante considerar los siguientes tamaños recomendados: \n Header/Banner principal: 1920x800px \n Cuadrículas/Listados/Entradas de Blog: Formato cuadrado: 800x800px / Formato 16:9: 1200x675px \n Imágenes de Evento (ficha detallada): 1200x675px (formato 16:9), \n Galerías dentro del contenido: No superar 1200px de ancho.",
    "Para cambiar el título (H1) de la página principal en WordPress, sigue estos pasos\n Accede al Panel de Administración => Ve al editor de bloques => Modifica el titulo H1 => Guarda los cambios => Si usas el plugin Yoast SEO, asegúrate de completar los campos de Meta Título y Meta Descripción para mejorar tu optimización SEO (opcional) => Revisa en dispositivos móviles => Fuerza la regeneración de la página (si fuera necesario)",
    "Tipo de incidencia: Corrección de errores (Bug fix), Se trata de un error técnico donde el formulario no está funcionando correctamente al hacer clic en el botón Enviar"
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
  }, 3000 + Math.floor(Math.random() * 3000));
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