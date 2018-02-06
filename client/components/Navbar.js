import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDropdown: false };
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render() {
    const { isLoggedIn, handleClick, isSiteAdmin, isGroupAdmin } = this.props;

    return (
      <nav className="container-nav">
        <div className="item">
          <Link className="navbar-brand" to="/">Loop Lunch Run</Link>
        </div>

        {
          isLoggedIn
            ?
            <React.Fragment>
              <div className="item">
                <NavLink className="navbar-link" activeClassName="active" to="/home">
                  Home
                </NavLink>
              </div>
              <div className="item">
                <NavLink className="navbar-link" activeClassName="active" to="#" onClick={handleClick}>
                  Logout
                </NavLink>
              </div>
            </React.Fragment>
            :
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
        }
        {
          isLoggedIn && !(isGroupAdmin || isSiteAdmin) &&
          <div className="item">
            <NavLink className="navbar-link" activeClassName="active" to="/account">
              <i className="fas fa-cog" />
            </NavLink>
          </div>
        }
        {
          (isGroupAdmin || isSiteAdmin) &&
          <div className="item">
            <div
              className="navbar-link nav-dropdown-toggle"
              onClick={this.handleClick}
            >
              <i className="fas fa-cogs" /> <i className="fas fa-caret-down" />
              {
                this.state.showDropdown &&
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
        }
      </nav>
    );
  }
}

export default Navbar;

