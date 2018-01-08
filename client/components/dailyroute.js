import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const DailyRoute = props => {
  const { user, run } = props;
  const route = run.route;

  return (
    <div className="route-title">
      <h3>Today's route: {route.name}</h3>
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

export default connect(mapState)(DailyRoute);

/**
 * PROP TYPES
 */
DailyRoute.propTypes = {
  user: PropTypes.object,
};
