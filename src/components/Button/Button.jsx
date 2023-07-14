import { BtnLoadMore } from "./Button.styled";
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <BtnLoadMore className="smooth-scroll-button" type="button" onClick={onClick}>
      Load more
    </BtnLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};