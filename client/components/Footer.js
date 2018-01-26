import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span>
          Made and maintained by Matthew Thor
        </span>
        <a href="mailto:mjthor@gmail.com"><i className="fas fa-envelope-open" /></a>
        <a href="https://github.com/matthew-thor"><i className="fab fa-github" /></a>
        <a href="https://www.linkedin.com/in/matthew-thor/"><i className="fab fa-linkedin-in" /></a>
      </div>
    </footer>
  );
};


// const mapState = state => ({user: state.user });

// export default connect(mapState)(Landing);

export default Footer;

/**
 * PROP TYPES
 */
// Landing.propTypes = {user: PropTypes.object };
