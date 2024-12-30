import getLocalStorage from '../../services/localStorage/getLocalStorage';

function getFavourite(key: string): any {
    return async () => await getLocalStorage(key);
}

export default getFavourite;
