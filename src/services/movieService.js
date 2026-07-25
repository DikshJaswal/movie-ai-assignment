import axios from 'axios'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export async function searchMovies(query) {
  const response = await tmdbApi.get('/search/movie', {
    params: {
      query,
      include_adult: false,
    },
  })

  return response.data.results
}

export async function getMovieDetails(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}`)

  return response.data
}

export async function getPopularMovies() {
  const response = await tmdbApi.get('/movie/popular')

  return response.data.results
}
