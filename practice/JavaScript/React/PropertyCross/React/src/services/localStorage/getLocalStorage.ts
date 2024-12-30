const getLocalStorage = (key: string): any[] => {
    try {
        const serializedState = localStorage.getItem(key);

        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch {
        return [];
    }
};

export default getLocalStorage;
