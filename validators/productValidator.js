const Joi = require("joi");

exports.productValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).trim().required(),
    price: Joi.number().positive().required(),
    category_id: Joi.string().required(),
  });

  return schema.validate(data);
};
