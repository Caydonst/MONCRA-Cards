import "./card.css";
import attackImg from "../../assets/icons/attack.png";
import armorImg from "../../assets/icons/armor.png";
import hpImg from "../../assets/icons/hp.png";
import { useState, useRef, useEffect } from "react";

export default function Card({ type, cost, name, description, card, setCardDragging, dropCard, setCurrentCard }) {
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

    useEffect(() => {
        const card = cardRef.current;
        card.style.removeProperty("animation");
    })

    const handleMouseDown = (e) => {
        e.preventDefault();
        const cardHTML = cardRef.current;
        const rect = cardHTML.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        setCurrentCard(card);

        originalPos.current = {
            left: rect.left + scrollX,
            top: rect.top + scrollY,
            width: rect.width,
            height: rect.height,
        };

        dragPos.current = {
            x: e.clientX + window.scrollX - originalPos.current.width / 2,
            y: e.clientY + window.scrollY - originalPos.current.height / 2,
        };

        setIsDragging(true);
        setCardDragging(true);
        forceRender(n => n + 1); // Trigger initial re-render

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        e.preventDefault();
        dragPos.current = {
            x: e.clientX + window.scrollX - originalPos.current.width / 2,
            y: e.clientY + window.scrollY - originalPos.current.height / 2,
        };
        forceRender(n => n + 1); // Re-render with new dragPos
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);
        setCardDragging(false);
        dropCard(card);

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    const style = isDragging
        ? {
            position: "fixed",
            left: `${dragPos.current.x}px`,
            top: `${dragPos.current.y}px`,
            width: `${originalPos.current.width}px`,
            height: `${originalPos.current.height}px`,
            zIndex: 9999,
            cursor: "grabbing",
            pointerEvents: "none",
            opacity: "0.8",
        }
        : {
            position: "relative",
            cursor: "grab",
        };

    return (
        <div
            ref={cardRef}
            className={"card"}
            style={style}
            onMouseDown={handleMouseDown}
        >
            <div className={"cost-container"}>
                <div className={"cost-container-inner"}>
                    <p>{cost}</p>
                </div>
            </div>
            <div className={"type-container"}>
                <img src={getTypeImg(type)} />
            </div>
            <div className={"card-name-container"}>
                <h1 className={"card-name"}>{name}</h1>
            </div>
            <div className={"card-description-container"}>
                <p className={"card-description"}>{description}</p>
            </div>
        </div>
    );
}
