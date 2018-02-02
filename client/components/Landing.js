import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ user }) => {
  return (
    <div className="container-landing">
      <div className="heading">Loop Lunch Run</div>
      <div className="subtitle">Making Lou's life easier, one website at a time.</div>
      <div className="content left">
        <Link to="/login" className="btn btn-lg btn-default">Log in</Link>
      </div>
      <button type="button" className="content right btn btn-lg btn-default">
        <Link to="/signup">Sign up</Link>
      </button>
    </div>
  );
};

const mapState = state => ({ user: state.user });

export default connect(mapState)(Landing);

/**
 * PROP TYPES
 */
Landing.propTypes = { user: PropTypes.object };
