
const newCommentHandler = async (event) => {
    event.preventDefault();
        const id = event.target.getAttribute('data-id');
        const description = document.querySelector('#comment').value.trim();
        alert(description);
        if (description) {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify(description),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert(response.ok);
            if(response.ok) {
                window.location.replace('/');
            } else {
                alert(response.statusText);
            }
        }
}
document.querySelector('#submitbtn').addEventListener('click', newCommentHandler);