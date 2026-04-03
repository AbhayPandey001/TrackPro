import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

userSchema.pre('save', async function () {
    if (!this.isModified('password'))  return  ;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function () { 
     return jwt.sign(
        {
            _id : this._id ,
            email : this.email ,
            username : this.username ,
        } ,
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model('User', userSchema)