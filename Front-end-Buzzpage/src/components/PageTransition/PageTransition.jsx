import styles from "./PageTransition.module.css"
const PageTransition = () => {
    return (
        <div className={styles.boxContainer}>
            <div className="boxes">
                <div className={styles.box1}></div>
                <div className={styles.box2}></div>
                <div className={styles.box3}></div>
            </div>
        </div>
    );
}

export default PageTransition;