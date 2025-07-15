import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LobbyAccessProvider } from "./context/LobbyAccessContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <LobbyAccessProvider>
          <App />
      </LobbyAccessProvider>
  </StrictMode>
)
