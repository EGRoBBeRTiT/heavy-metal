export const getSafeLocalStorage = () => {
    if (typeof localStorage !== 'undefined') {
        return localStorage;
    }

    return null;
};
