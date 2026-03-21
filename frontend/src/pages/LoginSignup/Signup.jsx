import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { Link, useNavigate } from 'react-router-dom'
import '../../pages/LoginSignup/LoginSignup.scss'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
    if (!error) navigate('/')
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}

      <p className="auth-switch">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  )
}

export default Signup
