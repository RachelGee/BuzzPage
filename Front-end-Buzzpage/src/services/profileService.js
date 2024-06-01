const BACKEND_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/profiles`;

// index to show the users profile page
const show = async (userId) => {
    try {
        //makes a fetch requst to the backend profile inedx route
        const res = await fetch(`${BACKEND_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
      return res.json()
    } catch (error) {
      console.log(error);
    }
};

export { show };