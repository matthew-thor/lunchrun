import React from 'react';
import { Link } from 'react-router-dom';

const Landing = props => {
  return (
    <div className="inner cover">
      <h1 className="cover-heading">Loop Lunch Run</h1>
      <p className="lead">Making Lou's life easier, one website at a time.</p>
      <p className="lead">
        <Link to="/login" className="btn btn-lg btn-default">Log in</Link>
        <span className="spacer" />
        <Link to="/signup" className="btn btn-lg btn-default">Sign up</Link>
      </p>
    </div>
  );
};

export default Landing;
