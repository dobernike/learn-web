import getApi from '../../utils/getApi';
import { API_URL, getApartmentsData } from '../../services/nestoria/nestoria';

const defaultParams = {
    country: 'uk',
    pretty: '1',
    action: 'search_listings',
    encoding: 'json',
    listing_type: 'buy',
    page: '1',
};

async function fetchCoords(coords: string) {
    const params = { ...defaultParams, centre_point: coords };
    const response = await fetch(`${getApi(API_URL, params)}`);

    const apartmentsData = await getApartmentsData(response);

    return apartmentsData.locations[0].place_name;
}

export default fetchCoords;
