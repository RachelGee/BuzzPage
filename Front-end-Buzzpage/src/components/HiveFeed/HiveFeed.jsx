import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './HiveFeed.module.css'
import AllPosts from '../AllPosts/AllPosts';
import PageTransition from '../PageTransition/PageTransition';
import NewsSlider from '../NewsSlider/NewsSlider'

const handleClick = (e) => {
    navigate(`/users/${user._id}/posts/new`)
}

const HiveFeed = (props) => {
    return (
        <>
            <PageTransition />
            <main className={styles.container}>
                {props.AllPosts.length > 0 ? <AllPosts AllPosts={props.AllPosts} /> : "No Post Yet!"}
            </main>
        </>

    )
}


export default HiveFeed;