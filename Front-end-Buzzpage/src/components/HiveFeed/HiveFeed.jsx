import { useState } from 'react';
import { Link } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import styles from './HiveFeed.module.css'
import AllPosts from '../AllPosts/AllPosts';
import PageTransition from '../PageTransition/PageTransition';


const HiveFeed = (props) => {
    return (
        <>
            <PageTransition />
            <main className={styles.container}>
                {props.AllPosts.length > 0 ? <AllPosts AllPosts={props.AllPosts} /> : "No Post"}
            </main>
        </>
    )
}


export default HiveFeed;