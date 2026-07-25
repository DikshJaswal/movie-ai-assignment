import '../styles/SearchBar.css'

function SearchBar({ searchTerm, setSearchTerm, onSearch, isLoading = false }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button type="submit" className="search-bar__button" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
