/**
 * Use this file for useful functions that can be reused
 *
 * @function numberOfDigits => return  number : gets the number fo digits in a number
 *
 * @function debounce => () => {} : Taken from underscoreJS. Returns a function, that, as lonsg
 *  as it continues to be invoked, will not be triggered. The function will be
 *  called after it stops being called for N milliseconds. If `immediate` is
 *  passed, trigger the function on the leading edge, instead of the trailing.
 * */

export function numberOfDigits(numb: number) {
  return Math.max(Math.floor(Math.log10(Math.abs(numb))), 0) + 1;
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
