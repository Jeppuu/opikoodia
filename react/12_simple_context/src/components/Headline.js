import { useContext } from "react";
import { themeContext } from "../context/themeContext";

//create a headline
const Headline = (props) => {

  const theme = useContext(themeContext);

  return (
    <h3 style={{ ...theme }}>
      {props.children}
    </h3>
  )
}

export default Headline;
