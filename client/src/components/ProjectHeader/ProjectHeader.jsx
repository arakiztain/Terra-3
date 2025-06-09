import styles from "./ProjectHeader.module.css"
import { useState } from "react";
const ProjectHeader = () =>{
    const [menuOpen, setMenuOpen] = useState(false);
    return(
        <>
            <a className={styles.projectLink} href="www.google.es"><button className={styles.projectLinkButton}>My project</button></a>
            <button className={styles.issueButton}>New Issue</button>
            <div className={styles.menuContainer} onClick={() => setMenuOpen(!menuOpen)}>
                <button className={styles.menuButton}>Menu</button>
                {menuOpen && <div className={styles.menuDropdown}>
                    <a className={styles.menuProfile} href="">Profile</a>
                    <a className={styles.menuRecord} href="">Record</a>
                    <a className={styles.menuContact} href="">Contact</a>
                    <a className={styles.menuGuide} href="">Guide</a>
                    <a className={styles.menuTerrahq} href="">Terra hq</a>
                    <a className={styles.menuSignout} href="">Sign out</a>
                </div>}
            </div>
        </>
    )
}

export default ProjectHeader;