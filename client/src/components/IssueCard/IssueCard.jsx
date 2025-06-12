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

const IssueCard = ({ issue, className, review, forceReload }) => {
  const [toggleInput, setToggleInput] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const handleReject = async () => {
    let payload = extractMetadata(issue.description);
    payload.description = newDescription;
    try {
      await fetchServer.rejectIssue( payload, issue.id );
      forceReload();
    } catch (err) {
      console.error("Error submitting issue:", err);
    }

  }
  const toggleInputHandler = () => {
    setToggleInput(!toggleInput);
  }
  const acceptHandler = async () =>{
    const res = await fetchServer.acceptIssue( issue.id );
    forceReload();
  }

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.row}>
        <span className={styles.label}>Task:</span> {issue.name}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Snippet:</span> {issue.text_content.slice(12, 40)}...
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Created on:</span> {new Date(issue.date_created * 1000).toLocaleString()}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>id:</span> {issue.project?.id}
      </div>
      
      { review && <div className={styles.buttons}>
      <button className={styles.clickable1} onClick={acceptHandler}>Accept</button>
      <button className={styles.clickable2} onClick={toggleInputHandler}>Reject</button>
      {toggleInput && <div className={styles.input}>
        <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} type="text" placeholder="What do you want changed?" />
        <button onClick={handleReject}>Submit</button>
      </div>}
      </div>}
    </div>
  )
}

export default IssueCard
