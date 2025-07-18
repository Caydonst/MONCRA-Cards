import "./card.css";
import attackImg from "../../assets/icons/attack.png";
import armorImg from "../../assets/icons/armor.png";
import hpImg from "../../assets/icons/hp.png";

export default function Card({ type, cost, name, description, style }) {

    const getTypeImg = (type) => {
        if (type === "armor") return armorImg;
        if (type === "hp") return hpImg;
        if (type === "attack") return attackImg;
        return null;
    };

    return (
        <div className={"card"} style={style}>
            <div className={"cost-container"}><p>{cost}</p></div>
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
    )
}