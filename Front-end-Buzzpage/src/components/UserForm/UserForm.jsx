import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { show, update } from '../../services/profileService';
import styles from './UserForm.module.css'

const UserForm = (props) => {
    //gets current user id
    const { userId } = useParams();


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
            setFormData(userData.user);
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
    }

    return ( 
        <>
            <form onSubmit={handleSubmit} className={styles.container} class="card col-6">
                <div class="row">
                    <div class="col">
                        <input  
                            type="text"
                            class="form-control me-2"
                            name="firstName" 
                            id="firstName"
                            value={formData.firstName} 
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <div class="col" >
                        <input  
                            type="text" 
                            class="form-control me-2"
                            name="lastName" 
                            id="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <br />
                <div class="mb-3">
                    <label htmlFor="bio" class="form-label">Bio:</label>
                    <textarea  
                        type="text" 
                        class="form-control "
                        name="bio" 
                        id="bio" 
                        rows="3"
                        value={formData.bio} 
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Submit info</button>
            </form>
        </>
    );
}
 
export default UserForm;