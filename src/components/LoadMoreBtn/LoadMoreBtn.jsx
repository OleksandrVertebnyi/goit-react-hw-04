import styles from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
    return (
        <div className={styles.wrap}>
            <button className={styles.button}  onClick={onClick}>
                Load More
            </button>
        </div>
    );
}
