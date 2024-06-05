import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as postService from '../../services/postService';
import { show } from '../../services/postService';
import { Link } from "react-router-dom";

const PostDetails = (props) => {
    //gets user post
    const { postId } = useParams();
    const navigate = useNavigate();

    // set post state
    const [post, setPost] = useState({
        title: '',
        text: '',
        image: '',
        category: 'News',
        author: ""
    });

    //gets the current users post 
    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId);
            setPost(postData);
        };
        fetchPost();
    }, [postId]);

    
    const handleClick = () => {
        navigate(`/`);
    }

    // const handleDeletePost = async (postId) => {
    //     try {
    //         await postService.deletePost(postId);
    //         navigate('/'); // Navigate to the home page after deleting
    //     } catch (error) {
    //         console.error('Failed to delete post', error);
    //     }
    // }; 

    return (
        <>
            <h1>{post.title}</h1>
            <h2>{post.author.username} says: {post.text}</h2>
            <h2>{post.image}</h2>
            <>
                <button><Link to={`/posts/${postId}/edit`} style={{ textDecoration: 'none', color: 'black' }}>Edit</Link></button>
                <button onClick={() => props.postService.handleDeletePost(`${postId}`)}>Delete</button>
            </>
            <hr />
            <h1>Comments</h1>
            <form>
                <label></label>
                <input></input>
                <button>Submit</button>
            </form>
            <hr />
            <button onClick={handleClick}>Back to the Hive</button>

        </>
    );
};


export default PostDetails;