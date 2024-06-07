import { useState } from "react";
import * as postService from '../../services/postService';

const Comment = (props) => {
    const [formData, setFormData] = useState({ text: '' });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const newComment = await postService.createComment(props.postId, formData);
        props.handleAddComment(newComment);
        setFormData({ text: '' });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text"></label>

                <div className="input-group">
                    <span className="input-group-text">
                        <button style={{ backgroundColor: "#F4BE1E", border:"none" }} className="btn btn-secondary" type="submit">Add Comment</button>
                    </span>
                    <input className="form-control" aria-label="With textarea"
                        type="text"
                        name="text"
                        id="text"
                        value={formData.text}
                        onChange={handleChange}>
                    </input>
                </div>

            </form>
        </>
    );





}

export default Comment;