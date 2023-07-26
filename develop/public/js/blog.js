
const newCommentHandler = async (event) => {

    event.preventDefault();
        const blog_id = event.target.getAttribute('data-id');
        const description = document.querySelector('#comment').value.trim();

        if (description) {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({description, blog_id}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.ok) {
                window.location.replace(`/blog/${blog_id}`);
            } else {
                alert(response.statusText);
            }
        }
};

const deletePost = async (event) => {
    console.log('hi');
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };





document.querySelector('#submitbtn').addEventListener('click', newCommentHandler);
document.querySelector('#deletebtn').addEventListener('click', deletePost);
document.querySelector('#editbtn').addEventListener('click', () => {
    window.location.replace('/editBlog');
});
