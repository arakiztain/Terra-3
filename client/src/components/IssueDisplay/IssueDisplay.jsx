import styles from './IssueDisplay.module.css';

const IssueDisplay = ({ issues }) => {
    return(
        <>
        <p>Cosas</p>
            <div className={`${styles.revision} ${styles.container}`}>
                <h4>Copy revision</h4>
                {issues.map(issue => <IssueCard key={issue._id} issue={issue} />)}                
            </div>
            <div className={`${styles.changes} ${styles.container}`}>
                <h4>Requested Change</h4>
                {issues.map(issue => <IssueCard key={issue._id} issue={issue} />)}                
            </div>
            <div className={`${styles.design} ${styles.container}`}>
                <h4>Design Issue</h4>
                {issues.map(issue => <IssueCard key={issue._id} issue={issue} />)}                
            </div>
            <div className={`${styles.item} ${styles.container}`}>
                <h4>New Item</h4>
                {issues.map(issue => <IssueCard key={issue._id} issue={issue} />)}                
            </div>
            {issues.map(issue => <IssueCard key={issue._id} issue={issue} />)}
        </>
    )
}

export default IssueDisplay;