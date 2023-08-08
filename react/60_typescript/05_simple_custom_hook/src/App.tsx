import React from "react";
import "./App.css";
import useCount from "./hooks/useCount";

function App() {
  const [value, add, substract] = useCount(10);

  return (
    <div className="App">
      <header className="App-header">
        <p> {value}</p>
        <button onClick={add}>+</button>
        <button onClick={substract}>-</button>
      </header>
    </div>
  );
}

export default App;
