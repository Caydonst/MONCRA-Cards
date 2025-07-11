import './App.css';
import LandingPage from './landing-page/LandingPage.jsx';
import Lobby from './lobby/lobby.jsx';
import JoinLobby from "./join-lobby/JoinLobby.jsx";
import CreateLobby from "./create-lobby/CreateLobby.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/join" element={<JoinLobby />} />
                <Route path="/create" element={<CreateLobby />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
