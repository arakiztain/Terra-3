import styles from "./Dashboard.module.css";
import { useState, useEffect, useContext } from "react";
import fetchServer from "../../utils/fetchServer";
import { AuthContext } from "../../context/AuthContext";
import ProjectList from "../../components/ProjectList/ProjectList";

const Dashboard = () =>{
    const [projects, setProjects] = useState([]);
    const { userData } = useContext(AuthContext);
    const user = userData?.user;
    const token = userData?.token;
    console.log("These are context values");
    console.log(user);
    console.log(token);
    useEffect(() => {
        const fetchProjects = async () => {
            setProjects(await fetchServer.getProjects());
            console.log("projects value is");
            console.log(projects);
        }
        fetchProjects();
    }, [])

    return (
        <div className={styles.wrapper}>
            <ProjectList projectList={projects} onEditProject={console.log("Nope")} />
        </div>
    );
}

export default Dashboard;