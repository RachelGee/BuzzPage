import { useState } from 'react';
import { signin } from '../../services/authService';
import { useNavigate } from 'react-router-dom';


const SignInForm = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const {  username, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        const user = await signin(formData);
        console.log(user)
        navigate('/')
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                name="username"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
            </form>
        </>
    );
}
 
export default SignInForm;