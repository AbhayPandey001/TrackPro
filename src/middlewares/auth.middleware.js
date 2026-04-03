import { ApiError } from "../utils/ApiError"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asynchandler"
import { User } from "../models/user.model"

export const verifyJWT = asyncHandler( async (req , _ , next) => {
    try {
        const token = req.cookies?.accessToken
    
        if(!token){
            throw new ApiError(401 , 'Unauthorized request')
        }
    
        // extracting out the user details
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id).select("-password")
    
        if(!user){
            throw new ApiError(401 , 'Invalid Access token')
        }
    
        req.user = user 
        next()
    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid access token")
    }
})
