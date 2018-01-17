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
const adminRunOptionsQuery = gql`
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
        name
      }
    }
  }
`;

/**
 * COMPONENT
 */
export const TodaysRunAdmin = ({
  user,
  data: { loading, error, run, allRoutes }
}) => {

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="container admin-run-options">
      <div className="row justify-content-center">
        <h3>Admin options:</h3>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-6 left-col">
          Set route:
        </div>
        <div className="col-sm-6 right-col">
          <select className="route-select" defaultValue="default">
            <option disabled="true" value="default">Select route</option>
            {
              allRoutes.map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

const TodaysRunAdminConnected = connect(mapState)(TodaysRunAdmin);

export default compose(
  graphql(adminRunOptionsQuery, { options: { variables: { today: today } } })
)(TodaysRunAdminConnected);

/**
 * PROP TYPES
 */
TodaysRunAdmin.propTypes = { user: PropTypes.object };
