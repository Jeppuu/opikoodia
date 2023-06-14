import './App.css';
import ContactCard from './components/ContactCard';
import ContactInfo from './components/ContactInfo';
import { useState } from 'react';
import NameChildren from './components/NameChildren';

function App() {

  const [click, setClick] = useState(0);

  return (
    <div className="App">
      <header className='App-header'>
        <ContactCard>
          <ContactInfo name="Jenna" profession="developer" />
        </ContactCard>
        <ContactCard>
          <p>Current clicks: {click}</p>
          <button onClick={() => setClick(click => click + 1)}>Click</button>
        </ContactCard>
        <NameChildren header={<h2>Complex Card</h2>}
          media={<p>Media area</p>}
          content={<p>Content area</p>} />
        <NameChildren header={<h2>No Media Card</h2>}
          content={<p>Content area</p>} />
      </header>


    </div>
  );
}

export default App;
