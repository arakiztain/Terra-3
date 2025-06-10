import styles from './IssueCard.module.css'

const IssueCard = ({ issue, className }) => {
  console.log(issue);
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.row}>
        <span className={styles.label}>Task:</span> {issue.name}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Status:</span> {issue.status?.status}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Created on:</span> {issue.date_created}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Project:</span> {issue.project?.name}
      </div>
    </div>
  )
}

export default IssueCard
