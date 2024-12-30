import getApartmentId from '../getApartmentId';

describe('getApartmentId', () => {
    const apartment = {
        bathroom_number: 2,
        bedroom_number: 2,
        car_spaces: 0,
        city: 'London',
        commission: 0,
        construction_year: 0,
        datasource_name: 'OnTheMarket.com',
        img_height: 300,
        img_url: 'https://imgs.nestimg.com/2_bedroom_flat_for_sale_112348542654757450.jpg',
        img_width: 400,
        keywords: 'Balcony, Kitchen, Modern',
        latitude: 51.5477,
        lister_name: 'Winkworth',
        lister_url:
            'https://www.nestoria.co.uk/detail/0000000112348542654757450/title/5/1-8?serpUid=&pt=1&ot=1&l=london&did=105_high1&t_sec=9&t_or=45&t_pvid=null&utm_source=api&utm_medium=external',
        listing_type: 'buy',
        location_accuracy: 9,
        longitude: -0.113224,
        price: 650000,
        price_currency: '£',
        price_formatted: '£650,000',
        price_high: 650000,
        price_low: 650000,
        price_type: 'fixed',
        property_type: 'flat',
        room_number: 2,
        size: 0,
        size_type: 'net',
        summary: 'Situated on the second floor of this small modern development is an...',
        thumb_height: 60,
        thumb_url: 'https://imgs.nestimg.com/medium/2_bedroom_flat_for_sale_112348542654757450.jpg',
        thumb_width: 80,
        title: 'St. Davids Apartments, 53 Lough Road, London, N7',
        updated_in_days: 1,
        updated_in_days_formatted: 'New',
    };

    test('get apartment object to equal id', () => {
        expect(getApartmentId(apartment)).toBe('0000000112348542654757450');
    });
});
