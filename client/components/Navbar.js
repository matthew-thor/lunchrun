import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleClick, isSiteAdmin, isGroupAdmin }) => {
  return (
    <nav className="container-nav">
      <div className="item">
        <Link className="navbar-brand" to="/">Loop Lunch Run</Link>
      </div>
      <div className="item" />
      {isLoggedIn &&
        <div className="item">
          <NavLink className="navbar-link" activeClassName="active" to="/home">
            Home
          </NavLink>
        </div>
      }
      {!isLoggedIn &&
        <div className="item">
          <NavLink className="navbar-link" activeClassName="active" to="/signup">
            Sign up
          </NavLink>
        </div>
      }
      {isLoggedIn
        ?
        <div className="item">
          <NavLink className="navbar-link" activeClassName="active" to="#" onClick={handleClick}>
            Logout
          </NavLink>
        </div>
        :
        <div className="item">
          <NavLink className="navbar-link" activeClassName="active" to="/login">
            Log in
          </NavLink>
        </div>
      }
      {isLoggedIn && !(isGroupAdmin || isSiteAdmin) &&
        <div className="item">
          <NavLink className="navbar-link" activeClassName="active" to="/account">
            <i className="fas fa-cog" />
          </NavLink>
        </div>
      }
      {(isGroupAdmin || isSiteAdmin) &&
        <div className="item">
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
        </div>
      }
    </nav>
  );
};

export default Navbar;

