import getLocalStorage from '../../services/localStorage/getLocalStorage';
import { Apartment } from '../reducers/apartmentsListReducer';
const includes = require('@ramda/includes');

function isApartmentInStorage(keyStorage: string, apartment: Apartment, cityName?: string) {
    const storage = getLocalStorage(keyStorage);
    const data = cityName ? { ...apartment, city: cityName } : apartment;

    return includes(data, storage);
}

export default isApartmentInStorage;
