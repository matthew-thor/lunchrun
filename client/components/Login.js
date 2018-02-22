import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from '../store';
import qs from 'query-string';

/**
 * COMPONENT
 */
const Login = props => {
  const { handleSubmit, error } = props;
  const { email } = qs.parse(props.location.search);

  return (
    <form className="container-auth login" onSubmit={handleSubmit}>
      <input
        name="email"
        type="text"
        className="input"
        placeholder="Email"
        defaultValue={email} />
      <input
        name="password"
        type="password"
        className="input"
        placeholder="Password" />
      <div className="item-button">
        <button type="submit" className="btn btn-lg button-default">Log in</button>
      </div>
      <a href="/auth/google/login" className="item-button">
        <button type="button" className="btn btn-lg google-btn">
          <i className="fab fa-google" />
          <span>Log in with Google</span>
        </button>
      </a>
      <Link to="/reset" className="forgot-pw-link">Forgot password?</Link>
      {error && error.response && <div className="error"> {error.response.data} </div>}
    </form>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Log in',
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = 'login';
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export default connect(mapLogin, mapDispatch)(Login);

/**
 * PROP TYPES
 */
Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
