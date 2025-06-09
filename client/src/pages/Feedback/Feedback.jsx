import styles from './Feedback.module.css';
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import { useState, useEffect } from "react";
import fetchServer from '../../utils/fetchServer';
import { useParams } from "react-router-dom";
import IssueCard from '../../components/IssueCard/IssueCard';
const Feedback = () => {
    const [issues, setIssues] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchIssues = async () =>{
            setIssues(await fetchServer.getIssues(id));
        }
        fetchIssues();
    }, []);

    return(
        <>
            <div className={styles.projectHeader}>
                <ProjectHeader />
                <FeedbackForm />
                {issues.map(issue => <IssueCard key={issue._id} issue={issue} />)}
            </div>
        </>
    )

}

export default Feedback;