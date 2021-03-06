const express = require('express');
const review_controller = require('../controllers/reviews.controller');
const { checkSchema } = require('express-validator');
const {validate} = require('./validators/validate');
const {reviewValidator} = require('./validators/reviews.validator');
const {reviewEditValidator} = require('./validators/reviews.edit.validator');
const auth_middleware = require('../middleware/auth.middleware');

const review_router = express.Router({mergeParams: true});

review_router.get("/", review_controller.get_reviews);

review_router.get(
    '/:review_id(\\d+)/', 
    auth_middleware.validJWT,
    auth_middleware.adminOnly,
    review_controller.get_by_id
);

review_router.post(
    "/",   
    auth_middleware.validJWT,
    auth_middleware.adminOnly,
    validate(checkSchema(reviewValidator)),
    review_controller.create_review
);

review_router.delete(
    '/:review_id(\\d+)/', 
    auth_middleware.validJWT,
    auth_middleware.adminOnly,    
    review_controller.delete_review
);
review_router.patch(
    '/:review_id(\\d+)/', 
    auth_middleware.validJWT,
    auth_middleware.adminOnly,
    validate(checkSchema(reviewEditValidator)),
    review_controller.patch_review
);

module.exports = review_router;