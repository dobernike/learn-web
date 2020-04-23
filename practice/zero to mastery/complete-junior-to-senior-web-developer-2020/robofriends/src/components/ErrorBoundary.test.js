import { shallow } from 'enzyme';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

it('expect to render ErrorBoundary component', () => {
  expect(shallow(<ErrorBoundary>mock</ErrorBoundary>)).toMatchSnapshot();
});
