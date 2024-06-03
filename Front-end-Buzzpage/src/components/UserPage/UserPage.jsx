import { useEffect, useState  } from 'react';
import {  useParams, Link } from 'react-router-dom';
import { show } from '../../services/profileService';

const UserPage = (props) => {
    //gets users id
    const { userId } = useParams()
    const [user, setUser] = useState(null)

    //gets the current users data 
    useEffect(() =>{
        const fetchUser = async () =>{
            const userData = await show(userId)
            setUser(userData);
        }
        fetchUser();
    },[userId]);
    
    //show loading until its gets user
    if (!user) return <h1>Loading User</h1>;

    return (  
        <>
            <section>
                <h1>usres profile</h1>
                <img src={user.image} alt='...'/>
                <h4>username: {user.username}</h4>
                <h5>name: {user.firstName} {user.lastName}</h5>
                <p>bio: {user.bio}</p>
                <Link to={`/users/profile/${userId}/edit`}>Edit</Link>
                <button onClick={() => props.handleDeleteUser(userId)}>Delete</button>
            </section>
            <section>
                <h1>Users posts</h1>
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
                
            </section>
        </>
     );
}
 
export default UserPage;