import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Main, Login, Signup, UserHome, Landing, Account, GroupAdmin, SiteAdmin } from './components';
import { me } from './store';
import { graphql, compose } from 'react-apollo';
import { routesQuery } from './queries';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {
      isLoggedIn,
      user,
      data: { loading, error, group },
     } = this.props;

    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const isGroupAdmin = group.admins.find(u => u.id === user.id);
    const isSiteAdmin = user.admin;

    return (
      <Router history={history}>
        <Main
          isGroupAdmin={isGroupAdmin}
          isSiteAdmin={isSiteAdmin}
        // groupId={group.id}
        >
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isSiteAdmin &&
              <Route path="/admin" component={SiteAdmin} />
            }
            {
              isGroupAdmin &&
              <Route path="/groupadmin" component={GroupAdmin} groupId={group.id} />
            }
            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
                <Route path="/account" component={Account} />
                <Route component={UserHome} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Landing} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

const RoutesConnected = connect(mapState, mapDispatch)(Routes);

export default compose(
  graphql(routesQuery, { options: props => ({ variables: { groupId: props.groupId } }) }),
)(RoutesConnected);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
