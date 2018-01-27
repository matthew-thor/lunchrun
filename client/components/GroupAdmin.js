import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { accountQuery } from '../queries';
import { Invite, GroupEmails, AddRoute, ChangePassword } from '../components';

/**
 * COMPONENT
 */
class GroupAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordForm: false,
    };
  }

  componentWillReceiveProps() {
    this.setState({ showPasswordForm: false });
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({ showPasswordForm: !this.state.showPasswordForm });
  }

  render() {
    const {
      user,
      groupId,
      // data: { loading, error, group },
    } = this.props;

    // if (loading) {
    //   return <h1>Loading...</h1>;
    // }
    // if (error) {
    //   return <p>{error.message}</p>;
    // }
    return (
      <div>
        Group {groupId} Admin Options
      </div>
    );
    // const isAdmin = group.admins.find(u => u.id === user.id);
    // const isGoogleConnected = user.googleId;

    // return (
    //   <div>
    //     <h3>Name: {user.fullName}</h3>
    //     <h3>Email: {user.email}</h3>
    //     <button onClick={this.handleClick}>Change password</button>
    //     {this.state.showPasswordForm && <ChangePassword />}
    //     {!isGoogleConnected &&
    //       <a href="/auth/google/connect" className="google-btn">
    //         <i className="fab fa-google" />
    //         <span>Connect Google Account</span>
    //       </a>
    //     }
    //     {isAdmin &&
    //       <div>
    //         <Invite groupId={groupId} />
    //         <GroupEmails group={group} />
    //         <AddRoute groupId={groupId} />
    //       </div>
    //     }
    //   </div>
    // );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

const GroupAdminConnected = connect(mapState)(GroupAdmin);

export default compose(
  // graphql(accountQuery, {
  //   options: {
  //     variables: {
  //       groupId: groupId,
  //     },
  //   },
  // }),
)(GroupAdminConnected);

/**
 * PROP TYPES
 */
GroupAdmin.propTypes = { user: PropTypes.object };
