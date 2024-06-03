import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css"
const NavBar = (props) => {
    return (
        <>
            {props.user ? (
                <nav className={styles.container}>
                    <Link className="logo-brandname" to='/'>
                        <img src={Logo} width={50} alt="" />
                        <div className="logo-title">BuzzPage</div>
                    </Link>

                    <div className={styles.links}>
                        <Link to={`/users/profile/${props.user._id}`}>Hello {props.user.username}</Link>
                        <Link to='' onClick={props.handleSignout}>Sign Out</Link>
                    </div>
                </nav>

            ) : (
                <nav className={styles.container}>
                    <Link className="logo-brandname" to='/'>
                        <img src={Logo} width={50} alt="" />
                        <div className="logo-title">BuzzPage</div>
                    </Link>

                    <div className={styles.links}>
                        <Link to='users/signup'>Sign Up</Link>
                        <Link to='users/signin'>Login</Link>
                    </div>
                </nav>
            )}
        </>
    );
}

export default NavBar;