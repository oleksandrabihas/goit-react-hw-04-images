import { Component } from 'react';
import { fetchImages } from 'api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';
import { Wrapper } from './App.styled';

export class App extends Component {
  state = {
    list: [],
    page: 1,
    query: '',
    isLoading: false,
    loadMore: false,
    modalData: null,
    isModalVisible: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ isLoading: true });
      try {
        const { hits, totalHits } = await fetchImages(query, page);
        if (hits.length === 0) {
          toast.error(
            'Oops... there are no images matching your search... Try again'
          );
        }
        this.setState(prevState => ({
          list: [...prevState.list, ...hits],
          loadMore: this.state.page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmitSearchImages = query => {
    this.setState(prevState => {
      if (prevState.query === query) {
        return null
      } else {
        return { query, list: [], page: 1 };
      }
    });
  };

  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    scroll.scrollMore(500, {
      duration: 500,
      smooth: 'easeInOutQuart',
    });
  };

  onModalOpen = (largeImage, tags) => {
    this.setState({ modalData: { largeImage, tags }, isModalVisible: true });
    document.body.classList.add('no-scroll');
  };

  onModalClose = () => {
    this.setState({ isModalVisible: false, modalData: null });
    document.body.classList.remove('no-scroll');
  };

  render() {
    const { list, isLoading, loadMore, modalData, isModalVisible } = this.state;
    return (
      <Wrapper>
        <Searchbar onSubmitSearchImages={this.onSubmitSearchImages} />
        <Toaster />
        {list && (
          <ImageGallery gallery={list} onImageClick={this.onModalOpen} />
        )}
        {isLoading && <Loader />}
        {loadMore && <Button onClick={this.handleClickLoadMore} />}
        {isModalVisible && (
          <Modal modalData={modalData} onModalClose={this.onModalClose} />
        )}
      </Wrapper>
    );
  }
}
