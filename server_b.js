const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ioClient = require("socket.io-client");

// Configura Express y Socket.io Server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Ruta básica
app.get("/", (req, res) => {
  res.send("Servidor B (Puerto 3001)");
});

// Socket.io Server (Escucha conexiones)
io.on("connection", (socket) => {
  console.log("Cliente conectado al Servidor B:", socket.id);

  // Escucha mensajes
  socket.on("mensaje", (data) => {
    console.log("Servidor B recibió:", data);
    socket.emit("respuesta", "Hola desde el Servidor B");
  });
});

// Conéctate al Servidor A como cliente
const socketA = ioClient("http://localhost:3000");

socketA.on("connect", () => {
  console.log("Servidor B conectado al Servidor A");
  socketA.emit("mensaje", "Saludos desde el Servidor B");
});

socketA.on("respuesta", (data) => {
  console.log("Respuesta del Servidor A:", data);
});

// Inicia el servidor
server.listen(3001, () => {
  console.log("Servidor B en http://localhost:3001");
});
