import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import moment from 'moment-timezone';
import { participantsQuery } from '../queries';
import { updateParticipantMutation } from '../mutations';

const today = moment(new Date()).format('YYYY-MM-DD');

const Participants = ({
  user,
  updateParticipant,
  data: { loading, error, run },
}) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const handleMouseUp = event => {
    event.preventDefault();
    updateParticipant({
      variables: {
        userId: user.id,
        runId: run.id,
        type: event.target.name,
      },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: participantsQuery,
        variables: { today: today },
      }],
      /* NOT WORKING BUT WILL NEED LATER
      optimisticResponse: {
        updateParticipant: {
          userId: user.id,
          runId: run.id,
          comment: event.target.value || null,
          __typename: 'Participant',
        },
      },
      update: (store, { data: { updateParticipant } }) => {
        const data = store.readQuery({ query: todaysRunQuery });

        data.run.participants.push(updateParticipant);
        store.writeQuery({ query: todaysRunQuery, data });
      }, */
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateParticipant({
      variables: {
        userId: user.id,
        runId: run.id,
        type: 'comment',
        comment: event.target.comment.value,
      },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: participantsQuery,
        variables: { today: today },
      }],
    });
    event.target.comment.value = '';
  };

  return (
    <div className="participants">
      <h3>Who's in?</h3>
      <ul>
        {
          run.participants.map(u => {
            const comment = u.comment ? ' - ' + u.comment : null;
            return (<li key={u.userId}>
              {u.user.fullName}{comment}
            </li>);
          })
        }
      </ul>
      {
        run.participants.find(p => p.userId === user.id) &&
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group row justify-content-center">
              <label className="col-sm-3 col-form-label" htmlFor="comment">
                Put a note in here:
              </label>
              <div className="col-sm-6">
                <input
                  name="comment"
                  className="form-control"
                  type="text"
                  placeholder="Doing a workout? Going to be late?" />
              </div>
              <div className="col-sm-1">
                <button type="submit" className="btn btn-md btn-default">
                  Submit
                </button>
              </div>
              {run.participants.find(p => (p.userId === user.id && p.comment)) &&
                <div className="col-sm-2">
                  <button className="btn btn-md btn-danger">
                    Remove
                  </button>
                </div>
              }
            </div>
          </form>
          <button name="out" onMouseUp={handleMouseUp} className="btn btn-lg btn-default">
            I'm out
          </button>
        </div>
      }
      {
        !run.participants.find(p => p.userId === user.id) &&
        <button name="in" onMouseUp={handleMouseUp} className="btn btn-lg btn-default">
          I'm in!
        </button>
      }
    </div>
  );
};

/**
* CONTAINER
*/
const mapState = state => ({ user: state.user });

const ParticipantsConnected = connect(mapState)(Participants);

export default compose(
  graphql(participantsQuery, { options: { variables: { today: today } } }),
  graphql(updateParticipantMutation, { name: 'updateParticipant' })
)(ParticipantsConnected);

/**
 * PROP TYPES
 */
Participants.propTypes = {
  user: PropTypes.object,
  updateParticipant: PropTypes.func.isRequired,
};
