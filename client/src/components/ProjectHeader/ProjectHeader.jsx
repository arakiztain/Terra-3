import styles from "./ProjectHeader.module.css"

const ProjectHeader = () =>{

    return(
        <div className={styles.projectHeader}>
            <a className={styles.projectLink} href="www.google.es"><button className={styles.projectLinkButton}>My project</button></a>
            <button className={styles.issueButton}>New Issue</button>
            <button className={styles.menuButton}>Menu</button>
        </div>
    )
}

export default ProjectHeader;