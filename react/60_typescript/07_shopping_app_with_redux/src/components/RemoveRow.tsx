import React from "react";
import ShoppingItem from "../models/ShoppingItem";

interface Props {
  item: ShoppingItem;
  removeItem(id: string): void;
  changeMode(index: number, mode: string): void;
}

const RemoveRow: React.FC<Props> = (props: Props) => {
  return (
    <tr>
      <td>{props.item.type}</td>
      <td>{props.item.count}</td>
      <td>{props.item.price}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => props.changeMode(0, "cancel")}
        >
          Cancel
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => props.removeItem(props.item._id)}
        >
          Confirm
        </button>
      </td>
    </tr>
  );
};

export default RemoveRow;
