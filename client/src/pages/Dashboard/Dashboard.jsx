import { useEffect } from "react";
import ProjectList from "../../components/ProjectList/ProjectList";
const Dashboard = () =>{
    //ProjectList load, to render a project choice
    //Probably will need a spinner or something here.
    useEffect(()=>{

    },[])
    const mockData = [
    {
        id: 1,
        title: "Project Alpha",
        url: "https://alpha.example.com",
        reviewers: ["alice@example.com", "bob@example.com"],
    },
    {
        id: 2,
        title: "Project Beta",
        url: "https://beta.example.com",
        reviewers: ["carol@example.com"],
    },
    {
        id: 3,
        title: "Project Gamma",
        url: "https://gamma.example.com",
        reviewers: ["dave@example.com", "eve@example.com", "frank@example.com"],
    },
    ];

    return(
        <ProjectList projectList={mockData} />
    )
}

export default Dashboard;