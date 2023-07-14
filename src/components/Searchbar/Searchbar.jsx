import toast from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';

export const Searchbar = ({ onSubmitSearchImages }) => {
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return toast.error('Please enter key words for search');
    } else {
      onSubmitSearchImages(inputValue);
      setInputValue('');
    }
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>
            <CiSearch size="28" />
          </SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={onChangeInput}
          id="searchInput"
          value={inputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmitSearchImages: PropTypes.func.isRequired,
};
