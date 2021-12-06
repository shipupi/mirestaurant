const restaurant_service = require('../services/restaurants.service');
const review_service = require('../services/reviews.service');

exports.get_restaurants = async function(req, res) {
    let restaurants = await restaurant_service.get_restaurants();
    res.send(restaurants);
};

const get_restaurant_by_slug = async function(req, res) {
    let restaurant = await restaurant_service.find_by_slug(req.params.slug, req.logged_user?.is_admin);
    if (!restaurant) {
        return res.status(404).send()
    }
    res.send(restaurant);
};
exports.get_restaurant_by_slug = get_restaurant_by_slug;

exports.get_restaurant_by_id = async function(req, res) {
    let restaurant_id = parseInt(req.params.restaurant_id);
    let restaurant = await restaurant_service.find_by_id(restaurant_id);
    if (!restaurant) {
        return res.status(404).send()
    }
    req.params.slug = restaurant.slug;
    return get_restaurant_by_slug(req, res)
};

exports.create_restaurant = async function(req, res) {
    try {
        let restaurant = await restaurant_service.create_restaurant(req.body.name);
        if (!restaurant) {
            res.status(400).send("Restaurant already exists");
            return;
        }
        res.status(201).send(restaurant);
    } catch (e) {
        console.log(e);
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
        console.log(e)
        res.status(500).send("Unable to delete restaurant.");
    }
};

exports.rate_restaurant = async function(req, res) {
    let restaurant_id = parseInt(req.params.restaurant_id);
    let restaurant = await restaurant_service.find_by_id(restaurant_id);
    if (restaurant == null) {
        return res.status(404).send();
    }
    try {
        let user_id = req.logged_user.user_id;
        let review = await review_service.create_review(restaurant_id, user_id, req.body.rating, req.body.comment);
        res.status(201).send(review);
    } catch(e) {
        console.log(e)
        res.status(500).send("Unable to rate restaurant");
    }

}

exports.edit_restaurant = async function(req, res) {
    let restaurant_id = parseInt(req.params.restaurant_id);
    let restaurant = await restaurant_service.find_by_id(restaurant_id);
    if (restaurant == null) {
        return res.status(404).send();
    }
    try {
        let restaurant = await restaurant_service.edit_restaurant(restaurant_id, req.body.name);
        if (restaurant == null) {
            return res.status(400).send("Restaurant already exists")
        }
        res.send(restaurant);
    } catch (e) {
        res.status(500).send();
    }
    
};