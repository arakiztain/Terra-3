import { useState } from "react";
import styles from "./ProjectList.module.css";
import fetchServer from "../../utils/fetchServer";
import { ToastContainer, toast, Bounce } from 'react-toastify';
const ProjectList = ({ projectList = [], onEditProject, userMode }) => {
  const [search, setSearch] = useState("");
const filtered = (projectList || [])
  .filter(project => project && typeof project === "object")
  .filter(({ title, url, description, users }) =>
    title?.toLowerCase().includes(search.toLowerCase()) ||
    url?.toLowerCase().includes(search.toLowerCase()) ||
    description?.toLowerCase().includes(search.toLowerCase()) ||
    (Array.isArray(users) && users.some((r) => r.email?.toLowerCase().includes(search.toLowerCase())))
  );

  const handleSendReminder = (_id) => {
    fetchServer.sendReminderEmail(_id);
    notify();
  }

    const notify = () => 
      toast(' 📧 Mail sent!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        className: styles.toast
      });

  return (<>
    <div className={styles.container}>
      <input
        type="search"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.cards}>
        {filtered.length > 0 ? (
          filtered.map(({ id, _id, title, url, users, description, taskCount }) => (
            <div key={id} className={styles.card}>
              {taskCount && taskCount.count > 0 && <h3 onClick={()=> handleSendReminder(_id)}>Reviewable tasks: {taskCount.count} 📧 👈</h3>}
              <h2 className={styles.title}>{title}</h2>
              <a href={url} target="_blank" rel="noopener noreferrer" className={styles.url}>
                {url}
              </a>
              <p>{description}</p>
              <p className={styles.reviewers}>
                Reviewers: {users.map((r) => r.email).join(", ")}
              </p>
                {userMode ? (
                  <a href={`/projects/${_id}`} className={styles.viewDetails}>View details</a>
                ) : (
                  <span onClick={() => onEditProject({ _id, title, url, description, reviewerEmails: users.map(u => u.email) })}>
                    Edit form
                  </span>
                )}
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No projects found.</p>
        )}
      </div>
            <ToastContainer />
    </div>
  </>);
}

export default ProjectList;