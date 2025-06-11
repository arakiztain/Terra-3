import React, { useState } from 'react';
import styles from './Guide.module.css';
import icon1 from "../../assets/_Terraforms/Individual/SVG/Punky-Green.svg";
import icon2 from "../../assets/_Terraforms/Individual/SVG/Mistyk-Blue.svg";
import icon3 from "../../assets/_Terraforms/Individual/SVG/Melos-Pink.svg";

const Guide = () => {
  const [openSection, setOpenSection] = useState("getting-started");

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        USER GUIDE
        <div className={styles.subtitle}>TERRA RIPPLE</div>
      </h1>

      <div className={styles.accordionContainer}>
        <div className={styles.accordion}>
          <button 
            className={`${styles.accordionHeader} ${openSection === "getting-started" ? styles.active : ""}`}
            onClick={() => toggleSection("getting-started")}
          >
            <h2 className={styles.sectionTitle}>GETTING STARTED</h2>
            <span className={styles.accordionIcon}>
              {openSection === "getting-started" ? "−" : "+"}
            </span>
          </button>
          
          <div className={`${styles.accordionContent} ${openSection === "getting-started" ? styles.open : ""}`}>
            <p className={styles.text}>
              Welcome to Terra Ripple, the platform that simplifies project management and feedback tracking. This guide will help you make the most of all the available features.
            </p>
          </div>
        </div>

        <div className={styles.accordion}>
          <button 
            className={`${styles.accordionHeader} ${openSection === "platform-access" ? styles.active : ""}`}
            onClick={() => toggleSection("platform-access")}
          >
            <h2 className={styles.sectionTitle}>PLATFORM ACCESS</h2>
            <span className={styles.accordionIcon}>
              {openSection === "platform-access" ? "−" : "+"}
            </span>
          </button>
          
          <div className={`${styles.accordionContent} ${openSection === "platform-access" ? styles.open : ""}`}>
            <ol className={styles.list}>
              <li className={styles.listItem}>
                <strong>Login:</strong>
                <p>To access Terra Ripple, enter your username and password on the login screen, and click "Log in!".</p>
              </li>
              <li className={styles.listItem}>
                <strong>Forgot your password?</strong>
                <p>If you can't remember your password, click on "Forgot your password?" on the login screen. We'll send instructions to reset it to the email associated with your account.</p>
              </li>
              <li className={styles.listItem}>
                <strong>First access:</strong>
                <p>If this is your first time accessing the platform after an administrator has created your account, check your email for the activation link to set your password.</p>
              </li>
            </ol>
          </div>
        </div>

        <div className={styles.accordion}>
          <button 
            className={`${styles.accordionHeader} ${openSection === "main-navigation" ? styles.active : ""}`}
            onClick={() => toggleSection("main-navigation")}
          >
            <h2 className={styles.sectionTitle}>MAIN NAVIGATION</h2>
            <span className={styles.accordionIcon}>
              {openSection === "main-navigation" ? "−" : "+"}
            </span>
          </button>
          
          <div className={`${styles.accordionContent} ${openSection === "main-navigation" ? styles.open : ""}`}>
            <ol className={styles.list}>
              <li className={styles.listItem}>
                <strong>Dashboard:</strong>
                <p>After logging in, you'll access the main dashboard where you can see all your active projects and important notifications.</p>
              </li>
              <li className={styles.listItem}>
                <strong>Projects:</strong>
                <p>Access each project by clicking on its card from the dashboard. You'll be able to see details, pending tasks, and current progress.</p>
              </li>
              <li className={styles.listItem}>
                <strong>Menu:</strong>
                <p>Use the menu button in the top-right corner to navigate to different sections: Profile, Records, Contact, Guide, and Terra HQ.</p>
              </li>
            </ol>
          </div>
        </div>

        <div className={styles.accordion}>
          <button 
            className={`${styles.accordionHeader} ${openSection === "issue-management" ? styles.active : ""}`}
            onClick={() => toggleSection("issue-management")}
          >
            <h2 className={styles.sectionTitle}>ISSUE MANAGEMENT</h2>
            <span className={styles.accordionIcon}>
              {openSection === "issue-management" ? "−" : "+"}
            </span>
          </button>
          
          <div className={`${styles.accordionContent} ${openSection === "issue-management" ? styles.open : ""}`}>
            <ol className={styles.list}>
              <li className={styles.listItem}>
                <strong>Reporting an issue:</strong>
                <p>To report an error or problem, access the corresponding project and click on the "New Issue" button. Fill out the form with as much information as possible.</p>
              </li>
              <li className={styles.listItem}>
                <strong>Important data when reporting:</strong>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Descriptive name for the issue</li>
                  <li className={styles.listItem}>Request type (copy revision, design issues, etc.)</li>
                  <li className={styles.listItem}>Browser and device used</li>
                  <li className={styles.listItem}>Detailed description of the problem</li>
                  <li className={styles.listItem}>URL of the page where it occurred</li>
                  <li className={styles.listItem}>Screenshots (if possible)</li>
                </ul>
              </li>
              <li className={styles.listItem}>
                <strong>Issue tracking:</strong>
                <p>Once reported, you can track the status of your issue from the project page. You'll receive notifications when updates are made.</p>
              </li>
            </ol>
          </div>
        </div>

        <div className={styles.accordion}>
          <button 
            className={`${styles.accordionHeader} ${openSection === "additional-features" ? styles.active : ""}`}
            onClick={() => toggleSection("additional-features")}
          >
            <h2 className={styles.sectionTitle}>ADDITIONAL FEATURES</h2>
            <span className={styles.accordionIcon}>
              {openSection === "additional-features" ? "−" : "+"}
            </span>
          </button>
          
          <div className={`${styles.accordionContent} ${openSection === "additional-features" ? styles.open : ""}`}>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Virtual assistant:</strong>
                <p>Use our integrated chatbot to get quick answers to your frequently asked questions and solve minor problems without needing to contact support.</p>
              </li>
              <li className={styles.listItem}>
                <strong>Advanced filters:</strong>
                <p>In all sections that display lists (projects, tasks, issues), you have advanced filters to quickly find what you're looking for.</p>
              </li>
              <li className={styles.listItem}>
                <strong>Project access:</strong>
                <p>Access your project directly by clicking the "My project" button from the project page to view the website you're providing feedback on.</p>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.accordion}>
          <button 
            className={`${styles.accordionHeader} ${openSection === "useful-tips" ? styles.active : ""}`}
            onClick={() => toggleSection("useful-tips")}
          >
            <h2 className={styles.sectionTitle}>USEFUL TIPS</h2>
            <span className={styles.accordionIcon}>
              {openSection === "useful-tips" ? "−" : "+"}
            </span>
          </button>
          
          <div className={`${styles.accordionContent} ${openSection === "useful-tips" ? styles.open : ""}`}>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Keep your browser updated:</strong>
                <p>Maintain your browser up to date to enjoy all the functionalities and security improvements of Terra Ripple.</p>
              </li>
              <li className={styles.listItem}>
                <strong>Document issues thoroughly:</strong>
                <p>When reporting issues, be as specific as possible and provide all steps to reproduce the problem. This will accelerate its resolution.</p>
              </li>
              <li className={styles.listItem}>
                <strong>Use the guided tour:</strong>
                <p>If you're new to the platform, look for the tour buttons that will guide you through the different features and how to use them.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <img src={icon1} className={styles.icon} alt="Terra Icon" />
        <img src={icon2} className={styles.icon} alt="Terra Icon" />
        <img src={icon3} className={styles.icon} alt="Terra Icon" />
      </div>
    </div>
  );
};

export default Guide;