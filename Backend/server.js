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
import {handleGroupMessage, handleDirectMessage} from "./controllers/chatController.js";
import chatRoutes from "./routes/api/chatRoutes.js";
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


app.use(passport.initialize());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/conversation", chatRoutes);
app.get("/", (req, res) => {
  res.send("DevCollab API is running...");
});

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

  socket.on("workspace:join", ({workspaceId}) => {
    socket.join(`workspace:${workspaceId}`);
    console.log(`User ${userId} joined workspace ${workspaceId}`);
  });

  socket.on("workspace:leave", ({workspaceId}) =>{
    socket.leave(`workspace:${workspaceId}`);
    console.log(`User ${userId} left workspace ${workspaceId}`);
  });

  socket.on("workspace:message", async (payload) =>{

    try {
   
       const groupMessage = await handleGroupMessage(payload);

      io.to(`workspace:${payload.workspaceId}`).emit("workspace:message", groupMessage);

    } catch (error) {
      socket.emit("workspace:error", { message: error.message });
    }
   
  });

  socket.on("workspace:dm:message", async (payload) =>{
    try {
      const directMessage = await handleDirectMessage(payload);
      io.to(`user:${payload.recipientId}`).emit("workspace:dm:message", directMessage);

      // to also send to other open tabs of the sender so that everywhere it gets updated and stays consistent as a socket layer functionality:
      io.to(`user:${payload.senderId}`).emit("workspace:dm:message", directMessage);
      
    } catch (error) {
    socket.emit("workspace:error", { message: error.message });
    }
  });

  socket.on("disconnect", () => {});
});

app.set("io", io);

server.listen(PORT, () => {
  console.log(`Socket Server is running on port ${PORT}`);
});
