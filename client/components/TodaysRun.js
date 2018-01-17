import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment-timezone';
import { TodaysRunAdmin } from '../components';

const today = moment(new Date()).format('YYYY-MM-DD');

/**
 * QUERIES
 */
const todaysRunQuery = gql`
  query TodaysRunQuery($today: String!) {
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

/**
 * MUTATIONS
 */
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
  const handleMouseUp = event => {
    event.preventDefault();
    updateParticipant({
      variables: {
        userId: user.id,
        runId: run.id,
        type: event.target.name,
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

  const handleSubmit = event => {
    event.preventDefault();
    updateParticipant({
      variables: {
        userId: user.id,
        runId: run.id,
        type: 'comment',
        comment: event.target.comment.value,
      },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: todaysRunQuery,
        variables: { today: today },
      }],
    });
    event.target.comment.value = '';
  };

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
      <div className="participants">
        <h3>Who's in?</h3>
        <ul>
          {
            run.participants.map(u => {
              const comment = u.comment ? ' - ' + u.comment : null;
              return (<li key={u.userId}>
                {u.user.fullName}{comment}
              </li>);
            })
          }
        </ul>
      </div>
      {run.participants.find(p => p.userId === user.id) &&
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group row justify-content-center">
              <label className="col-sm-3 col-form-label" htmlFor="comment">
                Put a note in here:
              </label>
              <div className="col-sm-6">
                <input
                  name="comment"
                  className="form-control"
                  type="text"
                  placeholder="Doing a workout? Going to be late?" />
              </div>
              <div className="col-sm-1">
                <button type="submit" className="btn btn-md btn-default">
                  Submit
                </button>
              </div>
              {run.participants.find(p => (p.userId === user.id && p.comment)) &&
                <div className="col-sm-2">
                  <button className="btn btn-md btn-danger">
                    Remove
                  </button>
                </div>
              }
            </div>
          </form>
          <button name="out" onMouseUp={handleMouseUp} className="btn btn-lg btn-default">
            I'm out
          </button>
        </div>
      }
      {!run.participants.find(p => p.userId === user.id) &&
        <button name="in" onMouseUp={handleMouseUp} className="btn btn-lg btn-default">
          I'm in!
        </button>
      }
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
