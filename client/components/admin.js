import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
export const Admin = props => {
  const {user} = props;

  return (
    <div>
      <h3>Admin options:</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(Admin);

/**
 * PROP TYPES
 */
Admin.propTypes = {
  user: PropTypes.object
};
