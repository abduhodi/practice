const errorHandler = require("../helpers/errorHanler");
const User = require("../models/user.model");
const { default: valid } = require("mongoose");
const { userValidator } = require("../validators/userValidator");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    if (users.length < 1) {
      return res.json({ message: "User table is empty" });
    }
    res.json({ length: users.length, data: users });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function getUserById(req, res) {
  try {
    const _id = req.params.id;
    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "Id is invalid" });
    }
    const user = await User.findOne({ _id });
    if (!user) {
      return res.json({ message: "User doesn't exist" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function deleteUser(req, res) {
  try {
    const _id = req.params.id;
    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "Id is invalid" });
    }
    const user = await User.findOneAndDelete({ _id });
    if (!user) {
      return res.json({ message: "User doesn't exist" });
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function addUser(req, res) {
  try {
    const { error, value } = userValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await User.findOne({ email: value.email });
    if (user) {
      return res.json({ message: "User already exists" });
    }
    const newUser = await User.create(value);
    res.json({ message: "create success", user: newUser });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function updateUser(req, res) {
  try {
    const _id = req.params.id;
    if (!valid.isValidObjectId(_id)) {
      return res.status(400).json({ message: "id is invalid" });
    }
    const { error, value } = userValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await User.findOneAndUpdate({ _id }, value, { new: true });
    if (!user) {
      return res.json({ message: "User doesn't exist" });
    }
    res.json({ message: "update success", user });
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
