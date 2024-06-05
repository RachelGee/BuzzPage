import { useState } from 'react';
import { signup } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css';
import LoginSignup from '../../assets/images/LoginSignup.png';
import Logo from '../../assets/images/logo.png'

const SignUpForm = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        passwordConf: '',
    });
    const [message, setMessage] = useState(['']);
    const updateMessage = (msg) => {
        setMessage(msg);
    };
    const { firstName, lastName, username, password, passwordConf } = formData;

    const handleChange = (e) => {
        updateMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await signup(formData);
            navigate('/users/signin');
        } catch (err) {
            updateMessage(err.message);
        }
    };

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.logoImage}>
                    <p className='display-3'>What's all the BUZZ about?</p>
                    <img src={Logo} alt="" />

                </div>
                <div className={styles.formContainer}>
                    <form className={`border container-m p-5 h-75 ${styles.form}`} onSubmit={handleSubmit}>
                        <img src={LoginSignup} className={styles.img} alt="" />
                        <h1>Sign Up</h1>
                        <div className={styles.signup}>
                            <p>Have an account already?</p>
                            <a href='' onClick={() => navigate('/users/signin')}>Login here</a>
                        </div>
                        <p>{message}</p>
                        <div className="row">
                            <div className="col">
                                <label
                                    htmlFor="firstName"
                                    className="form-label"
                                >
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="username"
                                className="form-label"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={handleChange}
                                autoComplete='off'
                            />

                            <div className="form-text">We'll never share your password with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="confirm"
                                className="form-label"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="passwordConf"
                                className="form-control"
                                id="passwordConf"
                                value={passwordConf}
                                onChange={handleChange}
                                autoComplete='off'
                            />
                        </div>
                        <button type="submit" disabled={isFormInvalid()} className={`btn btn-primary w-100 ${styles.button}`}>Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUpForm;