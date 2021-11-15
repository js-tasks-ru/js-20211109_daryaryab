/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const resultArray = [...arr];

  if (param === 'asc') {

    return resultArray.sort((x, y) => SortArrayLocale(x, y));

  } else if (param === 'desc') {

    return resultArray.sort((x, y) => SortArrayLocale(x, y)).reverse();

  }
}

function SortArrayLocale(x, y) {
  const locale = /[ А-Яа-я]/i.test(x) ? 'ru' : 'en';

  return x.localeCompare(y, locale, { sensitivity: 'case', caseFirst: 'upper' });
}


