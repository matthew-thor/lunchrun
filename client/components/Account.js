import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { accountQuery } from '../queries';
import { ChangePassword } from '../components';

/**
 * groupId needs to be changed later to reflect actual group
 */
const groupId = 1;

/**
 * COMPONENT
 */
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordForm: false,
    };
  }

  componentWillReceiveProps() {
    this.setState({ showPasswordForm: false });
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({ showPasswordForm: !this.state.showPasswordForm });
  }

  render() {
    const {
      user,
      data: { loading, error, group },
     } = this.props;

    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const isGoogleConnected = user.googleId;

    return (
      <div className="container-account">
        <h3>Name: {user.fullName}</h3>
        <h3>Email: {user.email}</h3>
        {
          this.state.showPasswordForm
            ? <ChangePassword handleClick={this.handleClick} />
            : <button className="btn btn-default" onClick={this.handleClick}>Change password</button>
        }
        {!isGoogleConnected &&
          <a href="/auth/google/connect">
            <button type="button" className="btn btn-lg google-btn">
              <i className="fab fa-google" />
              <span>Connect Google Account</span>
            </button>
          </a>
        }
      </div>
    );
  }
}

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
