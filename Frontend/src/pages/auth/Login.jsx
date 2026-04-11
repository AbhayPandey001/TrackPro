import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/api/v1/user/login',
                { username, password },
                { withCredentials: true }
            )

            alert('Logged in Succesfully')
            navigate('/dashboard')
        } catch (error) {

            alert(error.response?.data?.message || "Login failed");
        }
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
