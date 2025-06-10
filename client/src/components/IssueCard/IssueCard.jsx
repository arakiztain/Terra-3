import styles from './IssueCard.module.css'
import fetchServer from '../../utils/fetchServer';
import { useState } from 'react';
const extractMetadata = ( description ) => {
  const metadataStart = description.indexOf('<!-- METADATA ');
  if (metadataStart === -1) {
    return null;
  }

  const metadataEnd = description.indexOf('-->', metadataStart);
  if (metadataEnd === -1) {
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
  const [toggleInput, setToggleInput] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const handleReject = async () => {
    let payload = extractMetadata(issue.description);
    payload.description = newDescription;
    try {
      const res = await fetchServer.rejectIssue( payload, issue.id );
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error("Error submitting issue:", err);
    }
  }
  const toggleInputHandler = () => {
    setToggleInput(!toggleInput);
  }
  const acceptHandler = async () =>{
    const res = await fetchServer.acceptIssue( issue.id );
  }

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
      <button onClick={acceptHandler}>Accept</button>
      <button onClick={toggleInputHandler}>Reject</button>
      {toggleInput && <div className={styles.input}>
        <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} type="text" placeholder="What do you want changed?" />
        <button onClick={handleReject}>Submit</button>
      </div>}
    </div>
  )
}

export default IssueCard
