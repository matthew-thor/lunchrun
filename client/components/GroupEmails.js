import React from 'react';
import { graphql, compose } from 'react-apollo';
import { groupAdminQuery } from '../queries';
import { updateEmailScheduleMutation } from '../mutations';

const getDayFromCron = cronNum => {
  switch (cronNum) {
    case 1: return 'M';
    case 2: return 'T';
    case 3: return 'W';
    case 4: return 'Th';
    case 5: return 'F';
    case 6: return 'Sa';
    case 7: return 'Su';
    default: throw new Error('not a valid day');
  }
};

const generateCheckBox = (cronNum, daysArray) => {
  const dayString = getDayFromCron(cronNum);
  let checked = false;
  if (daysArray.includes(cronNum.toString())) checked = true;

  return (
    <div className="form-check form-check-inline" key={dayString}>
      <input className="form-check-input" type="checkbox" name={'box' + cronNum} value={cronNum} defaultChecked={checked} />
      <label className="form-check-label">{dayString}</label>
    </div>
  );
};

/**
 * COMPONENT
 */
const GroupEmails = ({ group, updateEmailSchedule }) => {
  const displaySuccessMessage = () => {
    const modal = $('.email-success-modal');
    modal.modal({ focus: true });
    setTimeout(() => { modal.modal('toggle'); }, 1300);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.persist();

    let daysArray = [];
    for (let i = 1; i <= 7; i++) {
      let currentBox = `box${i}`;
      if (event.target[currentBox].checked) {
        daysArray.push(event.target[currentBox].value);
      }
    }
    const dayString = daysArray.join(',');

    await updateEmailSchedule({
      variables: {
        groupId: group.id,
        type: 'first',
        time: event.target['first-email-time'].value,
        days: dayString,
      },
    });

    const res = await updateEmailSchedule({
      variables: {
        groupId: group.id,
        type: 'update',
        time: event.target['update-email-time'].value,
        days: dayString,
      },
      refetchQueries: [{ // change this to use update and optimisticResponse
        query: groupAdminQuery,
        variables: {
          groupId: group.id,
        },
      }],
    });

    if (res.data) displaySuccessMessage();
  };

  const daysArray = group.emails[0].days.split(',');
  const allDays = [1, 2, 3, 4, 5, 6, 7];

  return (
    <React.Fragment>
      <div className="modal fade email-success-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <br /><span><i className="fas fa-check" /> Changes saved</span><br />
          </div>
        </div>
      </div>
      <form className="container-email-form" onSubmit={handleSubmit}>
        <div className="item">First email:</div>
        <input
          name="first-email-time"
          type="time"
          className="input"
          defaultValue={group.emails.filter(e => e.type === 'first')[0].time}
        />
        <div className="item">Second email:</div>
        <input
          name="update-email-time"
          type="time"
          className="input"
          defaultValue={group.emails.filter(e => e.type === 'update')[0].time}
        />
        <div className="days">
          {allDays.map(d => generateCheckBox(d, daysArray))}
        </div>
        <button type="submit" className="btn btn-lg btn-default" data-target=".email-success-modal">Submit changes</button>
      </form>
    </React.Fragment>
  );
};


/**
 * CONTAINER
 */
export default compose(
  graphql(updateEmailScheduleMutation, { name: 'updateEmailSchedule' }),
)(GroupEmails);
