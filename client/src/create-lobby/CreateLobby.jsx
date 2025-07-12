import "./CreateLobby.css";
import {Link} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {ArrowLeftIcon} from "@heroicons/react/24/outline/index.js";

export default function CreateLobby() {
    const [numPlayers, setNumPlayers] = useState(2);
    const [publicity, setPublicity] = useState("Public");
    const [playerOpen, setPlayerOpen] = useState(false);
    const [publicityOpen, setPublicityOpen] = useState(false);

    const publicityRef = useRef(null);
    const playerRef = useRef(null);
    console.log(publicityOpen)

    const togglePlayerDropdown = () => {
        setPlayerOpen((prev) => !prev);
    };

    const togglePublicityDropdown = () => {
        setPublicityOpen((prev) => !prev);
    };

    const setPlayers = (num) => {
        //setNumPlayers(num);
        togglePlayerDropdown();
    }

    const setPublicityFunc = (choice) => {
        setPublicity(choice);
        togglePublicityDropdown();
    }

    /*useEffect(() => {
        const handleMouseUp = (event) => {
            if (
                publicityOpen &&
                publicityRef.current &&
                !publicityRef.current.contains(event.target) &&
                !event.target.closest(".publicity-select")
            ) {
                setPublicityOpen(false);
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [publicityOpen]);

    useEffect(() => {
        const handleMouseUp = (event) => {
            if (
                playerOpen &&
                playerRef.current &&
                !playerRef.current.contains(event.target) &&
                !event.target.closest(".player-select")
            ) {
                setPlayerOpen(false);
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [playerOpen]);*/


    return (
        <div className={"create-lobby"}>
            <h1>Create Lobby</h1>
            <div className={"lobby-info"}>
                <div className={"player-select"}>
                    <div className={"player-select-header"} onClick={togglePlayerDropdown}>{numPlayers} Players <ChevronDownIcon className={"down-arrow"}/></div>
                    <div ref={playerRef} className={`player-selector-dropdown ${playerOpen ? "open" : ""}`}>
                        <button onClick={() => setPlayers(2)}>2 Players</button>
                        <button onClick={() => setPlayers(3)}>3 Players</button>
                        <button onClick={() => setPlayers(4)}>4 Players</button>
                    </div>
                </div>
                <div className={"publicity-select"}>
                    <div className={"publicity-select-header"}  onClick={togglePublicityDropdown}>{publicity} <ChevronDownIcon className={"down-arrow"}/></div>
                    <div ref={publicityRef} className={`publicity-selector-dropdown ${publicityOpen ? "open" : ""}`}>
                        <button onClick={() => setPublicityFunc("Public")}>Public</button>
                        <button onClick={() => setPublicityFunc("Private")}>Private</button>
                    </div>
                </div>
                <button className={"create-lobby-btn"}>Create Lobby</button>
            </div>
            <Link to={"/"}><button className={"back-btn"}><ArrowLeftIcon className={"arrow-left"}/></button></Link>
        </div>
    )
}