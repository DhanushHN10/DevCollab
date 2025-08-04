import dotenv  from 'dotenv';
dotenv.config();
import cors from 'cors';


import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/api/authRoutes.js';
import passport from 'passport';
import './config/passport.js'; 

import projectRoutes from './routes/api/projectRoutes.js'; 
import recommendationRoutes from './routes/api/recommendationRoutes.js';


const app= express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({
    origin:'http://localhost:5173'

}))
app.use(passport.initialize());


app.use(express.json());

app.use('/api/auth', authRoutes); 



app.use('/api/projects', projectRoutes); 
app.use('/api/recommendations',recommendationRoutes);

app.get('/', (req, res) => {
    res.send('DevCollab API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


