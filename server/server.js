// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

let players = {};
const lobbies = {};

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-lobby", (roomId) => {
        socket.join(roomId);
        if (!lobbies[roomId]) lobbies[roomId] = [];
        if (!lobbies[roomId].includes(socket.id)) {
            lobbies[roomId].push(socket.id);
        }
        io.to(roomId).emit("lobby-update", lobbies[roomId]);
        console.log(lobbies);
    });

    socket.on("disconnect", () => {
        for (const roomId in lobbies) {
            const index = lobbies[roomId].indexOf(socket.id);
            if (index !== -1) {
                lobbies[roomId].splice(index, 1);
                io.to(roomId).emit("lobby-update", lobbies[roomId]);
            }
        }
    });
});

server.listen(3001, () => console.log("Server running on port 3001"));
