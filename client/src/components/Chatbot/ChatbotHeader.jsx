import styles from './Chatbot.module.css';
import icon1 from "../../assets/_Terraforms/Individual/SVG/Punky-Green.svg";

const ChatbotHeader = ({ onClose }) => {
  return (
    <div className={styles.chatbotHeader}>
      <div className={styles.chatbotHeaderContent}>
        <img src={icon1} className={styles.chatbotIcon} alt="Terra Bot Icon" />
        <div className={styles.chatbotHeaderText}>
          <h3>Terra Bot</h3>
          <p>How can I help you?</p>
        </div>
      </div>
      <button 
        className={styles.chatbotCloseButton}
        onClick={onClose}
        aria-label="Close chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default ChatbotHeader;