const express = require('express');
const user_controller = require('../controllers/userController');


const user_router = express.Router({mergeParams: true});

user_router.post("/", user_controller.create_user);
user_router.delete("/:user_id", user_controller.delete_user);
user_router.put("/:user_id", user_controller.edit_user);

module.exports = user_router;