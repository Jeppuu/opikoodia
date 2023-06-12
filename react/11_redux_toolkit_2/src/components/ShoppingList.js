import { useState } from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import { useDispatch, useSelector } from 'react-redux';
import { remove, edit } from '../store/shoppingSlice';

const ShoppingList = (props) => {

  const [state, setState] = useState({
    removeIndex: -1,
    editIndex: -1
  })

  const dispatch = useDispatch();
  const list = useSelector(state => state.list);

  //chane mode depending on weather user wants to  remove, edit or cancel
  const changeMode = (mode, index) => {
    if (mode === "remove") {
      setState({
        removeIndex: index,
        editIndex: -1
      })
    }
    if (mode === "edit") {
      setState({
        removeIndex: -1,
        editIndex: index
      })
    }
    if (mode === "cancel") {
      setState({
        removeIndex: -1,
        editIndex: -1
      })
    }
  }

  const removeItem = (id) => {
    dispatch(remove(id));
    changeMode("cancel");
  }
  const editItem = (item) => {
    dispatch(edit(item));
    changeMode("cancel");
  }

  //return row with items
  let items = list.map((item, index) => {
    //when removing, return row with remove options
    if (index === state.removeIndex) {
      return (
        <RemoveRow key={item._id} item={item} changeMode={changeMode} removeItem={removeItem} />
      )
    }
    //when editing, return row with remove options
    if (index === state.editIndex) {
      return (
        <EditRow key={item._id} item={item} changeMode={changeMode} editItem={editItem} />
      )
    }
    return (
      <Row key={item._id} item={item} index={index} changeMode={changeMode} />
    )
  })

  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
          <th>Price</th>
          <th>Remove</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  )
}

export default ShoppingList;
