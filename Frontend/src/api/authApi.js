import axios from 'axios'

const base = 'http://localhost:3000/api/v1/user'

const logoutUser = async () => {
    const res = await axios.post(`${base}/logout`,
        {},
        { withCredentials: true })

    return res.data
}

// get user
const getCurrentUser = async () => {
    const res = await axios.get(`${base}/getUser`,
        { withCredentials: true }
    )
    return res.data
}

export {
    logoutUser,
    getCurrentUser
}