const errorHandler = require("./errorHanler");
const { default: validate } = require("mongoose");

function isValidId(res, id) {
  try {
    if (!validate.isValidObjectId(id)) {
      return res.status(400).send({ message: "Invalid id" });
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = isValidId;
