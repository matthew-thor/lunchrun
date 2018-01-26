import React from 'react';
import { graphql, compose } from 'react-apollo';
import { addRouteMutation } from '../mutations';

/**
 * COMPONENT
 */


const AddRoute = ({
  groupId,
  addRoute,
}) => {
  const displaySuccessMessage = () => {
    const modal = $('.add-route-success-modal');
    modal.modal({ focus: true });
    setTimeout(() => { modal.modal('toggle'); }, 1300);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(event.target.map.value)
    const res = await addRoute({
      variables: {
        name: event.target.name.value,
        map: event.target.map.value || undefined,
        groupId,
      },
    });

    if (res.data) displaySuccessMessage();
  };

  return (
    <div className="container invite-form input-form">
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade add-route-success-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <br /><span><i className="fas fa-check" /> Route added</span><br />
            </div>
          </div>
        </div>
        <h3>Add a new route:</h3>
        <div className="route-title row justify-content-center">
          <div className="col-sm-6 left-col">
            <h4>Name:</h4>
          </div>
          <div className="col-sm-6 right-col">
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Name your route"
            />
          </div>
        </div>
        <div className="route-title row justify-content-center">
          <div className="col-sm-6 left-col">
            <h4>Link to map:</h4>
          </div>
          <div className="col-sm-6 right-col">
            <input
              name="map"
              type="text"
              className="form-control"
              placeholder="MapMyRun, Gmap-pedometer, etc."
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-default"
          data-target=".add-route-success-modal"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default compose(
  graphql(addRouteMutation, { name: 'addRoute' }),
)(AddRoute);
