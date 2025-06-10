import IssueCard from '../IssueCard/IssueCard';
import styles from './IssueDisplay.module.css';

const IssueSection = ({ title, description, icon, issues, className, cardClassName, review }) => {
  if (issues.length === 0) return null;

  return (
    <div className={`${styles[className]} ${styles.container}`}>
      <div className={styles.issueHeader}>
        <img src={icon} alt={className} className={styles.icon} />
        <div className={styles.headerText}>
          <h2 className={styles.headerTitle}>{title}</h2>
          <span>{description}</span>
        </div>
      </div>
      {issues.map(issue => (
        <IssueCard review={review} className={styles[cardClassName]} key={issue._id} issue={issue} />
      ))}
    </div>
  );
};

export default IssueSection;
