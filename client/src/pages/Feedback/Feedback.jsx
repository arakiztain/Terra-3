import styles from './Feedback.module.css';
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import IssueDisplay from '../../components/IssueDisplay/IssueDisplay';
import { useState, useEffect } from "react";
import fetchServer from '../../utils/fetchServer';
import { useParams } from "react-router-dom";
import chatbotIcon from '../../assets/icons/chatbotIcon.png';
import guideIcon from '../../assets/icons/guideIcon.png';
import { useNavigate } from 'react-router-dom';
import icon1 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon2 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon3 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";
const Feedback = () => {
    const [issues, setIssues] = useState([]);
    const [toggleForm, setToggleForm] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchIssues = async () =>{
            setIssues(await fetchServer.getIssues(id));
        }
        fetchIssues();
    }, []);

    const handleToggleForm = () => {
        console.log("toggleForm");
        setToggleForm(!toggleForm);
    }

    return(
        <>
            <div className={styles.projectHeader}>
                <ProjectHeader newIssueHandler={handleToggleForm} />
            </div>
                {toggleForm ? 
                <div className={styles.formContainer}>
                    <FeedbackForm /> 
                    <div className={styles.twoFifthsScreen}>
                        <div className={styles.lettering}>
                            <h1 className={styles.letteringText}>Tell us</h1>
                            <h1 className={styles.letteringText}>more</h1>
                            <h1 className={styles.letteringText}>about it!</h1>
                            <div className={styles.terraformBottom}>
                                <img src={icon1} alt="" />
                                <img src={icon2} alt="" />
                                <img src={icon3} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                : <IssueDisplay issues={issues}/>
                }
                <img src={chatbotIcon} onClick={() => console.log("Open Chatbot")} className={styles.chatbotIcon} alt="Button to open the chatbot"/>
                <img src={guideIcon} onClick={() => navigate('/guide')} className={styles.guideIcon} alt="Button to open the guide"/>
        </>
    )

}

export default Feedback;