import dotenv  from 'dotenv';
dotenv.config();
import cors from 'cors';


import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/api/authRoutes.js';
import passport from 'passport';
import './config/passport.js';  // Passport configuration

import projectRoutes from './routes/api/projectRoutes.js'; 



const app= express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({
    origin:'http://localhost:5173'

}))
app.use(passport.initialize());


// Init Middleware to parse JSON requests
app.use(express.json());

app.use('/api/auth', authRoutes); // Use auth routes
// Import routes


app.use('/api/projects', projectRoutes); 

app.get('/', (req, res) => {
    res.send('DevCollab API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Some env variables are yet to be updates..