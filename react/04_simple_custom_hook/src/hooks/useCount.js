import { useState } from 'react';

//create a hook and initialize with 0 state
const useCount = (initialState = 0) => {

  const [value, setValue] = useState(initialState);

  //add by 1 and subtract by 1
  const add = () => setValue(value => value + 1);
  const substract = () => setValue(value => value - 1);

  //return the hook
  return [value, add, substract];
}

export default useCount;