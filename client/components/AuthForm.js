import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
        {name === 'signup' &&
          <div>
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
        }
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="email">
            <small>Email</small>
          </label>
          <div className="col-sm-9">
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="Email" />
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
        {name === 'signup' &&
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
        }
        <div>
          <button type="submit" className="btn btn-lg btn-default">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google" className="btn btn-social btn-google">
        <i className="fa fa-google" />
        <span>{displayName} with Google</span>
      </a>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Log in',
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign up',
    error: state.user.error,
    invited: false,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
