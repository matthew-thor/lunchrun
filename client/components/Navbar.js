import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NavbarAdmin, NavbarLoggedIn, NavbarLoggedOut } from './index';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDropdown: false };
  }

  handleToggle = event => {
    event.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render() {
    const { isLoggedIn, handleLogout, isSiteAdmin, isGroupAdmin } = this.props;

    return (
      <nav className="container-nav">
        <div className="item">
          <Link className="navbar-brand" to="/">Loop Lunch Run</Link>
        </div>
        {
          isLoggedIn
            ? <NavbarLoggedIn handleLogout={handleLogout} />
            : <NavbarLoggedOut />
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
          <NavbarAdmin isGroupAdmin isSiteAdmin showDropdown={this.state.showDropdown} handleToggle={this.handleToggle} />
        }
      </nav>
    );
  }
}

export default Navbar;

