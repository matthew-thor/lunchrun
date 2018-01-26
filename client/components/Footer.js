import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>Made and maintained by Matthew Thor</p>
        <p>
          <i className="fab fa-github" />
          <i className="fab fa-linkedin-in" />
        </p>
      </div>
    </footer>
  );
};

// const mapState = state => ({ user: state.user });

// export default connect(mapState)(Landing);

export default Footer;

/**
 * PROP TYPES
 */
// Landing.propTypes = { user: PropTypes.object };
