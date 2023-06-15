const { Router } = require("express");
const {
  getAllCategory,
  addCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = Router();

router.route("/").get(getAllCategory).post(addCategory);
router.route("/:id").delete(deleteCategory);

module.exports = router;
