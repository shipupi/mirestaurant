const express = require('express');
const user_controller = require('../controllers/user.controller');
const { checkSchema } = require('express-validator');
const {validate} = require('./validators/validate');
const {userCreationValidator} = require('./validators/user.validator');


const user_router = express.Router({mergeParams: true});

user_router.get("/", user_controller.get_users);
user_router.post(
    "/",   
    validate(checkSchema(userCreationValidator)),
    user_controller.create_user
);

user_router.delete("/:user_id", user_controller.delete_user);
user_router.put("/:user_id", user_controller.edit_user);

module.exports = user_router;