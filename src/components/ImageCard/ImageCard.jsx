import styles from './ImageCard.module.css';

export default function ImageCard({ image, onClick }) {
    return (
        <div className={styles.card} onClick={onClick} role="button" tabIndex={0} >
            <img
                src={image.urls.small}
                alt={image.alt_description || 'Unknown image'}
                className={styles.img}
                loading="lazy"
                onClick={() => onClick(image)}
            />
        </div>
    );
}