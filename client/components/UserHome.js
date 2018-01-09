import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TodaysRun, Admin} from '../components';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {user} = props;

  return (
    <div>
      <h3>Hey, {user.firstName}!</h3>
      <TodaysRun />
      {user.admin && <Admin />}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object,
};
