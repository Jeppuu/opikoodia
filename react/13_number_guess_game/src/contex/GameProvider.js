import { useState } from "react";
import GameContext from "./GameContext";
import { useNavigate } from "react-router-dom";

const GameProvider = (props) => {

  //init state
  const [state, setState] = useState({
    playerName: "",
    targetNumber: 0,
    noOfGuessess: 0,
    minGuess: 1,
    maxGuess: 100,
    message: ""
  })

  //initialize navigation
  const navigate = useNavigate();

  const startGame = (name) => {
    //if user inputs no name
    if (!name) {
      setState((state) => {
        return {
          ...state,
          message: "Please enter your name."
        }
      })
      return;
    }
    //randomise a number between 1 and 100
    const target = Math.floor(Math.random() * 100) + 1;
    const message = `Hello ${name}! 👋🏼 Please guess a number between ${state.minGuess} and ${state.maxGuess}.`;
    setState((state) => {
      return {
        ...state,
        playerName: name,
        message: message,
        targetNumber: target
      }
    })
    navigate("/game");
  }

  const guess = (guess) => {
    if (state.targetNumber === 0) {
      setState({
        targetNumber: 0,
        playerName: "",
        noOfGuessess: 0,
        minGuess: 1,
        maxGuess: 100
      })
      navigate("/");
    }
    //if user inputs a string
    if (isNaN(guess)) {
      let message = `Please enter a NUMBER between ${state.minGuess} and ${state.maxGuess}.`
      setState((state) => {
        return {
          ...state,
          message: message
        }
      })
      return;
    }
    let tempGuess = parseInt(guess);
    //if user guesses outside of minmax values
    if (tempGuess < state.minGuess || tempGuess > state.maxGuess) {
      let message = `Please enter a number between ${state.minGuess} and ${state.maxGuess}.`;
      setState((state) => {
        return {
          ...state,
          message: message
        }
      })
      return;
    }
    //if user guesses too low
    if (tempGuess < state.targetNumber && tempGuess >= state.minGuess) {
      let message = `Your guess was too low. Guess between ${guess} and ${state.maxGuess}.`;
      setState((state) => {
        return {
          ...state,
          noOfGuessess: state.noOfGuessess + 1,
          minGuess: guess,
          message: message
        }
      })
      return;
    }
    //if user guesses too high
    if (tempGuess > state.targetNumber && tempGuess <= state.maxGuess) {
      let message = `Your guess was too high. Guess between ${state.minGuess} and ${guess}.`;
      setState((state) => {
        return {
          ...state,
          noOfGuessess: state.noOfGuessess,
          maxGuess: guess,
          message: message
        }
      })
      return;
    }
    //if user guessess correctly
    if (tempGuess === state.targetNumber) {
      let noOfGuessess = state.noOfGuessess + 1;
      alert(`Congratulations ${state.playerName}! You won with ${noOfGuessess} guessess. 🎉🎉`);
      setState({
        playerName: "",
        noOfGuessess: 0,
        targetNumber: 0,
        maxGuess: 100,
        minGuess: 1,
        message: ""
      })
      navigate("/");
      return;
    }
    //this should not happen
    console.log("Should not come here 🛑");
  }
  return (
    <GameContext.Provider value={{
      startGame: startGame,
      guess: guess,
      message: state.message
    }}>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameProvider;
