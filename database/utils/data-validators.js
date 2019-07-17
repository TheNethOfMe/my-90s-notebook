module.exports = {
  // checks that input is valid email
  isEmail: str => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
    return emailRegex.test(str);
  },
  // checks that input is not an empty string, object, or array
  isNotEmpty: data => {
    let result = true;
    if (
      (typeof data === "string" && data === "") ||
      (typeof data === "object" && Object.keys(data).length === 0) ||
      (typeof data === "array" && data.length === 0)
    ) {
      result = false;
    }
    return result;
  },
  // checks that a string is of sufficient length
  isLongEnough: (data, length) => {
    return data.length >= length;
  }
};
