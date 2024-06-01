import { useEffect  } from 'react';
import {  useParams } from 'react-router-dom';

const UserPage = () => {
    //gets users id
    const { userId } = useParams()

    //gets the current users data 
    useEffect(() =>{
        const fetchUser = async () =>{

        }
    })

    return ( 
        <>
        <section>
            <h1>usres profile</h1>
        </section>
        <section>
            <h1>Users posts</h1>
        </section>
        </>
     );
}
 
export default UserPage;