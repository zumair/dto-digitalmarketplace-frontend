export const newline = (val) => {
    // https://github.com/yoshuawuyts/newline-to-br/blob/master/index.js
    return val.replace(/(\r\n|\n|\r)/gm, '\r\n');
};
export default {
    newline
}