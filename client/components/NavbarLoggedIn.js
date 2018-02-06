import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarLoggedIn = ({ handleLogout }) =>
  (
    <React.Fragment>
      <div className="item">
        <NavLink className="navbar-link" activeClassName="active" to="/home">
          Home
        </NavLink>
      </div>
      <div className="item">
        <NavLink className="navbar-link" activeClassName="active" to="#" onClick={handleLogout}>
          Logout
        </NavLink>
      </div>
    </React.Fragment>
  )
  ;

export default NavbarLoggedIn;
