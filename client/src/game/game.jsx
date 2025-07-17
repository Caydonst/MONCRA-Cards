import "./game.css";
import { useEffect, useState } from "react";
import socket from "../socket.js";
import { useParams } from "react-router-dom";

export default function Game() {
    return (
        <div className={"game-page-container"}>
            <h1>Lobby1 Game</h1>
        </div>
    )
}