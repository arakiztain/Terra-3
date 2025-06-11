import styles from './ProjectCreationForm.module.css';
import { useState, useEffect, useRef } from 'react';
import fetchServer from '../../utils/fetchServer';
const ProjectCreationForm = ({ promptReload, reloadFlag, project }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    reviewerEmails: [],
  });

  const textareaRef = useRef(null);

  const handleTextAreaResize = () => {
    const textarea = textareaRef.current;
    // Reinicia la altura para recalcular
    textarea.style.height = "auto";
    // Ajusta la altura al contenido
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  
  useEffect(() => {
    console.log("project: ", project);
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
    e.preventDefault();
    if (project && project._id) {
      fetchServer.updateProject(project._id, { ...formData });
    } else {
      console.log("creando project");
      fetchServer.createProject({ ...formData });
    }
    promptReload(!reloadFlag);
  };
  return (<>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Project name
          <input
            className={styles.input}
            onChange={handleFormChange}
            value={formData.title}
            type="text"
            name="title"
            required
          />
        </label>
        <label className={styles.label}>
          Url
          <input
            className={styles.input}
            onChange={handleFormChange}
            value={formData.url}
            type="url"
            name="url"
            required
          />
        </label>
        <label className={styles.label}>
          Description
          <textarea
            className={styles.textarea}
            onInput={handleTextAreaResize}
            onChange={handleFormChange}
            ref={textareaRef}
            value={formData.description}
            rows="1"
            maxLength="350"
            name="description"
            required
          />
        </label>
        <label className={styles.label}>
          Reviewers (comma-separated emails)
          <input
            className={styles.input}
            onChange={handleFormChange}
            value={
              Array.isArray(formData.reviewerEmails)
                ? formData.reviewerEmails.join(", ")
                : ""
            }
            type="text"
            name="reviewerEmails"
            placeholder="email1@example.com, email2@example.com"
          />
        </label>
        <button className={styles.button} type="submit">
          {project ? "Edit" : "Submit"}
        </button>
    </form>
    </>
    );
};

export default ProjectCreationForm;