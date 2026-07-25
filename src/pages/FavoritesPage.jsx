import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getFavoriteMovies, removeFavoriteMovie } from '../services/favoritesService'
import '../styles/FavoritesPage.css'

function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function loadFavorites() {
    setIsLoading(true)
    const userId = 'demo-user'
    const data = await getFavoriteMovies(userId)
    setFavorites(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  async function handleRemoveFavorite(movie) {
    const userId = 'demo-user'
    await removeFavoriteMovie(movie.movieId, userId)
    await loadFavorites()
  }

  if (isLoading) {
    return <main className="favorites-page">Loading favorites...</main>
  }

  return (
    <main className="favorites-page">
      <h1>Your Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <section className="favorites-page__grid">
          {favorites.map((favorite) => (
            <MovieCard
              key={favorite.id}
              movie={{
                id: favorite.movieId,
                title: favorite.title,
                poster_path: favorite.posterPath,
                vote_average: favorite.voteAverage,
                release_date: favorite.releaseDate,
              }}
              isFavorite={true}
              onToggleFavorite={handleRemoveFavorite}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default FavoritesPage
