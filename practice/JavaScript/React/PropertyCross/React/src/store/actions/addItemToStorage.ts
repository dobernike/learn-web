import setLocalStorage from '../../services/localStorage/setLocalStorage';
import getLocalStorage from '../../services/localStorage/getLocalStorage';
const includes = require('@ramda/includes');

function addItemToStorage(key: string, searchItem: string | object) {
    const storage = getLocalStorage(key);

    if (!includes(searchItem, storage)) {
        storage.unshift(searchItem);
        setLocalStorage(key, storage);
    }
}

export default addItemToStorage;
