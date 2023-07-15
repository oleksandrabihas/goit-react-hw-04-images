import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ onImageClick }) => {
  return (
    <ImageGalleryList>
      <ImageGalleryItem onImageClick={onImageClick} />
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  onImageClick: PropTypes.func.isRequired,
};
