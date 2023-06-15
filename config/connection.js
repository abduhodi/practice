const mongoose = require("mongoose");
const config = require("config");

const connection = mongoose.connect(config.get("dbUri"));

module.exports = connection;
