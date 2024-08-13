// localStorageUtils.js

/**
 * Updates localStorage with the provided key and value.
 * @param {string} key - The key for the localStorage item.
 * @param {any} value - The value to be stored, will be JSON.stringified if it's an object or array.
 */
export function updateLocalStorage(key, value) {
    const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueToStore);
}

/**
 * Gets a value from localStorage by key.
 * @param {string} key - The key for the localStorage item.
 * @returns {any} - The value retrieved from localStorage, parsed if it was originally an object or array.
 */
export function getLocalStorage(key) {
    const storedValue = localStorage.getItem(key);
    try {
        return JSON.parse(storedValue);
    } catch (e) {
        return storedValue;
    }
}
