import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import { searchMovies } from '../services/movieService'
import { getFavoriteMovies, removeFavoriteMovie, saveFavoriteMovie } from '../services/favoritesService'
import '../styles/HomePage.css'

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadFavorites() {
    const userId = 'demo-user'
    const favorites = await getFavoriteMovies(userId)
    setFavoriteMovieIds(favorites.map((favorite) => favorite.movieId))
  }

  async function handleSearch() {
    if (!searchTerm.trim()) {
      setMovies([])
      setError('Please enter a movie name to search.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const results = await searchMovies(searchTerm)
      setMovies(results)

      if (results.length === 0) {
        setError('No movies found for your search.')
      }
    } catch {
      setError('Something went wrong while searching for movies.')
      setMovies([])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggleFavorite(movie) {
    const userId = 'demo-user'
    const isFavorite = favoriteMovieIds.includes(movie.id)

    if (isFavorite) {
      await removeFavoriteMovie(movie.id, userId)
    } else {
      await saveFavoriteMovie(userId, movie)
    }

    await loadFavorites()
  }

  return (
    <main className="home-page">
      <section className="home-page__hero">
        <h1>Search for your next favorite movie</h1>
        <p>Find movies by title and explore their details.</p>
      </section>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {isLoading && <p className="home-page__status">Loading movies...</p>}

      {error && !isLoading && <p className="home-page__status home-page__status--error">{error}</p>}

      {!isLoading && !error && movies.length > 0 && (
        <section className="home-page__results">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favoriteMovieIds.includes(movie.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      )}

      {!isLoading && !error && movies.length === 0 && searchTerm.trim() && (
        <p className="home-page__status">No results yet.</p>
      )}
    </main>
  )
}

export default HomePage
