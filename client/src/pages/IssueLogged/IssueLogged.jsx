import React from 'react';
import styles from './IssueLogged.module.css';
import icon7 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon8 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon9 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";

const IssueLogged = () => (
  <div className={styles.container}>
    <ProjectHeader />

    <main className={styles.main}>
      <section className={styles.rightSection}>
        <div className={styles.message}>
          <p>We have recorded your incident.<br />
            Our technical team is already working on it.<br />
            We'll notify you as soon as we have any updates.
          </p>
          <br />
          <p>
            Thank you very much for trusting us.<br />
            Sincerely,<br />
            The Terra Ripple Team
          </p>
        </div>
      </section>
      
      <section className={styles.leftSection}>
        <h1 className={styles.issueLogged}>
          Issue<br />logged!
        </h1>
        <div className={styles.icons}>
          <img src={icon7} className="icon" />
          <img src={icon8} className="icon" />
          <img src={icon9} className="icon" />
        </div>
      </section>
    </main>
  </div>
);

export default IssueLogged;