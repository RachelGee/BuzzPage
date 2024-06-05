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
    if (!user) return <h1>Loading User</h1>;


    return (  
        <main className={styles.container}>
            {/* <PageTransition /> */}
            <div className={styles.sidebar}> 
                <SideBar dummyPost={props.posts}/>
            </div>
                <div className={styles.userInfo}>
                     <img src={user.image}  alt='...'/>
                    <h4 >{user.username}</h4>
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
                            <button><Link to={`/users/profile/${userId}/edit`} style={{ textDecoration: 'none', color: 'black' }}>Edit</Link></button>
                            <button onClick={() => props.handleDeleteUser(userId)}>Delete</button>
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