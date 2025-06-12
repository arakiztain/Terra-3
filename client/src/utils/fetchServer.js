const serverUrl = "http://localhost:3004";

const loginFetch = async ({ email, password }) => {
  try {
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

const createProject = async ({ title, url, description, reviewerEmails: email }) => {
  email = Array.isArray(email) ? email.filter(Boolean) : [];
  const token = localStorage.getItem("token");
  return fetch(`${serverUrl}/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ title, url, description, email })
  })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  });
}


const updateProject = async (id, { url, description, reviewerEmails: email }) => {
  email = Array.isArray(email) ? email.filter(Boolean) : [];
  const token = localStorage.getItem("token");
  return fetch(`${serverUrl}/project`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ id, url, description, email })
  })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  });
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

const setIssue = async (formData, id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${serverUrl}/issue/report-issue/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(formData)
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const rejectIssue = async (formData, id) => {
  console.log("I'm sending this to the server");
  console.log(formData, id);
  const token = localStorage.getItem("token");
  const response = await fetch(`${serverUrl}/issue/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(formData)
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const acceptIssue = async ( id ) => {
    const token = localStorage.getItem("token");
  const response = await fetch(`${serverUrl}/issue/accept/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({status: "complete"})
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

const getTaskCount = async (projectId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${serverUrl}/project/${projectId}/task-count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    }
  });
  const data = await res.json();
  return data;
}

const sendReminderEmail = async (projectId) =>{
    const token = localStorage.getItem("token");
    const response = await fetch(`${serverUrl}/project/${projectId}/reminder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    }
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
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
  updateProject,
  rejectIssue,
  acceptIssue,
  getTaskCount,
  sendReminderEmail
}
