import styles from './IssueCard.module.css'

const extractMetadata = ( description ) => {
  const metadataStart = description.indexOf('<!-- METADATA ');
  if (metadataStart === -1) {
    // No metadata found
    return null;
  }

  const metadataEnd = description.indexOf('-->', metadataStart);
  if (metadataEnd === -1) {
    // Malformed metadata comment
    return null;
  }

  const jsonString = description.substring(metadataStart + 14, metadataEnd).trim();

  try {
    const metadata = JSON.parse(jsonString);
    // metadata is now the parsed object
    return metadata;
  } catch (e) {
    // JSON parse error
    return null;
  }
}

const IssueCard = ({ issue, className }) => {
  console.log("This is the description");
  console.log(issue.description);
  console.log("Here it is parsed");
  console.log(extractMetadata(issue.description));
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
