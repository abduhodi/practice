function errorHandler(res, error) {
  console.log(error);
  res.json({ message: "Internal Error", error: error.message });
}

module.exports = errorHandler;
