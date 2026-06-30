import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { Link, useNavigate } from 'react-router-dom'
import './LoginSignup.scss'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await signup(email, password)
    if (success) navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg">
        <div className="auth-page__orb auth-page__orb--1" />
        <div className="auth-page__orb auth-page__orb--2" />
      </div>

      <form className="signup" onSubmit={handleSubmit}>
        <h3>Create Account</h3>

        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>{isLoading ? 'Creating account...' : 'Sign Up'}</button>
        {error && <div className="error">{error}</div>}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
