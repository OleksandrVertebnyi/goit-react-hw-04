import styles from './ImageCard.module.css';

export default function ImageCard({ image, onClick }) {
    return (
        <div className={styles.card}  >
            <img
                src={image.urls.small}
                alt={image.alt_description || 'Unknown image'}
                className={styles.img}
                loading="lazy"
                onClick={() => onClick(image)}
                role="button"
                tabIndex={0}
            />
        </div>
    );
}