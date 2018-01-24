import React from 'react';
import { graphql, compose } from 'react-apollo';
// import { todaysRunAdminQuery } from '../queries';
import { inviteUserMutation } from '../mutations';

/**
 * COMPONENT
 */


const Invite = ({
  groupId,
  inviteUser,
}) => {
  const displaySuccessMessage = () => {
    const modal = $('.success-modal');
    modal.modal({ focus: true });
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
    <div className="container invite-form input-form">
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade success-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <br /><span><i className="fa fa-envelope" /> Email sent</span><br />
            </div>
          </div>
        </div>
        <h3>Invite someone:</h3>
        <div className="route-title row justify-content-center">
          <div className="col-sm-6 left-col">
            <h2>Email:</h2>
          </div>
          <div className="col-sm-6 right-col">
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="email@domain.com"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-default"
          // data-toggle="modal"
          data-target=".success-modal"
        >
          Send email
        </button>
      </form>
    </div>
  );
};

export default compose(
  graphql(inviteUserMutation, { name: 'inviteUser' }),
)(Invite);
