export const trimArray = array => array.map(value => value.trim());
export const getValue = field => document.getElementById(field).value;
export const emptyStringToNull = input => {
    return input === '' ? null : input;
};
export const processArray = input => {
    return input === '' ? null : trimArray(input.split(','));
};
