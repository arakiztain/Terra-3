import styles from './Feedback.module.css';
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import { useState, useEffect } from "react";
import fetchServer from '../../utils/fetchServer';
import { useParams } from "react-router-dom";
import IssueCard from '../../components/IssueCard/IssueCard';
import chatbotIcon from '../../assets/icons/chatbotIcon.png';
import guideIcon from '../../assets/icons/guideIcon.png';
import { useNavigate } from 'react-router-dom';
import icon1 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon2 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon3 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";
const Feedback = () => {
    const [issues, setIssues] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
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
                <div className={styles.lettering}>
                    <h1 className={styles.hello}>Tell us</h1>
                    <h1 className={styles.again}>more</h1>
                    <h1 className={styles.again}>about it!</h1>
                    <div className={styles.terraformBottom}>
                        <img src={icon1} alt="" />
                        <img src={icon2} alt="" />
                        <img src={icon3} alt="" />
                    </div>
                </div>
                {issues.map(issue => <IssueCard key={issue._id} issue={issue} />)}
                <img src={chatbotIcon} onClick={() => console.log("Open Chatbot")} className={styles.chatbotIcon} alt="Button to open the chatbot"/>
                <img src={guideIcon} onClick={() => navigate('/guide')} className={styles.guideIcon} alt="Button to open the guide"/>
            </div>
        </>
    )

}

export default Feedback;