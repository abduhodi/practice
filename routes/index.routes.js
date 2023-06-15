const { Router } = require("express");

const router = Router();

router.use("/user", require("./user.routes"));

router.use("/product", require("./product.routes"));

router.use("/order", require("./order.routes"));

router.use("/category", require("./category.routes"));

module.exports = router;
