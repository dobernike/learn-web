import { shallow } from 'enzyme';
import * as React from 'react';
import Card from './Card';

it('expect to render Card component', () => {
  const mockData = {
    id: '1',
    name: 'John',
    email: 'john@gmail.com',
  };
  expect(shallow(<Card {...mockData} />)).toMatchSnapshot();
});
