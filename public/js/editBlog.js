const editPost = async (event) => {
    if(event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const name = document.querySelector('#editTitle').value.trim();
        const description = document.querySelector('#editContent').value.trim();


        console.log(id);
        console.log(name);
        console.log(description);


        const response = await fetch (`/api/blog/put/${id}`, {
            method: 'PUT',
            body: JSON.stringify({name, description}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to edit blog');
          }
    }
  }

  document.querySelector('#editBtn').addEventListener('click', editPost);