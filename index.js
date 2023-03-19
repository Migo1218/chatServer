const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
const socket = require("socket.io");

// app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.get("/test", (req, res) => {
  return res.json({ msg: "Server is working" });
});
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
