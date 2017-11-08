import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
export const DailyRoute = props => {
  const {user} = props;

  return (
    <div>
      <h3>Today's route:</h3>
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

export default connect(mapState)(DailyRoute);

/**
 * PROP TYPES
 */
DailyRoute.propTypes = {
  user: PropTypes.object
};
