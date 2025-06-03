import style from './Admin.module.css';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectCreationForm from "../../components/ProjectCreationForm/ProjectCreationForm";
import { useState } from 'react';
const Admin = () =>{
  const [projects, setProjects] = useState([]);
  return (
    <div className={style.container}>
        <ProjectCreationForm />
        <ProjectList projectList={projects} />
    </div>
  );
}

export default Admin;