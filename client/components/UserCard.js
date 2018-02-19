import React from 'react';

const UserCard = ({ user, isAdmin, handleDeleteUser, handleResetPassword }) =>
  (
    <div className="user-card">
      <div>{user.fullName}</div>
      <div>{user.email}</div>
      {
        isAdmin &&
        <React.Fragment>
          {user.admin && <div>ADMIN</div>}
          <button className="btn btn-sm btn-default" type="button" onClick=handleResetPassword >
          </button>
        </React.Fragment>
      }
    </div>
  );

export default UserCard;
