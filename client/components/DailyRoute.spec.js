/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DailyRoute } from './DailyRoute';
import { testClog } from '../../utils';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('DailyRoute', () => {
  let dailyRoute;

  const bento = { firstName: 'Bento', lastName: 'Thor' };
  const chili = { firstName: 'Chili', lastName: 'Thor' };
  const monkeyTree = { name: 'Monkey Tree' };
  const NYE2018 = {
    date: '2018-12-31',
    startTime: '12:07:00',
    route: monkeyTree,
    participants: [bento, chili],
  };

  beforeEach(() => {
    dailyRoute = shallow(<DailyRoute run={NYE2018} />);
  });

  it('renders the name of the route in an h3', () => {
    console.log('test', dailyRoute.find('.route-title').find('h3'));
    expect(dailyRoute.find('.route-title').find('h3').text()).to.be.equal(`Today's route: ${monkeyTree.name}`);
  });

  xit('renders the date in an h3', () => {
    expect(dailyRoute.find('.run-date').find('h3').text()).to.be.equal(`${NYE2018.date}`);
  });

  xit('renders the start time in an h3', () => {
    expect(dailyRoute.find('run-start-time').find('h3').text()).to.be.equal(`Start time: ${NYE2018.startTime}!`);
  });

  xit('renders the participants', () => {
    expect(dailyRoute.find('.run-participants').children()).to.have.length(NYE2018.participants.length);
  });
});
