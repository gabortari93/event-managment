const { initDb } = require("./src/app/utils/db");
const express = require("express");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = require("http").createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("createEvent", (data) => {
      io.emit("newEvent", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("error", (error) => {
      console.log("Socket Error:", error);
    });
  });

  server.all("*", (req, res) => handle(req, res));

  initDb();

  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server running on http://localhost:3000");
  });
});
