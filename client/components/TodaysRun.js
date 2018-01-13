import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment-timezone';

const today = moment(new Date()).format('YYYY-MM-DD');

const todaysRunQuery = gql`
  query LandingQuery($today: String!) {
    allRoutes {
      id
      name
    }
    run(date: $today) {
      id
      date
      startTime
      route {
        name
      }
      participants {
        id
        fullName
      }
    }
  }
`;

const addRouteMutation = gql`
  mutation addRoute($name: String!) {
    addRoute(name: $name) {
      id
      name
    }
  }
`;

/**
 * COMPONENT
 */
const TodaysRun = ({
  user,
  data: { loading, error, run },
  mutate,
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
        <ul> {run.participants.map(u => <li key={u.id}>{u.fullName}</li>)}</ul>
      </div>
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
  graphql(addRouteMutation)
)(TodaysRunConnected);

/**
 * PROP TYPES
 */
TodaysRun.propTypes = { user: PropTypes.object };
