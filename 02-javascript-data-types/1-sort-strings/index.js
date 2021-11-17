/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const resultArray = [...arr];
  const options = { sensitivity: 'case', caseFirst: 'upper' };
  const locale = ['ru', 'en'];
  const collator = new Intl.Collator(locale, options);

  if (param === 'asc') {
    resultArray.sort((a, b) => collator.compare(a, b));
  } else if (param === 'desc') {
    resultArray.sort((a, b) => collator.compare(b, a));
  }

  return resultArray;
}


