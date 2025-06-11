import style from './ProjectCreationForm.module.css';
import { useState, useEffect } from 'react';
import fetchServer from '../../utils/fetchServer';
import { ToastContainer, toast, Bounce } from 'react-toastify';
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

  const notifyError = () => 
    toast('❌ There was a problem', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      className: style.toast
    });
    
      const notifySuccess = () => 
        toast('✅ Queried successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          className: style.toast
        });

  const working = () => 
    toast('Working... 🕒', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      className: style.toast
    });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "reviewerEmails" ? value.split(',').map(s => s.trim()) : value
    }));
  };

const handleSubmit = async (e) => {
  working();
  e.preventDefault();
  try {
    let res;
    if (project && project._id) {
      res = await fetchServer.updateProject(project._id, { ...formData });
          if (res.message && res.message.includes("Project updated")) notifySuccess();
    } else {
      res = await fetchServer.createProject({ ...formData });
      if (res.message=="Project created") notifySuccess();
      if (res.message!="Project created") notifyError();
    }
    console.log("What");
    console.log(res);

  } catch {
    notifyError();
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
          <ToastContainer />
        </form>
    );
};

export default ProjectCreationForm;