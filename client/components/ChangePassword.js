import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { changePasswordMutation } from '../mutations';
import { me } from '../store';
import history from '../history';

const ChangePassword = ({
  user,
  changePassword,
  successRedirect,
 }) => {
  const displaySuccessMessageAndRedirect = () => {
    const modal = $('.change-pw-success-modal');
    modal.modal({ focus: true });
    setTimeout(() => {
      modal.modal('toggle');
      successRedirect();
    }, 1300);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // handle this with future validations
    if (event.target['new-pw'].value !== event.target['new-pw-retype'].value) {
      return new Error('passwords must match');
    }

    const res = await changePassword({
      variables: {
        userId: user.id,
        currentPw: event.target['current-pw'].value,
        newPw: event.target['new-pw'].value,
      },
    });

    if (res.data) displaySuccessMessageAndRedirect();
  };

  return (
    <div className="container change-password-form">
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade change-pw-success-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <br /><span><i className="fas fa-check" /> Password changed</span><br />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="current-pw">
            <small>Current Password</small>
          </label>
          <div className="col-sm-9">
            <input
              name="current-pw"
              type="password"
              className="form-control"
              placeholder="Current Password" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="new-pw">
            <small>New Password</small>
          </label>
          <div className="col-sm-9">
            <input
              name="new-pw"
              type="password"
              className="form-control"
              placeholder="New Password" />
          </div>
        </div>
        <div className="form-group row has-error">
          <label className="col-sm-3 col-form-label" htmlFor="new-pw-retype">
            <small>Re-type New Password</small>
          </label>
          <div className="col-sm-9">
            <input
              name="new-pw-retype"
              className="form-control"
              type="password"
              placeholder="Re-type New Password" />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-lg btn-default"
            data-target=".change-pw-success-modal"
          >
            Submit changes
      </button>
        </div>
      </form>
    </div>
  );
};

const mapState = state => ({ user: state.user });

const mapDispatch = dispatch => {
  return {
    successRedirect() {
      dispatch(me());
    },
  };
};

const ChangePasswordConnected = connect(mapState, mapDispatch)(ChangePassword);

export default compose(
  graphql(changePasswordMutation, { name: 'changePassword' }),
)(ChangePasswordConnected);

/**
 * PROP TYPES
 */
ChangePassword.propTypes = { user: PropTypes.object };
