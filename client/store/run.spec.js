/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { fetchRun, editRun } from './run';
import { mockAxios } from './index.spec';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';
import { testClog } from '../../utils';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;

  const initialState = { run: {} };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  describe('fetchRun', () => {
    it('eventually dispatches the GET_RUN action', async () => {
      const today = new Date().toISOString().slice(0, 10);
      const fakeRun = { date: today };

      mockAxios.onGet(`/api/runs/date/${fakeRun.date}`).replyOnce(200, fakeRun);

      await store.dispatch(fetchRun());

      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_RUN');
      expect(actions[0].run).to.be.deep.equal(fakeRun);
    });
  });

  describe('editRun', () => {
    xit('eventually dispatches the UPDATE_RUN action', async () => {
      const fakeRun = { id: 1, date: '2018-12-31' };

      mockAxios.onPut(`/api/runs/${fakeRun.id}`).replyOnce(204, fakeRun);

      await store.dispatch(editRun(fakeRun));

      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('UPDATE_RUN');
      expect(actions[0].run).to.be.deep.equal(fakeRun);
    });
  });
});
