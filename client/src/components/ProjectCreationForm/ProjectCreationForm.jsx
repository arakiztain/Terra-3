import style from './ProjectCreationForm.module.css';
import { useState, useEffect } from 'react';
import fetchServer from '../../utils/fetchServer';
const ProjectCreationForm = ({ promptReload, reloadFlag, project }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    reviewerEmails: [],
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        url: project.url || "",
        description: project.description || "",
        reviewerEmails: project.reviewerEmails || [],
      });
    }
  }, [project]);


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "reviewerEmails" ? value.split(',').map(s => s.trim()) : value
    }));
  };

  const handleSubmit = (e) => {
    console.log("Esta es formdata");
    console.log(formData);
    e.preventDefault();
    if (project && project.id) {
      fetchServer.updateProject(project.id, { ...formData });
    } else {
      fetchServer.createProject({ ...formData });
    }
    promptReload(!reloadFlag);
  };
    return (
        <form onSubmit={handleSubmit} className={style.form}>
          <label>
              Project name
              <input className={style.input} onChange={handleFormChange} value={formData.title} type="text" name="title" required />
          </label>
          <label>
              Url
              <input className={style.input} onChange={handleFormChange} value={formData.url} type="url" name="url" required />
          </label>
          <label>
              Description
              <input className={style.input} onChange={handleFormChange} value={formData.description} type="text" name="description" required />
          </label>
          <label>
              Reviewers (comma-separated emails)
              <input className={style.input} onChange={handleFormChange} 
              value={Array.isArray(formData.reviewerEmails) ? formData.reviewerEmails.join(', ') : ''}
              type="text" name="reviewerEmails" placeholder="email1@example.com, email2@example.com" />
          </label>
          <button type="submit">{project ? "Edit" : "Submit"}</button>
        </form>
    );
};

export default ProjectCreationForm;