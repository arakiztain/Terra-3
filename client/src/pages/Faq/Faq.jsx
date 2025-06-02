import React, { useState } from 'react';
import styles from './Faq.module.css';

const faqData = [
  {
    question: "How can I log in?",
    answer: "To log in, enter your username and password in the corresponding fields and click 'Log in!'.",
  },
  {
    question: "What should I do if I forgot my password?",
    answer: "If you forgot your password, look for the 'Forgot your password?' link on the login page or contact support.",
  },
  {
    question: "How can I register?",
    answer: "If you don't have an account, look for the link to register on the homepage.",
  },
  {
    question: "What should I do if I can't log in?",
    answer: "Verify that the entered data is correct, ensure caps lock is not enabled, and if necessary, reset your password.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className={styles.accordion}>
          <div
            className={styles.accordionHeader}
            onClick={() => toggleAccordion(index)}
          >
            {item.question}
          </div>
          <div
            className={`${styles.accordionContent} ${
              openIndex === index ? styles.open : ""
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;