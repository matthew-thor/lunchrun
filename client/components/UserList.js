import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { deleteUserMutation, resetPasswordMutation } from '../mutations';
import { siteAdminQuery } from '../queries';
import { UserCard } from '../components';

/**
 * COMPONENT
 */


const UserList = ({
  user,
  users,
  resetPassword,
  deleteUser,
}) => {
  const displayPasswordResetMessage = () => {
    const modal = $('.reset-password-success-modal');
    modal.modal({ focus: true });
    setTimeout(() => { modal.modal('toggle'); }, 1300);
  };

  const displayDeleteMessage = () => {
    const modal = $('.delete-user-success-modal');
    modal.modal({ focus: true });
    setTimeout(() => { modal.modal('toggle'); }, 1300);
  };

  const handleResetPassword = async event => {
    event.preventDefault();
    const res = await resetPassword({
      variables: { userId: event.target.name },
    });

    if (res.data) displayPasswordResetMessage();
  };

  const handleDeleteUser = async event => {
    event.preventDefault();
    const res = await deleteUser({
      variables: { userId: event.target.name },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: siteAdminQuery,
      }],
    });

    if (res.data) displayDeleteMessage();
  };

  return (
    <React.Fragment>
      <div
        className="modal fade red-modal delete-user-success-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <br /><span><i className="fas fa-check" /> User deleted</span><br />
          </div>
        </div>
      </div>
      <div
        className="modal fade reset-password-success-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <br /><span><i className="fas fa-check" /> Password reset</span><br />
          </div>
        </div>
      </div>
      <div className="container-user-list">
        <div className="user-list">
          {
            users.map(u => (
              <UserCard
                key={u.id}
                user={user}
                display={u}
                handleDeleteUser={handleDeleteUser}
                handleResetPassword={handleResetPassword}
              />
            ))
          }
        </div>
      </div>
    </React.Fragment>
  );
};

const mapState = state => ({ user: state.user });

const UserListConnected = connect(mapState)(UserList);

export default compose(
  graphql(resetPasswordMutation, { name: 'resetPassword' }),
  graphql(deleteUserMutation, { name: 'deleteUser' }),
)(UserListConnected);
