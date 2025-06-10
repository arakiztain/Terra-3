import styles from './Chatbot.module.css';

const ChatbotMessageList = ({ messages, loading, messagesEndRef }) => {
  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className={styles.chatbotMessageList}>
      {messages.map((message) => (
        <div 
          key={message.id}
          className={`${styles.chatbotMessage} ${
            message.sender === 'bot' 
              ? styles.chatbotMessageBot 
              : styles.chatbotMessageUser
          }`}
        >
          <div className={styles.chatbotMessageContent}>
            <p>{message.text}</p>
            <span className={styles.chatbotMessageTime}>
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className={`${styles.chatbotMessage} ${styles.chatbotMessageBot}`}>
          <div className={styles.chatbotMessageContent}>
            <div className={styles.chatbotTypingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatbotMessageList;