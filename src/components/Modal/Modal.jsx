import { Component } from 'react';
import { ModalOverLay } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
    
  }

  closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  render() {
    const {
      modalData: { largeImage, tags },
    } = this.props;
    return (
      <ModalOverLay onClick={this.closeModal}>
        <div>
          <img src={largeImage} alt={tags} />
        </div>
      </ModalOverLay>
    );
  }
}

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
};
