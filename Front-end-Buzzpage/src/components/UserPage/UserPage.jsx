import { useEffect, useState  } from 'react';
import {  useParams } from 'react-router-dom';
import { show } from '../../services/profileService';

const UserPage = () => {
    //gets users id
    const { userId } = useParams()
    const [user, setUser] = useState({})

    //gets the current users data 
    useEffect(() =>{
        const fetchUser = async () =>{
            const userData = await show(userId)
            setUser(userData);
        }
        fetchUser();
    },[userId]);
    
    //show loading until its gets user
    if (!user) return <h1>Loading</h1>;

    return (  
        <>
            <section>
                <h1>usres profile</h1>
                <h4>username: {user.username}</h4>
                <h5>name: {user.firstName} {user.lastName}</h5>
                <p>bio: {user.bio}</p>
            </section>
            <section>
                <h1>Users posts</h1>
            </section>
        </>
     );
}
 
export default UserPage;