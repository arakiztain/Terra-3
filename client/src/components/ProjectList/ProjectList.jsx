import { useState } from "react";
import styles from "./ProjectList.module.css";

const ProjectList = ({ projectList }) => {
  const [search, setSearch] = useState("");

  const filtered = projectList.filter(
    ({ title, url, reviewers }) =>
      title.toLowerCase().includes(search.toLowerCase()) ||
      url.toLowerCase().includes(search.toLowerCase()) ||
      reviewers.some((r) => r.toLowerCase().includes(search.toLowerCase()))
  );

  return (
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
          filtered.map(({ id, title, url, reviewers }) => (
            <div key={id} className={styles.card}>
              <h2 className={styles.title}>{title}</h2>
              <a href={url} target="_blank" rel="noopener noreferrer" className={styles.url}>
                {url}
              </a>
              <p className={styles.reviewers}>
                Reviewers: {reviewers.join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No projects found.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectList;