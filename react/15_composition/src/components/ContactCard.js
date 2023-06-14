const ContactCard = (props) => {

  const cardStyle = {
    backgroundColor: "slateBlue",
    height: 150,
    width: 200,
    margin: "10px",
    padding: "10px",

  }

  return (
    <div style={cardStyle}>
      {props.children}
    </div>
  )
}
export default ContactCard;
