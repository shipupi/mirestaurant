const express = require('express');
const restaurant_controller = require('../controllers/restaurants.controller');
const { checkSchema } = require('express-validator');
const {validate} = require('./validators/validate');
const {restaurantValidator} = require('./validators/restaurants.validator');

const restaurant_router = express.Router({mergeParams: true});

restaurant_router.get("/", restaurant_controller.get_restaurants);
restaurant_router.post(
    "/",   
    validate(checkSchema(restaurantValidator)),
    restaurant_controller.create_restaurant
);

restaurant_router.delete('/:restaurant_id(\\d+)/', restaurant_controller.delete_restaurant);
restaurant_router.put('/:restaurant_id(\\d+)/', restaurant_controller.edit_restaurant);

module.exports = restaurant_router;