import { shallow } from 'enzyme';
import * as React from 'react';
import Header from './Header';

it('expect to render Header component', () => {
  expect(shallow(<Header />)).toMatchSnapshot();
});
