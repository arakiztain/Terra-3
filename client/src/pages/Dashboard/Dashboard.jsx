import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import fetchServer from "../../utils/fetchServer";
import ProjectList from "../../components/ProjectList/ProjectList";

const Dashboard = () =>{
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const fetchProjects = async () => {
            setProjects(await fetchServer.getProjects());
        }
        fetchProjects();
    }, [])

    return (
        <div className={styles.wrapper}>
            <ProjectList projectList={projects} userMode={true} onEditProject={console.log("Nope")} />
        </div>
    );
}

export default Dashboard;