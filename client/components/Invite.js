import React from 'react';
import { graphql, compose } from 'react-apollo';
import { inviteUserMutation } from '../mutations';

/**
 * COMPONENT
 */

const Invite = ({
  groupId,
  inviteUser,
}) => {
  const displaySuccessMessage = () => {
    const modal = $('.invite-success-modal');
    modal.modal('toggle');
    setTimeout(() => { modal.modal('toggle'); }, 1300);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const res = await inviteUser({
      variables: {
        email: event.target.email.value,
        groupId,
      },
    });

    if (res.data) displaySuccessMessage();
  };

  return (
    <React.Fragment>
      <div
        className="modal fade invite-success-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <br /><span><i className="fas fa-envelope" /> Email sent</span><br />
          </div>
        </div>
      </div>
      <form className="container-invite-form" onSubmit={handleSubmit}>
        <div className="item">
          Send invite:
        </div>
        <input
          name="email"
          type="text"
          className="input"
          placeholder="email@domain.com"
        />
        <button
          type="submit"
          className="btn btn-lg btn-default"
          data-target=".invite-success-modal"
        >
          Send
        </button>
      </form>
    </React.Fragment>
  );
};

export default compose(
  graphql(inviteUserMutation, { name: 'inviteUser' }),
)(Invite);
