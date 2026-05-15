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

import {createServer} from 'http';
import {Server} from 'socket.io';


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

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const server = createServer(app);
const io = new Server(server, {
  cors : {
    origin: allowedOrigins,
    credentials: true
  }
})

// TO Add JWT authentication middelewaere for the Socket.io connection.

io.on('connection', (socket) =>{
  const userId = socket.handshake.auth.userId;
  socket.join(`user:${userId}`);
});

server.listen(PORT, () => {
  console.log(`Socket Server is running on port ${PORT}`);
})



