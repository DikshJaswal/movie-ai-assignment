import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../services/movieService'
import '../styles/MovieDetailsPage.css'

function MovieDetailsPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setIsLoading(true)
        setError('')
        const data = await getMovieDetails(id)
        setMovie(data)
      } catch {
        setError('Failed to load movie details.')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovieDetails()
  }, [id])

  if (isLoading) {
    return <main className="movie-details-page">Loading movie details...</main>
  }

  if (error) {
    return <main className="movie-details-page">{error}</main>
  }

  if (!movie) {
    return <main className="movie-details-page">No movie found.</main>
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  return (
    <main className="movie-details-page">
      <section className="movie-details-card">
        <img className="movie-details-card__poster" src={posterUrl} alt={movie.title} />

        <div className="movie-details-card__content">
          <h1 className="movie-details-card__title">{movie.title}</h1>
          <p className="movie-details-card__overview">{movie.overview || 'No overview available.'}</p>

          <div className="movie-details-card__meta">
            <p>
              <strong>Rating:</strong> {movie.vote_average?.toFixed(1) ?? 'N/A'}
            </p>
            <p>
              <strong>Genres:</strong>{' '}
              {movie.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
            </p>
            <p>
              <strong>Release Date:</strong>{' '}
              {movie.release_date || 'N/A'}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MovieDetailsPage
