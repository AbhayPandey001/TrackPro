import React from 'react'
import '../../styles/DashboardStyles.css'
import { logoutUser } from '../../api/authApi.js'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

    const navigate = useNavigate()
    // logout functionality 
    const logoutHandler = async () => {
        try {
            await logoutUser()
            navigate('/login')
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }

    return (
        <div className='dashboard-container'>
            <div className="navbar">
                <div className="nav-left">
                    <h2
                        className='nav-to-left'>
                        TrackPro
                    </h2>
                </div>
                <div className="nav-right">
                    <button
                        type="button"
                        className='nav-to-right'
                        onClick={logoutHandler}
                        >
                        Logout
                    </button>
                </div>
            </div>

            <div className="hero-section">
                <h2 className="welcome-message">
                    Welcome  ( sample username )
                </h2>
                <div className="todo-input-section">
                    <input type="text" placeholder="Enter a task..." />
                    <button>Add</button>
                </div>
                <h3>My todos</h3>

                <div
                    className="user-todo-container">
                    <input type="checkbox" />
                    <span
                        className='user-todo'
                    >
                        sample todo message
                    </span>
                    <button>
                        Edit
                    </button>
                    <button>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
