import React from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ContactForm />
        <hr />
        <ContactList />
      </header>
    </div>
  );
}

export default App;
