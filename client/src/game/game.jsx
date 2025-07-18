import "./game.css";
import { useEffect, useState } from "react";
import socket from "../socket.js";
import { useParams } from "react-router-dom";
import Card from "./card/card.jsx";
import enemySpritesheet from "../assets/enemies/slime_spritesheet.png";

export default function Game() {
    const numberOfCards = 6;
    const [closeStartWindow, setCloseStartWindow] = useState(false);

    const cards = [
        {
            type: "attack",
            name: "Stab",
            cost: 1,
            description: "Deal 6 damage"
        },
        {
            type: "attack",
            name: "Whirlwind",
            cost: 2,
            description: "Deal 10 damage and apply Weakness to all enemies"
        },
        {
            type: "armor",
            name: "Absorb",
            cost: 1,
            description: "Gain 6 block"
        },
        {
            type: "attack",
            name: "Whirlwind",
            cost: 2,
            description: "Deal 10 damage and apply Weakness to all enemies"
        },
        {
            type: "attack",
            name: "Stab",
            cost: 1,
            description: "Deal 6 damage"
        },
        {
            type: "hp",
            name: "Revitalize",
            cost: 2,
            description: "Gain 10 HP"
        }
    ]

    const closeWindow = () => {
        setCloseStartWindow(true);
    }

    return (
        <div className={"game-page-container"}>
            <div className={"enemy"}>
                <img className={"enemy_spritesheet"} src={enemySpritesheet} />
            </div>
            <div className={`start-page-container ${closeStartWindow ? "close" : ""}`}>
                <h1 className={"game-container-title"}>Your starting cards...</h1>
                <div className="cards-container">
                    {cards.map((card, i) => (
                        <Card
                            key={i}
                            type={card.type}
                            cost={card.cost}
                            name={card.name}
                            description={card.description}
                            style={{ animationDelay: `${i * 0.5}s` }}
                        />
                    ))}
                </div>
                <button className={"enter-btn"} onClick={closeWindow}>Enter</button>
            </div>
        </div>
    );
}