const setLocalStorage = (key: string, value: Array<string>) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export default setLocalStorage;
