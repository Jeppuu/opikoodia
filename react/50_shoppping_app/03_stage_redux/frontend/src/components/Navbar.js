import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/loginActions';

const Navbar = (props) => {

	const dispatch = useDispatch();
	const state = useSelector(state => state);

	if (state.login.isLogged) {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand ms-4">Shopping App</p>
				<ul className="navbar-nav">
					<li className="nav-item ms-4">
						<Link to="/" className="nav-link">Shopping List</Link>
					</li>
					<li className="nav-item ms-4">
						<Link to="/form" className="nav-link">Add new item</Link>
					</li>
					<li className="nav-item ms-4">
						<Link to="/" className="nav-link" onClick={() => dispatch(logout(state.login.token))}>Logout</Link>
					</li>
					<li className="nav-item ms-4">
						<p className="nav-link" style={{ color: "slateblue" }}>Logged in as {state.login.user}</p>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand ms-4">Shopping App</p>
				<ul className="navbar-nav">
				</ul>
			</nav>
		)
	}

}

export default Navbar;
