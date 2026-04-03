import { asyncHandler } from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new ApiError(400, 'All fields are required to register')
    }

    if ([username, email, password].some(x => x.trim === '')) {
        throw new ApiError(400, 'Fields cannot be empty')
    }

    // checking if the user already exists
    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existingUser){
        throw new ApiError(400 , 'User with this email or password already exists')
    }

    const user = User.create({
        username ,
        email , 
        password
    })
})

export { registerUser }