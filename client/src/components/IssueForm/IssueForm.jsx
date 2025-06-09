import { useState, useRef } from "react";
import fetchServer from "../../utils/fetchServer";
import styles from "./IssueForm.module.css";

const IssueForm = ({ projectId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "3",
    tags: "",
    request_type: "",
  });

  const textareaRef = useRef(null);

  const handleTextAreaResize = () => {
    const textarea = textareaRef.current;
    // Reinicia la altura para recalcular
    textarea.style.height = "auto";
    // Ajusta la altura al contenido
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const res = await fetchServer.setIssue({ formData: payload });
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error("Error submitting issue:", err);
    }
  };

  return (

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Title
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.label}>
          Description
          <textarea
            className={styles.textarea}
            onInput={handleTextAreaResize}
            ref={textareaRef}
            value={formData.description}
            rows="1"
            maxLength="500"
            name="description"
            required
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Priority
          <select
            className={styles.select}
            name="priority"
            value={formData.priority}
            onChange={handleChange}>
            <option value="1">Urgent</option>
            <option value="2">High</option>
            <option value="3">Normal</option>
            <option value="4">Low</option>
          </select>
        </label>
        <label className={styles.label}>
          Tags (comma-separated)
          <input
            className={styles.input}
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Request Type
          <input
            className={styles.input}
            type="text"
            name="request_type"
            value={formData.request_type}
            onChange={handleChange}
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Submit Issue
        </button>
      </form>

  );
};

export default IssueForm;
