const { Router } = require("express");
const {
  getAllOrders,
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const router = Router();

router.route("/").get(getAllOrders).post(addOrder);

router.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);

module.exports = router;
