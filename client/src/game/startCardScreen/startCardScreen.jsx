import "./startCardScreen.css";
import Card from "../card/card.jsx";
import {useState} from "react";

export default function StartCardScreen() {
    const [closeStartWindow, setCloseStartWindow] = useState(false);

    const closeWindow = () => {
        setCloseStartWindow(true);
    }

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

    return (
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
    )
}