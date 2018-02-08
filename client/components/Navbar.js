import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NavbarAdmin, NavbarLoggedIn, NavbarLoggedOut, NavbarCollapse } from './index';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAdminDropdown: false, showCollapseDropdown: false };
  }

  handleToggleAdmin = event => {
    event.preventDefault();
    this.setState({ showAdminDropdown: !this.state.showAdminDropdown });
  }

  handleToggleCollapse = event => {
    event.preventDefault();
    this.setState({ showCollapseDropdown: !this.state.showCollapseDropdown });
  }

  render() {
    const { isLoggedIn, handleLogout, isSiteAdmin, isGroupAdmin } = this.props;

    return (
      <nav className="container-nav">
        <div className="logo">
          <Link className="navbar-brand" to="/">Loop Lunch Run</Link>
        </div>
        {
          isLoggedIn
            ? <NavbarLoggedIn handleLogout={handleLogout} willCollapse={true} />
            : <NavbarLoggedOut willCollapse={true} />
        }
        {
          isLoggedIn && !(isGroupAdmin || isSiteAdmin) &&
          <div className="item will-collapse">
            <NavLink className="navbar-link" activeClassName="active" to="/account">
              <i className="fas fa-cog" />
            </NavLink>
          </div>
        }
        {
          (isGroupAdmin || isSiteAdmin) &&
          <NavbarAdmin
            isGroupAdmin={isGroupAdmin}
            isSiteAdmin={isSiteAdmin}
            showDropdown={this.state.showAdminDropdown}
            handleToggle={this.handleToggleAdmin}
          />
        }
        <NavbarCollapse
          isGroupAdmin={isGroupAdmin}
          isSiteAdmin={isSiteAdmin}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          showDropdown={this.state.showCollapseDropdown}
          handleToggle={this.handleToggleCollapse}
        />
      </nav>
    );
  }
}

export default Navbar;
