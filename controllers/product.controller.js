const errorHandler = require("../helpers/errorHanler");
const Product = require("../models/product.model");
const { default: valid } = require("mongoose");
const { productValidator } = require("../validators/productValidator");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    if (products.length < 1) {
      return res.json({ message: "Product table is empty" });
    }
    res.json({ length: products.length, data: products });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function getProductById(req, res) {
  try {
    const _id = req.params.id;
    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "Id is invalid" });
    }
    const product = await Product.findOne({ _id });
    if (!product) {
      return res.json({ message: "Product doesn't exist" });
    }
    res.json({ product });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function deleteProduct(req, res) {
  try {
    const _id = req.params.id;
    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "Id is invalid" });
    }
    const product = await Product.findOneAndDelete({ _id });
    if (!product) {
      return res.json({ message: "Product doesn't exist" });
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function addProduct(req, res) {
  try {
    const { error, value } = productValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const product = await Product.findOne({ name: value.name });
    if (product) {
      return res.json({ message: "Product already exists" });
    }
    const newProduct = await Product.create(value);
    res.json({ message: "create success", product: newProduct });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function updateProduct(req, res) {
  try {
    const _id = req.params.id;
    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "id is invalid" });
    }
    const { error, value } = productValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const product = await Product.findOneAndUpdate({ _id }, value, {
      new: true,
    });
    if (!product) {
      return res.json({ message: "Product doesn't exist" });
    }
    res.json({ message: "update success", product });
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
