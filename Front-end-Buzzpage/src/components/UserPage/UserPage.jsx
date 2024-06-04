import { useEffect, useState  } from 'react';
import {  useParams, Link } from 'react-router-dom';
import { show } from '../../services/profileService';
import styles from './UserPage.module.css'
import SideBar from '../SideBar/SideBar';

const dummyData = [
    {
        "title": "Scraping dog poop in the garage",
        "text": "with my bare hand and putty knife and no gloves",
        "image": "poop image",
        "category": "News"
    },
    {
        "title": "Feeding two puppies",
        "text": "always fighting for foods",
        "image": "food image",
        "category": "News"
    },
    {
        "title": "Going out for walk late at night",
        "text": "picking up poop on the street",
        "image": "poop image",
        "category": "News"
    },
    {
        "title": "Getting the puppies to sit",
        "text": "getting closer to the goal using treats",
        "image": "puppy image",
        "category": "News"
    },
    {
        "title": "Getting the puppies to sit",
        "text": "getting closer to the goal using treats",
        "image": "puppy image",
        "category": "News"
    },
    {
        "title": "Getting the puppies to sit",
        "text": "getting closer to the goal using treats",
        "image": "puppy image",
        "category": "News"
    }
];

const UserPage = (props) => {
    //gets users id
    const { userId } = useParams()
    const [user, setUser] = useState(null)

    const [dummyPost, setDummyPost] = useState(dummyData);

    //gets the current users data 
    useEffect(() =>{
        const fetchUser = async () =>{
            const userData = await show(userId)
            setUser(userData.user);
        }
        fetchUser();  
    },[]);
    
    //show loading until its gets user
    if (!user) return <h1>Loading User</h1>;

    return (  
        <main className={styles.container}>

                <div className={styles.sidebar}> 
                    <SideBar dummyPost={dummyPost}/>
                </div>

                    <div className={styles.userInfo}>
                        <img src={user.image}  alt='...'/>
                        <h4 >{user.username}</h4>
                    </div>
                    <div className={styles.userBio}>
                        <h5>name: {user.firstName} {user.lastName}</h5>
                        <p>bio: {user.bio}</p>
                        <button><Link to={`/users/profile/${userId}/edit`}>Edit</Link></button>
                        <button onClick={() => props.handleDeleteUser(userId)}>Delete</button>
                    </div>
             

                <div className={styles.userPost}>
                    <div className={styles.post}>
                    {user.posts.length === 0 ? 'no posts': user.posts.map((post) =>(
                        <header key={post._id}>
                            <div>
                                {post.title}
                                <h6>{post.category}</h6>
                            </div>
                            <p>{post.text}</p>
                            <img src={post.image} alt='...'/>
                            {post.like}
                        </header>
                    ))}
                    </div>
                </div>
        </main>
     );
}
 
export default UserPage;