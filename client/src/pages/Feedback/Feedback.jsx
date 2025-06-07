import styles from './Feedback.module.css';
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";

const Feedback = () =>{
    return(
        <>
            <div className={styles.projectHeader}>
                <ProjectHeader />
                <FeedbackForm />
            </div>
        </>
    )

}

export default Feedback;