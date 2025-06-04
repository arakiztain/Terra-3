const serverUrl = 'http://localhost:3004';

const loginFetch = async ({ email, password }) => {
    fetch(`${serverUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

const createProject = async ({ title, url, description, reviewerEmails:users }) => {
    fetch(`${serverUrl}/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            url,
            description,
            users
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

const getProjects = async () => {
  try {
    const response = await fetch(`${serverUrl}/project`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
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
    getProjects
}