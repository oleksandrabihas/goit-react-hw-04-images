import { Image, ImageItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { GalleryContext } from '../App';
import { useContext, useMemo } from 'react';

export const ImageGalleryItem = ({ onImageClick }) => {
  const gallery = useContext(GalleryContext);
  const galleryList = useMemo(() => {
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
  }, [gallery, onImageClick]);
  return galleryList;
};

ImageGalleryItem.propTypes = {
  onImageClick: PropTypes.func.isRequired,
};
