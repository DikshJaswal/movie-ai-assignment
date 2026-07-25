import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <NavLink to="/" className="navbar__brand-link">
          Movie App
        </NavLink>
      </div>

      <ul className="navbar__links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
