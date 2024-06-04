import { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import styles from './HiveFeed.module.css'

const dummyData = [
    {
        "title": "Scraping dog poop in the garage",
        "text": "with my bare hand and putty knife and no gloves",
        "image": "poop image",
        "category": "News"
    },
    {
        "title": "Feeding two puppies",
        "text": "always fighting for foods",
        "image": "food image",
        "category": "News"
    },
    {
        "title": "Going out for walk late at night",
        "text": "picking up poop on the street",
        "image": "poop image",
        "category": "News"
    },
    {
        "title": "Getting the puppies to sit",
        "text": "getting closer to the goal using treats",
        "image": "puppy image",
        "category": "News"
    }

];

const HiveFeed = () => {
    // dummy post data
    const [dummyPost, setDummyPost] = useState(dummyData);

    return (
        <>
            <main className={styles.container}>
                <div className={styles.sidebar}>
                    <SideBar dummyPost={dummyPost} />
                </div>
                <h1>Your Hive Feed</h1>
            </main>
        </>
    );
}

export default HiveFeed;