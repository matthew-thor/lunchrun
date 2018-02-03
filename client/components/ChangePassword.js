import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { changePasswordMutation } from '../mutations';
import { me } from '../store';

const ChangePassword = ({
  user,
  changePassword,
  successRedirect,
  handleClick,
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
    <form className="change-password-form" onSubmit={handleSubmit}>
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
      <input
        name="current-pw"
        type="password"
        className="input"
        placeholder="Current Password" />
      <input
        name="new-pw"
        type="password"
        className="input"
        placeholder="New Password" />
      <input
        name="new-pw-retype"
        className="input"
        type="password"
        placeholder="Re-type New Password" />
      <div>
        <button
          type="submit"
          className="btn btn-default"
          data-target=".change-pw-success-modal"
        >
          Submit
      </button>
      </div>
      <button className="btn btn-default" onClick={handleClick}>Cancel</button>
    </form>
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
