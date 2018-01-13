import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Admin = ({ user }) => {

  return (
    <div>
      <h3>Admin options:</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

export default connect(mapState)(Admin);

/**
 * PROP TYPES
 */
Admin.propTypes = { user: PropTypes.object };
