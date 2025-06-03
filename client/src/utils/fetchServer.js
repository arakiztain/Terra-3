const serverUrl = 'http://localhost:3004';

const loginFetch = ({ email, password }) => {
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
export default {
    loginFetch,
    resetFetch,
    setPassword
}