import './App.css';
import { useEffect } from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import useAppState from './hooks/useAppState';
import useAction from './hooks/useAction';


function App() {

  const { loading, error, isLogged } = useAppState();
  const { getList } = useAction();

  useEffect(() => {
    if (isLogged) {
      getList();
    }
  }, [isLogged])

  //rendering
  let message = <p></p>
  if (loading) {
    message = <p>Loading...</p>
  }
  if (error) {
    message = <p>{error}</p>
  }
  if (isLogged) {
    return (
      <div className="App">
        <Navbar />
        <div style={{ height: 25, textAlign: "center" }}>
          {message}
        </div>
        <Routes>
          <Route path='/' element={<ShoppingList />} />
          <Route path='/form' element={<ShoppingForm />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <div style={{ height: 25, textAlign: "center" }}>
          {message}
        </div>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

}

export default App;
