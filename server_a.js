const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ioClient = require("socket.io-client");
const bodyParser = require("body-parser");

// Configura Express y Socket.io Server
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server);

// Ruta básica
app.get("/", (req, res) => {
  res.send("Servidor A (Puerto 3000)");
});

// Socket.io Server (Escucha conexiones)
io.on("connection", (socket) => {
  console.log("Cliente conectado al Servidor A:", socket.id);

  // Escucha mensajes
  socket.on("mensaje", (data) => {
    console.log("Servidor A recibió:", data);
    socket.emit("respuesta", "Hola desde el Servidor A");
  });
});

// Conéctate al Servidor B como cliente
const socketB = ioClient("http://localhost:3001");

socketB.on("connect", () => {
  console.log("Servidor A conectado al Servidor B");
  socketB.emit("mensaje", "Saludos desde el Servidor A");
});

socketB.on("respuesta", (data) => {
  console.log("Respuesta del Servidor B:", data);
});

app.post("/mensaje", (req, res) => {
  const { message } = req.body;

  socketB.emit("mensaje", `SERVIDOR A: ${message}`);
  res.send("Mensaje enviado al Servidor B");
});

// Inicia el servidor
server.listen(3000, () => {
  console.log("Servidor A en http://localhost:3000");
});
