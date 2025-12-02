import express from 'express'
import User from './user.model.js'
const router = express.Router()

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email, password })
        await user.save()
        res.status(201).send({message: "User created successfully!"})
        // console.log(req.body)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

export default router