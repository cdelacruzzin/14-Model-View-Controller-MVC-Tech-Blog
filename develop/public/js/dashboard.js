
document.querySelector('#create').addEventListener('click', () => {
    window.location.replace('/newBlog');
});


const newPost = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#newContent').value.trim();
    const name = document.querySelector('#newTitle').value.trim();

    if(content && title) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({name, description}),
            headers: {
                'Content-Type': 'application/json',
              },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to create blog');
          }
    }

}

document.querySelector('.newPost-form').addEventListener('submit', newPost);

