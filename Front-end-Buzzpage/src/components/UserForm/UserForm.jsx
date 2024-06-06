import { useState, useEffect } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { show, update } from '../../services/profileService';
import styles from './UserForm.module.css'
/*-----------------import default img----------------- */ 
import default1 from '../../assets/images/default icon 1.png'
import default2 from '../../assets/images/default icon 2.png'
import default3 from '../../assets/images/default icon 3.png'

const UserForm = (props) => {
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
            const userData = await show(props.user._id)
            setFormData(userData.user);
        }
        fetchUser();
    },[]);

    //handles any change to the form data
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    //submits the form and navigate back to user page
    const handleSubmit = (evt) =>{
        evt.preventDefault()
        props.handleUpdateUser(props.user._id,formData)
    }

    //cancel the form and return to userPage
    const handleBack = () =>{
        navigate(`/users/profile/${props.user._id}`)
    }


    return ( 
        <>
            <div className={styles.container} >
                <div className={styles.form}>
                    <form onSubmit={handleSubmit} className="card bg-dark p-5">   
                        <div>
                            <label htmlFor="picture" ></label>
                            <select className={styles.picture} name="image" id="picture" defaultValue={formData.image} onChange={handleChange}>
                                <option className={styles.d1} value={default1}>yellow</option>
                                <option className={styles.d2} value={default2}>red</option>
                                <option className={styles.d3} value={default3}>black</option>
                            </select>
                        </div>

                        <div className="row">
                            <div className="col">
                                <input  
                                    type="text"
                                    className="form-control me-2"
                                    name="firstName" 
                                    id="firstName"
                                    value={formData.firstName} 
                                    onChange={handleChange}
                                />
                            </div>
                            <br />
                            <div className="col" >
                                <input  
                                    type="text" 
                                    className="form-control me-2"
                                    name="lastName" 
                                    id="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="mb-3">
                            <label htmlFor="bio" className="form-label">Bio:</label>
                            <textarea  
                                type="text" 
                                className="form-control "
                                name="bio" 
                                id="bio" 
                                rows="3"
                                value={formData.bio} 
                                onChange={handleChange}
                            />
                        </div>

                        <button type='submit' className="btn btn-warning">Submit info</button>
                    </form>
                        <button onClick={handleBack} className="btn-close" />
                </div>
            </div>
        </>
    );
}
 
export default UserForm;