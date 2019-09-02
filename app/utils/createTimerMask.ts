/**
 * Custom function to pass to text-mask module to create my own number format
 *
 * @const emptyString string convenience variable that is an empty string
 * @const digitRegExp RegExp convenience variable that returns digits
 * @const nonDigitRegExp RegExp convenience variable that returns non-digits
 *
 * @var numberSeparator string character to place between number, default is ":"
 * @var numberGroupLimit number number of characters to have between separators
 *
 * @function convertToMask(strNumver: string): => string
 *  takes a string and converts any digits to "/\d/"
 * @function addNumberSeparator(n: number, numberSeparatorSymbol: string
 *  Adds the numberSeparator every 2 characters see
 *  @link http://stackoverflow.com/a/10899795/604296
 * @function numberMask(rawValue: string)
 *  This is the main function
 *  We strip the rawValue then add masking before returning it.
 * */

const emptyString: string = '';
const digitRegExp: RegExp = /\d/;
const nonDigitsRegExp: RegExp = /\D+/g;

export default function createTimerMask({
  numberSeparator = ':',
  numberGroupLimit = 2
} = {}): (rawValue: string) => string[] {
  // Here we'd check options
  // const numberSeparatorSymbolLength = numberSeparator && numberSeparator.length || 0;

  function numberMask(rawValue: string = emptyString) {
    let integer, mask;
    const indices = [];
    // Handle an empty input
    if (rawValue === emptyString) {
      return [emptyString];
    }
    // Check to see if there are any separators
    // and how many there are
    let idx = rawValue.indexOf(numberSeparator);
    while (idx != -1) {
      indices.push(idx);
      idx = rawValue.indexOf(numberSeparator, idx + 1);
    }
    // Strip it
    integer = rawValue.replace(nonDigitsRegExp, emptyString);
    // check the length after it's been stripped
    const integerLength = integer.length;
    // Add placeholders that are added to the value
    if (integerLength < 6) {
      switch (integerLength) {
        case 1:
          integer = 'HH:MM:S' + integer;
          break;
        case 2:
          integer = 'HH:MM:' + integer;
          break;
        case 3:
          integer = 'HH:M' + integer;
          break;
        case 4:
          integer = 'HH:' + integer;
          break;
        case 5:
          integer = 'H' + integer;
          break;
        default:
          console.log(`Default switch`);
          break;
      }
    } else {
      // this limits it to 6 characters
      // TODO: handle more than 6 characters better
      integer = integer.substring(0, 6);
    }
    // add separators
    integer = addNumberSeparator(integer, numberSeparator);

    // Convert it
    mask = convertToMask(integer);
    // Return it
    return mask;
  }

  numberMask.instanceOf = 'createTimerMask';

  return numberMask;
}

function convertToMask(strNumber) {
  return strNumber
    .split(emptyString)
    .map(char => (digitRegExp.test(char) ? digitRegExp : char));
}

// http://stackoverflow.com/a/10899795/604296
function addNumberSeparator(n, numberSeparatorSymbol) {
  return n.replace(/\B(?=(\d{2})+(?!\d))/g, numberSeparatorSymbol);
}
