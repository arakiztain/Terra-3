import React from 'react';
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "./chevron-down.svg";
import styles from "./Faq.module.css";
import icon1 from "../../assets/_Terraforms/Individual/SVG/Punky-Green.svg";
import icon2 from "../../assets/_Terraforms/Individual/SVG/Mistyk-Blue.svg";
import icon3 from "../../assets/_Terraforms/Individual/SVG/Melos-Pink.svg";

const faqData = [
  {
    question: "What is Terra Ripple?",
    answer: "Terra Ripple is a platform that simplifies project management and feedback tracking for web development projects. It allows you to report and track issues, communicate with your team, and efficiently manage the development process."
  },
  {
    question: "How do I report a new issue?",
    answer: "To report a new issue, navigate to your project page and click the 'New Issue' button. Fill out the form with all relevant details including the issue name, request type, browser, device, description, and any screenshots that help illustrate the problem."
  },
  {
    question: "What types of issues can I report?",
    answer: "You can report various types of issues including: Copy revisions (text-related changes), Design issues (visual or layout problems), Requested changes (modifications to existing features), and New items (requests for new elements or features)."
  },
  {
    question: "How can I check the status of my reported issues?",
    answer: "Once you've reported an issue, you can track its status directly from the project page. Issues are organized by category (Copy revisions, Design issues, etc.) and you'll receive notifications when updates are made."
  },
  {
    question: "Can I attach screenshots to my issue reports?",
    answer: "Yes, the issue reporting form includes an option to upload screenshots. This is highly recommended as visual evidence helps the development team understand and resolve issues more efficiently."
  },
  {
    question: "How do I access my projects?",
    answer: "After logging in, you'll see your dashboard with all available projects. Click on any project card to access its details, view existing issues, and report new ones."
  },
  {
    question: "What browser should I use with Terra Ripple?",
    answer: "Terra Ripple works best with modern browsers like Chrome, Firefox, Safari, or Edge. For optimal performance and security, we recommend keeping your browser updated to the latest version."
  },
  {
    question: "What is the chatbot used for?",
    answer: "The Terra Bot chatbot provides quick assistance for frequently asked questions and common tasks without needing to contact support. You can access it by clicking the chat icon in the bottom right corner of the screen."
  }
];

// Custom AccordionItem component
const AccordionItem = ({ header, index, ...rest }) => (
  <Item
    {...rest}
    className={styles.item}
    header={
      <>
        <span className={`${styles.questionText} ${styles[`question${index % 4}`]}`}>{header}</span>
        <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
      </>
    }
    buttonProps={{
      className: ({ isEnter }) => isEnter ? `${styles.itemBtn} ${styles.itemBtnExpanded}` : styles.itemBtn
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);

const Faq = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        FREQUENTLY ASKED QUESTIONS
      </h1>

      <div className={styles.accordion}>
        <Accordion transition transitionTimeout={250}>
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              header={item.question} 
              index={index}
              initialEntered={index === 0}
            >
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className={styles.footer}>
        <img src={icon1} className={styles.icon} alt="Terra Icon" />
        <img src={icon2} className={styles.icon} alt="Terra Icon" />
        <img src={icon3} className={styles.icon} alt="Terra Icon" />
      </div>
    </div>
  );
};

export default Faq;