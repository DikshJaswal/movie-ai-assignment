const STORAGE_KEY = 'movie-app-favorites'

function getStoredFavorites() {
  const storedValue = localStorage.getItem(STORAGE_KEY)
  return storedValue ? JSON.parse(storedValue) : []
}

function saveStoredFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export async function saveFavoriteMovie(userId, movie) {
  const favorites = getStoredFavorites()
  const existingFavorite = favorites.find((item) => item.userId === userId && item.movieId === movie.id)

  if (!existingFavorite) {
    favorites.push({
      userId,
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path || '',
      voteAverage: movie.vote_average || 0,
      releaseDate: movie.release_date || '',
      createdAt: new Date().toISOString(),
    })

    saveStoredFavorites(favorites)
  }
}

export async function removeFavoriteMovie(movieId, userId) {
  const favorites = getStoredFavorites()
  const updatedFavorites = favorites.filter((item) => !(item.userId === userId && item.movieId === movieId))
  saveStoredFavorites(updatedFavorites)
}

export async function getFavoriteMovies(userId) {
  const favorites = getStoredFavorites()
  return favorites.filter((item) => item.userId === userId)
}
