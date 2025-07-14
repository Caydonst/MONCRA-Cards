import { useEffect, useState } from "react";
import socket from "../socket.js";
import "./Lobby.css"; // For circle styling
import { useParams } from "react-router-dom";

export default function Lobby() {
    const { lobbyId } = useParams();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.emit("lobby-update", (lobbyId));

        socket.on("update", (lobby) => {
            setPlayers(lobby.players);
            console.log(lobby.players)
        });

        return () => {
            socket.off("lobby-update");
        };
    }, []);

    return (
        <div className="lobby-container">
            <h1>Lobby ID: {lobbyId}</h1>
            <div className="players">
                {players.map((id) => (
                    <div className="player-circle" key={id} title={id}></div>
                ))}
            </div>
        </div>
    );
}
