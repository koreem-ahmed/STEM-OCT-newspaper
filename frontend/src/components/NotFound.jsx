import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '80px 20px',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '5rem', fontWeight: 800, color: '#4c6ef5', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '1.4rem', color: '#333', marginTop: '10px' }}>Page Not Found</h2>
      <p style={{ color: '#666', marginTop: '8px' }}>The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        style={{
          marginTop: '24px',
          padding: '10px 24px',
          background: '#4c6ef5',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600
        }}
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
