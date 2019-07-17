const check = require("./data-validators");

// User profiles must have at least a first and last name
module.exports = data => {
  let errors = [];
  if (!check.isNotEmpty(data.firstName) && !check.isNotEmpty(data.lastName)) {
    errors.push("You must enter a first and last name.");
  }
  return errors;
};
