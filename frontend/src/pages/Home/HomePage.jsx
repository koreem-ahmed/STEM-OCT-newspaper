import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import './HomePage.scss'

const HomePage = () => {
  const { user } = useAuthContext()

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">📰 Newspaper Store</h1>
        <p className="home__subtitle">
          {user ? `Welcome back, ${user.email}` : 'Browse, create and manage newspaper listings.'}
        </p>
      </header>

      <div className="home__buttons">
        <Link to="/publish">
          <button className="home__btn home__btn--primary">Browse Newspapers</button>
        </Link>

        {user && (
          <Link to="/create">
            <button className="home__btn home__btn--secondary">+ Add New Newspaper</button>
          </Link>
        )}

        {!user && (
          <Link to="/login">
            <button className="home__btn home__btn--secondary">Login to Add</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default HomePage
