import React from "react";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Real-Time Conversational App</h1>
        <p className="developer-info">Developed by: Team Driller</p>
      </header>
      <main className="app-main">
        <Chat />
      </main>
    </div>
  );
}

export default App;
