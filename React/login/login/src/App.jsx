import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function LoginPage() {
  return (
    <div className="glass-card">
      <form className="login-form">
        <h1>Welcome Back</h1>
        <p className="subtitle">Please enter your details to sign in</p>
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="name@company.com" required />
        </div>
        <div className="input-group">
          <div className="label-row">
            <label>Password</label>
            <Link to="/forgot" className="forgot-password">Forgot password?</Link>
          </div>
          <input type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" className="login-button">Sign In</button>
        <p className="footer-text">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  )
}

function RegisterPage() {
  return (
    <div className="glass-card">
      <form className="login-form">
        <h1>Create Account</h1>
        <p className="subtitle">Join us today!</p>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" required />
        </div>
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="name@company.com" required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" className="login-button">Register</button>
        <p className="footer-text">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <div className="liquid-bg"></div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App