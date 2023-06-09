import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, registerFailed, login } from '../actions/loginActions';

const LoginPage = (props) => {

	const [state, setState] = useState({
		username: "",
		password: ""
	})

	const dispatch = useDispatch();

	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]: event.target.value
			}
		})
	}

	const onSubmit = (event) => {
		event.preventDefault();
		if (state.username.length < 4 || state.password.length < 8) {
			dispatch(registerFailed("Username must be atleast 4 characters and password 8 characters long."));
			return;
		}
		let user = {
			...state
		}
		if (event.target.name === "register") {
			dispatch(register(user));
		} else {
			dispatch(login(user));
		}
	}

	return (
		<div style={{
			backgroundColor: "whitesmoke",
			width: "40%",
			margin: "auto",
			textAlign: "center"
		}}>
			<form className="mb-5 m-4">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text"
					name="username"
					id="username"
					className="form-control"
					onChange={onChange}
					value={state.username} />
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
					name="password"
					id="password"
					className="form-control"
					onChange={onChange}
					value={state.password} />
				<button name="register" onClick={onSubmit} style={{ marginRight: 5 }} className="btn btn-secondary me-4 mt-4 mb-2">Register</button>
				<button name="login" onClick={onSubmit} style={{ marginLeft: 5 }} className="btn btn-secondary mt-4 mb-2">Login</button>
			</form>
		</div>

	)
}

export default LoginPage;
