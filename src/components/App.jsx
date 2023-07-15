import { useState, useEffect, createContext } from 'react';
import { fetchImages } from 'api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';
import { Wrapper } from './App.styled';
import { ErrorMessage } from './Error/Error';

export const GalleryContext = createContext();

export const App = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;

    (async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(query, page);
        if (hits.length === 0) {
          toast.error(
            'Oops... there are no images matching your search... Try again'
          );
        }
        setList(prev => [...prev, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, page]);

  const onSubmitSearchImages = query1 => {
    if (query !== query1) {
      setQuery(query1);
      setList([]);
      setPage(1);
    } else {
      setQuery(null);
    }
  };

  const handleClickLoadMore = () => {
    setPage(prev => prev + 1);
    scroll.scrollMore(500, {
      duration: 500,
      smooth: 'easeInOutQuart',
    });
  };

  const onModalOpen = (largeImage, tags) => {
    setModalData({ largeImage, tags });
    setIsModalVisible(true);
    document.body.classList.add('no-scroll');
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    setModalData(null);
    document.body.classList.remove('no-scroll');
  };

  return (
    <Wrapper>
      <Searchbar onSubmitSearchImages={onSubmitSearchImages} />
      <Toaster />
      <GalleryContext.Provider value={list}>
        {list && <ImageGallery onImageClick={onModalOpen} />}
        {isModalVisible && (
          <Modal modalData={modalData} onModalClose={onModalClose} />
        )}
      </GalleryContext.Provider>
      {isLoading && <Loader />}
      {loadMore && <Button onClick={handleClickLoadMore} />}
      {error && <ErrorMessage />}
    </Wrapper>
  );
};
