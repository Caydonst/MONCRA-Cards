import "./JoinLobby.css"
import {useState} from "react";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {Link, useNavigate} from "react-router-dom"
import socket from "../socket.js";
import { useLobbyAccess  } from "../context/LobbyAccessContext.jsx";

export default function JoinLobby() {
    const [inputValue, setInputValue] = useState("");

    const navigate = useNavigate();
    const { setJoinedLobbyId } = useLobbyAccess();

    const handleChange = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue)
    };

    const joinLobby = (code) => {
        socket.emit("join-lobby", code, (response) => {
            if (response.success) {
                setJoinedLobbyId(response.lobbyId); // ✅ Mark as joined
                navigate(`/lobby/${response.lobbyId}`);
            } else {
                alert(response.error);
            }
        });
    }

    return (
        <div className={"join-lobby"}>
            <h1>Enter Lobby Code:</h1>
            <input type={"text"} placeholder={"J4NH2K"} value={inputValue} onChange={handleChange} />
            <button className={"join-btn"} disabled={inputValue.length !== 6} onClick={() => joinLobby(inputValue)}>Join</button>
            <Link to={"/"}><button className={"back-btn"}><ArrowLeftIcon className={"arrow-left"}/></button></Link>
        </div>
    )
}