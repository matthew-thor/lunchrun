import React from 'react';

const GroupCard = ({ group, user, handleDeleteGroup }) =>
  (
    <React.Fragment>
      <div>
        {group.name}
      </div>
      {
        user.admin &&
        <button
          className="btn btn-sm btn-danger"
          type="button"
          onClick={handleDeleteGroup}
          name={group.id}
        >
          Delete Group
        </button>
      }
    </React.Fragment>
  );

export default GroupCard;
