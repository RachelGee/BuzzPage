import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as postService from '../../services/postService';
// import { show, update, deletePost } from '../../services/postService';
import { Link } from "react-router-dom";
import { AuthedUserContext } from '../../App';

import Comment from '../Comment/Comment';

const PostDetails = (props) => {
    //gets user post
    const { postId } = useParams();
    const navigate = useNavigate();
    const currentUser = useContext(AuthedUserContext);


    // set post state
    const [post, setPost] = useState({
        title: '',
        text: '',
        image: '',
        category: 'News',
        author: "",
        comments: []
    });


    //gets the current users post comment
    useEffect(() => {
        const fetchPostComment = async () => {
            const postData = await postService.show(postId);
            setPost(postData);
        };
        fetchPostComment();
    }, [postId, post.comments]);

    const [comments, setComments] = useState(post.comments)


    const handleAddComment = async (comment) => {
        post.comments.push(comment);
    }


    const handleClick = () => {
        navigate(`/`);
    }

    return (
        <>
          <h1>{post.title}</h1>
          <h2>{post.author.username} says: {post.text}</h2>
          <h2>{post.image}</h2>
          {currentUser && currentUser._id === post.author._id && (
            <>
              <button>
                <Link to={`/users/${currentUser._id}/posts/${postId}/edit`} style={{ textDecoration: 'none', color: 'black' }}>Edit</Link>
              </button>
              <button onClick={() => props.handleDeletePost(post._id)}>Delete</button>
            </>
          )}
          <hr />
            <div className="comment-section">
                <h1>Comments</h1>
                <div className="comments">
                    <ol>
                        {post.comments && post.comments.map((comment, index) => {
                            return (
                                <li key={index}>
                                    {comment.text}
                                </li>
                            )
                        })}
                    </ol>
                </div>
                <Comment handleAddComment={handleAddComment} postId={post._id} />
            </div>
            <hr />
            <button onClick={handleClick}>Back to the Hive</button>

        </>
      );
    };
    


export default PostDetails;