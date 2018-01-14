import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TodaysRun, AdminRunOptions } from '../components';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { user } = props;

  return (
    <div>
      <h3>Hey, {user.firstName}!</h3>
      <TodaysRun />
      {user.admin && <AdminRunOptions />}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = { user: PropTypes.object };
