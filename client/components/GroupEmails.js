import React from 'react';
import { graphql, compose } from 'react-apollo';
import { groupEmailsQuery, accountQuery } from '../queries';
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
    const modal = $('.success-modal');
    modal.modal({ focus: true });
    setTimeout(() => { modal.modal('toggle'); }, 1300);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    let daysArray = [];
    for (let i = 1; i <= 7; i++) {
      let currentBox = `box${i}`;
      if (event.target[currentBox].checked) {
        daysArray.push(event.target[currentBox].value);
      }
    }
    const dayString = daysArray.join(',');
    console.log(dayString);

    // const res = await updateEmailSchedule({
    //   variables: {
    //     groupId: group.id,
    //     type: 'first',
    //     time: '18:45',
    //     days: '1,2,3,5',
    //   },
    //   refetchQueries: [{ // change this to use update and optimisticResponse
    //     query: accountQuery,
    //     variables: {
    //       groupId: group.id,
    //     },
    //   }],
    // });
  };

  const daysArray = group.emails[0].days.split(',');
  const allDays = [1, 2, 3, 4, 5, 6, 7];

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
      <form className="first-email-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6 left-col">First email:</div>
          <div className="col-sm-6 right-col">
            {group.emails.filter(e => e.type === 'first')[0].time}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 left-col">Second email:</div>
          <div className="col-sm-6 right-col">
            {group.emails.filter(e => e.type === 'update')[0].time}
          </div>
        </div>
        <div className="row">
          {allDays.map(d => {
            return generateCheckBox(d, daysArray);
          })}
        </div>
        <button type="submit">Submit changes</button>
      </form>
    </div>
  );
};


/**
 * CONTAINER
 */
export default compose(
  graphql(updateEmailScheduleMutation, { name: 'updateEmailSchedule' }),
)(GroupEmails);
