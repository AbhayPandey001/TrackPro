import axios from 'axios'

const base = 'http://localhost:3000/api/v1/todo/'

// create todo

const createTodo = async (content) => {
    const res = await axios.post(base,
        { content },
        { withCredentials: true })
    return res.data
}

// get todo

const getTodos = async () => {
    const res = await axios.get(base,
        { withCredentials: true }
    )
    return res.data
}


export {
    createTodo,
    getTodos
}