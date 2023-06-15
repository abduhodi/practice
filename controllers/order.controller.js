const errorHandler = require("../helpers/errorHanler");
const Order = require("../models/order.model");
const { default: valid } = require("mongoose");
const { orderValidator } = require("../validators/orderValidator");
const isValidId = require("../helpers/isValidId");
const Product = require("../models/product.model");
const User = require("../models/user.model");

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate({ path: "product_id", populate: "category_id" })
      .populate("user_id");
    if (orders.length < 1) {
      return res.json({ message: "Order table is empty" });
    }
    res.json({ length: orders.length, data: orders });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function getOrderById(req, res) {
  try {
    const _id = req.params.id;

    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "Id is invalid" });
    }
    const order = await Order.findOne({ _id })
      .populate({ path: "product_id", populate: "category_id" })
      .populate("user_id");
    if (!order) {
      return res.json({ message: "Order doesn't exist" });
    }
    res.json({ order });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function deleteOrder(req, res) {
  try {
    const _id = req.params.id;
    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "Id is invalid" });
    }
    const order = await Order.findOneAndDelete({ _id });
    if (!order) {
      return res.json({ message: "Order doesn't exist" });
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function addOrder(req, res) {
  try {
    const { user_id, product_id, quantity } = req.body;
    const invalid = [user_id, product_id].some(
      (el) => !valid.isValidObjectId(el)
    );
    if (invalid) {
      return res.status(400).json({ message: "invalid id" });
    }
    const { error, value } = orderValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const product = await Product.findOne({ _id: product_id });
    if (!product) {
      return res.status(400).send({ message: "Product doesn't exist" });
    }
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(400).send({ message: "User doesn't exist" });
    }
    value.amount = product.price * quantity;
    const newOrder = await Order.create(value);
    res.json({ message: "create success", order: newOrder });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function updateOrder(req, res) {
  try {
    const _id = req.params.id;
    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "id is invalid" });
    }
    const { user_id, product_id, quantity } = req.body;
    const invalid = [user_id, product_id].some(
      (el) => !valid.isValidObjectId(el)
    );
    if (invalid) {
      return res.status(400).json({ message: "invalid id" });
    }
    const { error, value } = orderValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const product = await Product.findOne({ _id: product_id });
    if (!product) {
      return res.status(400).send({ message: "Product doesn't exist" });
    }
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(400).send({ message: "User doesn't exist" });
    }
    value.amount = product.price * quantity;
    const order = await Order.findOneAndUpdate({ _id }, value, {
      new: true,
    });
    if (!order) {
      return res.json({ message: "Order doesn't exist" });
    }
    res.json({ message: "update success", order });
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
};
