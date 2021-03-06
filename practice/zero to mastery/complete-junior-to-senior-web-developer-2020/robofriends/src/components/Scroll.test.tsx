import { shallow } from 'enzyme';
import * as React from 'react';
import Scroll from './Scroll';

it('expect to render Scroll component', () => {
  const mockChildren = <div>children</div>;
  expect(shallow(<Scroll>{mockChildren}</Scroll>)).toMatchSnapshot();
});
