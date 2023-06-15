const Joi = require("joi");

exports.orderValidator = (data) => {
  const schema = Joi.object({
    user_id: Joi.string().length(24).alphanum().required(),
    product_id: Joi.string().length(24).alphanum().required(),
    quantity: Joi.number().positive().min(1).required(),
  });

  return schema.validate(data);
};
