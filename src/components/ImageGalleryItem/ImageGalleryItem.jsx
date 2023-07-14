import { Image, ImageItem } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ gallery, onImageClick }) => {
  return gallery.map(({ id, largeImageURL, tags, webformatURL }) => (
    <ImageItem
      key={id}
      onClick={() => {
        onImageClick(largeImageURL, tags);
      }}
    >
      <Image src={webformatURL} alt={tags} />
    </ImageItem>
  ));
};

ImageGalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
