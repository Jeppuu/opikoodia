import './App.css';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path='/game' element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
