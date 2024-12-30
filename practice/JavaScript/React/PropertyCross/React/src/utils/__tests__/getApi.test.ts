import getApi from '../getApi';

describe('getApi', () => {
    const uri = 'http://api.nestoria.co.uk/api';

    const params = {
        country: 'uk',
        pretty: '1',
        action: 'search_listings',
        encoding: 'json',
        listing_type: 'buy',
        page: '1',
    };

    test('get uri + params to equal needed url', () => {
        expect(getApi(uri, params)).toBe(
            'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&'
        );
    });

    test('get uri + empty object to equal url without params', () => {
        expect(getApi(uri, {})).toBe('http://api.nestoria.co.uk/api?');
    });
});
