import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { show, update } from '../../services/profileService';


const UserForm = (props) => {
    //gets current user id
    const { userId } = useParams();

    const navigate = useNavigate()

    //default form state variable
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        bio: ''
    });

    //fetch to the users data and store it in form
    useEffect(() =>{
        const fetchUser = async () =>{
            const userData = await show(userId)
            setFormData(userData);
        }
        fetchUser();
    },[userId]);

    //handles any change to the form data
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    //submits the form and navigate back to user page
    const handleSubmit = (evt) =>{
        evt.preventDefault()
        props.handleUpdateUser(userId,formData)
        navigate(`/users/profile/${userId}`)
    }

    return ( 
        <>
            <h1>form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input  type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange}/>

                <label htmlFor="lastName">Last Name:</label>
                <input  type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange}/>

                <label htmlFor="bio">BIO:</label>
                <textarea  type="text" name="bio" id="bio" value={formData.bio} onChange={handleChange}/>

                <button type='submit'>Submit info</button>
            </form>
        </>
    );
}
 
export default UserForm;