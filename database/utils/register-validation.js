const check = require("./data-validators");

// when registering, the user must have a valid email, password at least 8 characters and matching password and confirm password
module.exports = bodyData => {
  const email = bodyData.email || "";
  const password = bodyData.password || "";
  const password2 = bodyData.password2 || "";
  let errors = {};
  if (!check.isNotEmpty(email) || !check.isEmail(email)) {
    errors.email = "You must enter a valid email address.";
  }
  if (password !== password2) {
    errors.password = "Your passwords do not match";
  }
  if (!check.isNotEmpty(password)) {
    errors.password = "You must enter a valid password.";
  }
  if (!check.isLongEnough(password, 8)) {
    errors.password = "Your password must be at least 8 characters long.";
  }
  let result = [];
  !!errors.email && result.push(errors.email);
  !!errors.password && result.push(errors.password);
  return result;
};
