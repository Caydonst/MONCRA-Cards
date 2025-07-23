import "./LandingPage.css"
import {Link} from "react-router-dom"
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
    return (
        <div className={"landing-page"}>
            <div className={"menu"}>
                <h1>MONCRA</h1>
                <div className={"options"}>
                    <Link to={"/join"}>
                        <div className={"button-wrapper"}>
                            <div className={"button"}>
                                <p>Join Lobby</p>
                                <div className={"button-light"}></div>
                            </div>
                        </div>
                    </Link>
                    <Link to={"/create"}>
                        <div className={"button-wrapper"}>
                            <div className={"button"}>
                                <p>Create Lobby</p>
                                <div className={"button-light"}></div>
                            </div>
                        </div>
                    </Link>
                    <div className={"button-wrapper"}>
                        <div className={"button"}>
                            <p>Cards</p>
                            <div className={"button-light"}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}