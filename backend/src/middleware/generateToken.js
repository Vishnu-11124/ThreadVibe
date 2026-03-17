import jwt from 'jsonwebtoken'
import User from '../users/user.model.js'
import ApiError from '../utils/ApiError.js'

const generateToken = async (user) => {
    
    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )

    return token
}

export default generateToken
