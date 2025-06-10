const serverUrl = "http://localhost:3004";

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
    email = Array.isArray(email) ? email.filter(Boolean) : [];
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

const updateProject = async( id, {url, description, reviewerEmails:email} ) => {
    email = Array.isArray(email) ? email.filter(Boolean) : [];
    const token = localStorage.getItem("token");
    fetch(`${serverUrl}/project`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            id,
            url,
            description,
            email
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
const resetFetch = ({ email }) => {
    fetch(`${serverUrl}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    })    
}

const setPassword = ({ password, token }) => {
    fetch(`${serverUrl}/set-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            token
        })
    })
}

const getProjects = async () => {
  const token = localStorage.getItem("token");
  console.log("Does");
  try {
    const response = await fetch(`${serverUrl}/project`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("This is the data returned");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getIssues = async ( id ) => {
    const token = localStorage.getItem("token");
    try{
        const response = await fetch(`${serverUrl}/issue/${id}`, {
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

const getProjectById = async ( id ) => {
      const token = localStorage.getItem("token");
    try{
        const response = await fetch(`${serverUrl}/project/${id}`, {
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

const setIssue = async ( formData, id ) =>{
    const token = localStorage.getItem("token");
    try{
        const response = await fetch(`${serverUrl}/issue/report-issue/${id}`, {
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
  getIssues,
  setIssue,
  setPassword,
  resetFetch,
  getProjectById,
  updateProject
}
