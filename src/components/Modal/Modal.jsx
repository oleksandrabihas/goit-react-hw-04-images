import { useCallback, useEffect } from 'react';
import { ModalOverLay } from './Modal.styled';
import PropTypes from 'prop-types';


export const Modal = ({ modalData, onModalClose }) => {
  const closeModal = useCallback(
    e => {
      if (e.target === e.currentTarget || e.code === 'Escape') {
        onModalClose();
      }
    },
    [onModalClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  const { largeImage, tags } = modalData;

  return (
    <ModalOverLay onClick={closeModal}>
      <div>
        <img src={largeImage} alt={tags} />
      </div>
    </ModalOverLay>
  );
};

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
};
