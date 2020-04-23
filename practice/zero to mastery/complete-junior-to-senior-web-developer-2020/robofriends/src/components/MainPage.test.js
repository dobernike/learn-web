import { shallow } from 'enzyme';
import React from 'react';
import MainPage from './MainPage';

let wrapper;
beforeEach(() => {
  const mockProps = {
    searchField: '',
    robots: [],
    isPending: false,
    error: '',
    onSearchChange: jest.fn(),
    onRequestRobots: jest.fn(),
  };

  wrapper = shallow(<MainPage {...mockProps} />);
});

it('expect to render MainPage withot crashing', () => {
  expect(wrapper).toMatchSnapshot();
});

it('filters robots correctly', () => {
  const mockProps = {
    searchField: 'john',
    robots: [
      {
        id: 3,
        name: 'John',
        email: 'john@gmail.com',
      },
    ],
    isPending: false,
    error: '',
    onSearchChange: jest.fn(),
    onRequestRobots: jest.fn(),
  };

  const wrapper2 = shallow(<MainPage {...mockProps} />);

  expect(wrapper2.instance().filterRobots()).toEqual([
    {
      id: 3,
      name: 'John',
      email: 'john@gmail.com',
    },
  ]);
});

it('filters robots correctly 2', () => {
  const mockProps3 = {
    searchField: 'a',
    robots: [
      {
        id: 3,
        name: 'John',
        email: 'john@gmail.com',
      },
    ],
    isPending: false,
    error: '',
    onSearchChange: jest.fn(),
    onRequestRobots: jest.fn(),
  };

  const filteredRobots = [];
  const wrapper3 = shallow(<MainPage {...mockProps3} />);

  expect(wrapper3.instance().filterRobots()).toEqual(filteredRobots);
});
