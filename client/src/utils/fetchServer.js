const serverUrl = "http://localhost:3004";

async function getUserInfo() {
  try {
    const response = await fetch(`${serverUrl}/user-info`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const loginFetch = async ({ email, password }) => {
  console.log({ email, password });
  try {
    console.log("serverurl:", serverUrl);
    const response = await fetch(`${serverUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const createProject = async ({ title, url, description, reviewerEmails:email }) => {
    const token = localStorage.getItem("token");
    console.log("recibido en createProject: ",{ title, url, description, email });
    console.log("token: ",token);
    console.log("serverUrl: ",serverUrl+"/project");
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        url,
        description,
        email,
      }),
    };
    console.log("OPTIONS: ",OPTIONS);
    try {
      const response = await fetch(`${serverUrl}/project`, OPTIONS);
      const data = await response.json();
      console.log(data);
      return data; // si quieres devolverlo
    } catch (error) {
      console.error("Error:", error);
    }
    /*fetch(`${serverUrl}/project`, OPTIONS) <<faltaba await
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));*/
}

const getProjects = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${serverUrl}/project`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getIssues = async () => {
    const token = localStorage.getItem("token");
    try{
        const response = await fetch(`${serverUrl}/issue`, {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`,
             },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
const setIssue = async ({ formData }) =>{
    const token = localStorage.getItem("token");
    try{
        const response = await fetch(`${serverUrl}/issue/report-issue/684077b8ceed6d9c2be69759`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`,
             },
            
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default {
  loginFetch,
  createProject,
  getProjects,
  getUserInfo,
  getIssues,
  setIssue  
}
