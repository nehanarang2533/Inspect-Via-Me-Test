import { useState } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Please enter you email.')
      return
    }
    if (email.indexOf('@') === -1) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }
    if (password.length <= 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    // TODO: connect to auth API
    console.log('Login attempt:', { email, password })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
          </div>
          <h1>Food Delivery Admin</h1>
          <p>Signnnn innnn to manage orders and restaurants</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="login-error" role="alert">{error}</p>}
          <label className="login-label">
            Email
            <input
              type="email"
              className="login-input"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </label>
          <label className="login-label">
            Password
            <input
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <button type="button" className="login-submit">
            Sign in
          </button>
        </form>

        <p className="login-footer">
          Admin access only. Contact support if you need credentials.
        </p>
      </div>
    </div>
  )
}

export default Login
