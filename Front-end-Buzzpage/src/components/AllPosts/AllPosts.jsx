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
                                        {post.title}
                                    </Link>
                                </h5>
                                <p className={`card-text h-25 ${styles.text}`}>{post.text}</p>
                                <Comment handleAddComment={handleAddComment} postId={post._id} />

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default AllPosts;