import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ user }) => {
  return (
    <div className="landing-container">
      <div className="heading">Loop Lunch Run</div>
      <div className="subtitle">Making Lou's life easier, one website at a time.</div>
      <div className="content left">
        <Link to="/login" className="btn btn-lg btn-default">Log in</Link>
      </div>
      <div className="content right">
        <Link to="/signup" className="btn btn-lg btn-default">Sign up</Link>
      </div>
    </div>
  );
};

const mapState = state => ({ user: state.user });

export default connect(mapState)(Landing);

/**
 * PROP TYPES
 */
Landing.propTypes = { user: PropTypes.object };
