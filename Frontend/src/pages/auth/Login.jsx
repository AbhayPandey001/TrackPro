import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className='auth-container'>
            <h1 className='auth-page-heading-top'>TrackPro - Login page</h1>

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
                    type="password"
                    placeholder='Password'
                    className='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button
                    className='auth-button'
                    type="submit">
                    Login➡️
                </button>

                <p className="auth-switch-text">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    )
}
