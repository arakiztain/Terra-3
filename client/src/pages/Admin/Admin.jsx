import styles from './Admin.module.css';
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
    const fetchProjects = async () =>{
      setProjects(await fetchServer.getProjects());
      console.log("this is projects oh no");
      console.log(projects);
    }
    fetchProjects();
  }, [reloadFlag])

  return (
    <div className={styles.container}>
      <ProjectList projectList={projects} onEditProject={(project) => { setEditingProject(project); setShowEditForm(true); }} />
      {showEditForm &&
        <div onClick={() => setShowEditForm(false)}>
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