import './App.css';
import { useState, useMemo } from 'react';

function App() {

  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["banana", "apple", "cream", "Christmas", "Santa Claus"];
  const word = words[currentWord];

  const computeWordLength = (word) => {
    let i = 0;
    while (i < 1000000000) {
      i++;
    }
    return word.length;
  }

  //let wordLength = computeWordLength(word);
  let wordLength = useMemo(() => computeWordLength(word), [word]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Compute the length of the word {word}</p>
        <p>{word} has {wordLength} letters.</p>
        <button onClick={() => {
          const next = currentWord + 1 === words.length ? 0 : currentWord + 1;
          setCurrentWord(next);
        }}>Next word</button>

        <p>Current count: {count}</p>
        <button onClick={() => setCount(count => count + 1)}>Increment</button>
      </header>
    </div>
  );
}

export default App;
