import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NexusOpsDashboard from "./NexusOpsDashboard";
function App() {
  return (
    <div className="app-container">
      {/* Otras partes de tu app como un Navbar o Sidebar */}

      {/* 2. Llamas al componente aquí para que se muestre */}
      <NexusOpsDashboard />

    </div>
  );
}
export default App
