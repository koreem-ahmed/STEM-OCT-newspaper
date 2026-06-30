import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import './HomePage.scss'

const HomePage = () => {
  const { user } = useAuthContext()

  return (
    <div className="home">
      <div className="home__bg">
        <div className="home__orb home__orb--1" />
        <div className="home__orb home__orb--2" />
        <div className="home__orb home__orb--3" />
        <div className="home__grid" />
      </div>

      <div className="home__particles">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`home__particle home__particle--${i + 1}`} />
        ))}
      </div>

      <header className="home__header">
        <div className="home__badge">NewsPress</div>
        <h1 className="home__title">
          <span className="home__title-word">Discover.</span>
          <span className="home__title-word">Create.</span>
          <span className="home__title-word">Publish.</span>
        </h1>
        <p className="home__subtitle">
          {user
            ? `Welcome back, ${user.email}`
            : 'Discover, create, and manage newspaper listings with a modern edge.'}
        </p>
      </header>

      <div className="home__buttons">
        <Link to="/publish" className="home__btn-wrapper">
          <button className="home__btn home__btn--primary">
            <span className="home__btn-text">Browse Newspapers</span>
            <span className="home__btn-shine" />
          </button>
        </Link>

        {user ? (
          <Link to="/create" className="home__btn-wrapper">
            <button className="home__btn home__btn--secondary">
              <span className="home__btn-icon">+</span>
              <span className="home__btn-text">Add New</span>
            </button>
          </Link>
        ) : (
          <Link to="/login" className="home__btn-wrapper">
            <button className="home__btn home__btn--secondary">
              <span className="home__btn-text">Get Started</span>
              <span className="home__btn-arrow">→</span>
            </button>
          </Link>
        )}
      </div>

      <div className="home__scroll">
        <div className="home__scroll-line" />
      </div>
    </div>
  )
}

export default HomePage