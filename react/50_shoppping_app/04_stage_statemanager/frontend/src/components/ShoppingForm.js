import { useState } from "react";
import useAction from "../hooks/useAction";

const ShoppingForm = (props) => {
  const [state, setState] = useState({
    type: "",
    count: 0,
    price: 0
  })

  const { add } = useAction();

  //on change update state accordingly to form
  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })
  }

  //on submit add item to table and empty the form
  const onSubmit = (event) => {
    event.preventDefault();
    let item = {
      ...state
    }
    add(item);
    setState({
      type: "",
      count: 0,
      price: 0
    })
  }

  return (
    <div style={{
      "backgroundColor": "whiteSmoke",
      "margin": "1em auto",
      "width": "40%",
      "textAlign": "center",
      "padding": "1em"
    }}>
      <form className="mb-5" onSubmit={onSubmit}>
        <label htmlFor="type" className="form-label mt-2">Type:</label>
        <input type="text"
          className="form-control"
          name="type"
          id="type"
          onChange={onChange}
          value={state.type} />

        <label htmlFor="count" className="form-label mt-2">Count:</label>
        <input type="number"
          className="form-control"
          name="count"
          id="count"
          onChange={onChange}
          value={state.count} />

        <label htmlFor="price" className="form-label mt-2">Price:</label>
        <input type="number"
          className="form-control"
          name="price"
          id="price"
          step="0.01"
          onChange={onChange}
          value={state.price} />
        <input type="submit"
          className="btn btn-primary mt-4"
          value="Add" />
      </form>
    </div>
  )
}

export default ShoppingForm;
