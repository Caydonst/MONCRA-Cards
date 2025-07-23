import "./card.css";
import attackImg from "../../assets/icons/attack.png";
import armorImg from "../../assets/icons/armor.png";
import hpImg from "../../assets/icons/hp.png";
import { useState, useRef, useEffect } from "react";

export default function Card({ type, cost, name, description, card, setCardDragging, setCurrentCard, updateActionPoints }) {
    const [isDragging, setIsDragging] = useState(false);
    const [, forceRender] = useState(0); // Used to force re-renders
    const dragPos = useRef({ x: 0, y: 0 });
    const cardRef = useRef(null);
    const originalPos = useRef({ left: 0, top: 0, width: 0, height: 0 });

    const getTypeImg = (type) => {
        if (type === "armor") return armorImg;
        if (type === "hp") return hpImg;
        if (type === "attack") return attackImg;
        return null;
    };

    return (
        <div ref={cardRef}
             className="card"
             onClick={() => updateActionPoints(card)}
        >
            <div className="card-light"></div>
            <div className="cost-container">
                <div className="cost-inner">
                    <p>{cost}</p>
                </div>
            </div>
            <div className="card-inner">
                <div className="title-container">
                    <p>{name}</p>
                </div>
                <div className="img-container">
                    <div className={"img-container-light"}></div>
                    <img src={getTypeImg(type)}/>
                </div>
                <div className="card-inner-light"></div>
                <div className={"card-description-container"}>
                    <p className={"card-description"}>{description}</p>
                </div>
            </div>
        </div>
    );
}
