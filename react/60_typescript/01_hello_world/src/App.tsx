import React from "react";
import "./App.css";
import HelloWorld from "./HelloWorld";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelloWorld name="Jenna" />
        <HelloWorld />
      </header>
    </div>
  );
}

export default App;
