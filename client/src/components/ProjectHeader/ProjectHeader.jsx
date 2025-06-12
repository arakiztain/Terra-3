import styles from "./ProjectHeader.module.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ProjectHeader = ({ newIssueHandler, siteUrl, formState }) =>{

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        setMenuOpen(false);
        navigate(path);
    };
    
    return(
        <>
            <a id="joyRide-project" className={styles.projectLink} href={siteUrl}><button className={styles.projectLinkButton}>My project</button></a>
            <button id="joyRide-issue" className={styles.issueButton} onClick={()=> newIssueHandler()}>{formState ? "See issues" : "New issue"}</button>
            <div className={styles.menuContainer} onClick={() => setMenuOpen(!menuOpen)}>
                <button className={styles.menuButton}>Menu</button>
                {menuOpen && <div className={styles.menuDropdown}>
                    <a className={styles.menuProfile} href="">Profile</a>
                    <a className={styles.menuFaq} onClick={() => handleNavigation('/faq')}>FAQ</a>
                    <a className={styles.menuContact} href="">Contact</a>
                    <a className={styles.menuGuide} onClick={() => handleNavigation('/guide')}>Guide</a>
                    <a className={styles.menuTerrahq} href="">Terra hq</a>
                    <a className={styles.menuSignout} href="">Sign out</a>
                </div>}
            </div>
        </>
    )
}

export default ProjectHeader;