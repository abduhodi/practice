const errorHandler = require("../helpers/errorHanler");
const Category = require("../models/category.model");

async function getAllCategory(req, res) {
  try {
    const categories = await Category.find();
    if (categories.length < 1) {
      return res.send({ message: "Category is empty" });
    }
    res.send({ length: categories.length, data: categories });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function addCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    res.send({ category });
  } catch (error) {
    errorHandler(req, res);
  }
}

async function deleteCategory(req, res) {
  try {
    const _id = req.params.id;
    const category = await Category.findOneAndDelete({ _id });
    if (!category) {
      return res.send({ message: "Category doesn't exist" });
    }
    res.send({ delete: true });
    res.send({ category });
  } catch (error) {
    errorHandler(req, res);
  }
}

module.exports = {
  getAllCategory,
  addCategory,
  deleteCategory,
};
