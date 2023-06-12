import { useState } from "react";
import useGame from "../hooks/useGame";

const GamePage = (props) => {

  const [state, setState] = useState({
    guess: 0
  })

  const { message, guess } = useGame();

  const onChange = (event) => {
    setState({
      guess: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    guess(state.guess);
  }
  return (
    <div className="container">
      <h3>{message}</h3>
      <form onSubmit={onSubmit}>
        <input type="number"
          name="guess"
          id="guess"
          onChange={onChange}
          value={state.guess}
          className="num-input" />
        <input className="submit-btn" type="submit" value="Guess" />
      </form>

    </div>
  )
}

export default GamePage;
