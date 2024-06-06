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

    const handleEdit = (e) => {
        navigate(`/users/profile/${user._id}/edit`)
    }

    // Filter the posts based on the search query
    const filteredData = props.posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <div className="container bg-dark" style={{minHeight: '100vh'}}>
                <div className={'card bg-dark border-dark'}>
                    <img src={props.user.image} className="card-img-top" style={{width: "60%",height: "10%"}} alt="..." />
                    <h1 className="card-title fw-bold fst-italic text-warning text-center">{props.user.firstName}</h1>
                    <p className="card-text text-warning text-center">{props.user.bio}</p>
                </div>
                <div className="container d-flex flex-column">
                    <div className="row p-2">
                        <div className="col">
                            <button className="btn btn-warning" onClick={handleClick}>New Post</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-warning" onClick={handleEdit}>Edit user</button>
                        </div>
                    </div>
                
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleChange}
                    />
                </div>
                
                {filteredData.length > 0 ? filteredData.map((post, index) => {
                    return (
                        <div key={index} className="text-warning mt-4">
                            <p>Title: {post.title}</p>
                            <p>Description: {post.text}</p>
                            <hr />
                        </div>
                    )
                }
                ) : <p className="text-warning">No Matching Posts</p>}
            </div>
        </>
    );
}

export default SideBar;