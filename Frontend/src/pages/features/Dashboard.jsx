import { useEffect, useState } from 'react'
import '../../styles/DashboardStyles.css'
import { logoutUser } from '../../api/authApi.js'
import { useNavigate } from 'react-router-dom'
import { createTodo, getTodos, toggleComplete, deleteTodo, updateTodo } from '../../api/todoApi.js'
import { getCurrentUser } from '../../api/authApi.js'


export default function Dashboard() {

    const [todos, setTodos] = useState([]);
    const [content, setContent] = useState("");
    const navigate = useNavigate()
    const [editId, setEditId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [username, setUsername] = useState('')

    const handleEdit = (todo) => {
        setEditId(todo._id);
        setEditContent(todo.content);
    };

    // logout functionality 
    const logoutHandler = async () => {
        try {
            await logoutUser()
            navigate('/login')
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }

    // fetching of all the todos on page reload
    useEffect(() => {
        async function fetchTodos() {
            try {
                const res = await getTodos()
                setTodos(res.data)

                //setting up the username
                const user = await getCurrentUser()
                setUsername(user.data.username)
            } catch (error) {
                alert(error.response?.data?.message)
            }
        }
        fetchTodos()
    }, [])

    // crud functionality on todo
    const handleCreate = async () => {
        try {
            const newTodo = await createTodo(content)
            // newTodo object has { data, message, statusCode, success }
            // The actual todo is in newTodo.data
            setTodos((prev) => [newTodo.data, ...prev]);
            setContent("");
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id)
            const response = await getTodos()
            setTodos(response.data)
        }
        catch (error) {
            alert(error.response?.data?.message)
        }
    }

    const handleToggle = async (id) => {
        try {
            await toggleComplete(id)
            const response = await getTodos()
            setTodos(response.data)
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }

    const handleUpdate = async (id) => {
        if (!editContent.trim()) {
            alert("content cannot be empty");
            return;
        }

        try {
            await updateTodo(id, editContent);

            const response = await getTodos(); // simple approach
            setTodos(response.data);

            setEditId(null);
            setEditContent("");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        }
    };

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
                    Welcome {username}
                </h2>
                <div className="todo-input-section">
                    <input
                        type="text"
                        placeholder="Enter a task..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        onClick={handleCreate}
                    >
                        Add
                    </button>
                </div>
                <h3>My todos</h3>

                {/* rendering of the todo list here */}
                <div className="todo-list">
                    {
                        todos.map((todo) => (
                            <div key={todo._id} className='user-todo-container'>
                                <input
                                    type='checkbox'
                                    checked={todo.isCompleted}
                                    onChange={() => handleToggle(todo._id)}
                                />
                                {editId === todo._id ? (
                                    <input
                                        type="text"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />
                                ) : (
                                    <span
                                        className="user-todo"
                                        style={{
                                            textDecoration: todo.isCompleted ? "line-through" : "none"
                                        }}
                                    >
                                        {todo.content}
                                    </span>
                                )}

                                {editId === todo._id ? (
                                    <button onClick={() => handleUpdate(todo._id)}>
                                        Save
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(todo)}>
                                        Edit
                                    </button>
                                )}


                                <button onClick={() => handleDelete(todo._id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
