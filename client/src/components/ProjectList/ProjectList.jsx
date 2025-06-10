import { useState } from "react";
import styles from "./ProjectList.module.css";
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
          filtered.map(({ id, _id, title, url, users, description }) => (
            <div key={id} className={styles.card}>
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
    </div>
  </>);
}

export default ProjectList;