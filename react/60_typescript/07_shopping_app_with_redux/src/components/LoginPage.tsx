import React, { useState } from "react";
import User from "../models/User";
import { useDispatch } from "react-redux";
import { register, login, registerFailed } from "../actions/loginActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface State {
  username: string;
  password: string;
}

const LoginPage: React.FC<{}> = props => {
  const [state, setState] = useState<State>({
    username: "",
    password: "",
  });

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(state => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onRegister = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (state.username.length < 4 || state.password.length < 8) {
      dispatch(
        registerFailed(
          "Username must be atleast 4 and password atleast 8 characters long."
        )
      );
      return;
    }
    let user = new User(state.username, state.password);
    dispatch(register(user));
  };

  const onLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (state.username.length < 4 || state.password.length < 8) {
      dispatch(
        registerFailed(
          "Username must be atleast 4 and password atleast 8 characters long."
        )
      );
      return;
    }
    let user = new User(state.username, state.password);
    dispatch(login(user));
  };

  return (
    <div
      style={{
        width: "40%",
        backgroundColor: "whitesmoke",
        margin: "auto",
      }}
    >
      <form className="mb-5 p-4">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={onChange}
          className="form-control"
          value={state.username}
        />
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          onChange={onChange}
          value={state.password}
        />
        <button onClick={onRegister} className="btn btn-secondary mt-4 me-2">
          Register
        </button>
        <button onClick={onLogin} className="btn btn-secondary mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
