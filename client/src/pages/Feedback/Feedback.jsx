import styles from './Feedback.module.css';
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import IssueDisplay from '../../components/IssueDisplay/IssueDisplay';
import { useState, useEffect } from "react";
import fetchServer from '../../utils/fetchServer';
import { useParams } from "react-router-dom";
import guideIcon from '../../assets/icons/guideIcon.png';
import { useNavigate } from 'react-router-dom';
import icon1 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon2 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon3 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";
import TourIssueForm from '../../components/TourIssueForm/TourIssueForm';
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner';
import Chatbot from '../../components/Chatbot/Chatbot';

const Feedback = () => {
    const [issues, setIssues] = useState([]);
    const [project, setProject] = useState([]);
    const [toggleForm, setToggleForm] = useState(false);
    const [reload, setReload] = useState(false);
    const [toggleSpinner, setToggleSpiner] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
        const forceReload = () => {
        setReload(!reload);
    };

    useEffect(() => {
        const fetchIssues = async () =>{
            setIssues(await fetchServer.getIssues(id));
            setToggleSpiner(false);
        }
        fetchIssues();
    }, [toggleForm, reload]);

    useEffect(() => {
        const fetchProject = async () =>{
            setProject(await fetchServer.getProjectById(id));
        }
        fetchProject();
    }, [id]);

    const handleToggleForm = () => {
        setToggleForm(!toggleForm);
    }
    

    
    return(
        <>  
        
            <div className={styles.projectHeader}>
                <ProjectHeader siteUrl={project.url} formState={toggleForm} newIssueHandler={handleToggleForm} />
            </div>
                <TourIssueForm />
                <Chatbot />
                {toggleForm ? 
                <div className={styles.formContainer}>
                    <FeedbackForm project={project} toggleForm={handleToggleForm}/> 
                    <div className={styles.twoFifthsScreen}>
                        <div className={styles.lettering}>
                            <h1 className={styles.letteringText}>Tell us</h1>
                            <h1 id="lettering" className={styles.letteringText}>more</h1>
                            <h1 className={styles.letteringText}>about it!</h1>
                            <div className={styles.terraformBottom}>
                                <img src={icon1} alt="" />
                                <img src={icon2} alt="" />
                                <img src={icon3} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                : <>
                    {toggleSpinner ? <LoadSpinner size="fullscreen"/> : <IssueDisplay forceReload={forceReload} issues={issues}/>}
                </>
                }
                <img src={guideIcon} onClick={() => navigate('/guide')} className={styles.guideIcon} alt="Button to open the guide"/>
        </>
    )

}

export default Feedback;