import { Link } from 'react-router-dom'
import './NotFound.scss'

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound__bg">
        <div className="notfound__orb notfound__orb--1" />
        <div className="notfound__orb notfound__orb--2" />
      </div>

      <div className="notfound__card">
        <div className="notfound__code">404</div>
        <h2 className="notfound__title">Page Not Found</h2>
        <p className="notfound__text">The page you're looking for doesn't exist.</p>
        <Link to="/" className="notfound__btn">
          <span className="notfound__btn-arrow">←</span> Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
