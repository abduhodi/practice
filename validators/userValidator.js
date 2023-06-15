const Joi = require("joi");

exports.userValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).trim().required(),
  });

  return schema.validate(data);
};
