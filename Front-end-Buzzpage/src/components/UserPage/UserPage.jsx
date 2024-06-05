import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import { show } from '../../services/profileService';
import PageTransition from '../PageTransition/PageTransition';
import styles from './UserPage.module.css'
import SideBar from '../SideBar/SideBar';

const UserPage = (props) => {
    //gets users id
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    //gets the current users data 
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await show(userId)
            setUser(userData.user);
        }
        fetchUser();
    }, []);

    //show loading until its gets user
    if (!user) return (
        <>
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-warning" style={{width: '30rem', height: '30rem', marginTop: '10rem'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );


    return (  
        <main className={styles.container}>
            {/* <PageTransition /> */}
            <div className={styles.sidebar}> 
                <SideBar posts={props.posts}/>
            </div>
                <div className={`card bg-dark m-auto mt-2 ${styles.userInfo}`}>
                    <img src={user.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h1 className="card-text fw-bold fst-italic text-warning">{user.username}</h1>
                    </div>
                </div>
                     <div className={`card  bg-dark m-auto text-warning mt-2 me-5 d-flex ${styles.userBio}`}>
                         <h5 className="card-text">BEE: {user.firstName} {user.lastName}</h5>
                         <p className="card-body">bio: {user.bio}</p>
                         {/* for later development/ only allow user to edit or delete their own page */}
                         {props.user._id !== userId ? (
                            ''
                        ) : (
                        <>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-warning"><Link to={`/users/profile/${userId}/edit`} style={{ textDecoration: 'none', color: 'black' }}>Edit</Link></button>
                                </div>
                                <div className="col">
                                    <button className="btn btn-warning" onClick={() => props.handleDeleteUser(userId)}>Delete</button>
                                </div>
                            </div>
                        </>
                        )}
                     </div>
            <div className={`d-flex  flex-wrap ${styles.userPost}`}>
                {user.posts.length === 0 ? 'no posts': user.posts.map((post) =>(
                    <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }} key={post._id}><div >
                        <div className={`card p-2 m-2 bg-dark  ${styles.postContainer} `}>
                            <div>
                                <h4 className="card-title text-warning">{post.title}</h4>
                                <h6 className="card-header text-warning">{post.category}</h6>
                            </div>
                            <p className="card-text text-warning ">{post.text}</p>
                            {!post.image ? '': <img src={post.image} className={styles.image} alt='...'/>}
                        </div>
                    </div></Link>
                    ))}
                </div>
        </main>
     );

}

export default UserPage;