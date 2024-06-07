import { Link } from "react-router-dom";
import styles from "./AllPosts.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthedUserContext } from "../../App";
import Comment from '../Comment/Comment';
import * as postService from '../../services/postService';


const AllPosts = (props) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const currentUser = useContext(AuthedUserContext);

    console.log(currentUser);

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
        <main className="mx-2">
            <div className="row">
                {props.AllPosts.map((post, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <div className="card h-100">
                            <img src={post.photo} className="card-img-top h-50" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link
                                        className={`${styles.link}`}
                                        to={`/posts/${post._id}`}
                                    >
                                        <p>
                                            {post.title} by {post.author.username}
                                        </p>
                                    </Link>
                                </h5>
                                <p className={`card-text ${styles.text}`}>{post.text}</p>
                                <button
                                    className={`btn btn-link ${styles.btn}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                >
                                    {post.comments.length ? <h6>{post.comments.length} comments</h6> : <h6>No Comments</h6>}
                                </button>

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












                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default AllPosts;