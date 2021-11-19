/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let pathAr = path.split(".");

  return (obj)=> {
    if (pathAr[0] !== Object.keys(obj)[0]) return;

    let resultObj = obj[pathAr[0]];

    let resultValue = null;

    for (let i = 1; i < pathAr.length; i++) {
      if (typeof resultObj[pathAr[i]] === "object") {
        resultObj = resultObj[pathAr[i]];
      }

      resultValue = resultObj[pathAr[i]];
    }

    return pathAr.length > 1 ? resultValue : resultObj;
  };
}
