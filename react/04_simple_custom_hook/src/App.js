import logo from './logo.svg';
import './App.css';
import useCount from './hooks/useCount';

function App() {

  //initialize hook with a count of 10
  const [value, add, substract] = useCount(10);
  return (
    <div className="App">
      <header className="App-header">
        <h4>Count: {value}</h4>
        <button onClick={add}>+</button>
        <button onClick={substract}>-</button>
      </header>
    </div>
  );
}

export default App;
