import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarLoggedIn = ({ handleLogout, willCollapse }) => {
  const classes = willCollapse ? 'item will-collapse navbar-link' : 'nav-dropdown-item';

  return (
    <React.Fragment>
      <NavLink className={`home ${classes}`} activeClassName="active" to="/home">
        Home
      </NavLink>
      <NavLink className={`logout ${classes}`} activeClassName="active" to="#" onClick={handleLogout}>
        Logout
      </NavLink>
    </React.Fragment>
  );
};


export default NavbarLoggedIn;
