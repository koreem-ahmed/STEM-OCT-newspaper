import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useLogout } from '../../hooks/useLogout'
import { useCartStore } from '../../store/Cart'
import './Navbar.scss'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const cartCount = useCartStore((state) => state.getTotalCount())

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <h2>📰 Newspaper Store</h2>
      </Link>

      <div className="navbar__links">
        {user ? (
          <>
            <span className="navbar__email">{user.email}</span>
            <button className="navbar__logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/signup" className="navbar__link">Signup</Link>
          </>
        )}

        <Link to="/cart" className="navbar__cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="navbar__cart-icon"
          >
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5z" />
          </svg>
          {cartCount > 0 && (
            <span className="navbar__cart-count">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
