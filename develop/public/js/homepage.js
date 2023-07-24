
document.querySelector('#home').addEventListener('click', async () => {
    window.location.replace('/');
});

document.querySelector('#dashboard').addEventListener('click', async () => {
    window.location.replace('/dashboard');
});

document.querySelector('#login').addEventListener('click', async () => {
    window.location.replace('/loginController');
});

document.querySelector('#logout').addEventListener('click', async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
});

