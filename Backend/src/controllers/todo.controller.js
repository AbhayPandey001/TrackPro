import { asyncHandler } from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Todo } from '../models/todo.model.js'
import { isValidObjectId } from 'mongoose'

const createTodo = asyncHandler(async (req, res) => {
    const { content } = req.body

    if (!content || content.trim() === '') {
        throw new ApiError(400, 'Content cannot be empty ')
    }

    const trimmedContent = content.trim()

    const createdTodo = await Todo.create({
        content: trimmedContent,
        owner: req.user._id
    })

    return res
        .status(201)
        .json(new ApiResponse(201, createdTodo, 'Todo added successfully'))
})

const getTodos = asyncHandler(async (req, res) => {
    const fetchedTodos = await Todo.find({ owner: req.user._id }).sort({ createdAt: -1 })

    return res
        .status(200)
        .json(new ApiResponse(200, fetchedTodos, 'Fetched user todos'))
})

const updateTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params

    if (!todoId || !isValidObjectId(todoId)) {
        throw new ApiError(400, 'Invalid todoId')
    }

    const { updatedContent } = req.body

    if (!updatedContent || updatedContent.trim() === '') {
        throw new ApiError(400, 'content can not be empty')
    }

    const trimmedUpdatedContent = updatedContent.trim()

    const newContent = await Todo.findOneAndUpdate(
        {
            _id: todoId,
            owner: req.user._id
        },
        {
            $set: {
                content: trimmedUpdatedContent
            }
        },
        {
            new: true
        }
    )

    if (!newContent) {
        throw new ApiError(404, 'Todo not found or unauthorized')
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newContent, 'Todo content modified succesfully'))
})

const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params

    if (!todoId || !isValidObjectId(todoId)) {
        throw new ApiError(400, 'Invalid todoId')
    }

    const deletedTodo = await Todo.findOneAndDelete({
        _id: todoId,
        owner: req.user._id
    })

    if (!deletedTodo) {
        throw new ApiError(404, 'Todo not found or unauthorized')
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedTodo, 'Todo removed successfully'))
})

const toggleTodoCompleted = asyncHandler(async (req, res) => {
    const { todoId } = req.params

    if (!todoId || !isValidObjectId(todoId)) {
        throw new ApiError(400, 'Invalid todoId')
    }

    const todo = await Todo.findOne({
        _id: todoId,
        owner: req.user._id
    });

    if (!todo) {
        throw new ApiError(404, 'Todo not found or unauthorized');
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    return res
        .status(200)
        .json(new ApiResponse(200, todo, 'Todo toggled successfully'))
})

export { createTodo, getTodos, updateTodo, deleteTodo, toggleTodoCompleted }