import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createTodo , getTodos , updateTodo , deleteTodo , toggleTodoCompleted} from '../controllers/todo.controller.js'

const router = Router()
router.use(verifyJWT)

router.route('/')
    .post(createTodo)
    .get(getTodos)

router.route('/:todoId')
    .patch(updateTodo)
    .delete(deleteTodo)

router.route('/:todoId/toggle').patch(toggleTodoCompleted)


export default router