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
    console.log(event.target.name)
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
    <div className="container-participants">
      <h3>Who's in?</h3>
      <div className="participant-list">
        {
          !run.participants.length &&
          <div className="name-only">Nobody's in yet!</div>
        }
        {
          run.participants.map(u => {
            if (!u.comment) {
              return (
                <div className="name-only" key={u.userId}>
                  {u.user.fullName}
                </div>
              );
            } else {
              return (
                <React.Fragment key={u.userId}>
                  <div className="name">
                    {u.user.fullName}
                  </div>
                  <div className="comment" key={u.comment}>
                    {'  - "' + u.comment + '"'}
                  </div>
                </React.Fragment>
              );
            }
          })
        }
      </div>
      {
        run.participants.find(p => p.userId === user.id) &&
        <React.Fragment>
          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              name="comment"
              className="input"
              type="text"
              placeholder="Workout? Late? Add a note"
            />
            <button type="submit" className="btn btn-md btn-default">
              Submit
            </button>
            {
              run.participants.find(p => (p.userId === user.id && p.comment)) &&
              <button className="btn btn-md btn-danger">
                Remove
              </button>
            }
          </form>
          <div className="out">
            <button name="out" onMouseUp={handleMouseUp} className="btn btn-lg button-default">
              I'm out
            </button>
          </div>
        </React.Fragment>

      }
      {
        !run.participants.find(p => p.userId === user.id) &&
        <div className="in">
          <button name="in" onMouseUp={handleMouseUp} className="btn btn-lg btn-default">
            I'm in!
          </button>
        </div>
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
