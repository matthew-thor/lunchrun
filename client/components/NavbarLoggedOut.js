import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarLoggedOut = ({ willCollapse }) => {
  const divClass = willCollapse ? 'item will-collapse' : 'item';
  const linkClass = willCollapse ? 'navbar-link' : 'nav-dropdown-item';

  return (
    <React.Fragment>
      <div className={divClass}>
        <NavLink className={linkClass} activeClassName="active" to="/signup">
          Sign up
        </NavLink>
      </div>
      <div className={divClass}>
        <NavLink className={linkClass} activeClassName="active" to="/login">
          Log in
        </NavLink>
      </div>
    </React.Fragment>
  );
};


export default NavbarLoggedOut;
