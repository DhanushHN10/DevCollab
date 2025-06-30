import express from 'express';
import dotenv  from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/api/authRoutes.js';


dotenv.config();

const app= express();
const PORT = process.env.PORT || 5000;
connectDB();

// Init Middleware to parse JSON requests
app.use(express.json());

app.use('/api/auth', authRoutes); // Use auth routes
// Import routes

app.get('/', (req, res) => {
    res.send('DevCollab API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});