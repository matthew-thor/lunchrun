import axios from 'axios';
import { normalize, schema } from 'normalizr';
import moment from 'moment-timezone';
import history from '../history';
import { testClog } from '../../utils';

/**
 * NORMALIZR
 * https://github.com/paularmstrong/normalizr
 *
 * Set up schema to normalize 'run' state below
 */

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
export const fetchRun = () => async dispatch => {
  try {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const res = await axios.get(`/api/runs/date/${today}`);
    dispatch(getRun(res.data || defaultRun));
  }
  catch (err) { console.log('Fetching run unsuccessful', err); }
};

export const editRun = run => async dispatch => {
  dispatch(updateRun(run));
  try {
    const res = await axios.put(`/api/runs/${run.id}`, run);
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