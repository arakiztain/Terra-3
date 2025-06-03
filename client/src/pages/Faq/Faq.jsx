import React from 'react';
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "./chevron-down.svg";
import styles from "./Faq.module.css";

const faqData = [
  {
    question: "How can I log in?",
    answer: "To log in, enter your username and password in the corresponding fields and click 'Log in!'."
  },
  {
    question: "What should I do if I forgot my password?",
    answer: "If you forgot your password, look for the 'Forgot your password?' link on the login page or contact support."
  },
  {
    question: "How can I register?",
    answer: "If you don't have an account, look for the link to register on the homepage."
  },
  {
    question: "What should I do if I can't log in?",
    answer: "Verify that the entered data is correct, ensure caps lock is not enabled, and if necessary, reset your password."
  }
];

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);

const Faq = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>

      <div className={styles.accordion}>
        {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
        <Accordion transition transitionTimeout={250}>
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              header={item.question} 
              initialEntered={index === 0} // Make first item expanded by default
            >
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;