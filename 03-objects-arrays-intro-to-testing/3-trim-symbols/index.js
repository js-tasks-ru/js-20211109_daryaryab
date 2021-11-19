/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
   if (size === 0) return '';

   if (size === undefined) return string;

   const stringArray = string.slice();
   const result = [];
   let counter = 0;

   for (let i = 0; i < stringArray.length; i++) {
     if (stringArray[i] === stringArray[i + 1]) {
       if (counter < size - 1) {
         result.push(stringArray[i]);
         counter++;
       } else {
         counter = 0;
       }
     } else {
       result.push(stringArray[i]);
       counter = 0;
     }
   }

   return result.join('');

}
