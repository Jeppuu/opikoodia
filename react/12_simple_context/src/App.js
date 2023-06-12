import './App.css';
import { themes, themeContext } from './context/themeContext';
import { useState } from 'react';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';

function App() {

  const [state, setState] = useState({
    theme: themes.dark
  })

  const toggleTheme = () => {
    if (state.theme === themes.dark) {
      setState({
        theme: themes.light
      })
    } else {
      setState({
        theme: themes.dark
      })
    }
  }

  return (
    <themeContext.Provider value={state.theme}>
      <div className="App">
        <Headline>Hello World!</Headline>
        <Paragraph>The world is beautiful today, don't you think?</Paragraph>
        <ThemeButton toggleTheme={toggleTheme} />
      </div>
    </themeContext.Provider>

  );
}

export default App;
