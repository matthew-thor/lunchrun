import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import moment from 'moment-timezone';
import { todaysRunAdminQuery } from '../queries';
import { updateRunMutation } from '../mutations';
import { Participants } from '../components';

/**
 * groupId needs to be changed later to reflect actual group
 */
const groupId = 1;

const today = moment(new Date()).format('YYYY-MM-DD');

/**
 * COMPONENT
 */
const TodaysRunAdmin = ({
  user,
  data: { loading, error, run, group },
  updateRun,
}) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const displaySuccessMessage = () => {
    const modal = $('.todays-run-success-modal');
    modal.modal('toggle');
    setTimeout(() => { modal.modal('toggle'); }, 1300);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const routeId = event.target['route-select'].value === 'default'
      ? null
      : group.routes.find(r => r.name === event.target['route-select'].value).id;
    const res = await updateRun({
      variables: {
        runId: run.id,
        startTime: event.target['start-time'].value || event.target['start-time'].placeholder,
        routeId,
      },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: todaysRunAdminQuery,
        variables: {
          today: today,
          /**
           * groupId needs to be changed later to reflect actual group
           */
          groupId: groupId,
        },
      }],
    });
    if (res.data) displaySuccessMessage();
  };

  const route = run.route || null;

  return (
    <div className="container-todays-run-admin">
      <form onSubmit={handleSubmit}>
        <div className="modal fade todays-run-success-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <br /><span><i className="fas fa-check" /> Changes saved</span><br />
            </div>
          </div>
        </div>
        <h3>Today's route:</h3>
        <select
          name="route-select"
          className="route-select form-control"
          defaultValue={route ? route.name : 'default'}
        >
          {!route &&
            <option disabled="true" value="default">Select route</option>
          }
          {
            group.routes.map(r => {
              if (route && r.id === route.id) {
                return (<option key={r.id} value={r.name}>{r.name}</option>);
              }
              else {
                return (<option key={r.id} value={r.name}>{r.name}</option>);
              }
            })
          }
        </select>
        <h3>Start time:</h3>
        <input
          name="start-time"
          type="time"
          className="input"
          defaultValue={run.startTime}
        />
        <div className="item-button">
          <button type="submit" className="btn btn-default" data-target=".todays-run-success-modal">Save changes</button>
        </div>
      </form>
      <Participants />
    </div>
  );
};


/**
 * CONTAINER
 */
const mapState = state => ({ user: state.user });

const TodaysRunAdminConnected = connect(mapState)(TodaysRunAdmin);

export default compose(
  graphql(todaysRunAdminQuery, {
    options: {
      variables: {
        today: today,
        /**
         * groupId needs to be changed later to reflect actual group
         */
        groupId: groupId,
      },
    },
  }),
  graphql(updateRunMutation, { name: 'updateRun' }),
)(TodaysRunAdminConnected);

/**
 * PROP TYPES
 */
TodaysRunAdmin.propTypes = {
  user: PropTypes.object,
  updateRun: PropTypes.func.isRequired,
};
