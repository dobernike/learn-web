import isApartmentInStorage from './isApartmentInStorage';
import deleteApartment from './deleteApartment';
import addItemToStorage from './addItemToStorage';
import { Apartment } from '../reducers/apartmentsListReducer';

function toggleFavorite(data: Apartment, cityName: string) {
    const key = `favorites`;
    const apartment = { ...data, city: cityName };

    if (isApartmentInStorage(key, apartment)) {
        deleteApartment(apartment);
        return false;
    }

    addItemToStorage(key, apartment);
    return true;
}

export default toggleFavorite;
