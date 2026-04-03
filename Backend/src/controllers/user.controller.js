import { asyncHandler } from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new ApiError(400, 'All fields are required to register')
    }

    if ([username, email, password].some(x => x.trim() === '')) {
        throw new ApiError(400, 'Fields cannot be empty')
    }

    // checking if the user already exists
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(400, 'User with this email or password already exists')
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select('-password')
    if (!createdUser) {
        throw new ApiError(500, 'User not created ')
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, 'user created successfully'))
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password || username.trim() === '' || password.trim() === '') {
        throw new ApiError(400, 'Username or password can not be empty')
    }

    // matching username in database
    const user = await User.findOne({ username })

    if (!user) {
        throw new ApiError(404, 'Invalid user credentials')
    }


    const isCorrectPassword = await user.isPasswordCorrect(password)

    if (!isCorrectPassword) {
        throw new ApiError(401, 'Invalid Credentials')
    }

    const accessToken = await user.generateAccessToken()

    const loggedInUser = await User.findById(user._id).select('-password')


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .json(new ApiResponse(200, { loggedInUser, accessToken }, 'user logged in successfully'))
})

const logoutUser = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .json(new ApiResponse(200, {}, 'Logged out successfully'))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user

    return res
        .status(200)
        .json(new ApiResponse(200, user, 'User details fetched successfully'))
})

export { registerUser, loginUser, logoutUser, getCurrentUser }