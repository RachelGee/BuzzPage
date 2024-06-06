import { useState, useContext } from "react";
import { AuthedUserContext } from '../../App';
import { useNavigate, Link } from "react-router-dom";


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
            <div className="container bg-dark">
                <h1>SideBar</h1>
                <img src={props.user.image} className="card-img-top" style={{width: "50%",height: "12%"}} alt="..." />
                <h1 className="card-text fw-bold fst-italic text-warning">{user.username}</h1>
                <button onClick={handleClick}>
                    Create New Post
                </button>
                <div className="col">
                    <button className="btn btn-warning"><Link to={`/users/profile/${user._id}/edit`} style={{ textDecoration: 'none', color: 'black' }}>Edit</Link></button>
                </div>
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
                        <div key={index} className="text-warning">
                            <p>Title: {post.title}</p>
                            <p>Description: {post.text}</p>
                            <hr />
                        </div>
                    )
                }
                ) : <p>No Matching Posts</p>}
            </div>
        </>
    );
}

export default SideBar;