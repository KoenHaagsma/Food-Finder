const localStorage = window.localStorage;

function getLocalStorageItem(key) {
    return localStorage.getItem(key);
}

function setLocalStorageItem(key, value) {
    return localStorage.setItem(key, value);
}

function removeLocalStorageItem(key) {
    return localStorage.removeItem(key);
}

export { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem };
