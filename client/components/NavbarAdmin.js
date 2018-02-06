import React from 'react';
import { Link } from 'react-router-dom';

const NavbarAdmin = ({ isGroupAdmin, isSiteAdmin, handleToggle, showDropdown }) =>
  (
    <div className="item">
      <div
        className="navbar-link nav-dropdown-toggle"
        onClick={handleToggle}
      >
        <i className="fas fa-cogs" /> <i className="fas fa-caret-down" />
        {
          showDropdown &&
          <div className="nav-dropdown-menu">
            <Link className="nav-dropdown-item" to="/account">
              Account Settings
            </Link>
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

export default NavbarAdmin;
