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

  displayView = groupId => {
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
            <AddRoute groupId={this.props.groupId} />
          </div>
        );
      case 'Emails':
        return (<GroupEmails group={this.props.data.group} />);
      default:
        return (<h3>Group {groupId} Admin Options</h3>);
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

    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div className="container-admin-page">
        <div className="container-side-nav">
          {generateNavLinks(['Invites', 'Members', 'Routes', 'Emails'])}
          <div className="item-placeholder" />
        </div>
        <div className="current-view">
          {this.displayView(groupId)}
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
