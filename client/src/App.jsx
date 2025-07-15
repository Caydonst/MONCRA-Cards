import './App.css';
import LandingPage from './landing-page/LandingPage.jsx';
import Lobby from './lobby/lobby.jsx';
import JoinLobby from "./join-lobby/JoinLobby.jsx";
import CreateLobby from "./create-lobby/CreateLobby.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import ProtectedLobbyRoute from "./components/ProtectedLobbyRoute";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/join" element={<JoinLobby />} />
                <Route path="/create" element={<CreateLobby />} />
                <Route
                    path="/lobby/:lobbyId"
                    element={
                        <ProtectedLobbyRoute>
                            <Lobby />
                        </ProtectedLobbyRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
