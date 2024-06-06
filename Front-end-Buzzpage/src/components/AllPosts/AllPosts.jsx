import { Link } from "react-router-dom";
import styles from './AllPosts.module.css'


// all user posts HiveFeed
const AllPosts = (props) => {
    return (
        <div className={styles.container}>
            <h1>Welcome to the HIVE! Here's the latest BUZZ:</h1>

            {props.AllPosts.map((post, index) => {
                return (
                    <div key={index}>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                        <h2>{post.author.username} says: {post.text}</h2>
                        {post.photo !== "" ? <img src={post.photo} /> : ""}
                        <hr />
                    </div>
                )
            })}

        </div>
    );
}

export default AllPosts;