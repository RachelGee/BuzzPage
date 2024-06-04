import { Link } from "react-router-dom";

const AllPosts = (props) => {
    console.log(props.AllPosts)
    return ( 
        <>
            <h1>All Posts</h1>
            {props.AllPosts.map((post, index) => {
                return (
                    <>
                    <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    <h1>Description: {post.text}</h1>
                    <hr />
                    </>
                )
            })}
        
        </>
     );
}
 
export default AllPosts;