import '../../styles/images.scss';

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
            <input
              type='search'
              className='searchInput'
              placeholder='SEARCH FOR YOUR WORKOUT🔎'
              value={value}
              onChange={handleInputChange}
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
