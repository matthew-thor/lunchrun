import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { groupAdminQuery } from '../queries';
import { Invite, GroupEmails, AddRoute } from '../components';

/**
 * COMPONENT
 */
class GroupAdmin extends React.Component {
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
      case 'Invites':
        return (<Invite groupId={this.props.groupId} />);
      case 'Members':
        // return (<GroupMembers groupId={this.props.groupId} />);
        return (<div>Group Members</div>);
      case 'Routes':
        // <GroupRoutes groupId={this.props.groupId} />
        return (
          <div>
            Group Routes
            <AddRoute groupId={this.props.groupId} />
          </div>
        );
      case 'Emails':
        return (<GroupEmails group={this.props.data.group} />);
      default:
        return null;
    }

  }

  render() {
    const {
      user,
      groupId,
      data: { loading, error, group },
    } = this.props;

    const generateNavLinks = nameArray =>
      nameArray.map(name => (
        <li className="nav-item item-sidenav" key={name}>
          <NavLink
            className="nav-link"
            activeClassName="active"
            name={name}
            to="#"
            onClick={this.navHandler}
          >
            {name}
          </NavLink>
        </li>
      )
      );

    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div className="container group-admin-page">
        <ul className="nav flex-column">
          {generateNavLinks(['Invites', 'Members', 'Routes', 'Emails'])}
        </ul>
        <div className="item-content">
          Group {groupId} Admin Options
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

const GroupAdminConnected = connect(mapState)(GroupAdmin);

export default compose(
  graphql(groupAdminQuery, {
    options: props => ({
      variables: {
        groupId: props.groupId,
      },
    }),
  }),
)(GroupAdminConnected);

/**
 * PROP TYPES
 */
GroupAdmin.propTypes = { user: PropTypes.object };
