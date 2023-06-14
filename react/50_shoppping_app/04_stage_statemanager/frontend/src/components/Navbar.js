import { Link } from 'react-router-dom';
import useAppState from '../hooks/useAppState';
import useAction from '../hooks/useAction';

const Navbar = (props) => {

  const { isLogged, user } = useAppState();
  const { logout } = useAction();

  if (isLogged) {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <p className='navbar-brand mx-5'>Shopping App</p>
        <ul className='navbar-nav'>
          <li className='nav-item mx-5'>
            <Link to="/" className='nav-link'>Shopping List</Link>
          </li>
          <li className='nav-item mx-5'>
            <Link to="/form" className='nav-link'>Add new item</Link>
          </li>
          <li className='nav-item mx-5'>
            <Link to="/" className='nav-link' onClick={logout}>Logout</Link>
          </li>
          <li className='nav-item mx-5'>
            <p className='nav-link' style={{ color: "slateBlue" }}>Logged in as {user}</p>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <p className='navbar-brand mx-5'>Shopping App</p>
        <ul className='navbar-nav'>
        </ul>
      </nav>
    )
  }

}

export default Navbar;
