import "./JoinLobby.css"
import {useState} from "react";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {Link} from "react-router-dom"

export default function JoinLobby() {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue)
    };

    return (
        <div className={"join-lobby"}>
            <h1>Enter Lobby Code:</h1>
            <input type={"text"} placeholder={"J4NH2K"} value={inputValue} onChange={handleChange} />
            <button className={"join-btn"} disabled={inputValue.length !== 6}>Join</button>
            <Link to={"/"}><button className={"back-btn"}><ArrowLeftIcon className={"arrow-left"}/></button></Link>
        </div>
    )
}