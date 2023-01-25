import '../../styles/search.css';

import { TextField } from '@mui/material';

function Search({ value, handleChange }) {
  const handleInputChange = (e) => handleChange(e.target.value);

  // function SearchByCategory({ value, handleClick, handleChange }) {
  //   const handleInputChange = (e) => handleChange(e.target.value);
  //   const handleClick = (e) => e.target.value;

  return (
    <div className='SearchBar'>
      <div className='container'>
        <div className='field has-addons'>
          <div className='control is-expanded'>
            <TextField
              type='search'
              className='searchInput'
              placeholder='SEARCH... 🔎'
              value={value}
              onChange={handleInputChange}
              sx={{
                backgroundColor: 'white',
                border: '4px black solid',
                borderRadius: '10px',
                mt: '15px',
                maxWidth: '310px',
                maxHeight: '50px',
              }}
            />
          </div>
          <div className='control'>
            <span className='button is-info is-medium'>Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
