import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import moment from 'moment-timezone';
import { todaysRunQuery } from '../queries';
import { updateParticipantMutation } from '../mutations';
import { Participants } from '../components';

const today = moment(new Date()).format('YYYY-MM-DD');

/**
 * COMPONENT
 */
const TodaysRun = ({
  user,
  data: { loading, error, run },
  updateParticipant,
}) => {

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const route = run.route || null;

  return (
    <div className="todays-run">
      <div className="route-title">
        <h3>Today's route: {route ? route.name : 'TBA'}</h3>
      </div>
      <div className="start-time">
        <h3>Start time: {run.startTime ? run.startTime.slice(0, -3) : 'TBA'}</h3>
      </div>
      <Participants />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

const TodaysRunConnected = connect(mapState)(TodaysRun);

export default compose(
  graphql(todaysRunQuery, { options: { variables: { today: today } } }),
  graphql(updateParticipantMutation, { name: 'updateParticipant' })
)(TodaysRunConnected);

/**
 * PROP TYPES
 */
TodaysRun.propTypes = {
  user: PropTypes.object,
  updateParticipant: PropTypes.func.isRequired,
};
