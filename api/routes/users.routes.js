const express = require('express');
const user_controller = require('../controllers/users.controller');
const { checkSchema } = require('express-validator');
const {validate} = require('./validators/validate');
const {userValidator} = require('./validators/users.validator');
const {userEditValidator} = require('./validators/user.edit.validator');
const auth_middleware = require('../middleware/auth.middleware');

const user_router = express.Router({mergeParams: true});

user_router.get(
    "/", 
    auth_middleware.validJWT,
    auth_middleware.adminOnly,
    user_controller.get_users
);
user_router.post(
    "/",
    validate(checkSchema(userValidator)),
    user_controller.create_user
);

user_router.get(
    '/:user_id(\\d+)/', 
    auth_middleware.validJWT,
    auth_middleware.adminOnly,
    user_controller.get_by_id
);

user_router.delete(
    '/:user_id(\\d+)/', 
    auth_middleware.validJWT,
    auth_middleware.adminOnly,
    user_controller.delete_user
);
user_router.patch(
    '/:user_id(\\d+)/', 
    auth_middleware.validJWT,
    auth_middleware.adminOnly,
    validate(checkSchema(userEditValidator)),
    user_controller.patch_user
);

module.exports = user_router;