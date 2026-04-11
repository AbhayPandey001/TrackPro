import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

// importing of routes 
import userRoutes from './routes/user.routes.js'
import todoRoutes from './routes/todo.routes.js'

// declaration of routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/todo', todoRoutes)

//error handler {must be at last}
import errorHandler from './middlewares/error.middleware.js'
app.use(errorHandler)

export default app 