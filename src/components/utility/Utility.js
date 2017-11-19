/* The Library will contain methods that could be used in all other projects. */

/* Method Number 1: Search in an Object Array and get the Index of your result */
/**
 * Add two numbers.
 * @param {array} array The array you want to search in.
 * @param {string} search_key The Key of the value you want to search.
 * @param {string} search_value The Value you want to search.
 * @returns {number} The index of the searched result.
 */
export const searchArrayIndex = (array, search_key, search_value) => {
    var index =  (array.map(function (x) {
        return x[search_key];
    }).indexOf(search_value));

    return index;
};
