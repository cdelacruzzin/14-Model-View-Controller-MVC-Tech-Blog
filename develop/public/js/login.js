const loginForm = async (event) => {
    event.preventDefault();

    //collects email and password value from login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //if both email and password are entered, a post request will be sent to the api
    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: POST,
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {
            // if resonse was successful, page will redirect to the homepage
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginForm);