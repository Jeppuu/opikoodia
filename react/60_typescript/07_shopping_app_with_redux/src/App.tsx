import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { useSelector } from "react-redux";
import { AppState } from "./types/states";
import Navbar from "./components/Navbar";
import ShoppingForm from "./components/ShoppingForm";

function App() {
  const stateSelector = (state: AppState) => state;
  const state = useSelector(stateSelector);

  let messageArea = <p style={{ height: 40 }}></p>;
  if (state.login.loading) {
    messageArea = <p style={{ height: 40 }}>Loading ...</p>;
  }
  if (state.shopping.error) {
    messageArea = <p style={{ height: 40 }}>{state.shopping.error}</p>;
  }
  if (state.login.error) {
    messageArea = <p style={{ height: 40 }}>{state.login.error}</p>;
  }
  if (state.login.isLogged) {
    return (
      <div className="App">
        <Navbar />
        {messageArea}
        <ShoppingForm />
      </div>
    );
  }
  return (
    <div className="App">
      <Navbar />
      {messageArea}
      <LoginPage />
    </div>
  );
}

export default App;
