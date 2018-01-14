import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const AdminRunOptions = ({ user }) => {

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

export default connect(mapState)(AdminRunOptions);

/**
 * PROP TYPES
 */
AdminRunOptions.propTypes = { user: PropTypes.object };
