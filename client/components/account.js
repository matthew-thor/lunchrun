import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
export const Account = props => {
  const {user} = props;

  return (
    <div>
      <h3>Name: {user.fullName}</h3>
      <h3>Email: {user.email}</h3>
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

export default connect(mapState)(Account);

/**
 * PROP TYPES
 */
Account.propTypes = {
  user: PropTypes.object
};
