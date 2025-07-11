import "./landingPage.css"

export default function LandingPage() {
    return (
        <div className={"landing-page"}>
            <div className={"menu"}>
                <h1>MONCRA</h1>
                <div className={"options"}>
                    <button className={"join-btn"}>JOIN LOBBY</button>
                    <button className={"create-btn"}>CREATE LOBBY</button>
                    <button className={"cards-btn"}>INVENTORY</button>
                </div>
            </div>
        </div>
    )
}