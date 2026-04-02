import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: [true, 'email is a required field'],
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, 'Password is a required field']
    }
},
    { timestamps: true }
)

export const User = mongoose.model('User', userSchema)