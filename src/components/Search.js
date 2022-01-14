const Search = ({ onChange }) => {
  return (
    <div className='search-title'>
        <h3>Search by Username : </h3>
        <input
        type="text"
        autoFocus={true}
        placeholder="search users"
        onKeyPress={onChange}
        onKeyUp={onChange}
      />
    </div>
  );
};

export default Search;
