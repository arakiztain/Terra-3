import { useState } from "react";
import fetchServer from "../../utils/fetchServer";
const IssueForm = ({ projectId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "3",
    tags: "",
    request_type: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
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
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Description
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <label>
        Priority
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="1">Urgent</option>
          <option value="2">High</option>
          <option value="3">Normal</option>
          <option value="4">Low</option>
        </select>
      </label>
      <label>
        Tags (comma-separated)
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
      </label>
      <label>
        Request Type
        <input type="text" name="request_type" value={formData.request_type} onChange={handleChange} required />
      </label>
      <button type="submit">Submit Issue</button>
    </form>
  );
};

export default IssueForm;
