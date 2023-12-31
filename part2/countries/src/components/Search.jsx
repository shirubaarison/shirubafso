const Search = ({ searchValue, handleSearch }) => {
    return (
      <div>
        find countries <input value={searchValue} onChange={handleSearch}></input>
      </div>
    )
  }

export default Search