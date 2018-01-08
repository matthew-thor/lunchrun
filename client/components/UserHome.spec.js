/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserHome } from './UserHome';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('UserHome', () => {
  let userHome;

  const bento = { firstName: 'Bento', lastName: 'Thor' };

  beforeEach(() => {
    userHome = shallow(<UserHome user={bento} />);
  });

  it('renders user.firstName in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal(`Hey, ${bento.firstName}!`);
  });
});
