const fs = require("fs");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const User = require("./models/user");
const mongoDB =
  "mongodb+srv://Shadowharm:CTADsZxzha5JV77@cluster0.25eda.mongodb.net/message-database?retryWrites=true&w=majority";

// CTADsZxzha5JV77 password
const app = express();
app.use(cors());
app.use(express.json());

const server = require("http").createServer(app);

const io = socketIo(server, {
  cors: "*",
});
const PORT = 3001;
// server.listen(PORT, async () => {
//   try {
//     await mongoose.connect(mongoDB, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });
//     console.log(`server started at port ${PORT}`);
//   } catch (e) {
//     console.log(`Error: ${e}`);
//   }
// });
server.listen(PORT, ()=>console.log(`server started at port ${PORT}`))
let connections = [];

io.sockets.on("connection", (socket) => {
  connections.push(socket);
  if (connections.length > 2) {
    socket.disconnect();
    connections.splice(connections.indexOf(socket), 1);
  }
  
  socket.on("disconnect", (data) => {
    connections.splice(connections.indexOf(socket), 1);
  });

  socket.on("send", (data) => {
    data.sender = socket.id;
    io.sockets.emit("add", data);
  });

  socket.on("typing", () => {
    socket.broadcast.emit("a");
  });
  socket.on("noTyping", () => {
    socket.broadcast.emit("b");
  });
});
