import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery, onImageClick }) => {
  return (
    <ImageGalleryList>
      <ImageGalleryItem gallery={gallery} onImageClick={onImageClick} />
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
