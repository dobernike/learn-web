import getLocalStorage from '../../services/localStorage/getLocalStorage';
import setLocalStorage from '../../services/localStorage/setLocalStorage';
import getApartmentId from '../../utils/getApartmentId';
import { Apartment } from '../../store/reducers/apartmentsListReducer';

async function deleteApartment(apartment: Apartment) {
    const storage = getLocalStorage('favorites');
    const favorites = storage.filter((item: Apartment) => getApartmentId(item) !== getApartmentId(apartment));

    setLocalStorage('favorites', favorites);
}

export default deleteApartment;
