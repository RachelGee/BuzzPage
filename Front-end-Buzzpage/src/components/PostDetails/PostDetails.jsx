import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as postService from '../../services/postService';
import { Link } from "react-router-dom";
import { AuthedUserContext } from '../../App';
import Comment from '../Comment/Comment';
import styles from "./PostDetails.module.css"

const PostDetails = (props) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const currentUser = useContext(AuthedUserContext);

    const [post, setPost] = useState({
        title: '',
        text: '',
        image: '',
        category: 'News',
        author: "",
        comments: []
    });
    const [editCommentId, setEditCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState({ text: "" });


    useEffect(() => {
        const fetchPostComment = async () => {
            const postData = await postService.show(postId);
            setPost(postData);
        };
        fetchPostComment();
    }, [postId, editCommentId]);


    const handleAddComment = async (comment) => {
        const updatedPost = { ...post };
        updatedPost.comments.push(comment);
        setPost(updatedPost);
    }

    const handleDeleteComment = async (commentId) => {
        await postService.deleteComment(postId, commentId);
        const updatedPost = { ...post };
        updatedPost.comments = updatedPost.comments.filter(comment => comment._id !== commentId);
        setPost(updatedPost);
    }

    const handleToggleEdit = (commentId, commentText) => {
        setEditCommentId(commentId);
        setEditedCommentText(commentText);
    }

    const handleSaveEdit = async (commentId) => {
        await postService.updateComment(postId, commentId, editedCommentText);
        setEditCommentId(null);
    }

    const handleClick = () => {
        navigate(`/`);
    }

    const handleLikeClick = async (arg) => {
        let likes;
        if (arg === "like") {
            likes = post.like + 1;
        } else {
            likes = post.like - 1;
        }
        setPost({ ...post, like: likes });
        const updatedPost = await postService.update(post._id, { like: likes });
        setPost(updatedPost);
    };

    return (
        <>
            <button className="btn btn-secondary" onClick={() => handleLikeClick("like")}>Like</button>
            {post.like}
            <button className="btn btn-secondary" onClick={() => handleLikeClick("dislike")}>Dislike</button>
            <hr />
            <div className={styles.container}>
                <div className="card" style={{ width: "30rem" }}>
                    <img src={post.photo} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                            {post.author.username} says:
                        </h6>
                        <p className="card-text">{post.text}</p>
    
                        {currentUser && currentUser._id === post.author._id && (
                            <>
                                <button className="btn btn-secondary">
                                    <Link
                                        className={styles.link}
                                        to={`/users/${currentUser._id}/posts/${postId}/edit`}
                                        style={{ textDecoration: 'none', color: 'white' }}>Edit</Link>
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => props.handleDeletePost(post._id)}> Delete
                                </button>
                            </>
                        )}

                        <div className="d-inline-flex gap-1">
                            <button
                                className="btn btn-secondary"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                            >Comments</button>
                            
                            <button className="btn btn-secondary" onClick={handleClick}>Back to the Hive
                            </button>
                        </div>
    
                        <div className="collapse" id="collapseExample">
                            <div className="card card-body">
                                <div className="comment-section">
                                    <h1>Comments</h1>
                                    <div className="comments">
                                        <ol>
                                            {post.comments &&
                                                post.comments.map((comment, index) => (
                                                    <li key={index}>
                                                        {editCommentId === comment._id ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={editedCommentText.text}
                                                                    onChange={(e) =>
                                                                        setEditedCommentText({ text: e.target.value })
                                                                    }
                                                                />
                                                                <button onClick={() => handleSaveEdit(comment._id)}>
                                                                    Save
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {comment.text}
                                                                {currentUser && currentUser._id === post.author._id && (
                                                                    <>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleToggleEdit(comment._id, comment.text)
                                                                            }
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDeleteComment(comment._id)
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </>
                                                        )
                                                        }
                                                    </li>
                                                ))}
                                        </ol>
                                    </div>
                                    <Comment handleAddComment={handleAddComment} postId={post._id} />
                                </div>

                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
    

            </div>
        </>
    );
};

export default PostDetails; 
