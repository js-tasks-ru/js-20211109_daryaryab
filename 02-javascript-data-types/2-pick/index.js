/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const result = {};
  const keys = Object.keys(obj);

  for (let i in keys) {
    if (fields.indexOf(keys[i]) != -1) {
      result[keys[i]] = obj[keys[i]];
    }
  }

  return result;
};
