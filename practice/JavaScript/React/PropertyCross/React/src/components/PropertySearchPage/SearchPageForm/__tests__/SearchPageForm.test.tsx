import React from 'react';
import { shallow } from 'enzyme';

import { SearchPageForm } from '../SearchPageForm';

describe('SearchPageForm', () => {
    let fetchSearch: any, wrapper: any;

    beforeEach(() => {
        fetchSearch = jest.fn().mockResolvedValue('true');
        wrapper = shallow(<SearchPageForm fetchSearch={fetchSearch} />);
    });

    test('Should fetchSearch not called in mount', () => {
        expect(fetchSearch).not.toBeCalled();
    });

    test('Should have initialState', () => {
        expect(wrapper.state()).toEqual({ errorMessage: '', isRedirect: false, value: '' });
    });

    test('Should update the state {value} from empty to London', () => {
        expect(wrapper.state('value')).toBe('');

        wrapper.find('Input').simulate('change', { target: { value: 'London' } });

        expect(wrapper.state('value')).toBe('London');
    });

    test('Should state.isRedirect false if state.value is empty', () => {
        const fakeEvent = { preventDefault: () => {} };

        expect(wrapper.state('isRedirect')).toBeFalsy();
        wrapper.find('form').simulate('submit', fakeEvent);
        expect(wrapper.state('isRedirect')).toBeFalsy();
    });
});
