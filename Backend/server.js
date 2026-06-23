import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import connectDB from "./config/db.js";
import "./config/passport.js";
import authRoutes from "./routes/api/authRoutes.js";

import notificationRoutes from "./routes/api/notificationRoutes.js";
import projectRoutes from "./routes/api/projectRoutes.js";
import recommendationRoutes from "./routes/api/recommendationRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

import { createServer } from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URI];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

// app.use(cors({
//     origin: process.env.FRONTEND_URI

// }))
app.use(passport.initialize());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("DevCollab API is running...");
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Authentication token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.data.userId = decoded.id;
    socket.data.username = decoded.username;
    console.log("Socket connected for user:", decoded.username);
    return next();
  } catch (error) {
    return next(new Error("Authentication failed"));
  }
});

io.on("connection", (socket) => {
  const userId = socket.data.userId;
  socket.join(`user:${userId}`);

  socket.on("disconnect", () => {});
});

app.set("io", io);

server.listen(PORT, () => {
  console.log(`Socket Server is running on port ${PORT}`);
});
