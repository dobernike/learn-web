import React from 'react';
import { shallow } from 'enzyme';

import { FavouritesPage } from '../FavouritesPage';

describe('FavouritesPage', () => {
    let history: object, getFavourite: () => void, wrapper: any;

    beforeAll(() => {
        history = {
            goBack() {},
        };
        getFavourite = jest.fn().mockResolvedValue([{ some: 'some' }]);
        wrapper = shallow(<FavouritesPage history={history} getFavourite={getFavourite} />);
    });

    test('Should be ComponentDidMount', () => {
        expect(getFavourite).toBeCalled();
    });

    test('Should be state after ComponentDidMoutn', () => {
        expect(wrapper.state()).toEqual({ favorites: [{ some: 'some' }] });
    });

    test('Should have initialState equal { favorites: [] }', () => {
        wrapper.unmount();
        getFavourite = jest.fn().mockResolvedValue([]);
        wrapper = shallow(<FavouritesPage history={history} getFavourite={getFavourite} />);

        expect(wrapper.state()).toEqual({ favorites: [] });
    });
});
