import '../styles/MovieCard.css'

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  return (
    <article className="movie-card">
      <img className="movie-card__poster" src={posterUrl} alt={movie.title} />

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__rating">⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'}</p>
        <p className="movie-card__release-date">
          {movie.release_date ? movie.release_date : 'Release date unavailable'}
        </p>

        <button type="button" className="movie-card__favorite-button" onClick={() => onToggleFavorite(movie)}>
          {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
        </button>
      </div>
    </article>
  )
}

export default MovieCard
