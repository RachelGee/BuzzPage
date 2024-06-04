import { useEffect, useState  } from 'react';
import {  useParams } from 'react-router-dom';
import * as postService from '../../services/postService';
import { show } from '../../services/postService';

const PostDetails = (props) => {
    //gets user post
    const { postId } = useParams()
    const [post, setPost] = useState(null)

    //gets the current users data 
    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId);
            setPost(postData);
        };
        fetchPost();
    }, [postId]);
    
   
    return (  
        <>
         <h1>Show This Post</h1>
        </>
     );
}
 
export default PostDetails;