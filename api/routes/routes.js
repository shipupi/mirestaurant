const express = require('express');
const user_routes = require('./users.routes');

const router = express.Router();


router.use("/users/", user_routes);
module.exports = router;