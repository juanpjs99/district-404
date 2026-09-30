const required = (body, fields) => fields
  .filter((field) => typeof body[field] !== 'string' || body[field].trim() === '')
  .map((field) => `${field} is required`);

const validateRegister = (body) => {
  const errors = required(body, ['firstName', 'firstSurname', 'email', 'username', 'password']);

  if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.push('email must be valid');
  }

  if (body.password && body.password.length < 8) {
    errors.push('password must contain at least 8 characters');
  }

  return errors;
};

const validateLogin = (body) => required(body, ['username', 'password']);

module.exports = { validateRegister, validateLogin };
