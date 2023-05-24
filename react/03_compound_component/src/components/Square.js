const Square = (props) => {

  //inline css
  let squareStyle = {
    backgroundColor: props.color,
    height: 150
  }

  //return a div element
  return (
    <div style={squareStyle}></div>
  )
}

export default Square;