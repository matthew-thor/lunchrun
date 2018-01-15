import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment-timezone';

const today = moment(new Date()).format('YYYY-MM-DD');

const todaysRunQuery = gql`
  query LandingQuery($today: String!) {
    run(date: $today) {
      id
      date
      startTime
      route {
        name
      }
      participants {
        userId
        comment
        user {
          email
          fullName
        }
      }
    }
  }
`;

const updateParticipantMutation = gql`
  mutation updateParticipant(
    $userId: Int!,
    $runId: Int!,
    $type: String!,
    $comment: String
  ) {
    updateParticipant(
      userId: $userId,
      runId: $runId,
      type: $type,
      comment: $comment
    ) {
      userId
      runId
      comment
    }
  }
`;

/**
 * COMPONENT
 */
const TodaysRun = ({
  user,
  data: { loading, error, run },
  updateParticipant,
}) => {
  /** EXAMPLE EVENT HANDLER
   const handleKeyUp = async event => {
     event.preventDefault();
     if (event.keyCode === 13) {
       event.persist();
       await mutate({
         variables: { name: event.target.value },
         refetchQueries: [{
           query: todaysRunQuery,
           variables: { today: today },
          }],
        });
        event.target.value = '';
      }
    };

    JSX:
    <input
    type="text"
    placeholder="New route"
    onKeyUp={handleKeyUp}
    />
    */
  const handleMouseUp = event => {
    event.preventDefault();
    event.persist();
    updateParticipant({
      variables: {
        userId: user.id,
        runId: run.id,
        type: event.target.name,
        comment: event.target.value,
      },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: todaysRunQuery,
        variables: { today: today },
      }],
      /* NOT WORKING BUT WILL NEED LATER
      optimisticResponse: {
        updateParticipant: {
          userId: user.id,
          runId: run.id,
          comment: event.target.value || null,
          __typename: 'Participant',
        },
      },
      update: (store, { data: { updateParticipant } }) => {
        const data = store.readQuery({ query: todaysRunQuery });

        data.run.participants.push(updateParticipant);
        store.writeQuery({ query: todaysRunQuery, data });
      }, */
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const route = run.route || null;

  return (
    <div>
      <div className="route-title">
        <h3>Today's route: {route ? route.name : 'TBA'}</h3>
      </div>
      <div className="start-time">
        <h3>Start time: {run.startTime}</h3>
      </div>
      <div className="participants">
        <h3>Who's in?</h3>
        <ul> {run.participants.map(u => <li key={u.userId}>{u.user.fullName}</li>)}</ul>
      </div>
      <button name="in" onMouseUp={handleMouseUp} className="btn btn-lg btn-default">
        I'm in!
        </button>
      <button name="out" onMouseUp={handleMouseUp} className="btn btn-lg btn-default">
        I'm out
        </button>
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
