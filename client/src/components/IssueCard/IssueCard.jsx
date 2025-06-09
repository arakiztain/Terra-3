import styles from './IssueCard.module.css'

const IssueCard = ({ issue }) => {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.label}>Task:</span> {issue.name}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Status:</span> {issue.status?.status}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Created by:</span> {issue.creator?.username} ({issue.creator?.email})
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Assignees:</span> {issue.assignees?.map(a => a.username).join(', ')}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Created on:</span> {issue.date_created}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Link:</span>{' '}
        <a href={issue.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Open in ClickUp
        </a>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>List:</span> {issue.list?.name}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Project:</span> {issue.project?.name}
      </div>
    </div>
  )
}

export default IssueCard
