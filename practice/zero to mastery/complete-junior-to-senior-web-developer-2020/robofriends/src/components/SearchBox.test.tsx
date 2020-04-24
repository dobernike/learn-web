import { shallow } from 'enzyme';
import * as React from 'react';
import SearchBox from './SearchBox';

it('expect to render SearchBox component', () => {
  expect(shallow(<SearchBox searchChange={jest.fn()} />)).toMatchSnapshot();
});
