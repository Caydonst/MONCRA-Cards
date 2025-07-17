import { useEffect, useState } from "react";
import socket from "../socket.js";
import "./Lobby.css"; // For circle styling
import { useParams, useNavigate } from "react-router-dom";

export default function Lobby() {
    const { lobbyId } = useParams();
    const [players, setPlayers] = useState([]);
    const [lobbyCode, setLobbyCode] = useState(null);
    const [lobbyOwner, setLobbyOwner] = useState(null);
    const [socketId, setSocketId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setSocketId(socket.id);
    }, []);

    useEffect(() => {
        // Request initial lobby state
        socket.emit("get-lobby", lobbyId, (response) => {
            if (response.success && response.lobby?.players) {
                setLobbyCode(response.lobby.lobbyCode);
                setPlayers(response.lobby.players);
                setLobbyOwner(response.lobby.lobbyOwner);
            } else {
                console.error("Error fetching lobby:", response.error);
            }
        });

        // Live updates
        const handleLobbyUpdate = (lobby) => {
            if (lobby && Array.isArray(lobby.players)) {
                setLobbyCode(lobby.lobbyCode);
                setPlayers(lobby.players);
                setLobbyOwner(lobby.lobbyOwner);
            } else {
                console.warn("Received invalid lobby update:", lobby);
            }
        };

        socket.on("lobby-update", handleLobbyUpdate);

        return () => {
            socket.off("lobby-update", handleLobbyUpdate);
        };
    }, [lobbyId]);

    const startGame = () => {
        socket.emit("start-game", lobbyId, (response) => {
            if (response.success) {
                navigate(`/lobby/${lobbyId}/game`);
            } else {
                alert(response.error);
            }
        });
    }

    useEffect(() => {
        const handleGameStarted = (startedLobbyId) => {
            if (startedLobbyId === lobbyId) {
                navigate(`/lobby/${lobbyId}/game`);
            }
        };

        socket.on("game-started", handleGameStarted);

        return () => {
            socket.off("game-started", handleGameStarted);
        };
    }, []);

    return (
        <div className="lobby-container">
            <div className="lobby-header">
                <h1>{lobbyId}</h1>
                <h2>Code: {lobbyCode}</h2>
            </div>
            <div className="players">
                {Array.isArray(players) && players.length > 0 ? (
                    players.map((id) => (
                        <div className="player" key={id}>
                            <div className={"player-profile-pic"}></div>
                            <h1 className={"player-username"}>{id}</h1>
                        </div>
                    ))
                ) : (
                    <p>No players yet.</p>
                )}
            </div>
            {socketId === lobbyOwner && (
                <button className={"start-game-btn"} onClick={startGame}>Start Game</button>
            )}
        </div>
    );
}
