import axios from 'axios';
import history from '../history';
import { testClog } from '../../utils';

/**
 * ACTION TYPES
 */
const GET_RUN = 'GET_RUN';
const UPDATE_RUN = 'UPDATE_RUN';

/**
 * INITIAL STATE
 */
const defaultRun = {};

/**
 * ACTION CREATORS
 */
const getRun = run => ({ type: GET_RUN, run });
const updateRun = run => ({ type: UPDATE_RUN, run });

/**
 * THUNK CREATORS
 */
export const fetchRun = dateStamp => async dispatch => {
  try {
    const res = await axios.get(`/api/runs/date/${dateStamp}`);
    dispatch(getRun(res.data || defaultRun));
  }
  catch (err) { console.log('Fetching run unsuccessful', err); }
};

export const editRun = run => async dispatch => {
  dispatch(updateRun(run));
  try {
    await axios.put(`/api/runs/${run.id}`, run);
  }
  catch (err) { console.log('Updating run unsuccessful', err); }
};

/**
 * REDUCER
 */
export default function (state = defaultRun, action) {
  switch (action.type) {
    case GET_RUN:
      return action.run;
    case UPDATE_RUN:
      return action.run;
    default:
      return state;
  }
}
