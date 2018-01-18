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
    const modal = $('.success-modal');
    modal.modal({ focus: true });
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
        routeId: routeId,
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
    <div className="container todays-run-admin">
      <form onSubmit={handleSubmit}>
        <div className="modal fade success-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <br /><span><i className="fa fa-check" /> Changes saved</span><br />
            </div>
          </div>
        </div>
        <div className="route-title row justify-content-center">
          <div className="col-sm-6 left-col">
            <h3>Today's route:</h3>
          </div>
          <div className="col-sm-6 right-col">
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
        <button type="submit" className="btn btn-lg btn-default" data-toggle="modal" data-target=".success-modal">Save changes</button>
      </form>
      <br /><br />
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
