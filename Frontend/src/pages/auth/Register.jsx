import React, { useState } from 'react'
import '../../styles/AuthStyles.css'
import { Link } from 'react-router-dom'

export default function Register() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className='auth-container'>
      <div className='auth-page-heading-top'>TrackPro - Register User</div>
      <form
        className='auth-form'
        onSubmit={submitHandler}
      >
        <input
          type="text"
          placeholder='Username'
          className='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />

        <input
          type="email"
          placeholder='Email'
          className='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder='Password'
          className='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <button
          className='auth-button'
          type="submit">
          Register
        </button>

        <p className="auth-switch-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  )
}
