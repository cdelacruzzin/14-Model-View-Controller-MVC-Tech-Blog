
const  loginHandler = async (event) => {
    event.prevendDefault();

    await fetch('/', {
        method: 'GET',
    });
    
}

document.querySelector('#logninBtn').addEventListener('click', loginHandler);

document.querySelector('#signupBtn').addEventListener('click', signupHandler);