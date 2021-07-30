import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const Searchbar =({onSubmit})=>{
  const [value,setValue] = useState('')

  const handleChange = e => {
    const { value } = e.target;
    setValue(value)
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return toast.error('not correct input')
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
              value={value} //тут потрібно value щоб очищати state через setValue('')
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
