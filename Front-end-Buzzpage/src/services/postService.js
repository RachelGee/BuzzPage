const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL;


// index to show all post "Hive Feed"
const index = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/posts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

//show a selected post
const show = async (postId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

//create a new post 
const create = async (postFormData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

//update a users post
const update = async (postId, postFormData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${postId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFormData),
      });
    } catch (error) {
      console.log(error);
    }
}

//delete the users post
const deletePost = async (postId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export { index, show, create, update , deletePost }; 