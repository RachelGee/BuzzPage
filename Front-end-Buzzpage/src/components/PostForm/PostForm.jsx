import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as postService from '../../services/postService'
import { AuthedUserContext } from '../../App';

const postForm = (props) => {
    const { userId } = useParams();
    const { postId } = useParams();
    const currentUser = useContext(AuthedUserContext);
    const [formData, setFormData] = useState({
        author: userId,
        title: '',
        text: '',
        image: '',
        category: 'News',
    });
console.log(postId);
console.log(userId);
// //fetch the users post and store in post form
//     useEffect(() =>{
//     const fetchUserPost = async () =>{
//         const post = await postService.show(props.post._id)
//         setPost(post.user);
//     }
//         fetchUserPost();
//     },[]);

    // create POST
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    //Handle create post & submit to DB
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (postId) {
            props.handleUpdatePost(postId, formData);
        } else {
            props.handleAddPost(formData);
        }
    };
   
    return (

        <>
            <form onSubmit={handleSubmit}>
                <h1>{postId ? 'New Post' : 'New Post'}</h1>


                <label htmlFor="title">Title</label>
                <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">Text</label>
                <textarea
                    required
                    type="text"
                    name="text"
                    id="text"
                    value={formData.text}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="image">Image</label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="category-input">Category</label>
                <select
                    required
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="News">News</option>
                    <option value="Sports">Sports</option>
                    <option value="Games">Games</option>
                    <option value="Movies">Movies</option>
                    <option value="Music">Music</option>
                    <option value="Television">Television</option>
                </select>
                <br />
                <button type="submit">SUBMIT</button>
            </form>

        </>
    );
}

export default postForm;