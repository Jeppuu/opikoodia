import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';

function App() {
  return (
    <div className="App">
      <h2>Hello React!</h2>
      <HelloWorld />
      <HelloWorld name="Jenna" />
    </div>
  );
}

export default App;
