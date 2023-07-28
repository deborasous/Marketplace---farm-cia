import { BiSearch } from 'react-icons/bi';
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Pesquisa:', searchQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const formElement = event.currentTarget.form;
      const submitEvent = new Event('submit', {
        bubbles: true,
        cancelable: true,
      });

      if (formElement) {
        formElement.dispatchEvent(submitEvent);
      }
    }
  };

  return (
    <form
      className="search-form flex items-center bg-white py-2 px-4 rounded-lg"
      onSubmit={handleSearchSubmit}
    >
      <input
        className="outline-none w-72"
        type="text"
        placeholder="Pesquisar"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <button type="submit">
        <BiSearch className="text-2xl" />
      </button>
    </form>
  );
};

export default SearchBar;
