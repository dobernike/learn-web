import React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from '../ErrorBoundary';
import ErrorIndicator from '../../ErrorIndicator/ErrorIndicator';

describe('When no JS errors are caught in a child component', () => {
    let ErrorBoundaryComponent: any;

    beforeAll(() => {
        ErrorBoundaryComponent = shallow(
            <ErrorBoundary>
                <h1>wassup</h1>
            </ErrorBoundary>
        );
    });

    test('should render the child component', () => {
        expect(ErrorBoundaryComponent.find('h1').exists()).toBeTruthy();
    });
});

describe('When a JS error is caught in a child component', () => {
    let ErrorBoundaryComponent: any;

    beforeAll(() => {
        ErrorBoundaryComponent = shallow(
            <ErrorBoundary>
                <h1>wassup</h1>
            </ErrorBoundary>
        );
        ErrorBoundaryComponent.instance().componentDidCatch('oh nooos an error');
        ErrorBoundaryComponent.update();
    });

    test('should display ErrorIndicator an error', () => {
        expect(ErrorBoundaryComponent.find(ErrorIndicator).exists()).toBeTruthy();
    });

    test('should update the state to indicate an error', () => {
        expect(ErrorBoundaryComponent.instance().state.hasError).toBeTruthy();
    });

    test('should not render the child component', () => {
        expect(ErrorBoundaryComponent.find('h1').exists()).toBeFalsy();
    });
});
