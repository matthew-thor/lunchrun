import React from 'react';

const UserCard = ({ display, user, handleDeleteUser, handleResetPassword }) =>
  (
    <React.Fragment>
      <div>
        <span>{display.fullName}</span>
        {display.admin && <span className="admin-label">A</span>}
      </div>
      <div>{display.email}</div>
      {
        user.admin &&
        <React.Fragment>
          <button
            className="btn btn-sm btn-default"
            type="button"
            onClick={handleResetPassword}
            name={display.id}
          >
            Reset Password
          </button>
          {
            user.id === display.id
              ? <div className="placeholder" />
              : <button
                className="btn btn-sm btn-danger"
                type="button"
                onClick={handleDeleteUser}
                name={display.id}
              >
                Delete User
              </button>
          }
        </React.Fragment>
      }
    </React.Fragment>
  );

export default UserCard;
