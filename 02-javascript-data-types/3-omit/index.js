/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const result = {};
  const keys = Object.keys(obj);

  for (let i in keys) {
    if (fields.indexOf(keys[i]) === -1) {
      result[keys[i]] = obj[keys[i]];
    }
  }

return result;
};
