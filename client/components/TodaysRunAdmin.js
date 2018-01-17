import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment-timezone';

const today = moment(new Date()).format('YYYY-MM-DD');

/**
 * QUERIES
 */
const todaysRunAdminQuery = gql`
  query TodaysRunAdminQuery($today: String!) {
    allRoutes {
      id
      name
    }
    run(date: $today) {
      id
      date
      startTime
      route {
        id
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
export const TodaysRunAdmin = ({
  user,
  data: { loading, error, run, allRoutes },
  updateParticipant,
}) => {
  const handleSubmit = event => {
    event.preventDefault();
    console.log(event.target['start-time'].placeholder);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const route = run.route || null;

  return (
    <form className="container todays-run-admin" onSubmit={handleSubmit}>
      <div className="route-title row justify-content-center">
        <div className="col-sm-6 left-col">
          <h3>Today's route:</h3>
        </div>
        <div className="col-sm-6 right-col">
          <select className="route-select" defaultValue={route.name || 'default'}>
            {!route &&
              <option disabled="true" value="default">Select route</option>
            }
            {
              allRoutes.map(r => {
                if (route && r.id === route.id) {
                  return (<option key={r.id} value={r.name}>{r.name}</option>);
                }
                else {
                  return (<option key={r.id} value={r.name}>{r.name}</option>);
                }
              })
            }
          </select>
        </div>
      </div>
      <div className="start-time row">
        <div className="col-sm-6 left-col">
          <h3>Start time:</h3>
        </div>
        <div className="col-sm-6 right-col">
          <input
            name="start-time"
            type="text"
            className="form-control"
            placeholder={run.startTime ? run.startTime.slice(0, -3) : 'TBA'}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-lg btn-default">Save changes</button>
    </form>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

const TodaysRunAdminConnected = connect(mapState)(TodaysRunAdmin);

export default compose(
  graphql(todaysRunAdminQuery, { options: { variables: { today: today } } }),
  graphql(updateParticipantMutation, { name: 'updateParticipant' })
)(TodaysRunAdminConnected);

/**
 * PROP TYPES
 */
TodaysRunAdmin.propTypes = {
  user: PropTypes.object,
  updateParticipant: PropTypes.func.isRequired,
};
