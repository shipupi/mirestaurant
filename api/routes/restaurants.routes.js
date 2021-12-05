const express = require('express');
const restaurant_controller = require('../controllers/restaurants.controller');
const { checkSchema } = require('express-validator');
const {validate} = require('./validators/validate');
const {restaurant_validator} = require('./validators/restaurants.validator');
const auth_middleware = require('../middleware/auth.middleware');

const restaurant_router = express.Router({mergeParams: true});

restaurant_router.get("/", restaurant_controller.get_restaurants);
restaurant_router.post(
    "/",   
    auth_middleware.validJWT,
    auth_middleware.adminOnly,    
    validate(checkSchema(restaurant_validator)),
    restaurant_controller.create_restaurant
);

restaurant_router.get(
    '/:slug(\[a-zA-Z\-0-9]+)/',     
    restaurant_controller.get_restaurant_by_slug
);

restaurant_router.delete(
    '/:restaurant_id(\\d+)/', 
    auth_middleware.validJWT,
    auth_middleware.adminOnly,    
    restaurant_controller.delete_restaurant
);
restaurant_router.put(
    '/:restaurant_id(\\d+)/',
    auth_middleware.validJWT,
    auth_middleware.adminOnly,
    restaurant_controller.edit_restaurant
);

module.exports = restaurant_router;