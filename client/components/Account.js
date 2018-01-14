import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Account = ({ user }) => {

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
const mapState = state => ({ user: state.user });

export default connect(mapState)(Account);

/**
 * PROP TYPES
 */
Account.propTypes = { user: PropTypes.object };
