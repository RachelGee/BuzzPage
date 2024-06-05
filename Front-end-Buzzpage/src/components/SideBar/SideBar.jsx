import { useState, useContext } from "react";
import { AuthedUserContext } from '../../App';
import { useNavigate } from "react-router-dom";


const SideBar = (props) => {
    const user = useContext(AuthedUserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleClick = (e) => {
        navigate(`/users/${user._id}/posts/new`)
    }

    // Filter the posts based on the search query
    const filteredData = props.posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <h1>SideBar</h1>
            <button onClick={handleClick}>
                Create New Post
            </button>
            <br />
            <br />
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleChange}
            />
            <br />
            <br />
            {filteredData.length > 0 ? filteredData.map((post, index) => {
                return (
                    <div key={index}>
                        <p>Title: {post.title}</p>
                        <p>Description: {post.text}</p>
                        <hr />
                    </div>
                )
            }
            ) : <p>No Matching Posts</p>}
        </>
    );
}

export default SideBar;