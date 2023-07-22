

const signupForm = async (event) => {
    event.preventDefault();

    // stores the values of username, email, and password to constants
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


    if(username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {
            window.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupForm);