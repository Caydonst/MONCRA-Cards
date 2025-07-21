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

    const handleMouseEnter = (e, entity) => {
        dropTargetRef.current = e.currentTarget;
        setHoverEntity(e.currentTarget);
        setIsHovered(true);
    }

    const handleMouseLeave = (e, entity) => {
        setIsHovered(false);
        dropTargetRef.current = null;
    };

    useEffect(() => {
        if (hoverEntity) {
            if (isHovered && cardDragging) {
                hoverEntity.style.border = "1px solid white";
            } else {
                hoverEntity.style.border = "none";
            }
        }
    }, [isHovered, hoverEntity, cardDragging]);

    const dropCard = () => {
        const target = dropTargetRef.current;
        if (target) {
            console.log("Dropped on", target);
            // Do something with the target
        } else {
            console.log("Not dropped on a valid target");
            // Ignore the drop
        }
    };

    useEffect(() => {
        console.log(isHovered);
    }, [isHovered]);

    return (
        <div className={"game-page-container"}>
            <div className={"stage-container"}></div>
            <div className={"characters-container"}>
                {thisGameData?.playerData?.map((player, index) => (
                    <div
                        key={index}
                        className={"character-container"}
                        onMouseEnter={(e) => handleMouseEnter(e, player)}
                        onMouseLeave={(e) => handleMouseLeave(e, player)}
                    >
                        <div className={"hp-container"}>
                            <div className={"hp"}>
                                <p>{player.currentHp}/{player.maxHp}</p>
                            </div>
                        </div>
                        <div className={"character"}>
                            <img className={"character-spritesheet"} src={characterSpritesheet} />
                        </div>
                    </div>
                ))}
            </div>
            <div className={"enemies-container"}>
                {thisGameData?.enemyData?.map((enemy, index) => (
                    <div
                         key={index}
                         className={"enemy-container"}
                         onMouseEnter={(e) => handleMouseEnter(e, enemy)}
                         onMouseLeave={(e) => handleMouseLeave(e, enemy)}
                    >
                        <div className={"hp-container"}>
                            <div className={"hp"}>
                                <p>{enemy.currentHp}/{enemy.maxHp}</p>
                            </div>
                        </div>
                        <div className={"enemy"}>
                            <img className={"enemy-spritesheet"} src={enemySpritesheet} />
                        </div>
                    </div>
                ))}
            </div>
            <div className={"cards-container"}>
                <div className={"cards-container-inner"}>
                    <div className={"action-points-container"}>
                        <div className={"action-points"}>
                            <p>4/4</p>
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
                                style={{ animationDelay: `${i * 0.2}s`}}
                                setCardDragging={setCardDragging}
                                dropCard={dropCard}
                                isHovered={isHovered}
                            />
                        ))}
                    </div>
                    <div className={"end-turn-container"}>
                        <button>Inflict Damage</button>
                    </div>
                </div>
            </div>
        </div>
    );
}