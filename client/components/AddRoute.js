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
    <React.Fragment>
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
      <form className="container-add-route" onSubmit={handleSubmit}>
        <h3>Add a new route</h3>
        <div className="item">Name:</div>
        <input
          name="name"
          type="text"
          className="input"
          placeholder="Name your route"
        />
        <div className="item">Link to map:</div>
        <input
          name="map"
          type="text"
          className="input"
          placeholder="MapMyRun, Gmap-pedometer, etc."
        />
        <button
          type="submit"
          className="btn btn-lg btn-default"
          data-target=".add-route-success-modal"
        >
          Save
        </button>
      </form>
    </React.Fragment>
  );
};

export default compose(
  graphql(addRouteMutation, { name: 'addRoute' }),
)(AddRoute);
