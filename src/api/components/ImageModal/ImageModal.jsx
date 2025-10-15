

import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { useEffect } from 'react';

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onRequestClose, largeImage }) {
  useEffect(() => {
    
  }, [isOpen]);

  if (!largeImage) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image modal"
      overlayClassName={styles.overlay}
      className={styles.content}
    >
      <div className={styles.container}>
        <img src={largeImage.urls.regular} alt={largeImage.alt_description} />
        <div className={styles.info}>
        </div>
          
      </div>
    </Modal>
  );
}

