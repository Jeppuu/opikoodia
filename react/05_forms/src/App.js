import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import NameForm from './NameForm';

function App() {

  const [state, setState] = useState({
    greeting: "No greeting yet."
  })

  const setGreeting = (name) => {
    setState({
      greeting: "Hello " + name + "!"
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <NameForm setGreeting={setGreeting} />
        <h2>{state.greeting}</h2>
      </header>
    </div>
  );
}

export default App;
