import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MovieDetailsPage from '../pages/MovieDetailsPage'
import FavoritesPage from '../pages/FavoritesPage'
import NotFoundPage from '../pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
