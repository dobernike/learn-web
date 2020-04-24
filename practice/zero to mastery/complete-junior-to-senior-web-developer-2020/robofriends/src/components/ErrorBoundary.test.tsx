import { shallow } from 'enzyme';
import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';

it('expect to render ErrorBoundary component', () => {
  const mockChildren = <div>children</div>;
  expect(
    shallow(<ErrorBoundary>{mockChildren}</ErrorBoundary>)
  ).toMatchSnapshot();
});
