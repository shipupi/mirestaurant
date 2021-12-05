const express = require('express');
const user_controller = require('../controllers/users.controller');
const auth_middleware = require('../middleware/auth.middleware');
const { checkSchema } = require('express-validator');
const {validate} = require('./validators/validate');
const {login_validator} = require('./validators/login.validator');

const auth_router = express.Router({mergeParams: true});


auth_router.post(
    "/login",
    validate(checkSchema(login_validator)),
    auth_middleware.authenticate,
    user_controller.generate_jwt
);

module.exports = auth_router;