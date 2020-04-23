import { shallow } from 'enzyme';
import React from 'react';
import CounterButton from './CounterButton';

it('expect to render CounterButton component', () => {
  expect(shallow(<CounterButton />)).toMatchSnapshot();
});
