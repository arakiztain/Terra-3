import style from './Admin.module.css';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectCreationForm from "../../components/ProjectCreationForm/ProjectCreationForm";
import { useState, useEffect } from 'react';
import fetchServer from '../../utils/fetchServer';


const Admin = () =>{
  const [projects, setProjects] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
useEffect(() => {
  const fetchProjectsWithTaskCounts = async () => {
    const baseProjects = await fetchServer.getProjects();
    const projectsWithCounts = await Promise.all(
      baseProjects.map(async (project) => {
        const count = await fetchServer.getTaskCount(project._id);
        console.log("Does the count", count);
        return { ...project, taskCount: count };
      })
    );
    setProjects(projectsWithCounts);
  };

  fetchProjectsWithTaskCounts();
}, [reloadFlag]);

  return (
    <div className={style.container}>
      <ProjectList projectList={projects} onEditProject={(project) => {setEditingProject(project); setShowEditForm(true); }} />
      {showEditForm &&
        <div className={style.fullScreenCover} onClick={() => setShowEditForm(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ProjectCreationForm
              promptReload={setReloadFlag}
              reloadFlag={reloadFlag}
              project={editingProject}
            />
          </div>
        </div>
      }
      <ProjectCreationForm promptReload={setReloadFlag} reloadFlag={reloadFlag} />
    </div>
  );
}

export default Admin;