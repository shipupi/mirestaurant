const express = require('express');
const user_routes = require('./users.routes');
const restaurant_routes = require('./restaurants.routes');
const review_routes = require('./reviews.routes');

const router = express.Router();


router.use("/users/", user_routes);
router.use("/restaurants/", restaurant_routes);
router.use("/reviews/", review_routes);
module.exports = router;