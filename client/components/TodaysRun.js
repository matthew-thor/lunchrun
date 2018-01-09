import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const TodaysRun = props => {
  const { user, run } = props;
  const route = run.route || null;

  return (
    <div className="route-title">
      <h3>Today's route: {route ? route.name : 'TBA'}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    run: state.run,
  };
};

export default connect(mapState)(TodaysRun);

/**
 * PROP TYPES
 */
TodaysRun.propTypes = {
  user: PropTypes.object,
};
