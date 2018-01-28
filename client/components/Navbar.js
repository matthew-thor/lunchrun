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
          {isLoggedIn &&
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/home">
                Home
              </NavLink>
            </li>
          }
          {!isLoggedIn &&
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/signup">
                Sign up
              </NavLink>
            </li>
          }
          <li className="nav-item">
            {isLoggedIn
              ? <NavLink className="nav-link" activeClassName="active" to="#" onClick={handleClick}>
                Logout
              </NavLink>
              : <NavLink className="nav-link" activeClassName="active" to="/login">
                Log in
              </NavLink>}
          </li>
          {isLoggedIn && !(isGroupAdmin || isSiteAdmin) &&
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/account">
                <i className="fas fa-cog" />
              </NavLink>
            </li>
          }
          {(isGroupAdmin || isSiteAdmin) &&
            <li className="nav-item">
              <div className="btn-group">
                <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-cogs" />
                </button>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/account">
                    Account Settings
                  </Link>
                  {isGroupAdmin &&
                    <Link className="dropdown-item" to="/groupadmin">
                      Group Settings
                    </Link>
                  }
                  {isSiteAdmin &&
                    <Link className="dropdown-item" to="/admin">
                      Site Settings
                    </Link>
                  }
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

