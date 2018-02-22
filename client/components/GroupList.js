import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { deleteGroupMutation } from '../mutations';
import { siteAdminQuery } from '../queries';
import { GroupCard } from '../components';

/**
 * COMPONENT
 */


const GroupList = ({
  user,
  groups,
  deleteGroup,
}) => {
  const displayDeleteMessage = () => {
    const modal = $('.delete-group-success-modal');
    modal.modal({ focus: true });
    setTimeout(() => { modal.modal('toggle'); }, 1300);
  };

  const handleDeleteGroup = async event => {
    event.preventDefault();
    const res = await deleteGroup({
      variables: { groupId: event.target.name },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: siteAdminQuery,
      }],
    });

    if (res.data) displayDeleteMessage();
  };

  return (
    <React.Fragment>
      <div
        className="modal fade red-modal delete-group-success-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <br /><span><i className="fas fa-check" /> Group deleted</span><br />
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
      <div className="container-group-list">
        <div className="group-list">
          {
            groups.map(g => (
              <GroupCard
                key={g.id}
                group={g}
                user={user}
                handleDeleteGroup={handleDeleteGroup}
              />
            ))
          }
        </div>
      </div>
    </React.Fragment>
  );
};

const mapState = state => ({ user: state.user });

const GroupListConnected = connect(mapState)(GroupList);

export default compose(
  graphql(deleteGroupMutation, { name: 'deleteGroup' }),
)(GroupListConnected);
