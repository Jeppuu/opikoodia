import { useContext } from "react";
import { themeContext } from "../context/themeContext";


//create a paragraph
const Paragraph = (props) => {

  const theme = useContext(themeContext);

  return (
    <p style={{ ...theme }}>
      {props.children}
    </p>
  )
}

export default Paragraph;
