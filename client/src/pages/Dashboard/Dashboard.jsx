import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import fetchServer from "../../utils/fetchServer";

const Dashboard = () =>{
    const [issues, setIssues] = useState([]);

    //ProjectList load, to render a project choice
    //Probably will need a spinner or something here.
    useEffect(()=>{
        const fetchData = async () =>{
            setIssues(await fetchServer.getIssues());
        }
        fetchData();
        console.log(issues);
    },[])

    return (
        <div className={styles.fullScreen}>
            <h2>Dashboard</h2>
            {issues && issues.length > 0 && issues.map(issue => <IssueCard key={issue._id} issue={issue}/>)}
            <IssueForm />
        </div>
    );
}

export default Dashboard;