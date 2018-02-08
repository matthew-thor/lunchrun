import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import moment from 'moment-timezone';
import { todaysRunQuery } from '../queries';
import { updateParticipantMutation } from '../mutations';
import { Participants } from '../components';

/**
 * groupId needs to be changed later to reflect actual group
 */
const groupId = 1;

const today = moment(new Date()).format('YYYY-MM-DD');

/**
 * COMPONENT
 */
const TodaysRun = ({
  user,
  data: { loading, error, run },
}) => {

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const route = run.route || null;

  return (
    <div className="container-todays-run">
      <h3>Today's route: {route ? route.name : 'TBA'}</h3>
      <h3>Start time: {run.startTime || 'TBA'}</h3>
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
  graphql(todaysRunQuery, {
    options: {
      variables: {
        today: today,
        /**
         * groupId needs to be changed later to reflect actual group
         */
        groupId: groupId,
      },
    },
  }),
  graphql(updateParticipantMutation, { name: 'updateParticipant' })
)(TodaysRunConnected);

/**
 * PROP TYPES
 */
TodaysRun.propTypes = {
  user: PropTypes.object,
};
