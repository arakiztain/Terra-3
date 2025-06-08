import styles from './Chatbot.module.css';

const ChatbotWindow = ({ children }) => {
  return (
    <div className={styles.chatbotWindow}>
      {children}
    </div>
  );
};

export default ChatbotWindow;