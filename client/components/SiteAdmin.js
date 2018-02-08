import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { accountQuery } from '../queries';
import { Invite, GroupEmails, AddRoute, ChangePassword } from '../components';

/**
 * groupId needs to be changed later to reflect actual group
 */

/**
 * COMPONENT
 */
class SiteAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordForm: false,
      view: 'default',
    };
  }

  navHandler = event => {
    event.preventDefault();
    const view = event.target.name;
    this.setState({ view });
  }

  displayView = () => {
    switch (this.state.view) {
      case 'Users':
        return (<div>Users</div>);
      case 'Groups':
        return (<div>Groups</div>);
      default:
        return (<h3>Site Admin Options</h3>);
    }

  }

  render() {
    const {
      user,
      // groupId,
      // data: { loading, error, group },
    } = this.props;

    const generateNavLinks = nameArray =>
      nameArray.map(name => (
        <NavLink
          className="sidenav-link item-sidenav"
          activeClassName="active"
          name={name}
          to="#"
          onClick={this.navHandler}
          key={name}
        >
          {name}
        </NavLink>
      )
      );

    // if (loading) {
    //   return <h1>Loading...</h1>;
    // }
    // if (error) {
    //   return <p>{error.message}</p>;
    // }

    return (
      <div className="container-admin-page">
        <div className="container-side-nav">
          {generateNavLinks(['Users', 'Groups'])}
          <div className="item-placeholder" />
        </div>
        <div className="current-view">
          {this.displayView()}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

const SiteAdminConnected = connect(mapState)(SiteAdmin);

export default compose(
  // graphql(accountQuery, {
  //   options: {
  //     variables: {
  //       groupId: groupId,
  //     },
  //   },
  // }),
)(SiteAdminConnected);

/**
 * PROP TYPES
 */
SiteAdmin.propTypes = { user: PropTypes.object };
