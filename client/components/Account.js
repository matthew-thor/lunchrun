import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { accountQuery } from '../queries';
// import { Invite } from '../components';

/**
 * groupId needs to be changed later to reflect actual group
 */
const groupId = 1;

/**
 * COMPONENT
 */
const Account = ({
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
      <h3>Name: {user.fullName}</h3>
      <h3>Email: {user.email}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

const AccountConnected = connect(mapState)(Account);

export default compose(
  graphql(accountQuery, {
    options: {
      variables: {
        groupId: groupId,
      },
    },
  }),
)(AccountConnected);

/**
 * PROP TYPES
 */
Account.propTypes = { user: PropTypes.object };
