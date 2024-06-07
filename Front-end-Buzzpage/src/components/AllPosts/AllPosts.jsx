import { Link } from "react-router-dom";
import styles from './AllPosts.module.css'


// all user posts HiveFeed
const AllPosts = (props) => {
    return (
        <main className={styles.container}>
            <h1>Welcome to the HIVE! Here's the latest BUZZ:</h1>

            {props.AllPosts.map((post, index) => (
                <div className="card" style={{ width: "40rem" }} key={index}>
                    <h2 className="card-title">
                    <Link className={styles.link} to={`/posts/${post._id}`}>{post.title}</Link>
                    </h2>
                    
                    <h2>{post.author.username} says: {post.text}</h2>
                    {post.photo !== "" ? <img src={post.photo} alt="post" /> : ""}
                    <hr />
                </div>
            ))}
        </main>
    );
}

export default AllPosts;