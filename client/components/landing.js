import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const today = moment(new Date()).format('YYYY-MM-DD');

const landingQuery = gql`
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

const Landing = ({ user, data: { loading, error, allRoutes, run }, mutate }) => {
  const handleKeyUp = async event => {
    event.preventDefault();
    if (event.keyCode === 13) {
      event.persist();
      await mutate({
        variables: { name: event.target.value },
        refetchQueries: [{
          query: landingQuery,
          variables: { today: today },
        }],
      });
      event.target.value = '';
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="inner cover">
      <h1 className="cover-heading">Loop Lunch Run</h1>
      <p className="lead">Making Lou's life easier, one website at a time.</p>
      <p className="lead">
        <Link to="/login" className="btn btn-lg btn-default">Log in</Link>
        <span className="spacer" />
        <Link to="/signup" className="btn btn-lg btn-default">Sign up</Link>
      </p>
    </div>
  );
};

const mapState = state => ({ user: state.user });

const LandingConnected = connect(mapState)(Landing);

export default compose(
  graphql(landingQuery, { options: { variables: { today: today } } }),
  graphql(addRouteMutation)
)(LandingConnected);

/**
 * PROP TYPES
 */
Landing.propTypes = { user: PropTypes.object };
