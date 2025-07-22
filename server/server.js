// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const {generateGame} = require("./createGame");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

let players = {};
const lobbies = {};
const randomString = "ZAQWSXCDERFVBGTYHNMJUIKLOP0192837465";

const createCode = () => {
    let code = "";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.random() * randomString.length;
        code += randomString[parseInt(randomIndex)];
    }
    return code;
}

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-lobby", (code, callback) => {
        let found = false;

        for (const lobbyId in lobbies) {
            const lobby = lobbies[lobbyId];
            if (lobby.lobbyCode === code) {
                socket.join(lobby.lobbyId);
                if (!lobby.players.includes(socket.id)) {
                    lobby.players.push(socket.id);
                }
                callback({ success: true, lobbyId: lobby.lobbyId });
                io.to(lobbyId).emit("lobby-update", lobby);
                console.log(`${socket.id} joined the lobby`);
                found = true;
                break;
            }
        }

        if (!found) {
            callback({ success: false, error: "Incorrect code" });
        }

        console.log(lobbies);
    });


    socket.on("create-lobby", (numPlayers, publicity, callback) => {
        const code = createCode();
        const id = `Lobby${Object.keys(lobbies).length + 1}`;

        if (!lobbies[id]) {
            socket.join(id);

            lobbies[id] = {
                lobbyId: id,
                lobbyOwner: socket.id,
                lobbyCode: code,
                numPlayers: parseInt(numPlayers),
                publicity: publicity,
                open: true,
                players: [socket.id]
            };

            const lobby = lobbies[id];

            console.log(lobbies);
            console.log(`Lobby created: ${lobby.lobbyId} code: ${lobby.lobbyCode}`);
            io.to(id).emit("lobby-update", lobby);
            callback({ success: true, lobbyId: lobby.lobbyId });
        } else {
            console.log(`Lobby already exists: ${id}`);
            callback({ success: false, error: "Lobby already exists" });
        }
    });

    socket.on("get-lobby", (lobbyId, callback) => {
        const lobby = lobbies[lobbyId];
        if (lobby) {
            callback({ success: true, lobby });
        } else {
            callback({ success: false, error: "Lobby not found" });
        }
    });

    socket.on("start-game", (lobbyId, callback) => {
        const lobby = lobbies[lobbyId];

        if (lobby && lobby.players.length >= 1) {
            lobby.players.forEach((playerSocketId) => {
                io.to(playerSocketId).emit("game-started", lobbyId);
            });

            const game = generateGame(lobby.players);
            lobbies[lobbyId].gameData = game;
            callback({ success: true, gameData: game });
        } else {
            callback({ success: false, error: "Lobby must have 1 or more players" });
        }
    });

    socket.on("get-game-data", (lobbyId, callback) => {
        let gameData;
        console.log(lobbies[lobbyId]);
        if (lobbies[lobbyId].gameData) {
            gameData = lobbies[lobbyId].gameData;
            console.log(gameData);
        }
        if (gameData) {
            callback({ success: true, gameData: gameData });
        } else {
            callback({ success: false, error: "No game data found." });
        }
    });

    socket.on("update-action-points", (lobbyId, currentCard, target, callback) => {
        try {
            let gameData;
            const lobby = lobbies[lobbyId];
            console.log(lobby);
            if (lobby.gameData) {
                gameData = lobby.gameData;
                console.log(gameData);
            }
            if (gameData) {
                gameData.enemyData[target].currentHp -= currentCard.damage;
                gameData.turnData.currentActionPoints -= currentCard.cost;
                lobby.gameData = gameData;
                callback({ success: true, gameData: gameData });
                io.to(lobbyId).emit("updated-game-data", lobbyId, lobby.gameData)
            } else {
                callback({ success: false, error: "No game data found." });
            }
        } catch (err) {
            console.error("update-action-points error:", err);
            callback({ success: false, error: "Server error occurred." });
        }
    });

    socket.on("play-card", (lobbyId, card, target, callback) => {

    })


    socket.on("disconnect", () => {
        for (const lobbyId in lobbies) {
            const lobby = lobbies[lobbyId];

            // Check if the lobby has a 'players' array and the player is in it
            const index = lobby.players.indexOf(socket.id);
            if (index !== -1) {
                lobby.players.splice(index, 1);
                io.to(lobbyId).emit("lobby-update", lobby);
                console.log(`${socket.id} disconnected from lobby ${lobbyId}`);

                // Optional: delete empty lobbies
                if (lobby.players.length === 0) {
                    delete lobbies[lobbyId];
                    console.log(`Lobby ${lobbyId} deleted (empty)`);
                }

                break; // if each socket is only in one lobby, stop the loop early
            }
        }
    });
});

server.listen(3001, '0.0.0.0', () => console.log("Server running on port 3001"));
