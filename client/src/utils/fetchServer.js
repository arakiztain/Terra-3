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

export default loginFetch;