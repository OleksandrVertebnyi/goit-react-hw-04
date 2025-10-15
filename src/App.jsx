
import { useState, useEffect } from 'react';
import { fetchImages } from './api/unsplash';
import SearchBar from './api/components/SearchBar/SearchBar';
import ImageGallery from './api/components/ImageGallery/ImageGallery';
import ImageModal from './api/components/ImageModal/ImageModal';
import Loader from './api/components/Loader/Loader';
import LoadMoreBtn from './api/components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './api/components/ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results, total_pages } = await fetchImages({ query, page, perPage: 12 });
        setImages(prev => (page === 1 ? results : [...prev, ...results]));
        setTotalPages(total_pages);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [query, page]);

  const handleSearch = q => {
    if (q === query) return; 
    setQuery(q);
    setPage(1);
    setImages([]);
    setTotalPages(null);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {loading && <Loader />}
        </>
      )}
      {!error && images.length > 0 && page < (totalPages || Infinity) && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} largeImage={selectedImage} />
    </div>
  );
}





