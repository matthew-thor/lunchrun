import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarLoggedOut = () =>
  (
    <React.Fragment>
      <div className="item">
        <NavLink className="navbar-link" activeClassName="active" to="/signup">
          Sign up
        </NavLink>
      </div>
      <div className="item">
        <NavLink className="navbar-link" activeClassName="active" to="/login">
          Log in
        </NavLink>
      </div>
    </React.Fragment>
  )
  ;

export default NavbarLoggedOut;
