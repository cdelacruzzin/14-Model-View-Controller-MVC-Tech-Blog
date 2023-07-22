

const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


    alert('hppp')
    
}

document.querySelector('.signup-form').addEventListener('submit', signupForm);