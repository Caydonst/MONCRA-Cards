import "./LandingPage.css"
import {Link} from "react-router-dom"

export default function LandingPage() {
    return (
        <div className={"landing-page"}>
            <div className={"menu"}>
                <h1>MONCRA</h1>
                <div className={"options"}>
                    <Link to={"/join"}><button className={"join-btn"}>Join Lobby</button></Link>
                    <button className={"create-btn"}>Create Lobby</button>
                    <button className={"cards-btn"}>Cards</button>
                </div>
            </div>
        </div>
    )
}