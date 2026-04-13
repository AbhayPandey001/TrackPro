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

// toggle Completed
const toggleComplete = async (id) => {
    const res = await axios.patch(`${base}${id}/toggle`,
        {},
        { withCredentials: true }
    )
    return res.data
}

//deletet todo
const deleteTodo = async (id) => {
    const res = await axios.delete(`${base}${id}`,
        { withCredentials: true }
    )
    return res.data
}

// update todo
const updateTodo = async (id, content) => {
    const res = await axios.patch(`${base}${id}`,
        { updatedContent: content },
        { withCredentials: true }
    )
    return res.data
}

export {
    createTodo,
    getTodos,
    toggleComplete,
    deleteTodo,
    updateTodo
}