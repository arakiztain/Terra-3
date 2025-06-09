import styles from './IssueDisplay.module.css';
import IssueCard from '../IssueCard/IssueCard';
import bobaBlue from '../../assets/icons/bobaBlue.png';
import dianaLime from '../../assets/icons/dianaLime.png';
import formaOrange from '../../assets/icons/formaOrange.png';
import prismoPink from '../../assets/icons/prismoPink.png';
const IssueDisplay = ({ issues }) => {

    return(
        <div className={styles.wrapper}>
            {issues.filter(issue => issue.list.name === "copy revision").length > 0 && (
            <div className={`${styles.revision} ${styles.container}`}>
                <div className={styles.issueHeader}>
                    <img src={bobaBlue} alt="bobaBlue" className={styles.icon}/>
                    <div className={styles.headerText}>
                        <h2 className={styles.headerTitle}>Copy revisions</h2>
                        <span>Texts to be changed</span>
                    </div>
                </div>
                {issues.filter(issue => issue.list.name === "copy revision").map(issue => <IssueCard className={styles.copyCards} key={issue._id} issue={issue} />)}                
            </div>)}
            {issues.filter(issue => issue.list.name === "requested changes").length > 0 && (
            <div className={`${styles.changes} ${styles.container}`}>
                <div className={styles.issueHeader}>
                    <img src={dianaLime} alt="dianaLime" className={styles.icon}/>
                    <div className={styles.headerText}>
                        <h2 className={styles.headerTitle}>Requested Changes</h2>
                        <span>Changes requested by the reviewer</span>
                    </div>
                </div>
                {issues.filter(issue => issue.list.name === "requested changes").map(issue => <IssueCard className={styles.changeCards} key={issue._id} issue={issue} />)}                
            </div>)}
            {issues.filter(issue => issue.list.name === "design issues").length > 0 && (
            <div className={`${styles.design} ${styles.container}`}>
                <div className={styles.issueHeader}>
                    <img src={formaOrange} alt="formaOrange" className={styles.icon}/>
                    <div className={styles.headerText}>
                        <h2 className={styles.headerTitle}>Design Issues</h2>
                        <span>Design-related issues</span>
                    </div>
                </div>
                {issues.filter(issue => issue.list.name === "design issues").map(issue => <IssueCard className={styles.designCards} key={issue._id} issue={issue} />)}                
            </div>)}
            {issues.filter(issue => issue.list.name === "new item").length > 0 && (
            <div className={`${styles.item} ${styles.container}`}>
                <div className={styles.issueHeader}>
                    <img src={prismoPink} alt="prismoPink" className={styles.icon}/>
                    <div className={styles.headerText}>
                        <h2 className={styles.headerTitle}>New Items</h2>
                        <span>New items requested</span>
                        </div>
                </div>
                {issues.filter(issue => issue.list.name === "new item").map(issue => <IssueCard className={styles.itemCards} key={issue._id} issue={issue} />)}                
            </div>
            )}
        </div>
    )
}

export default IssueDisplay;