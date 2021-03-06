const ValidationError = require(`../error/validation-error`);

const validate = (data) => {
  const errors = [];
  if (!data.username) {
    errors.push(`Field name 'name' is required!`);
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return data;
};

module.exports = validate;
