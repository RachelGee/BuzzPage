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
                <div className={styles.userInfo}>
                <div className="card" >
                    <img src={user.image} className="card-img-top" alt="..." />
                        <div class="card-body">
                            <h4 className="card-text">{user.username}</h4>
                        </div>
                    </div> 
                </div>
                 <div className={styles.userBio}>
                     <div className="card">
                         <h5>name: {user.firstName} {user.lastName}</h5>
                         <p className="card-text">bio: {user.bio}</p>
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
                 </div>
            <div className={styles.userPost}>
                {user.posts.length === 0 ? 'no posts': user.posts.map((post) =>(
                    <div className={styles.post} key={post._id}>
                        <div className="card bg-dark" >
                            <div>
                                <Link className="card-title text-warning" to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}><h4>{post.title}</h4></Link>
                                  <h6 className="card-header text-warning">{post.category}</h6>
                            </div>
                            <p className="card-text text-warning ">{post.text}</p>
                            {!post.image ? '': <img src={post.image} className={styles.image} alt='...'/>}
                            {!post.like ? '' : <button type="button" className="btn btn-outline-warning" > {post.like}</button>}
                            </div>
                        </div>
                    ))}
                </div>
        </main>
     );

}

export default UserPage;