import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ user }) => {
  return (
    <div className="container-landing">
      <div className="heading">Loop Lunch Run</div>
      <div className="subtitle">Making Lou's life easier, one website at a time.</div>
      <Link to="/login" className="content left">
        <button type="button" className="btn btn-lg btn-default">Log in</button>
      </Link>
      <Link to="/signup" className="content right">
        <button type="button" className="btn btn-lg btn-default">Sign up</button>
      </Link>
    </div>
  );
};

const mapState = state => ({ user: state.user });

export default connect(mapState)(Landing);

/**
 * PROP TYPES
 */
Landing.propTypes = { user: PropTypes.object };
