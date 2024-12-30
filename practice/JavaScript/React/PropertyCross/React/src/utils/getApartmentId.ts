import { Apartment } from '../store/reducers/apartmentsListReducer';

function getApartmentId(apartment: Apartment) {
    return apartment.lister_url.match(/(\d{5,})/g)[0];
}

export default getApartmentId;
