import { useContext } from "react";
import { themeContext } from "../context/themeContext";


//create a button
const ThemeButton = (props) => {

  const theme = useContext(themeContext);

  return (
    <button style={{ ...theme }} onClick={props.toggleTheme}>
      Toggle Theme
    </button>
  )
}

export default ThemeButton;
