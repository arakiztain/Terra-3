import styles from './Chatbot.module.css';

const ChatbotButton = ({ onClick, isOpen }) => {
  return (
    <button 
      className={`${styles.chatbotButton} ${isOpen ? styles.chatbotButtonOpen : ''}`}
      onClick={onClick}
      aria-label="Toggle chatbot"
    >
      {isOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="10" r="1"></circle>
          <circle cx="8" cy="10" r="1"></circle>
          <circle cx="16" cy="10" r="1"></circle>
        </svg>
      )}
    </button>
  );
};

export default ChatbotButton;