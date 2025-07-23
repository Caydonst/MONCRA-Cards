import "./game.css";
import { useEffect, useState, useRef } from "react";
import socket from "../socket.js";
import { useParams } from "react-router-dom";
import Card from "./card/card.jsx";
import enemySpritesheet from "../assets/enemies/slime_spritesheet.png";
import characterSpritesheet from "../assets/characters/character1_spritesheet.png";
import StartCardScreen from "./startCardScreen/StartCardScreen.jsx";

export default function Game() {
    const { lobbyId } = useParams();
    const [thisGameData, setThisGameData] = useState();
    const playerRef = useRef(null);
    const enemyRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [cardDragging, setCardDragging] = useState(false);
    const [hoverEntity, setHoverEntity] = useState(false);
    const dropTargetRef = useRef(null);
    const [currentHp, setCurrentHp] = useState();
    const [currentCard, setCurrentCard] = useState(null);
    const sphereRef = useRef(null);
    const shadowRef = useRef(null);
    const hpBarRef = useRef(null);

    const cards = [
        {
            type: "attack",
            name: "Stab",
            damage: 6,
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

    useEffect(() => {
        socket.emit("get-game-data", lobbyId, (response) => {
            if (response.success) {
                setThisGameData(response.gameData);
                console.log(response.gameData);
            } else if (response.error) {
                console.log(response.error);
            }
        })
    }, [])

    useEffect(() => {
        const handleUpdatedGameData = (lobby, gameData) => {
            if (lobby === lobbyId) {
                setThisGameData(gameData);
            }
        };

        socket.on("updated-game-data", handleUpdatedGameData);

        return () => {
            socket.off("updated-game-data", handleUpdatedGameData);
        };
    }, []);

    const updateActionPoints = (card) => {
        console.log(card);
        console.log(thisGameData?.enemyData[0]);

        // Add shake class to sphere
        const sphere = sphereRef.current;
        const shadow = shadowRef.current
        if (sphere) {
            sphere.classList.add("shake");
            shadow.classList.add("shadowShake");

            // Remove it after animation ends so it can be reused
            const handleAnimationEnd = () => {
                sphere.classList.remove("shake");
                sphere.removeEventListener("animationend", handleAnimationEnd);
                shadow.classList.remove("shadowShake");
                shadow.removeEventListener("animationend", handleAnimationEnd);
            };

            sphere.addEventListener("animationend", handleAnimationEnd);
            shadow.addEventListener("animationend", handleAnimationEnd);
        }

        socket.emit("update-action-points", lobbyId, card, 0, (response) => {
            if (response.success) {
                setThisGameData(response.gameData);
            } else {
                console.log(response.error);
            }
        });
    };

    useEffect(() => {
        if (hpBarRef.current && thisGameData?.enemyData) {
            const hp = (thisGameData.enemyData[0].currentHp / thisGameData.enemyData[0].maxHp) * 100;
            if (thisGameData.enemyData[0].currentHp <= 0) {
                hpBarRef.current.style.width = `${0}%`;
            }
            hpBarRef.current.style.width = `${hp}%`;
        }
    }, [thisGameData]);

    return (
        <div className={"game-page-container"}>
            <div className={"players-container"}>
                {thisGameData?.playerData?.map((player, index) => (
                    <div className={"player-hp-container"}>
                        <div className={"player-hp"}>
                            <p>{player.currentHp}/{player.maxHp}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"enemies-container"}>
                {thisGameData?.enemyData?.map((enemy, index) => (
                    <div
                        key={index}
                        className={"enemy-container"}
                    >
                        <div className={"enemy-hp-container"}>
                            <div ref={hpBarRef} id={"enemy-hp"} className={"enemy-hp"}>
                                <p>{enemy.currentHp}/{enemy.maxHp}</p>
                            </div>
                        </div>
                        <div ref={sphereRef} className={"enemy"}></div>
                        <div ref={shadowRef} className={"shadow"}></div>
                    </div>
                ))}
            </div>
            <div className={"cards-container"}>
                <div className={"cards-container-inner"}>
                    <div className={"action-points-container"}>
                        <div className={"action-points"}>
                            <p>{thisGameData?.turnData?.currentActionPoints}/{thisGameData?.turnData?.totalActionPoints}</p>
                        </div>
                    </div>
                    <div className={"cards-container-inner-inner"}>
                        {cards.map((card, i) => (
                            <Card
                                key={i}
                                type={card.type}
                                cost={card.cost}
                                name={card.name}
                                description={card.description}
                                card={card}
                                style={{ animationDelay: `${i * 0.2}s`}}
                                setCardDragging={setCardDragging}
                                setCurrentCard={setCurrentCard}
                                updateActionPoints={updateActionPoints}
                            />
                        ))}
                    </div>
                    <div className={"end-turn-container"}>
                        <button>End Turn</button>
                    </div>
                </div>
            </div>
        </div>
    );
}