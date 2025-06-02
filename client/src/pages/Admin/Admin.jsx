import style from './Admin.module.css';
import ProjectList from '../../components/ProjectList/ProjectList';

const mockData = [
  {
    id: 1,
    title: "Project Alpha",
    url: "https://alpha.example.com",
    reviewers: ["alice@example.com", "bob@example.com"],
  },
  {
    id: 2,
    title: "Project Beta",
    url: "https://beta.example.com",
    reviewers: ["carol@example.com"],
  },
  {
    id: 3,
    title: "Project Gamma",
    url: "https://gamma.example.com",
    reviewers: ["dave@example.com", "eve@example.com", "frank@example.com"],
  },
];

const Admin = () =>{
  return (
    <div className={style.container}>
        <form className={style.form}>
        <label>
            Project name
            <input className={style.input} type="text" name="projectName" required />
        </label>
        <label>
            Url
            <input className={style.input} type="url" name="url" required />
        </label>
        <label>
            Reviewers (comma-separated emails)
            <input className={style.input} type="text" name="reviewers" placeholder="email1@example.com, email2@example.com" />
        </label>
        <button type="submit">Submit</button>
        </form>
        <ProjectList projectList={mockData} />
    </div>
  );
}

export default Admin;