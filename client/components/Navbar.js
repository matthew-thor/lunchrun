import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleClick, isSiteAdmin, isGroupAdmin }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <Link className="navbar-brand" to="/">Loop Lunch Run</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target=".navbar-collapse"
        aria-controls="navbar-collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {isSiteAdmin &&
              <NavLink className="nav-link" activeClassName="active" to="/admin">Site Admin</NavLink>}
          </li>
          <li className="nav-item">
            {isGroupAdmin &&
              <NavLink className="nav-link" activeClassName="active" to="/groupadmin">Group Settings</NavLink>}
          </li>
          <li className="nav-item">
            {isLoggedIn &&
              <NavLink className="nav-link" activeClassName="active" to="/home">Home</NavLink>}
          </li>
          <li className="nav-item">
            {isLoggedIn &&
              <NavLink className="nav-link" activeClassName="active" to="/account">Account</NavLink>}
          </li>
          <li className="nav-item">
            {isLoggedIn
              ? <NavLink className="nav-link" activeClassName="active" to="#" onClick={handleClick}>Logout</NavLink>
              : <NavLink className="nav-link" activeClassName="active" to="/login">Log in</NavLink>}
          </li>
          {!isLoggedIn &&
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/signup">Sign up</NavLink>
            </li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

