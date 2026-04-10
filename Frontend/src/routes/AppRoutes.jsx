import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom'
import Register from '../pages/auth/Register.jsx';
import Login from '../pages/auth/Login.jsx';
import Dashboard from '../pages/features/Dashboard.jsx';


export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                {/* protected route */}
                <Route path='/dashboard' element={<Dashboard />} />

            </Routes>
        </Router>
    );
}