import express from 'express';
import connectDB from './db/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';

const app = express()
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use((express.urlencoded({ limit: '50mb' })))
app.use(cookieParser())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// All routes
import authRoutes from './src/users/user.route.js'

app.use('/api/auth', authRoutes)

// Connect to Database
connectDB();

app.get('/', (req, res) => {
    res.send("Welcome back")
})


app.listen(port, (req, res) =>{
    console.log(`Server is running on http://localhost:3000`);
})