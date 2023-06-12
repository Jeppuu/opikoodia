import useGame from "../hooks/useGame";
import { useState } from "react";

const StartPage = (props) => {

  const [state, setState] = useState({
    name: ""
  })

  const { startGame, message } = useGame();

  const onChange = (event) => {
    setState({
      name: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    startGame(state.name);
  }

  return (
    <div className="container">
      <h3> Welcome to number guessing game. Please enter your name.</h3>
      <form onSubmit={onSubmit}>
        <input type="text"
          name="name"
          id="name"
          onChange={onChange}
          value={state.name}
          placeholder="Player name" />
        <input className="submit-btn" type="submit" value="Start game" />
        <h3>{message}</h3>
      </form>
    </div >
  )
}

export default StartPage;
