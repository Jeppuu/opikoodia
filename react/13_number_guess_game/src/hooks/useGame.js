import GameContext from "../contex/GameContext";
import { useContext } from "react";

const useGame = () => {
  return useContext(GameContext);
}

export default useGame;
