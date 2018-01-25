import React from 'react';
import { graphql, compose } from 'react-apollo';
import { groupEmailsQuery } from '../queries';
import { updateEmailScheduleMutation } from '../mutations';

/**
 * COMPONENT
 */
const GroupEmails = ({
  groupId,
  data: { loading, error, group },
  updateEmailSchedule,
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

  const testMutation = async event => {
    event.preventDefault();
    const res = await updateEmailSchedule({
      variables: {
        groupId,
        type: 'first',
        time: '18:45',
      },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: groupEmailsQuery,
        variables: {
          groupId: groupId,
        },
      }],
    });
  };

  return (
    <div className="container group-emails input-form">
      {/* MODAL TEMPLATE
        <div className="modal fade success-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <br /><span><i className="fa fa-check" /> Changes saved</span><br />
            </div>
          </div>
        </div>
        */}
      <div className="row">
        <div className="col-sm-6 left-col">
          First email:
        </div>
        <div className="col-sm-6 right-col">
          {group.emails.filter(e => e.type === 'first')[0].time}
        </div>
        <div className="col-sm-6 left-col">
          Second email:
          </div>
        <div className="col-sm-6 right-col">
          {group.emails.filter(e => e.type === 'update')[0].time}
        </div>
      </div>
      <button onClick={testMutation}>Test button</button>
    </div>
  );
};


/**
 * CONTAINER
 */
export default compose(
  graphql(groupEmailsQuery, {
    options: props => ({
      variables: {
        groupId: props.groupId,
      },
    }),
  }),
  graphql(updateEmailScheduleMutation, { name: 'updateEmailSchedule' }),
)(GroupEmails);
