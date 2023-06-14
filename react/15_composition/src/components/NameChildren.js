const NameChildren = (props) => {

  const nameStyle = {
    backgroundColor: "#47735f",
    height: 150,
    width: 200,
    margin: "10px",
    padding: "10px",

  }
  return (
    <div style={nameStyle}>
      <>{props.header}</>
      {props.media ? <>{props.media}</> : <></>}
      <>{props.content}</>
    </div>
  )
}
export default NameChildren;


