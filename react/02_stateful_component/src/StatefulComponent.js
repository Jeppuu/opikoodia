import { useState, useEffect } from "react";

//create component
const StatefulComponent = (props) => {
  //give it a state of count 0
  const [state, setState] = useState({
    count: 0
  })

  //add one to count with a function
  const tick = () => {
    setState((state) => {
      return {
        count: state.count + 1
      }
    })
  }
  //set a interval for one sec that adds to count with tick function
  useEffect(() => {
    let interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []); //<-- useEffect runs once on first render

  //return a h3 element stating the count
  return (
    <h3>{state.count} seconds since you entered the page.</h3>
  )
}

export default StatefulComponent;