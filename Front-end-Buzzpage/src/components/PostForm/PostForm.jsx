import { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as postService from '../../services/postService'
import PageTransition from '../PageTransition/PageTransition';
import { AuthedUserContext } from '../../App';

const postForm = (props) => {
    const fileInputRef = useRef();
    const { userId } = useParams();
    const { postId } = useParams();
    const currentUser = useContext(AuthedUserContext);
    const [formData, setFormData] = useState({
        author: currentUser ? currentUser._id : "",
        title: '',
        text: '',
        photo: '',
        imageTitle: "",
        category: 'News',
    });


    // fetch the users post and store in post form
    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {
                try {
                    const post = await postService.show(postId);
                    setFormData({
                        author: post.author._id,
                        title: post.title,
                        text: post.text,
                        image: post.image,
                        category: post.category,
                    });
                } catch (error) {
                    console.error('failed to fetch post', error);
                }
            };
            fetchPost();
        }
    }, [postId]);

    // create POST
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleChangeImage = (evt) => {
        const newFormData = { ...formData, [evt.target.name]: URL.createObjectURL(evt.target.files[0]) };
        setFormData(newFormData);
        console.log(newFormData);
    }

    //Handle create post & submit to DB
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(formData);
        if (postId) {
            props.handleUpdatePost(postId, formData);
        } else {
            let photoData;
            formData.photo = '';
            if (fileInputRef.current.value !== '') {
                photoData = new FormData()
                photoData.append('title', formData.title)
                photoData.append('photo', fileInputRef.current.files[0]);
            }
            console.log("formdata: ", formData)
            props.handleAddPost(photoData, formData);
        }
    };

    return (
        <>
            {/* <PageTransition /> */}
            <img src={formData.image} alt="profilePic" />
            <form onSubmit={handleSubmit}>
                <h1>{postId ? 'Edit Post' : 'New Post'}</h1>


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
                <label htmlFor="imageTitle">Image Title</label>
                <input
                    type="text"
                    name="imageTitle"
                    id="imageTitle"
                    value={formData.imageTitle}
                    onChange={handleChange}
                />
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    ref={fileInputRef}
                    id="image"
                    name="photo"
                    onChange={handleChangeImage}
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
                    <option value="Lifestyle">Lifestyle</option>
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