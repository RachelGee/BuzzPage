import styles from './LandingPage.module.css'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>

            <div className={`container.fluid text-center p-5 d-flex flex-column  h-100 ${styles.container}`}>

                <div className="row h-50 gap-5 align-items-center justify-content-center h-100">
                    <div className={`col-2 d-flex align-items-center ${styles.boxL}`} style={{ backgroundColor: "#F4BE1E", minHeight: "60vh" }}>

                        <div className='d-flex gap-5 justify-content-center w-100'>
                            <div className={`${styles.eyes}`}>
                                <div className={`${styles.pupils}`}></div>
                            </div>
                            <div className={`${styles.eyes}`}>
                                <div className={`${styles.pupils}`}></div>
                            </div>
                        </div>


                    </div>
                    <div className={`col-4 m-2 bg-dark text-light h-100 d-flex flex-column justify-content-around ${styles.boxC}`} style={{ minHeight: "70vh" }}>
                        <div className="row h-25">
                            <h1 style={{ color: "#F4BE1E" }}>Welcome To BuzzPage</h1>
                        </div>

                        <div className="row h-25">
                            <div className=" h-25"><img src={Logo} alt="" /></div>
                        </div>

                        <div className="row h-25" >
                            <button className='btn ' style={{ color: "#F4BE1E" }}>
                                <Link className='h2' to='users/signup'>Sign Up Today</Link>
                            </button>
                        </div>
                    </div>
                    <div className={`col-2 d-flex align-items-center ${styles.boxR}`} style={{ backgroundColor: "#F4BE1E", minHeight: "60vh" }}>
                        <p className='display-4'>Join the Buzz: Explore, Connect, Thrive!</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default LandingPage;