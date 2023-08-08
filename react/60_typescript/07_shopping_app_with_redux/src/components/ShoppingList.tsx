import React, { useState } from "react";
import ShoppingItem from "../models/ShoppingItem";
import Row from "./Row";
import EditRow from "./EditRow";
import RemoveRow from "./RemoveRow";
import { getList, remove, edit } from "../actions/shoppingActions";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AppState } from "../types/states";

interface State {
  removeIndex: number;
  editIndex: number;
}

interface SearchState {
  type: string;
}

const ShoppingList: React.FC<{}> = props => {};

export default ShoppingList;
