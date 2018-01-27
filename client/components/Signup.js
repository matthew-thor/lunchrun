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
    <div>
      <form
        className="auth-form"
        onSubmit={handleSubmit}
        name="test"
        /**
         * needs to be changed later to use actual group ID
         */
        data-groupid={gId || 1}
        data-invitecode={code}
      >
        <div>
          {!code &&
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="invite-code">
                <small>Invite code</small>
              </label>
              <div className="col-sm-9">
                <input
                  name="invite-code"
                  type="text"
                  className="form-control"
                  placeholder="Invite code"
                />
              </div>
            </div>
          }
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="first-name">
              <small>First Name</small>
            </label>
            <div className="col-sm-9">
              <input
                name="first-name"
                type="text"
                className="form-control"
                placeholder="First Name" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="last-name">
              <small>Last Name</small>
            </label>
            <div className="col-sm-9">
              <input
                name="last-name"
                type="text"
                className="form-control"
                placeholder="Last Name" />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="email">
            <small>Email</small>
          </label>
          <div className="col-sm-9">
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="Email"
              defaultValue={email} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="password">
            <small>Password</small>
          </label>
          <div className="col-sm-9">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password" />
          </div>
        </div>
        <div className="form-group row has-error">
          <label className="col-sm-3 col-form-label" htmlFor="password-retype">
            <small>Re-type Password</small>
          </label>
          <div className="col-sm-9">
            <input
              name="password-retype"
              className="form-control"
              type="password"
              placeholder="Re-type Password" />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-lg btn-default">
            Sign up
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
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
        code: event.target.attributes['data-invitecode']
          ? event.target.attributes['data-invitecode'].value
          : event.target['invite-code'].value,
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
