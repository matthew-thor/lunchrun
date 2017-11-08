import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <Link className="navbar-brand" to="/">Loop Lunch Run</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {props.isLoggedIn &&
              <NavLink className="nav-link" activeClassName="active" to="/home">Home</NavLink>}
          </li>
          <li className="nav-item">
            {props.isLoggedIn &&
              <NavLink className="nav-link" activeClassName="active" to="/account">Account</NavLink>}
          </li>
          <li className="nav-item">
            {props.isLoggedIn
              ? <NavLink className="nav-link" activeClassName="active" to="#" onClick={props.handleClick}>Logout</NavLink>
              : <NavLink className="nav-link" activeClassName="active" to="/login">Log in</NavLink>}
          </li>
          {!props.isLoggedIn &&
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/signup">Sign up</NavLink>
            </li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

