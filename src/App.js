import React from "react";
import './App.css';
import Index from "./components/index"; // Import the Index component from the components folder

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Index /> {/* Render the Index component here */}
      </header>
    </div>
  );
}

export default App;
