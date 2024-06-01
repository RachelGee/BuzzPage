import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
const NavBar = (props) => {
    return (
        <>
            {props.user ? (
                <nav>
                    <Link className="logo-brandname" to='/'>
                        <img src={Logo} width={50} alt="" />
                        <div className="logo-title">BuzzPage</div>
                    </Link>

                    <Link to='' onClick={props.handleSignout}>Sign Out</Link>
                </nav>

            ) : (
                <nav>
                    <Link className="logo-brandname" to='/'>
                        <img src={Logo} width={50} alt="" />
                        <div className="logo-title">BuzzPage</div>
                    </Link>

                    <Link to='users/signup'>Sign Up</Link>
                    <br />
                    <Link to='users/signin'>Login</Link>
                </nav>
            )}
        </>
    );
}

export default NavBar;