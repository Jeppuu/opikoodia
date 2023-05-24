const Label = (props) => {

  //inline-css for label
  let labelStyle = {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    margin: 0,
    padding: 13,
    color: props.color
  }
  //return a paragraph with color from props
  return (
    <p style={labelStyle}
      onClick={props.onColorChange}
    >{props.color}</p>
  )
}

export default Label;