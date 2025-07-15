// components/ProtectedLobbyRoute.jsx
import { useLobbyAccess } from "../context/LobbyAccessContext";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedLobbyRoute({ children }) {
    const { lobbyId } = useParams();
    const { joinedLobbyId } = useLobbyAccess();

    // ✅ Only render if the lobbyId matches the one we joined
    if (lobbyId === joinedLobbyId) {
        return children;
    }

    // ❌ Otherwise redirect to /join
    return <Navigate to="/join" replace />;
}
