import { useState } from 'react';

export const Searchbar =({onSubmit})=>{
  const [value,setValue] = useState('')

  const handleChange = e => {
    const { value } = e.target;
    setValue(value)
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value)
    setValue('')
  };

    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={handleSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={handleChange}
            />
          </form>
        </header>
      </>
    );
}
