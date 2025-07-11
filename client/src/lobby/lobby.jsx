import { useEffect, useState } from "react";
import socket from "../socket.js";
import "./Lobby.css"; // For circle styling

export default function Lobby() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // Join lobby "lobby1" on load
        socket.emit("join-lobby", "lobby1");

        // Listen for updates
        socket.on("lobby-update", (playerIds) => {
            setPlayers(playerIds);
        });

        return () => {
            socket.off("lobby-update");
        };
    }, []);

    return (
        <div className="lobby-container">
            <h1>Lobby</h1>
            <div className="players">
                {players.map((id) => (
                    <div className="player-circle" key={id} title={id}></div>
                ))}
            </div>
        </div>
    );
}
