const validate = (validator) => (req, res, next) => {
  const errors = validator(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  next();
};

module.exports = validate;
