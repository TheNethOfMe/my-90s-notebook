const check = require("./data-validators");

// when logging in the user must input a valid email and password
module.exports = bodyData => {
  let result = false;

  if (
    check.isNotEmpty(bodyData.email) &&
    check.isNotEmpty(bodyData.password) &&
    check.isEmail(bodyData.email) &&
    check.isLongEnough(bodyData.password, 8)
  ) {
    result = true;
  }
  return result;
};
