const { Router } = require("express");

const router = Router();

router.route("/user").get(getUserOrder).post(getTotalAmount); //Fetching user's orders with product details and category name // Calculating total order amounnt per user

router.route("/highest").get(getHighestUser); //Finding users with the highest total order amount

router.route("/corner").get(getCornerProducts); //Fetching products with the highest and lowest prices in each category

router.route("/avarage").get(getAverageAmount); //Calculating the avarage order per category

module.exports = router;
