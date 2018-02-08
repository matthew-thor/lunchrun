import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarLoggedIn, NavbarLoggedOut } from './index';

const NavbarCollapse = ({
  isLoggedIn,
  isGroupAdmin,
  isSiteAdmin,
  handleLogout,
  showDropdown,
  handleToggle,
 }) => (
    <div className="item">
      <div
        className="nav-collapse-toggle navbar-link nav-dropdown-toggle"
        onClick={handleToggle}
      >
        <i className="fas fa-bars" />
        {
          showDropdown &&
          <div className="nav-dropdown-menu">
            {
              isLoggedIn
                ? <React.Fragment>
                  <NavbarLoggedIn handleLogout={handleLogout} />
                  <Link className="nav-dropdown-item" to="/account">
                    Account
                      </Link>
                </React.Fragment>
                : <NavbarLoggedOut />
            }
            {
              isGroupAdmin &&
              <Link className="nav-dropdown-item" to="/groupadmin">
                Group Settings
              </Link>
            }
            {
              isSiteAdmin &&
              <Link className="nav-dropdown-item" to="/admin">
                Site Settings
              </Link>
            }
          </div>
        }
      </div>
    </div>
  );

export default NavbarCollapse;
