import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../store';
import qs from 'query-string';

/**
 * COMPONENT
 */
const Signup = props => {
  const { handleSubmit, error } = props;
  const { email, gId, code } = qs.parse(props.location.search);

  return (
    <form
      className="container-auth signup"
      onSubmit={handleSubmit}
      /**
       * needs to be changed later to use actual group ID
       */
      data-groupid={gId || 1}
      data-invitecode={code}
    >
      {!code &&
        <div className="item-input">
          <input
            name="invite-code"
            type="text"
            className="input"
            placeholder="Invite code"
            defaultValue={code}
          />
        </div>
      }
      <div className="item-input">
        <input
          name="first-name"
          type="text"
          className="input"
          placeholder="First Name" />
      </div>
      <div className="item-input">
        <input
          name="last-name"
          type="text"
          className="input"
          placeholder="Last Name" />
      </div>
      <div className="item-input">
        <input
          name="email"
          type="text"
          className="input"
          placeholder="Email"
          defaultValue={email} />
      </div>
      <div className="item-input">
        <input
          name="password"
          type="password"
          className="input"
          placeholder="Password" />
      </div>
      <div className="item-input">
        <input
          name="password-retype"
          className="input"
          type="password"
          placeholder="Re-type Password" />
      </div>
      <div className="item-button">
        <button type="submit" className="btn btn-lg btn-default">Sign up</button>
      </div>
      {error && error.response && <div> {error.response.data} </div>}
    </form>
  );
};

const mapState = state => {
  return { error: state.user.error };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const userData = {
        email: event.target.email.value,
        password: event.target.password.value,
        code: event.target['invite-code'].value,
        firstName: event.target['first-name'].value,
        lastName: event.target['last-name'].value,
        groupId: event.target.attributes['data-groupid'].value,
      };
      dispatch(signup(userData));
    },
  };
};


export default connect(mapState, mapDispatch)(Signup);

/**
* PROP TYPES
*/
Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
