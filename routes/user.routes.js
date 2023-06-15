const { Router } = require("express");
const {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controllers/user.controller");

const router = Router();

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
