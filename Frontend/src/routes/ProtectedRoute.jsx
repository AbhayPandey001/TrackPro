import { useEffect, useState } from "react"
import axios from "axios";
import { Navigate } from "react-router-dom";
import '../styles/Loading.css'

export default function ProtectedRoute({ children }) {

    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/v1/user/getUser', { withCredentials: true })
                setUserLoggedIn(true)
            }
            catch (error) {
                setUserLoggedIn(false)
            }
            finally {
                setLoading(false)
            }
        }

        checkUserLoggedIn()
    }, [])

    if (loading) return <div className="loader-container"><div className="spin">⌛</div></div>;
    return userLoggedIn ? children : <Navigate to='/login' />

}