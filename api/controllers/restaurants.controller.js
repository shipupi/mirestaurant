const restaurant_service = require('../services/restaurants.service');

exports.get_restaurants = async function(req, res) {
    let restaurants = await restaurant_service.get_restaurants();
    res.send(restaurants);
};

exports.create_restaurant = async function(req, res) {
    try {
        let restaurant = await restaurant_service.create_restaurant(req.body.name);
        res.status(201).json(restaurant.restaurant_id);
    } catch (e) {
        res.status(500).send("Unable to create restaurant.");
    }
};

exports.delete_restaurant = async function(req, res) {
    let restaurant_id = parseInt(req.params.restaurant_id);
    try {
        let restaurant_deletion = await restaurant_service.delete_restaurant(restaurant_id);
        if (restaurant_deletion) {
            res.status(204).send();
        } else {
            res.status(404).send({
                message: `restaurant with id ${restaurant_id} does not exist`
            })
        }
    } catch (e) {
        res.status(500).send("Unable to delete restaurant.");
    }
};

exports.edit_restaurant = async function(req, res) {
    let restaurant_id = parseInt(req.params.restaurant_id);
    res.send('NOT IMPLEMENTED: edit restaurant');
};