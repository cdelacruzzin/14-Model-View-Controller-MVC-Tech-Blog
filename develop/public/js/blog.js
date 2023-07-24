const newCommentHandler = async (event) => {
    event.preventDefault();

    const blogname = document.querySelector('#blogname').value.trim();
    const description = document.querySelector('#description').value.trim();
    const username = document.querySelector('#username').value.trim();
    const date = document.querySelector('#date').value.trim();

    const comment = document.querySelector('#comment').value.trim();
    
    if(comment) {
        const response = await fetch('/api/users/blog', {
            method: 'POST',
            body: JSON.stringify({comment}),
            headers: {
                'Content-Type': 'application/json',
              },
        });

        if(response.ok) {
            document.location.replace('/blog');
        } else {
            alert('Failed to post comment');
        }
    }





}

document.querySelector('.comment-form').addEventListener('submit', newCommentHandler)