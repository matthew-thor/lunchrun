import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { userHomeQuery } from '../queries';
import { TodaysRun, TodaysRunAdmin } from '../components';

/**
 * groupId needs to be changed later to reflect actual group
 */
const groupId = 1;

/**
 * COMPONENT
 */
export const UserHome = ({
  user,
  data: { loading, error, group },
 }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h3>Hey, {user.firstName}!</h3>
      {group.admins.find(u => u.id === user.id)
        ? <TodaysRunAdmin />
        : <TodaysRun />
      }
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

const UserHomeConnected = connect(mapState)(UserHome);

export default compose(
  graphql(userHomeQuery, {
    options: {
      variables: {
        groupId: groupId,
      },
    },
  }),
)(UserHomeConnected);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object,
};
