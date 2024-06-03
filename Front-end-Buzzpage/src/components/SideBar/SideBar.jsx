import { useState } from "react";
const SideBar = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    // Filter the posts based on the search query
    const filteredData = props.dummyPost.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <h1>SideBar</h1>
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
                    <>
                        <p key={index}>Title: {post.title}</p>
                        <p>Description: {post.text}</p>
                        <hr />
                    </>
                )
            }
            ) : <p>No Matching Posts</p>}
        </>
    );
}

export default SideBar;