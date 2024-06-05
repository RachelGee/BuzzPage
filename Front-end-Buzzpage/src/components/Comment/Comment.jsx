import { useState } from "react";
import * as postService from '../../services/postService';

const Comment = (props) => {
    const [formData, setFormData] = useState({ text: '' });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log("submitting")
        console.log(formData)
        console.log(props.postId)
        await postService.createComment(props.postId, formData);
        setFormData({ text: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label
                htmlFor="text"
            >
                Comment
            </label>
            <textarea
                type="text"
                name="text"
                id="text"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit">Publish</button>
        </form>
    );
}

export default Comment;