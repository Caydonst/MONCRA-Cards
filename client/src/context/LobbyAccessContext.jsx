// context/LobbyAccessContext.jsx
import { createContext, useContext, useState } from "react";

const LobbyAccessContext = createContext();

export function useLobbyAccess() {
    return useContext(LobbyAccessContext);
}

export function LobbyAccessProvider({ children }) {
    const [joinedLobbyId, setJoinedLobbyId] = useState(null);

    return (
        <LobbyAccessContext.Provider value={{ joinedLobbyId, setJoinedLobbyId }}>
            {children}
        </LobbyAccessContext.Provider>
    );
}
