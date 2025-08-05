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

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URI
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// app.use(cors({
//     origin: process.env.FRONTEND_URI

// }))
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


