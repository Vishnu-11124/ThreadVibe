import express from 'express';
import connectDB from './db/db.js'

const app = express()
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

app.get('/', (req, res) => {
    res.send("Welcome back")
})


app.listen(port, (req, res) =>{
    console.log(`Server is running on http://localhost:3000`);
})