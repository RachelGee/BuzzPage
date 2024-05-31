import { useState } from 'react';
import { signup } from '../services/authService';

const SignUpForm = (props) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        passwordConf: '',
    });
    const { firstName, lastName, username, password, passwordConf } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

       const newUser = await signup(formData);
       setFormData({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        passwordConf: '',
        })
    };

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
      };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                type="text"
                id="firstName"
                value={firstName}
                name="firstName"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                type="text"
                id="lastName"
                value={lastName}
                name="lastName"
                onChange={handleChange}
                />
            </div>
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
            <div>
                <label htmlFor="confirm">Confirm Password:</label>
                <input
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                />
            </div>
            <button type="submit" disabled={isFormInvalid()}>Submit</button>
            </form>
        </>
    );
}
 
export default SignUpForm;